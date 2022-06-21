import { useMutation, useQueryClient } from 'react-query';
import { UseMutationResult } from 'react-query/types/react/types';

import { getPublicEnv } from '../utils/env';
import { authenticatedPost } from '../utils/Fetch';

const publicEnv = getPublicEnv();

function useAvbryt(sykmeldingId: string): UseMutationResult<unknown, Error, void> {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error>(
        () => authenticatedPost(`${publicEnv.publicPath}/api/proxy/v1/sykmeldinger/${sykmeldingId}/avbryt`),
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
