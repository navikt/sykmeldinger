import { useMutation, useQueryClient } from 'react-query';
import { authenticatedPost } from '../../../utils/fetchUtils';

function useGjenapne(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        () =>
            authenticatedPost(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/sykmelding/${sykmeldingId}/actions/gjenapne`,
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

export default useGjenapne;
