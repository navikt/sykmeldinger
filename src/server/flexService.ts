import { GraphQLError } from 'graphql'
import { createChildLogger } from '@navikt/next-logger'
import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'

import { getServerEnv } from '../utils/env'

import { ErUtenforVentetid, ErUtenforVentetidSchema } from './api-models/ErUtenforVentetid'
import { RequestContext } from './graphql/resolvers'

const serverEnv = getServerEnv()

export async function getErUtenforVentetid(sykmeldingId: string, context: RequestContext): Promise<ErUtenforVentetid> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Fetching flex er utenfor ventetid for sykmeldingId ${sykmeldingId}`)

    const tokenX = await grantTokenXOboToken(context.accessToken, serverEnv.FLEX_SYKETILFELLE_BACKEND_SCOPE)
    if (isInvalidTokenSet(tokenX)) {
        throw new Error(
            `Unable to exchange token for flex-syketilfelle token, requestId: ${context.requestId},reason: ${tokenX.message}`,
            {
                cause: tokenX.error,
            },
        )
    }

    const response = await fetch(
        `${getServerEnv().FLEX_SYKETILFELLE}/api/bruker/v2/ventetid/${sykmeldingId}/erUtenforVentetid`,
        {
            headers: {
                Authorization: `Bearer ${tokenX}`,
                'Content-Type': 'application/json',
                'x-request-id': context.requestId,
            },
        },
    )

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

export async function feedback(feedback: unknown, context: RequestContext): Promise<boolean> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Submitting feedback to flexjar-backend`)

    const tokenX = await grantTokenXOboToken(context.accessToken, serverEnv.FLEXJAR_BACKEND_SCOPE)
    if (isInvalidTokenSet(tokenX)) {
        throw new Error(
            `Unable to exchange token for flex-syketilfelle token, requestId: ${context.requestId},reason: ${tokenX.message}`,
            {
                cause: tokenX.error,
            },
        )
    }

    const response = await fetch(`${serverEnv.FLEXJAR}/api/v1/feedback`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${tokenX}`,
            'Content-Type': 'application/json',
            'x-request-id': context.requestId,
        },
        body: JSON.stringify(feedback),
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
