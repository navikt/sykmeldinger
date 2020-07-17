import React from 'react';
import useForm from '../../../commonComponents/hooks/useForm';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Sykmelding } from '../../../../types/sykmelding';
import { Arbeidsgiver } from '../../../../types/arbeidsgiver';
import validationFunctions from './formValidation';
import { FormInputs } from '../../../../types/form';
import BekreftOpplysninger from './FormSections/BekreftOpplysninger';
import Arbeidssituasjon from './FormSections/Arbeidssituasjon';

interface FormProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    erUtenforVentetid: boolean;
}

const Form = ({ sykmelding, arbeidsgivere, erUtenforVentetid }: FormProps) => {
    const { formState, errors, setFormState, handleSubmit } = useForm<FormInputs>({ validationFunctions });

    const skalAvbrytes = formState.feilaktigeOpplysninger?.some(
        (opplysning) => opplysning === 'PERIODE' || opplysning === 'SYKMELDINGSGRAD_LAV',
    );
    const skalSendes = !!formState.valgtArbeidsgiver;

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit((state) => console.log(state));
            }}
        >
            <BekreftOpplysninger formState={formState} setFormState={setFormState} errors={errors} />
            <Arbeidssituasjon
                sykmelding={sykmelding}
                arbeidsgivere={arbeidsgivere}
                erUtenforVentetid={erUtenforVentetid}
                formState={formState}
                setFormState={setFormState}
                errors={errors}
                skalAvbrytes={skalAvbrytes}
            />

            {!!errors.size && (
                <Feiloppsummering
                    className="margin-bottom--2"
                    tittel="Det finnes feil som må rettes opp"
                    feil={Array.from(errors.values())}
                />
            )}

            {!skalAvbrytes && (
                <Knapp type="hoved" className="margin-bottom--2">
                    {skalSendes ? 'Send' : 'Bekreft'} sykmelding
                </Knapp>
            )}
        </form>
    );
};

export default Form;
