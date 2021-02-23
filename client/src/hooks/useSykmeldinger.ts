import { useQuery } from 'react-query';
import { Sykmelding } from '../types/sykmelding';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        fetch(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmeldinger`)
            .then((data) => data.json())
            .then((sykmeldinger) => sykmeldinger.body.map((sm: unknown) => new Sykmelding(sm))),
    );
}

export default useSykmeldinger;
