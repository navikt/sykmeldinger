import { useMutation, useQueryClient } from 'react-query';

function useSend(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        (values: any) =>
            fetch(`${process.env.REACT_APP_SYKMELDINGER_BACKEND_URL}/v1/sykmelding/${sykmeldingId}/actions/send`, {
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

export default useSend;
