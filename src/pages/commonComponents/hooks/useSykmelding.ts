import { useQuery } from 'react-query';
import { Sykmelding } from '../../../types/sykmelding';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(['sykmelding', sykmeldingId], () =>
        fetch(`${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/sykmeldinger/${sykmeldingId}`)
            .then((data) => data.json())
            .then((sykmelding) => new Sykmelding(sykmelding)),
    );
}

export default useSykmelding;
