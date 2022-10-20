import { AuthenticationError } from 'apollo-server-micro';
import { createChildLogger } from '@navikt/next-logger';

import { getServerEnv } from '../utils/env';
import { getToken } from '../auth/token/tokenx';

import { ErUtenforVentetid, ErUtenforVentetidSchema } from './api-models/ErUtenforVentetid';
import { RequestContext } from './graphql/resolvers';

const serverEnv = getServerEnv();

export async function getErUtenforVentetid(sykmeldingId: string, context: RequestContext): Promise<ErUtenforVentetid> {
    const childLogger = createChildLogger(context.requestId);

    childLogger.info(
        `Fetching flex er utenfor ventetid for sykmeldingId ${sykmeldingId}, requestId: ${context.requestId}`,
    );

    const tokenX = await getToken(context.accessToken, serverEnv.FLEX_SYKETILFELLE_BACKEND_SCOPE);
    if (!tokenX) {
        throw new Error(`Unable to exchange token for dinesykmeldte-backend token, requestId: ${context.requestId}`);
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
    );

    if (response.ok) {
        const parsed = ErUtenforVentetidSchema.parse(await response.json());

        if (!parsed.erUtenforVentetid && !parsed.oppfolgingsdato) {
            childLogger.warn(
                `Expected oppfolgingsdato to be defined when sykmelding within ventetid, but was ${
                    parsed.oppfolgingsdato == null ? 'null' : typeof parsed.oppfolgingsdato
                }. Sykmeldingid: ${sykmeldingId}, requestId: ${context.requestId}`,
            );
        }

        return parsed;
    }

    if (response.status === 401) {
        throw new AuthenticationError(`User has been logged out, requestId: ${context.requestId}`);
    }

    throw new Error(
        `Failed to fetch brukerinformasjon from backend for sykmelding ${sykmeldingId}, flex responded with status ${response.status} ${response.statusText}, requestId: ${context.requestId}`,
    );
}
