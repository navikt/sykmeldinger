import { useQuery } from 'react-query';
import { authenticatedGet } from '../../../utils/fetchUtils';

function useSykmeldingUtenforVentetid(sykmeldingId: string) {
    return useQuery<boolean, Error>(['erUtenforVentetid', sykmeldingId], () =>
        // TODO: correct endpoint
        // TODO: make Class for respons
        authenticatedGet(
            `${window._env_?.SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/${sykmeldingId}/actions/erUtenforVentetid`,
            (data) => {
                if (typeof (data as any).erUtenforVentetid === 'boolean') {
                    return Boolean((data as any).erUtenforVentetid);
                }
                throw new Error();
            },
        ),
    );
}

export default useSykmeldingUtenforVentetid;
