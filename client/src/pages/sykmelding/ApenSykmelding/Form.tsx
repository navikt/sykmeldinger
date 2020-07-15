import React from 'react';
import useForm, { ValidationFunctions } from '../../commonComponents/hooks/useForm';
import { Feiloppsummering, RadioPanelGruppe } from 'nav-frontend-skjema';

type UriktigeOpplysninger = 'DIAGNOSE' | 'PERIODE' | 'ANNET';

interface Form {
    opplysningeneErRiktige: boolean;
    uriktigeOpplysninger?: UriktigeOpplysninger[];
    sykmeldtFra?: 'FRILANSER' | 'ARBEIDSGIVER' | 'ANNET';
}

const validationFunctions: ValidationFunctions<Form> = {
    opplysningeneErRiktige: (state) => {
        if (!state.opplysningeneErRiktige) {
            return 'Du må svare på om opplysnigene er riktige';
        }
    },
    uriktigeOpplysninger: (state) => {
        if (state.opplysningeneErRiktige === false) {
            if (state.uriktigeOpplysninger?.length === 0) {
                return 'Du må velge minst ett av alternativene';
            }
        }
    },
    sykmeldtFra: (state) => {
        if (!state.sykmeldtFra) {
            return 'Du må svare på hvor du er sykmeldt fra';
        }
    },
};

interface FormProps {}

const Form = ({}: FormProps) => {
    const { formState, errors, setFormState, handleSubmit } = useForm<Form>({ validationFunctions });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit((state) => console.log(state));
            }}
        >
            {!!errors && <Feiloppsummering tittel="feil" feil={errors} />}
        </form>
    );
};

export default Form;
