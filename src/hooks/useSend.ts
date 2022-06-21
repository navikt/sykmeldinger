import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { UseMutationResult } from 'react-query/types/react/types';

import { FormShape } from '../components/SykmeldingViews/OK/APEN/Form/Form';
import { getPublicEnv } from '../utils/env';
import { authenticatedPost } from '../utils/Fetch';

const publicEnv = getPublicEnv();

function useSend(sykmeldingId: string): UseMutationResult<unknown, Error, FormShape> {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<unknown, Error, FormShape>(
        (values: FormShape) =>
            authenticatedPost(`${publicEnv.publicPath}/api/proxy/v2/sykmeldinger/${sykmeldingId}/send`, values),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sykmeldinger');
                queryClient.invalidateQueries(['sykmelding', sykmeldingId]);
                router.push(`/${sykmeldingId}/kvittering`);
                window.scrollTo(0, 0);
            },
            onError: (err) => {
                console.log('ERROR!!!');
                console.log(err);
            },
        },
    );
}

export default useSend;
