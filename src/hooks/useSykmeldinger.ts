import { transformAndValidate } from 'class-transformer-validator';
import { useQuery } from 'react-query';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import Fetch from '../utils/Fetch';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        Fetch.authenticatedGet(
            `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger`,
            (maybeSykmeldinger) =>
                transformAndValidate(Sykmelding, maybeSykmeldinger as Sykmelding[], {
                    validator: {
                        validationError: {
                            target: false,
                            value: false,
                        },
                    },
                }),
        ),
    );
}

export default useSykmeldinger;
