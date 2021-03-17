import { useQuery } from 'react-query';
import { Sykmelding } from '../../../types/sykmelding';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        fetch(`${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/sykmeldinger`)
            .then((data) => data.json())
            .then((sykmeldinger) => sykmeldinger.map((sm: unknown) => new Sykmelding(sm))),
    );
}

export default useSykmeldinger;
