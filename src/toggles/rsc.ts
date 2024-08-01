import { IToggle, getDefinitions, evaluateFlags } from '@unleash/nextjs'
import { logger } from '@navikt/next-logger'
import * as R from 'remeda'
import { cookies } from 'next/headers'

import { isLocalOrDemo } from '../utils/env'

import { getUnleashEnvironment, localDevelopmentToggles } from './utils'
import { EXPECTED_TOGGLES } from './toggles'

export async function getToggles(): Promise<{ toggles: IToggle[] }> {
    // @ts-expect-error Non zero toggles atm
    if (EXPECTED_TOGGLES.length === 0) {
        logger.info('Currently no expected toggles defined, not fetching toggles from unleash')
        return { toggles: [] }
    }

    if (isLocalOrDemo) {
        logger.warn('Running in local or demo mode, falling back to development toggles.')
        return { toggles: localDevelopmentToggles() }
    }

    try {
        const sessionId = getUnleashSessionId()
        const definitions = await getAndValidateDefinitions()
        return evaluateFlags(definitions, {
            sessionId,
            environment: getUnleashEnvironment(),
            // TODO: userid from azure token?
        })
    } catch (e) {
        logger.error(new Error('Failed to get flags from Unleash. Falling back to default flags.', { cause: e }))
        return {
            toggles: EXPECTED_TOGGLES.map(
                (it): IToggle => ({
                    name: it,
                    variant: {
                        name: 'default',
                        enabled: false,
                    },
                    impressionData: false,
                    enabled: false,
                }),
            ),
        }
    }
}

/**
 * If there are any toggles defined in EXPECTED_TOGGLES that are not returned by Unleash, something is out of sync.
 */
async function getAndValidateDefinitions(): Promise<ReturnType<typeof getDefinitions>> {
    const definitions = await getDefinitions({
        appName: 'sykmeldinger',
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
        `Fetched ${definitions.features.length} flags from unleash, found all ${EXPECTED_TOGGLES.length} expected flags`,
    )

    return definitions
}

export const UNLEASH_COOKIE_NAME = 'sykmeldinger-unleash-session-id'

export function getUnleashSessionId(): string {
    const existingUnleashId = cookies().get(UNLEASH_COOKIE_NAME)
    if (existingUnleashId != null) {
        return existingUnleashId.value
    } else {
        logger.warn('No existing unleash session id found, is middleware not configured?')
        return '0'
    }
}
