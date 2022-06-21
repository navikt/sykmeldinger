import { useQuery, UseQueryResult } from 'react-query';
import { z } from 'zod';

import { Sykmelding, SykmeldingSchema } from '../models/Sykmelding/Sykmelding';
import { getPublicEnv } from '../utils/env';
import { authenticatedGet } from '../utils/Fetch';
import { logger } from '../utils/logger';

const publicEnv = getPublicEnv();

function useSykmeldinger(): UseQueryResult<Sykmelding[], Error> {
    return useQuery(
        'sykmeldinger',
        () =>
            authenticatedGet(`${publicEnv.publicPath}/api/proxy/v1/sykmeldinger`, async (maybeSykmeldinger) => {
                const sykmeldinger = z.array(SykmeldingSchema).safeParse(maybeSykmeldinger);

                if (!sykmeldinger.success) {
                    logger.error(sykmeldinger.error.message);
                    throw new Error('Unable to parse sykmeldinger');
                }

                return sykmeldinger.data;
            }),
        { refetchOnWindowFocus: true },
    );
}

export default useSykmeldinger;
