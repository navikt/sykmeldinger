import { useMutation, useQueryClient } from 'react-query';
import { authenticatedPost } from '../../../utils/fetchUtils';

function useSend(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        // TODO: type argument to match form output
        // TODO: endpoint is not implemented at sykmeldinger-backend
        (values: any) =>
            authenticatedPost(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/sykmelding/${sykmeldingId}/actions/send`,
                values,
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

export default useSend;
