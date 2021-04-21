import { transformAndValidate } from 'class-transformer-validator';
import { useQuery } from 'react-query';
import ErUtenforVentetid from '../models/ErUtenforVentetid';
import Fetch from '../utils/Fetch';

function useSykmeldingUtenforVentetid(sykmeldingId: string) {
    return useQuery<ErUtenforVentetid, Error>(['erUtenforVentetid', sykmeldingId], () =>
        Fetch.authenticatedGet(
            `${window._env_?.FLEX_GATEWAY_ROOT}/syfosoknad/api/sykmeldinger/${sykmeldingId}/actions/v2/erUtenforVentetid`,
            (maybeErUtenforVentetid) =>
                transformAndValidate(ErUtenforVentetid, maybeErUtenforVentetid as ErUtenforVentetid, {
                    validator: { validationError: { target: false, value: false } },
                }),
        ),
    );
}

export default useSykmeldingUtenforVentetid;