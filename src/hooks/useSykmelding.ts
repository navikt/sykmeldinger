import { transformAndValidate } from 'class-transformer-validator';
import { useQuery } from 'react-query';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import Fetch from '../utils/Fetch';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(
        ['sykmelding', sykmeldingId],
        () =>
            Fetch.authenticatedGet(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger/${sykmeldingId}`,
                (maybeSykmelding) =>
                    transformAndValidate(Sykmelding, maybeSykmelding as Sykmelding, {
                        validator: {
                            validationError: {
                                target: false,
                                value: false,
                            },
                        },
                    }),
            ),
        { retry: false },
    );
}

export default useSykmelding;
