import { useMutation, useQueryClient } from 'react-query';

import { authenticatedPost } from '../utils/Fetch';
import env from '../utils/env';

function useBekreftAvvist(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error>(
        () =>
            authenticatedPost(
                `${env.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v1/sykmeldinger/${sykmeldingId}/bekreftAvvist`,
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

export default useBekreftAvvist;
