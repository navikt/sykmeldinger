import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import { assert } from '../utils/Assert';
import Fetch from '../utils/Fetch';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        Fetch.authenticatedGet(
            `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger`,
            async (maybeSykmeldinger) => {
                assert(
                    Array.isArray(maybeSykmeldinger),
                    `Sykmeldinger of type ${typeof maybeSykmeldinger} is not of expected type Array`,
                );
                const sykmeldinger = await Promise.all(
                    maybeSykmeldinger.map(async (sm) => {
                        const sykmelding = new Sykmelding(sm);
                        await validateOrReject(sykmelding, { validationError: { target: false, value: false } });
                        return sykmelding;
                    }),
                );
                return sykmeldinger;
            },
        ),
    );
}

export default useSykmeldinger;
