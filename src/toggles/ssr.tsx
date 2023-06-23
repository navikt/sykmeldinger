import { getRandomValues } from 'crypto'

import { IToggle, getDefinitions, evaluateFlags } from '@unleash/nextjs'
import { logger } from '@navikt/next-logger'
import { GetServerSidePropsContext } from 'next/types'
import * as R from 'remeda'

import { isLocalOrDemo } from '../utils/env'

import { getUnleashEnvironment, localDevelopmentToggles } from './utils'
import { EXPECTED_TOGGLES } from './toggles'

export async function getFlagsServerSide(
    req: GetServerSidePropsContext['req'],
    res: GetServerSidePropsContext['res'],
): Promise<{ toggles: IToggle[] }> {
    const existingHeader = safeCoerceHeader(res.getHeader('set-cookie'))
    const existingUnleashId = req.cookies['unleash-session-id']

    let sessionId
    if (existingUnleashId == null) {
        const newId = `${getRandomValues(new Uint32Array(16)).join('')}}`
        res.setHeader('set-cookie', [...existingHeader, `unleash-session-id=${newId}; path=/;`])
        sessionId = newId
    }

    if (isLocalOrDemo) {
        logger.warn('Running in local or demo mode, falling back to development toggles.')
        return { toggles: localDevelopmentToggles() }
    }

    try {
        const definitions = await getAndValidateDefinitions()
        return evaluateFlags(definitions, { sessionId, environment: getUnleashEnvironment() })
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
        `Fetched ${definitions.features.length} flags from unleash: ${definitions.features
            .map((it) => it.name)
            .join('\n')}\n`,
    )

    return definitions
}

function safeCoerceHeader(header: string | string[] | number | undefined | null): string[] {
    if (header == null) {
        return []
    }
    if (typeof header === 'string') {
        return [header]
    }
    if (typeof header === 'number') {
        return [header.toString()]
    }
    return header
}
