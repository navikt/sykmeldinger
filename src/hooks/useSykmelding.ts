import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import { authenticatedGet } from '../utils/Fetch';
import env from '../utils/env';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(['sykmelding', sykmeldingId], () =>
        authenticatedGet(
            `${env.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger/${sykmeldingId}`,
            async (maybeSykmelding) => {
                const sykmelding = new Sykmelding(maybeSykmelding);
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
