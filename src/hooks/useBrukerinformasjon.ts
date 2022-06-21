import { useQuery, UseQueryResult } from 'react-query';

import { Brukerinformasjon, BrukerinformasjonSchema } from '../models/Brukerinformasjon';
import { getPublicEnv } from '../utils/env';
import { authenticatedGet } from '../utils/Fetch';

const publicEnv = getPublicEnv();

function useBrukerinformasjon(): UseQueryResult<Brukerinformasjon, Error> {
    return useQuery('brukerinformasjon', () =>
        authenticatedGet(`${publicEnv.publicPath}/api/proxy/v1/brukerinformasjon`, async (maybeBrukerinformasjon) =>
            BrukerinformasjonSchema.parse(maybeBrukerinformasjon),
        ),
    );
}

export default useBrukerinformasjon;
