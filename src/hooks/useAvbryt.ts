import { useMutation, useQueryClient } from 'react-query';
import env from '../utils/env';
import { authenticatedPost } from '../utils/Fetch';

function useAvbryt(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error>(
        () => authenticatedPost(`${env.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger/${sykmeldingId}/avbryt`),
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
