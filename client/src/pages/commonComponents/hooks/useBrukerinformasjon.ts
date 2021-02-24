import { useQuery } from 'react-query';
import Brukerinformasjon from '../../../types/brukerinformasjon';

function useBrukerinformasjon() {
    return useQuery<Brukerinformasjon, Error>('brukerinformasjon', () =>
        fetch(`${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/brukerinformasjon`)
            .then((data) => data.json())
            .then((brukerinformasjon) => new Brukerinformasjon(brukerinformasjon)),
    );
}

export default useBrukerinformasjon;
