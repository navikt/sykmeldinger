import { z } from 'zod';
import { AuthenticationError } from 'apollo-server-micro';

import { getServerEnv } from '../utils/env';
import { logger } from '../utils/logger';
import { getToken } from '../auth/token/tokenx';

import { Sykmelding, SykmeldingSchema } from './api-models/sykmelding/Sykmelding';
import { Brukerinformasjon, BrukerinformasjonSchema } from './api-models/Brukerinformasjon';
import { SykmeldingChangeStatus } from './graphql/resolver-types.generated';

const serverEnv = getServerEnv();

export async function getSykmeldinger(accessToken: string): Promise<Sykmelding[]> {
    logger.info('Fetching sykmeldinger from backend');

    return fetchApi({ type: 'GET' }, 'v2/sykmeldinger', (it) => z.array(SykmeldingSchema).parse(it), accessToken);
}

export async function getSykmelding(sykmeldingId: string, accessToken: string): Promise<Sykmelding> {
    logger.info(`Fetching sykmelding with ID ${sykmeldingId} from backend`);

    return fetchApi(
        { type: 'GET' },
        `v2/sykmeldinger/${sykmeldingId}`,
        (it) => SykmeldingSchema.parse(it),
        accessToken,
    );
}

export async function getBrukerinformasjon(accessToken: string): Promise<Brukerinformasjon> {
    logger.info(`Fetching brukerinformasjon from backend`);

    return fetchApi({ type: 'GET' }, 'v2/brukerinformasjon', (it) => BrukerinformasjonSchema.parse(it), accessToken);
}

export async function changeSykmeldingStatus(
    sykmeldingId: string,
    status: SykmeldingChangeStatus,
    selvbetjeningToken: string,
): Promise<Sykmelding> {
    logger.info(`Changing sykmelding with ID ${sykmeldingId} to status ${status}`);
    try {
        await fetchApi(
            { type: 'POST', body: undefined },
            `v2/sykmeldinger/${sykmeldingId}/${statusToEndpoint(status)}`,
            () => null,
            selvbetjeningToken,
        );
        return getSykmelding(sykmeldingId, selvbetjeningToken);
    } catch (e) {
        if (e instanceof AuthenticationError) {
            throw e;
        }

        logger.error(e);
        throw new Error(`Failed to change sykmelding for ${sykmeldingId} to ${statusToEndpoint(status)}`);
    }
}

export async function submitSykmelding(
    sykmeldingId: string,
    values: unknown,
    selvbetjeningToken: string,
): Promise<Sykmelding> {
    logger.info(`Submitting sykmelding with ID ${sykmeldingId}`);
    try {
        await fetchApi(
            { type: 'POST', body: JSON.stringify(values) },
            `v3/sykmeldinger/${sykmeldingId}/send`,
            () => null,
            selvbetjeningToken,
        );
        return getSykmelding(sykmeldingId, selvbetjeningToken);
    } catch (e) {
        if (e instanceof AuthenticationError) {
            throw e;
        }

        logger.error(e);
        throw new Error(`Failed to submit sykmelding for ${sykmeldingId}`);
    }
}

function statusToEndpoint(status: SykmeldingChangeStatus): 'avbryt' | 'bekreftAvvist' | 'gjenapne' {
    switch (status) {
        case SykmeldingChangeStatus.Avbryt:
            return 'avbryt';
        case SykmeldingChangeStatus.BekreftAvvist:
            return 'bekreftAvvist';
        case SykmeldingChangeStatus.Gjenapne:
            return 'gjenapne';
    }
}

async function fetchApi<ResponseObject>(
    method: { type: 'GET' } | { type: 'POST'; body: string | undefined },
    path: string,
    parse: (json?: unknown) => ResponseObject,
    accessToken: string,
): Promise<ResponseObject> {
    const tokenX = await getToken(accessToken, serverEnv.SYKMELDINGER_BACKEND_SCOPE);
    if (!tokenX) {
        throw new Error('Unable to exchange token for dinesykmeldte-backend token');
    }

    const response = await fetch(`${getServerEnv().SYKMELDINGER_BACKEND}/api/${path}`, {
        method: method.type,
        body: method.type === 'POST' ? method.body : undefined,
        headers: {
            Authorization: `Bearer ${tokenX}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        try {
            if (response.headers.get('Content-Type') === 'application/json') {
                return response.json().then(parse);
            }

            return parse();
        } catch (e) {
            logger.error(`Failed to parse JSON from ${path}, error: ${e}`);
            throw e;
        }
    }

    if (response.status === 401) {
        throw new AuthenticationError('User has been logged out');
    }

    throw new Error(`API responded with status ${response.status} ${response.statusText}`);
}
