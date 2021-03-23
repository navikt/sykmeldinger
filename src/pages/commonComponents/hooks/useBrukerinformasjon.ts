import { useQuery } from 'react-query';
import Brukerinformasjon from '../../../types/brukerinformasjon';
import { authenticatedGet } from '../../../utils/fetchUtils';

function useBrukerinformasjon() {
    return useQuery<Brukerinformasjon, Error>('brukerinformasjon', () =>
        // TODO: correct endpoint
        authenticatedGet(
            `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/brukerinformasjon`,
            (brukerinformasjon) => new Brukerinformasjon(brukerinformasjon),
        ),
    );
}

export default useBrukerinformasjon;
