import { useMutation, useQueryClient } from 'react-query';
import { FormShape } from '../pages/sykmelding/OK/APEN/Form/Form';
import Fetch from '../utils/Fetch';

function useSend(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        // TODO: endpoint is not implemented at sykmeldinger-backend
        (values: FormShape) =>
            Fetch.authenticatedPost(
                `${window._env_?.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v2/sykmelding/${sykmeldingId}/actions/send`,
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
