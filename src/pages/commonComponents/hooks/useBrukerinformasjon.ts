import { useQuery } from 'react-query';
import Brukerinformasjon from '../../../types/brukerinformasjon';

function useBrukerinformasjon() {
    return useQuery<Brukerinformasjon, Error>('brukerinformasjon', () =>
        // TODO: correct endpoint
        fetch(`${window._env_.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/brukerinformasjon`)
            .then((data) => data.json())
            .then((brukerinformasjon) => new Brukerinformasjon(brukerinformasjon)),
    );
}

export default useBrukerinformasjon;
