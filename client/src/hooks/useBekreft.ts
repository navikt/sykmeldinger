import { useMutation, useQueryClient } from 'react-query';
import { FormInputs } from '../types/form';

function useBekreft(sykmeldingId: string) {
    const queryClient = useQueryClient();

    return useMutation(
        (values: FormInputs) =>
            fetch(`${process.env.REACT_APP_SM_REGISTER_URL}/v1/sykmelding/${sykmeldingId}`, {
                method: 'POST',
                body: JSON.stringify(values),
                credentials: 'include',
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
