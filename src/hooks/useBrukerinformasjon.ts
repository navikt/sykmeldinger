import { transformAndValidate } from 'class-transformer-validator';
import { useQuery } from 'react-query';
import Brukerinformasjon from '../models/Brukerinformasjon';
import Fetch from '../utils/Fetch';

function useBrukerinformasjon() {
    return useQuery<Brukerinformasjon, Error>('brukerinformasjon', () =>
        Fetch.authenticatedGet(
            `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/brukerinformasjon`,
            (maybeBrukerinformasjon) =>
                transformAndValidate(Brukerinformasjon, maybeBrukerinformasjon as Brukerinformasjon, {
                    validator: { validationError: { target: false, value: false } },
                }),
        ),
    );
}

export default useBrukerinformasjon;
