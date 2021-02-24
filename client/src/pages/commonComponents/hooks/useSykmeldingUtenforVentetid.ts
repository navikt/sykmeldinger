import { useQuery } from 'react-query';

function useSykmeldingUtenforVentetid(sykmeldingId: string) {
    return useQuery<boolean, Error>(['erUtenforVentetid', sykmeldingId], () =>
        fetch(
            `${process.env.REACT_APP_SYFOREST_ROOT}/syfosoknad/api/sykmeldinger/${sykmeldingId}/actions/erUtenforVentetid`,
        )
            .then((data) => data.json())
            .then((body) => {
                if (typeof body?.erUtenforVentetid === 'boolean') {
                    return Boolean(body.erUtenforVentetid);
                }
                throw new TypeError('Property "erUtenforVentetid" is not of expected type "boolean"');
            }),
    );
}

export default useSykmeldingUtenforVentetid;
