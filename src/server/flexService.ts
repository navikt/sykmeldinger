import { AuthenticationError } from 'apollo-server-micro';

import { getServerEnv } from '../utils/env';
import { logger } from '../utils/logger';

import { ErUtenforVentetid, ErUtenforVentetidSchema } from './api-models/ErUtenforVentetid';

export async function getErUtenforVentetid(
    sykmeldingId: string,
    selvbetjeningsToken: string,
): Promise<ErUtenforVentetid> {
    logger.info(`Fetching brukerinformasjon from backend`);

    const response = await fetch(
        `${
            getServerEnv().FLEX_GATEWAY_ROOT
        }/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingId}/erUtenforVentetid`,
        {
            headers: {
                Cookie: `selvbetjening-idtoken=${selvbetjeningsToken}`,
                'Content-Type': 'application/json',
            },
        },
    );

    if (response.ok) {
        const parsed = ErUtenforVentetidSchema.parse(await response.json());

        if (!parsed.erUtenforVentetid && !parsed.oppfolgingsdato) {
            logger.warn(
                `Expected oppfolgingsdato to be defined when sykmelding within ventetid, but was ${typeof parsed.oppfolgingsdato}. Sykmeldingid: ${sykmeldingId}`,
            );
        }

        return parsed;
    }

    if (response.status === 401) {
        throw new AuthenticationError('User has been logged out');
    }

    throw new Error(
        `Failed to fetch brukerinformasjon from backend for sykmelding ${sykmeldingId}, flex responded with status ${response.status} ${response.statusText}`,
    );
}
