import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import { FormShape } from '../pages/sykmelding/OK/APEN/Form/Form';
import env from '../utils/env';
import { authenticatedPost } from '../utils/Fetch';

function useSend(sykmeldingId: string) {
    const queryClient = useQueryClient();
    const history = useHistory();
    const { pathname } = useLocation();

    return useMutation<unknown, Error, FormShape>(
        (values: FormShape) =>
            authenticatedPost(
                `${env.SYKMELDINGER_BACKEND_PROXY_ROOT}/api/v2/sykmeldinger/${sykmeldingId}/send`,
                values,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sykmeldinger');
                queryClient.invalidateQueries(['sykmelding', sykmeldingId]);
                history.push(pathname + '/kvittering');
                window.scrollTo(0, 0);
            },
        },
    );
}

export default useSend;
