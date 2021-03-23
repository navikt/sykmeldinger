import { useQuery } from 'react-query';
import ObjectBase from '../../../types/objectBase';
import { Sykmelding } from '../../../types/sykmelding';
import { authenticatedGet } from '../../../utils/fetchUtils';

function useSykmeldinger() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        authenticatedGet(`${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/sykmeldinger`, (data) => {
            ObjectBase.assert(Array.isArray(data), '');
            return data.map((sm: unknown) => new Sykmelding(sm));
        }),
    );
}

export default useSykmeldinger;
