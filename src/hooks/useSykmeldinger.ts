import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import Fetch from '../utils/Fetch';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>(
        'sykmeldinger',
        () =>
            Fetch.authenticatedGet(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger`,
                async (maybeSykmeldinger) => {
                    const sykmeldinger = (maybeSykmeldinger as Sykmelding[]).map((sm) => new Sykmelding(sm));
                    await validateOrReject(sykmeldinger, { validationError: { target: false, value: false } });
                    return sykmeldinger;
                },
            ),
        { retry: false },
    );
}

export default useSykmeldinger;
