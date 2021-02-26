import { useMutation, useQueryClient } from 'react-query';

function useAvbryt(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        () =>
            fetch(`${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/sykmelding/${sykmeldingId}/actions/avbryt`, {
                method: 'POST',
                credentials: 'include',
            }).then((data) => data.text()),
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
