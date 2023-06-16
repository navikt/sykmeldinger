import { IToggle, getDefinitions, evaluateFlags } from '@unleash/nextjs'
import { logger } from '@navikt/next-logger'
import * as R from 'remeda'

import { isLocalOrDemo } from '../utils/env'
import { getUserContext } from '../auth/rsc-user-context'

import { getUnleashEnvironment, getLocalDevelopmentToggles } from './utils'
import { EXPECTED_TOGGLES } from './toggles'

export async function getFlagsServerComponent(headers: Headers): Promise<IToggle[]> {
    const sessionId = getUserContext(headers)?.payload.pid
    if (!sessionId) {
        throw new Error('User is missing pid. Is the user even logged in?')
    }

    if (isLocalOrDemo) {
        logger.warn('Running in local or demo mode, falling back to development toggles.')
        return getLocalDevelopmentToggles()
    }

    try {
        const definitions = await getAndValidateDefinitions()
        return evaluateFlags(definitions, { sessionId, environment: getUnleashEnvironment() }).toggles
    } catch (e) {
        logger.error(new Error('Failed to get flags from Unleash. Falling back to default flags.', { cause: e }))
        return EXPECTED_TOGGLES.map(
            (it): IToggle => ({
                name: it,
                variant: {
                    name: 'default',
                    enabled: false,
                },
                impressionData: false,
                enabled: false,
            }),
        )
    }
}

/**
 * If there are any toggles defined in EXPECTED_TOGGLES that are not returned by Unleash, something is out of sync.
 */
async function getAndValidateDefinitions(): Promise<ReturnType<typeof getDefinitions>> {
    const definitions = await getDefinitions({
        appName: 'sykmeldinger',
        fetchOptions: { next: { revalidate: 15 } },
    })

    const diff = R.difference(
        EXPECTED_TOGGLES,
        R.map(definitions.features, (it) => it.name),
    )

    if (diff.length > 0) {
        logger.error(
            `Difference in expected flags and flags in unleash, expected but not in unleash: ${diff.join(', ')}`,
        )
    }

    logger.info(
        `Fetched ${definitions.features.length} flags from unleash: ${definitions.features
            .map((it) => it.name)
            .join('\n')}\n`,
    )

    return definitions
}
