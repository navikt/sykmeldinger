import { useQuery } from 'react-query';
import { Sykmelding } from '../../../types/sykmelding';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        fetch(`${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/sykmeldinger`)
            .then((data) => data.json())
            .then((sykmeldinger) => sykmeldinger.map((sm: unknown) => new Sykmelding(sm))),
    );
}

export default useSykmeldinger;
