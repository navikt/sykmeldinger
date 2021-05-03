import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';
import Brukerinformasjon from '../models/Brukerinformasjon';
import Fetch from '../utils/Fetch';

function useBrukerinformasjon() {
    return useQuery<Brukerinformasjon, Error>(
        'brukerinformasjon',
        () =>
            Fetch.authenticatedGet(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/brukerinformasjon`,
                async (maybeBrukerinformasjon) => {
                    const brukerinformasjon = new Brukerinformasjon(maybeBrukerinformasjon);
                    await validateOrReject(brukerinformasjon, { validationError: { target: false, value: false } });
                    return brukerinformasjon;
                },
            ),
        { retry: false },
    );
}

export default useBrukerinformasjon;
