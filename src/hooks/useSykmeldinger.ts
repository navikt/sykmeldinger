import { validateOrReject } from 'class-validator';
import { useQuery } from 'react-query';
import { Sykmelding } from '../models/Sykmelding/Sykmelding';
import { assert } from '../utils/Assert';
import { authenticatedGet } from '../utils/Fetch';
import { logger } from '../utils/logger';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        authenticatedGet(
            `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger`,
            async (maybeSykmeldinger, response) => {
                assert(
                    Array.isArray(maybeSykmeldinger),
                    `Sykmeldinger of type ${typeof maybeSykmeldinger} is not of expected type Array`,
                );
                const sykmeldinger = await Promise.all(
                    maybeSykmeldinger.map(async (sm) => {
                        const sykmelding = new Sykmelding(sm);

                        if (!sykmelding.pasient) {
                            const metadata = {
                                correlationId: response.headers.get('x-correlation-id') ?? 'No correlation id',
                                transationId: response.headers.get('x-global-transaction-id') ?? 'No transaction id',
                            };

                            logger.error({
                                message: 'Mysterious incomplete Sykemelding-objekt, missing pasient',
                                metadata,
                            });
                        }

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
