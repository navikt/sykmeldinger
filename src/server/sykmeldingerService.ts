import { z } from 'zod'
import { AuthenticationError } from 'apollo-server-micro'
import { createChildLogger } from '@navikt/next-logger'
import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'

import { getServerEnv } from '../utils/env'

import { Sykmelding, SykmeldingSchema } from './api-models/sykmelding/Sykmelding'
import { Brukerinformasjon, BrukerinformasjonSchema } from './api-models/Brukerinformasjon'
import { SykmeldingChangeStatus } from './graphql/resolver-types.generated'
import { RequestContext } from './graphql/resolvers'

const serverEnv = getServerEnv()

export async function getSykmeldinger(context: RequestContext): Promise<Sykmelding[]> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Fetching sykmeldinger from backend, requestId: ${context.requestId}`)

    return fetchApi({ type: 'GET' }, 'v2/sykmeldinger', (it) => z.array(SykmeldingSchema).parse(it), context)
}

export async function getSykmelding(sykmeldingId: string, context: RequestContext): Promise<Sykmelding> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Fetching sykmelding with ID ${sykmeldingId} from backend, requestId: ${context.requestId}`)

    return fetchApi({ type: 'GET' }, `v2/sykmeldinger/${sykmeldingId}`, (it) => SykmeldingSchema.parse(it), context)
}

export async function getBrukerinformasjon(context: RequestContext): Promise<Brukerinformasjon> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Fetching brukerinformasjon from backend, requestId: ${context.requestId}`)

    return fetchApi({ type: 'GET' }, 'v2/brukerinformasjon', (it) => BrukerinformasjonSchema.parse(it), context)
}

export async function changeSykmeldingStatus(
    sykmeldingId: string,
    status: SykmeldingChangeStatus,
    context: RequestContext,
): Promise<Sykmelding> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Changing sykmelding with ID ${sykmeldingId} to status ${status}, requestId: ${context.requestId}`)
    try {
        await fetchApi(
            { type: 'POST', body: undefined },
            `v2/sykmeldinger/${sykmeldingId}/${statusToEndpoint(status)}`,
            () => null,
            context,
        )
        return getSykmelding(sykmeldingId, context)
    } catch (e) {
        if (e instanceof AuthenticationError) {
            throw e
        }

        childLogger.error(e)
        throw new Error(
            `Failed to change sykmelding for ${sykmeldingId} to ${statusToEndpoint(status)}, requestId: ${
                context.requestId
            }`,
        )
    }
}

export async function submitSykmelding(
    sykmeldingId: string,
    values: unknown,
    context: RequestContext,
): Promise<Sykmelding> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Submitting sykmelding with ID ${sykmeldingId}, requestId: ${context.requestId}`)
    try {
        await fetchApi(
            { type: 'POST', body: JSON.stringify(values) },
            `v3/sykmeldinger/${sykmeldingId}/send`,
            () => null,
            context,
        )
        return getSykmelding(sykmeldingId, context)
    } catch (e) {
        if (e instanceof AuthenticationError) {
            throw e
        }

        childLogger.error(e)
        throw new Error(`Failed to submit sykmelding for ${sykmeldingId}, requestId: ${context.requestId}`)
    }
}

function statusToEndpoint(status: SykmeldingChangeStatus): 'avbryt' | 'bekreftAvvist' | 'gjenapne' {
    switch (status) {
        case SykmeldingChangeStatus.Avbryt:
            return 'avbryt'
        case SykmeldingChangeStatus.BekreftAvvist:
            return 'bekreftAvvist'
        case SykmeldingChangeStatus.Gjenapne:
            return 'gjenapne'
    }
}

async function fetchApi<ResponseObject>(
    method: { type: 'GET' } | { type: 'POST'; body: string | undefined },
    path: string,
    parse: (json?: unknown) => ResponseObject,
    context: RequestContext,
): Promise<ResponseObject> {
    const childLogger = createChildLogger(context.requestId)

    const tokenX = await grantTokenXOboToken(context.accessToken, serverEnv.SYKMELDINGER_BACKEND_SCOPE)
    if (isInvalidTokenSet(tokenX)) {
        throw new Error(
            `Unable to exchange token for dinesykmeldte-backend token, requestId: ${context.requestId}, reason: ${tokenX.message}`,
            {
                cause: tokenX.error,
            },
        )
    }

    const response = await fetch(`${getServerEnv().SYKMELDINGER_BACKEND}/api/${path}`, {
        method: method.type,
        body: method.type === 'POST' ? method.body : undefined,
        headers: {
            Authorization: `Bearer ${tokenX}`,
            'Content-Type': 'application/json',
            'x-request-id': context.requestId,
        },
    })

    if (response.ok) {
        try {
            if (response.headers.get('Content-Type') === 'application/json') {
                return response.json().then(parse)
            }

            return parse()
        } catch (e) {
            childLogger.error(`Failed to parse JSON from ${path}, error: ${e}, requestId: ${context.requestId}`)
            throw e
        }
    }

    if (response.status === 401) {
        throw new AuthenticationError(`User has been logged out, requestId: ${context.requestId}`)
    }

    throw new Error(
        `API (${path}) responded with status ${response.status} ${response.statusText}, requestId: ${context.requestId}`,
    )
}
