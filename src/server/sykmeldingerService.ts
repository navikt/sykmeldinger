import * as z from 'zod'
import { createChildLogger } from '@navikt/next-logger'
import { requestOboToken } from '@navikt/oasis'
import { GraphQLError } from 'graphql'

import { getServerEnv } from '../utils/env'

import { Sykmelding, SykmeldingSchema } from './api-models/sykmelding/Sykmelding'
import { Brukerinformasjon, BrukerinformasjonSchema } from './api-models/Brukerinformasjon'
import { SendSykmeldingValues, SykmeldingChangeStatus } from './graphql/resolver-types.generated'
import { RequestContext } from './graphql/resolvers'
import { mapSendSykmeldingValuesToV3Api } from './sendSykmeldingMapping'
import { getErUtenforVentetid } from './flexService'
import metrics from './metrics'
import { TidligereArbeidsgivere, TidligereArbeidsgivereSchema } from './api-models/TidligereArbeidsgiver'

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

export async function getBrukerinformasjonById(
    sykmeldingId: string,
    context: RequestContext,
): Promise<Brukerinformasjon> {
    return fetchApi(
        { type: 'GET' },
        `v2/brukerinformasjon/${sykmeldingId}`,
        (it) => BrukerinformasjonSchema.parse(it),
        context,
        'GET: arbeidsgivere',
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

export async function getTidligereArbeidsgivere(
    sykmeldingId: string,
    context: RequestContext,
): Promise<TidligereArbeidsgivere[] | null> {
    return fetchApi(
        { type: 'GET' },
        `v2/sykmeldinger/${sykmeldingId}/tidligere-arbeidsgivere`,
        (it) => z.array(TidligereArbeidsgivereSchema).parse(it),
        context,
        'GET: tidligere-arbeidsgivere',
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
        getBrukerinformasjonById(sykmeldingId, context),
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
    const tokenX = await requestOboToken(context.accessToken, serverEnv.SYKMELDINGER_BACKEND_SCOPE)
    if (!tokenX.ok) {
        throw new Error(
            `Unable to exchange token for sykmeldinger-backend token, requestId: ${context.requestId}, reason: ${tokenX.error.message}`,
            { cause: tokenX.error },
        )
    }

    const stopApiResponsetimer = metrics.backendApiDurationHistogram.startTimer({ path: what })
    const response = await fetch(`${getServerEnv().SYKMELDINGER_BACKEND}/api/${path}`, {
        method: method.type,
        body: method.type === 'POST' ? method.body : undefined,
        headers: {
            Authorization: `Bearer ${tokenX.token}`,
            'Content-Type': 'application/json',
            'x-request-id': context.requestId,
        },
    })
    stopApiResponsetimer()

    if (response.ok) {
        if (response.headers.get('Content-Type') === 'application/json') {
            const json: unknown = await response.json()
            return parse(json)
        }

        return parse()
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
