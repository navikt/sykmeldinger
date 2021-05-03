import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import Fetch from '../utils/Fetch';

function useSykmelding(sykmeldingId: string) {
    return useQuery<Sykmelding, Error>(
        ['sykmelding', sykmeldingId],
        () =>
            Fetch.authenticatedGet(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger/${sykmeldingId}`,
                async (maybeSykmelding) => {
                    const sykmelding = new Sykmelding(maybeSykmelding);
                    await validateOrReject(sykmelding, {
                        validationError: { target: false, value: false },
                    });
                    return sykmelding;
                },
            ),
        { retry: false },
    );
}

export default useSykmelding;
