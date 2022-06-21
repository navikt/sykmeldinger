import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { getPublicEnv } from '../utils/env';
import { authenticatedPost } from '../utils/Fetch';

const publicEnv = getPublicEnv();

function useGjenapne(sykmeldingId: string): UseMutationResult<unknown, Error, void> {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error>(
        () => authenticatedPost(`${publicEnv.SYKMELDINGER_BACKEND}/api/v1/sykmeldinger/${sykmeldingId}/gjenapne`),
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
