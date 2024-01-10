import { z } from 'zod'
import { createChildLogger } from '@navikt/next-logger'
import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'
import { GraphQLError } from 'graphql'

import { getServerEnv } from '../utils/env'
import { sporsmal } from '../utils/sporsmal'

import { Sykmelding, SykmeldingSchema } from './api-models/sykmelding/Sykmelding'
import { Brukerinformasjon, BrukerinformasjonSchema } from './api-models/Brukerinformasjon'
import { SendSykmeldingValues, SykmeldingCategory, SykmeldingChangeStatus } from './graphql/resolver-types.generated'
import { RequestContext } from './graphql/resolvers'
import { mapSendSykmeldingValuesToV3Api } from './sendSykmeldingMapping'
import { getErUtenforVentetid } from './flexService'
import metrics from './metrics'
import { MinimalSykmelding, MinimalSykmeldingSchema } from './api-models/sykmelding/MinimalSykmelding'

export function getMinimalSykmeldinger(
    category: SykmeldingCategory,
    context: RequestContext,
): Promise<MinimalSykmelding[]> {
    return fetchApi(
        { type: 'GET' },
        `v2/sykmeldinger/minimal/${category}`,
        (it) => z.array(MinimalSykmeldingSchema).parse(it),
        context,
        `GET: sykmeldinger (${category})`,
    )
}

const serverEnv = getServerEnv()

export async function getSykmeldinger(context: RequestContext): Promise<Sykmelding[]> {
    return fetchApi(
        { type: 'GET' },
        'v2/sykmeldinger',
        (it) => z.array(SykmeldingSchema).parse(it),
        context,
        'GET: sykmeldinger',
    )
}

export async function getSykmelding(sykmeldingId: string, context: RequestContext): Promise<Sykmelding> {
    return fetchApi(
        { type: 'GET' },
        `v2/sykmeldinger/${sykmeldingId}`,
        (it) => SykmeldingSchema.parse(it),
        context,
        'GET: sykmelding',
    )
}

export async function getBrukerinformasjon(context: RequestContext): Promise<Brukerinformasjon> {
    return fetchApi(
        { type: 'GET' },
        'v2/brukerinformasjon',
        (it) => BrukerinformasjonSchema.parse(it),
        context,
        'GET: brukerinformasjon',
    )
}

export async function changeSykmeldingStatus(
    sykmeldingId: string,
    status: SykmeldingChangeStatus,
    context: RequestContext,
): Promise<Sykmelding> {
    const childLogger = createChildLogger(context.requestId)

    try {
        await fetchApi(
            { type: 'POST', body: undefined },
            `v2/sykmeldinger/${sykmeldingId}/${statusToEndpoint(status)}`,
            () => null,
            context,
            `POST: changeSykmeldingStatus ${status}`,
        )
        return getSykmelding(sykmeldingId, context)
    } catch (e) {
        if (e instanceof GraphQLError && e.extensions.code === 'UNAUTHENTICATED') {
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

export async function sendSykmelding(
    sykmeldingId: string,
    values: SendSykmeldingValues,
    context: RequestContext,
): Promise<Sykmelding> {
    const childLogger = createChildLogger(context.requestId)

    const [sykmelding, brukerinformasjon, erUtenforVentetid] = await Promise.all([
        getSykmelding(sykmeldingId, context),
        getBrukerinformasjon(context),
        getErUtenforVentetid(sykmeldingId, context),
    ])

    const mappedValues = mapSendSykmeldingValuesToV3Api(values, sykmelding, brukerinformasjon, erUtenforVentetid)

    try {
        await fetchApi(
            { type: 'POST', body: JSON.stringify(mappedValues) },
            `v3/sykmeldinger/${sykmeldingId}/send`,
            () => null,
            context,
            'POST: sendSykmelding',
        )

        return getSykmelding(sykmeldingId, context)
    } catch (e) {
        if (e instanceof GraphQLError && e.extensions.code === 'UNAUTHENTICATED') {
            throw e
        }

        childLogger.error(e)
        throw new Error(`Failed to submit sykmelding for ${sykmeldingId}, requestId: ${context.requestId}`)
    }
}

export async function updateEgenmeldingsdager(
    sykmeldingId: string,
    egenmeldingsdager: string[],
    context: RequestContext,
): Promise<Sykmelding> {
    const childLogger = createChildLogger(context.requestId)

    childLogger.info(`Updating egenmeldingsdager for sykmelding with ID ${sykmeldingId}`)

    try {
        await fetchApi(
            { type: 'POST', body: JSON.stringify({ dager: egenmeldingsdager, tekst: sporsmal.egenmeldingsdager }) },
            `v3/sykmeldinger/${sykmeldingId}/endre-egenmeldingsdager`,
            () => null,
            context,
            'POST: endre-egenmeldingsdager',
        )
        return getSykmelding(sykmeldingId, context)
    } catch (e) {
        if (e instanceof GraphQLError && e.extensions.code === 'UNAUTHENTICATED') {
            throw e
        }

        childLogger.error(e)
        throw new Error(`Failed to update egenmeldingsdager for ${sykmeldingId}`)
    }
}

function statusToEndpoint(status: SykmeldingChangeStatus): 'avbryt' | 'bekreftAvvist' {
    switch (status) {
        case SykmeldingChangeStatus.AVBRYT:
            return 'avbryt'
        case SykmeldingChangeStatus.BEKREFT_AVVIST:
            return 'bekreftAvvist'
    }
}

async function fetchApi<ResponseObject>(
    method: { type: 'GET' } | { type: 'POST'; body: string | undefined },
    path: string,
    parse: (json?: unknown) => ResponseObject,
    context: RequestContext,
    what: string,
): Promise<ResponseObject> {
    const childLogger = createChildLogger(context.requestId)

    const tokenX = await grantTokenXOboToken(context.accessToken, serverEnv.SYKMELDINGER_BACKEND_SCOPE)
    if (isInvalidTokenSet(tokenX)) {
        throw new Error(
            `Unable to exchange token for sykmeldinger-backend token, requestId: ${context.requestId}, reason: ${tokenX.message}`,
            {
                cause: tokenX.error,
            },
        )
    }

    const stopApiResponsetimer = metrics.backendApiDurationHistogram.startTimer({ path: what })
    const response = await fetch(`${getServerEnv().SYKMELDINGER_BACKEND}/api/${path}`, {
        method: method.type,
        body: method.type === 'POST' ? method.body : undefined,
        headers: {
            Authorization: `Bearer ${tokenX}`,
            'Content-Type': 'application/json',
            'x-request-id': context.requestId,
        },
    })
    const timerSeconds = stopApiResponsetimer()
    const ms = +(timerSeconds * 1000).toFixed(0)
    const bucket = +(Math.ceil(ms / 25) * 25).toFixed(0)

    if (response.ok) {
        try {
            if (response.headers.get('Content-Type') === 'application/json') {
                const json = await response.json()

                childLogger
                    .child({
                        x_what: what,
                        x_timingBucket: bucket,
                        x_items: Array.isArray(json) ? json.length : 1,
                    })
                    .info(`Fetching ${what} from backend took ${(timerSeconds * 1000).toFixed(0)} ms`)

                return parse(json)
            }

            childLogger
                .child({
                    x_what: what,
                    x_timingBucket: bucket,
                })
                .info(`Fetching ${what} from backend took ${(timerSeconds * 1000).toFixed(0)} ms`)

            return parse()
        } catch (e) {
            childLogger.error(`Failed to parse JSON from ${path}, error: ${e}, requestId: ${context.requestId}`)
            throw e
        }
    }

    if (response.status === 401) {
        throw new GraphQLError(`User has been logged out, requestId: ${context.requestId}`, {
            extensions: { code: 'UNAUTHENTICATED' },
        })
    }

    throw new Error(
        `API (${path}) responded with status ${response.status} ${response.statusText}, requestId: ${context.requestId}`,
    )
}
