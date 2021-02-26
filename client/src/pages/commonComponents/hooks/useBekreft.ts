import { useMutation, useQueryClient } from 'react-query';

function useBekreft(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        // TODO: type argument to match form output
        (values: any) =>
            fetch(`${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/sykmelding/${sykmeldingId}/actions/bekreft`, {
                method: 'POST',
                body: JSON.stringify(values),
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

export default useBekreft;
