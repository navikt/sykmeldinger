import { useQuery } from 'react-query';
import { Sykmelding } from '../../../types/sykmelding';
import { authenticatedGet } from '../../../utils/fetchUtils';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(['sykmelding', sykmeldingId], () =>
        authenticatedGet(
            `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/sykmeldinger/${sykmeldingId}`,
            (sykmelding) => new Sykmelding(sykmelding),
        ),
    );
}

export default useSykmelding;
