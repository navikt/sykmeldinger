import { useQuery, UseQueryResult } from 'react-query';

import {
    getSykmeldingEndDate,
    getSykmeldingStartDate,
    Sykmelding,
    SykmeldingSchema,
} from '../models/Sykmelding/Sykmelding';
import { authenticatedGet } from '../utils/Fetch';
import { getPublicEnv } from '../utils/env';
import { logger } from '../utils/logger';

const publicEnv = getPublicEnv();

function useSykmelding(sykmeldingId: string): UseQueryResult<Sykmelding, Error> {
    return useQuery(['sykmelding', sykmeldingId], () =>
        authenticatedGet(
            `${publicEnv.publicPath}/api/proxy/v1/sykmeldinger/${sykmeldingId}`,
            async (maybeSykmelding) => {
                const sykmelding = SykmeldingSchema.parse(maybeSykmelding);

                // Temporary log, probably doesn't happen, TODO: remove
                if (sykmelding.id === 'null') {
                    logger.error(
                        `Sykmelding with id "NULL" (not null), fom: ${getSykmeldingStartDate(
                            sykmelding,
                        )} tom: ${getSykmeldingEndDate(sykmelding)}`,
                    );
                }

                return sykmelding;
            },
        ),
    );
}

export default useSykmelding;
