import { useMutation, useQueryClient } from 'react-query';

function useBekreft(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        (values: any) =>
            fetch(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/${sykmeldingId}`, {
                method: 'POST',
                body: values,
            }).then((data) => data.json()),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('sykmeldinger');
                queryClient.invalidateQueries(['sykmelding', sykmeldingId]);
            },
        },
    );
}

export default useBekreft;
