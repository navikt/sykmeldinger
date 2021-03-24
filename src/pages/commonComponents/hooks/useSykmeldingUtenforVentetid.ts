import { useQuery } from 'react-query';
import { authenticatedGet } from '../../../utils/fetchUtils';

function useSykmeldingUtenforVentetid(sykmeldingId: string) {
    return useQuery<boolean, Error>(['erUtenforVentetid', sykmeldingId], () =>
        authenticatedGet(
            `${window._env_?.FLEX_GATEWAY_ROOT}/syfosoknad/api/sykmeldinger/${sykmeldingId}/actions/erUtenforVentetid`,
            (data) => {
                const maybeErUtenforVentetid = (data as any).erUtenforVentetid;
                if (typeof maybeErUtenforVentetid === 'boolean') {
                    return Boolean(maybeErUtenforVentetid);
                }
                throw new TypeError(
                    `Property erUtenforVentetid of type ${typeof maybeErUtenforVentetid} is not assignable to type boolean`,
                );
            },
        ),
    );
}

export default useSykmeldingUtenforVentetid;
