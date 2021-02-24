import { useMutation, useQueryClient } from 'react-query';

function useGjenapne(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        () =>
            fetch(`${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/sykmelding/${sykmeldingId}/actions/gjenapne`, {
                method: 'POST',
                credentials: 'include',
            }).then((data) => data.text()),
        {
            onSuccess: () => {
                console.info('successfully reopened sykmelding');
                queryClient.invalidateQueries('sykmeldinger');
                queryClient.invalidateQueries(['sykmelding', sykmeldingId]);
            },
        },
    );
}

export default useGjenapne;
