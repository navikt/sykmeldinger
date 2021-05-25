import { useMutation, useQueryClient } from 'react-query';
import Fetch from '../utils/Fetch';

function useAvbryt(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error>(
        () =>
            Fetch.authenticatedPost(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger/${sykmeldingId}/avbryt`,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sykmeldinger');
                queryClient.invalidateQueries(['sykmelding', sykmeldingId]);
                window.scrollTo(0, 0);
            },
        },
    );
}

export default useAvbryt;
