import { getRandomValues } from 'crypto'

import { IToggle, getDefinitions, evaluateFlags } from '@unleash/nextjs'
import { logger } from '@navikt/next-logger'
import { GetServerSidePropsContext } from 'next/types'
import * as R from 'remeda'

import { isLocalOrDemo } from '../utils/env'
import { parseAuthHeader } from '../auth/withAuthentication'

import { getUnleashEnvironment, localDevelopmentToggles } from './utils'
import { EXPECTED_TOGGLES } from './toggles'

export async function getFlagsServerSide(
    req: GetServerSidePropsContext['req'],
    res: GetServerSidePropsContext['res'],
): Promise<{ toggles: IToggle[] }> {
    if (isLocalOrDemo) {
        logger.warn('Running in local or demo mode, falling back to development toggles.')
        return { toggles: localDevelopmentToggles() }
    }

    try {
        const { sessionId, userId } = handleUnleashIds(req, res)
        const definitions = await getAndValidateDefinitions()
        return evaluateFlags(definitions, {
            sessionId,
            userId,
            environment: getUnleashEnvironment(),
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
        `Fetched ${definitions.features.length} flags from unleash: ${definitions.features
            .map((it) => it.name)
            .join('\n')}\n`,
    )

    return definitions
}

const unleashCookieName = 'sykmeldinger-unleash-session-id'

export function handleUnleashIds(
    req: GetServerSidePropsContext['req'],
    res: GetServerSidePropsContext['res'],
): {
    userId: string | undefined
    sessionId: string
} {
    const pid = parseAuthHeader(req.headers)?.pid ?? undefined

    const existingUnleashId = req.cookies[unleashCookieName]
    if (existingUnleashId != null) {
        // Not logged in user, but user has already the unleash cookie
        return {
            userId: pid,
            sessionId: existingUnleashId,
        }
    } else {
        // Not logged in user, and no unleash cookie, generate new and set header, but don't overwrite existing set-cookies
        const existingHeader = safeCoerceHeader(res.getHeader('set-cookie'))
        const newId = `${getRandomValues(new Uint32Array(2)).join('')}`
        res.setHeader('set-cookie', [...existingHeader, `${unleashCookieName}=${newId}; path=/;`])
        return {
            userId: pid,
            sessionId: newId,
        }
    }
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
