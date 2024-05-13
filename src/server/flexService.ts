import { GraphQLError } from 'graphql'
import { createChildLogger } from '@navikt/next-logger'
import { requestOboToken } from '@navikt/oasis'

import { getServerEnv } from '../utils/env'

import { ErUtenforVentetid, ErUtenforVentetidSchema } from './api-models/ErUtenforVentetid'
import { RequestContext } from './graphql/resolvers'
import metrics from './metrics'

export async function getErUtenforVentetid(sykmeldingId: string, context: RequestContext): Promise<ErUtenforVentetid> {
    const serverEnv = getServerEnv()

    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Fetching flex er utenfor ventetid for sykmeldingId ${sykmeldingId}`)

    const tokenX = await requestOboToken(context.accessToken, serverEnv.FLEX_SYKETILFELLE_BACKEND_SCOPE)
    if (!tokenX.ok) {
        throw new Error(
            `Unable to exchange token for flex-syketilfelle token, requestId: ${context.requestId},reason: ${tokenX.error.message}`,
            {
                cause: tokenX.error,
            },
        )
    }

    const stopApiResponsetimer = metrics.flexApiDurationHistogram.startTimer({
        path: 'api/bruker/v2/ventetid/<sykmeldingId>/erUtenforVentetid',
    })
    const response = await fetch(
        `${getServerEnv().FLEX_SYKETILFELLE}/api/bruker/v2/ventetid/${sykmeldingId}/erUtenforVentetid`,
        {
            headers: {
                Authorization: `Bearer ${tokenX.token}`,
                'Content-Type': 'application/json',
                'x-request-id': context.requestId,
            },
        },
    )
    stopApiResponsetimer()

    if (response.ok) {
        const parsed = ErUtenforVentetidSchema.parse(await response.json())

        if (!parsed.erUtenforVentetid && !parsed.oppfolgingsdato) {
            childLogger.warn(
                `Expected oppfolgingsdato to be defined when sykmelding within ventetid, but was ${
                    parsed.oppfolgingsdato == null ? 'null' : typeof parsed.oppfolgingsdato
                }. Sykmeldingid: ${sykmeldingId}, requestId: ${context.requestId}`,
            )
        }

        return parsed
    }

    if (response.status === 401) {
        throw new GraphQLError(`User has been logged out, requestId: ${context.requestId}`, {
            extensions: { code: 'UNAUTHENTICATED' },
        })
    }

    throw new Error(
        `Failed to fetch brukerinformasjon from backend for sykmelding ${sykmeldingId}, flex responded with status ${response.status} ${response.statusText}, requestId: ${context.requestId}`,
    )
}

export async function feedback(feedback: object, context: RequestContext): Promise<boolean> {
    const serverEnv = getServerEnv()

    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Submitting feedback to flexjar-backend`)

    const tokenX = await requestOboToken(context.accessToken, serverEnv.FLEXJAR_BACKEND_SCOPE)
    if (!tokenX.ok) {
        throw new Error(
            `Unable to exchange token for flex-syketilfelle token, requestId: ${context.requestId},reason: ${tokenX.error.message}`,
            {
                cause: tokenX.error,
            },
        )
    }

    const response = await fetch(`${serverEnv.FLEXJAR}/api/v1/feedback`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${tokenX.token}`,
            'Content-Type': 'application/json',
            'x-request-id': context.requestId,
        },
        body: JSON.stringify({ ...feedback, segment: inferSegment(context.pid) }),
    })

    if (response.status === 401) {
        throw new GraphQLError(`User has been logged out, requestId: ${context.requestId}`, {
            extensions: { code: 'UNAUTHENTICATED' },
        })
    }

    if (response.ok) {
        childLogger.info('Submitted feedback OK')
        return true
    }

    throw new Error(
        `Unable to submit feedback to flexjar-backend, requestId: ${context.requestId}, status: ${response.status} ${response.statusText}`,
    )
}

export function inferSegment(pid: string): string {
    const year = +pid.slice(4, 6)
    const century = year > 20 ? 1900 : 2000
    const fullYear = century + +year
    const currentYear = new Date().getFullYear()
    const age = currentYear - fullYear

    if (age > 69) return '69-∞'
    else if (age > 59) return '60-69'
    else if (age > 49) return '50-59'
    else if (age > 39) return '40-49'
    else if (age > 29) return '30-39'
    else if (age > 19) return '20-29'
    else if (age > 9) return '10-19'
    else return '0-9'
}
