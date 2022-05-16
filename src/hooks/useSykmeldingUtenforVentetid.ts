import { useQuery, UseQueryResult } from 'react-query';

import { ErUtenforVentetid, ErUtenforVentetidSchema } from '../models/ErUtenforVentetid';
import { getPublicEnv } from '../utils/env';
import { authenticatedGet } from '../utils/Fetch';

const publicEnv = getPublicEnv();

function useSykmeldingUtenforVentetid(sykmeldingId: string): UseQueryResult<ErUtenforVentetid, Error> {
    return useQuery(['erUtenforVentetid', sykmeldingId], () => {
        return authenticatedGet(
            `${publicEnv.publicPath}/api/flex-proxy/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingId}/erUtenforVentetid`,
            async (maybeErUtenforVentetid) => ErUtenforVentetidSchema.parse(maybeErUtenforVentetid),
        ).then((value) => {
            if (!value.erUtenforVentetid && !value.oppfolgingsdato) {
                console.warn(
                    `Expected oppfolgingsdato to be defined when sykmelding within ventetid, but was ${typeof value.oppfolgingsdato}. Sykmeldingid: ${sykmeldingId}`,
                );
            }
            return value;
        });
    });
}

export default useSykmeldingUtenforVentetid;
