import { useQuery } from 'react-query';
import { Sykmelding } from '../../../types/sykmelding';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(['sykmelding', sykmeldingId], () =>
        fetch(`${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/sykmeldinger/${sykmeldingId}`)
            .then((data) => data.json())
            .then((sykmelding) => new Sykmelding(sykmelding)),
    );
}

export default useSykmelding;
