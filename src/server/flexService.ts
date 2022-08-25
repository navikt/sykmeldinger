import { AuthenticationError } from 'apollo-server-micro';

import { getServerEnv } from '../utils/env';
import { logger } from '../utils/logger';
import { getToken } from '../auth/token/tokenx';

import { ErUtenforVentetid, ErUtenforVentetidSchema } from './api-models/ErUtenforVentetid';
import { RequestContext } from './graphql/resolvers';

const serverEnv = getServerEnv();

export async function getErUtenforVentetid(sykmeldingId: string, context: RequestContext): Promise<ErUtenforVentetid> {
    logger.info(`Fetching flex er utenfor ventetid for sykmeldingId ${sykmeldingId}, traceId: ${context.userTraceId}`);

    const tokenX = await getToken(context.accessToken, serverEnv.FLEX_SYKETILFELLE_BACKEND_SCOPE);
    if (!tokenX) {
        throw new Error(`Unable to exchange token for dinesykmeldte-backend token, traceId: ${context.userTraceId}`);
    }

    const response = await fetch(
        `${getServerEnv().FLEX_SYKETILFELLE}/api/bruker/v2/ventetid/${sykmeldingId}/erUtenforVentetid`,
        {
            headers: {
                Authorization: `Bearer ${tokenX}`,
                'Content-Type': 'application/json',
            },
        },
    );

    if (response.ok) {
        const parsed = ErUtenforVentetidSchema.parse(await response.json());

        if (!parsed.erUtenforVentetid && !parsed.oppfolgingsdato) {
            logger.warn(
                `Expected oppfolgingsdato to be defined when sykmelding within ventetid, but was ${
                    parsed.oppfolgingsdato == null ? 'null' : typeof parsed.oppfolgingsdato
                }. Sykmeldingid: ${sykmeldingId}, traceId: ${context.userTraceId}`,
            );
        }

        return parsed;
    }

    if (response.status === 401) {
        throw new AuthenticationError(`User has been logged out, traceId: ${context.userTraceId}`);
    }

    throw new Error(
        `Failed to fetch brukerinformasjon from backend for sykmelding ${sykmeldingId}, flex responded with status ${response.status} ${response.statusText}, traceId: ${context.userTraceId}`,
    );
}
