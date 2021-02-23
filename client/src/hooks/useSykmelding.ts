import { useQuery } from 'react-query';
import { Sykmelding } from '../types/sykmelding';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(['sykmelding', sykmeldingId], () =>
        fetch(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/${sykmeldingId}`)
            .then((data) => data.json())
            .then((sykmelding) => new Sykmelding(sykmelding.body)),
    );
}

export default useSykmelding;
