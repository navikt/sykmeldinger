import { useMutation, useQueryClient } from 'react-query';
import Fetch from '../utils/Fetch';

function useBekreft(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        // TODO: type argument to match form output
        (values: any) =>
            Fetch.authenticatedPost(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/v1/sykmelding/${sykmeldingId}/actions/bekreft`,
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

export default useBekreft;
