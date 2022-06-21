import { useMutation, useQueryClient } from 'react-query';
import { UseMutationResult } from 'react-query/types/react/types';

import { authenticatedPost } from '../utils/Fetch';
import { getPublicEnv } from '../utils/env';

const publicEnv = getPublicEnv();

function useBekreftAvvist(sykmeldingId: string): UseMutationResult<unknown, Error, void> {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error>(
        () => authenticatedPost(`${publicEnv.publicPath}/api/proxy/v1/sykmeldinger/${sykmeldingId}/bekreftAvvist`),
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
