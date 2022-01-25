import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';

import ErUtenforVentetid from '../models/ErUtenforVentetid';
import env from '../utils/env';
import { authenticatedGet } from '../utils/Fetch';

function useSykmeldingUtenforVentetid(sykmeldingId: string) {
    return useQuery<ErUtenforVentetid, Error>(['erUtenforVentetid', sykmeldingId], () =>
        authenticatedGet(
            `${env.FLEX_GATEWAY_ROOT}/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingId}/erUtenforVentetid`,
            async (maybeErUtenforVentetid) => {
                const erUtenforVentetid = new ErUtenforVentetid(maybeErUtenforVentetid);
                await validateOrReject(erUtenforVentetid, { validationError: { target: false, value: false } });
                return erUtenforVentetid;
            },
        ).then((value) => {
            if (!value.erUtenforVentetid && !value.oppfolgingsdato) {
                console.warn(
                    `Expected oppfolgingsdato to be defined when sykmelding within ventetid, but was ${typeof value.oppfolgingsdato}. Sykmeldingid: ${sykmeldingId}`,
                );
            }
            return value;
        }),
    );
}

export default useSykmeldingUtenforVentetid;
