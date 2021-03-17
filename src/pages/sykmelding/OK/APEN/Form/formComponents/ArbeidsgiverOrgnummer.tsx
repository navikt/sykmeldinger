import React, { useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { FormData } from '../Form';
import Brukerinformasjon from '../../../../../../types/brukerinformasjon';
import NyNarmesteLeder from './NyNarmesteLeder';
import QuestionWrapper from '../layout/QuestionWrapper';

interface ArbeidsgiverOrgnummerProps {
    brukerinformasjon: Brukerinformasjon;
}

const ArbeidsgiverOrgnummer: React.FC<ArbeidsgiverOrgnummerProps> = ({ brukerinformasjon }) => {
    const { arbeidsgivere } = brukerinformasjon;
    const { register, unregister, errors, control, watch } = useFormContext<FormData>();
    const fieldName: keyof FormData = 'arbeidsgiverOrgnummer';
    const sporsmaltekst = 'Min arbeidsgiver';
    const watchArbeidsgiverOrgnummer = watch(fieldName);

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify(arbeidsgivere.map((ag) => ({ navn: ag.navn, orgnummer: ag.orgnummer }))),
        });
        return () => {
            unregister(fieldName);
        };
    }, [arbeidsgivere, register, unregister]);

    const valgtArbeidsgiver = useMemo(() => {
        const arbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === watchArbeidsgiverOrgnummer?.svar);
        if (watchArbeidsgiverOrgnummer?.svar && arbeidsgiver === undefined) {
            // Skal ikke kunne skje, men må håndteres hvis bruker skulle klare å manipulere skjemaet på egenhånd.
            throw new Error('The chosen arbeidsgiver does not match with any of arbeidsgivere fetched for the user.');
        }
        return arbeidsgiver;
    }, [arbeidsgivere, watchArbeidsgiverOrgnummer]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{ required: 'arbeidsgiver mangler.' }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={sporsmaltekst}
                        radios={arbeidsgivere.map((arbeidsgiver, index) => ({
                            label: arbeidsgiver.navn,
                            value: arbeidsgiver.orgnummer,
                            id: index === 0 ? fieldName : undefined,
                        }))}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        feil={errors.arbeidsgiverOrgnummer?.svar?.message}
                    />
                )}
            />

            {/* TODO: slik ser sykmeldingen ut for arbeidsgiveren din */}

            {valgtArbeidsgiver?.naermesteLeder && <NyNarmesteLeder naermesteLeder={valgtArbeidsgiver.naermesteLeder} />}
        </QuestionWrapper>
    );
};

export default ArbeidsgiverOrgnummer;
