import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';

import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import { authenticatedGet } from '../utils/Fetch';
import env from '../utils/env';
import { logger } from '../utils/logger';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(['sykmelding', sykmeldingId], () =>
        authenticatedGet(
            `${env.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger/${sykmeldingId}`,
            async (maybeSykmelding) => {
                const sykmelding = new Sykmelding(maybeSykmelding);

                // Temporary log, probably doesn't happen, TODO: remove
                if (sykmelding.id === 'null') {
                    logger.error(
                        `Sykmelding with id "NULL" (not null), fom: ${sykmelding.getSykmeldingStartDate()} tom: ${sykmelding.getSykmeldingEndDate()}`,
                    );
                }

                if (sykmelding.behandlingsutfall.status !== 'INVALID') {
                    await validateOrReject(sykmelding, {
                        validationError: { target: false, value: false },
                    });
                }
                return sykmelding;
            },
        ),
    );
}

export default useSykmelding;
