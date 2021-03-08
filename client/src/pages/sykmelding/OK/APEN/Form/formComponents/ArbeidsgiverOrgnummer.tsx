import React, { useMemo } from 'react';
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
    const { control, watch } = useFormContext<FormData>();
    const watchArbeidsgiverOrgnummer = watch('arbeidsgiverOrgnummer');

    const valgtArbeidsgiver = useMemo(() => {
        const arbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === watchArbeidsgiverOrgnummer);
        if (watchArbeidsgiverOrgnummer && arbeidsgiver === undefined) {
            // Skal ikke kunne skje, men må håndteres hvis bruker skulle klare å manipulere skjemaet på egenhånd.
            throw new Error('The chosen arbeidsgiver does not match with any of arbeidsgivere fetched for the user.');
        }
        return arbeidsgiver;
    }, [arbeidsgivere, watchArbeidsgiverOrgnummer]);

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name="arbeidsgiverOrgnummer"
                defaultValue={null}
                rules={{ required: true }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend="Min arbeidsgiver"
                        radios={arbeidsgivere.map((arbeidsgiver) => ({
                            label: arbeidsgiver.navn,
                            value: arbeidsgiver.orgnummer,
                            id: `arbeidsgiverOrgnummer-${arbeidsgiver.orgnummer}`,
                        }))}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                    />
                )}
            />

            {/* TODO: slik ser sykmeldingen ut for arbeidsgiveren din */}

            {valgtArbeidsgiver?.naermesteLeder && <NyNarmesteLeder naermesteLeder={valgtArbeidsgiver.naermesteLeder} />}
        </QuestionWrapper>
    );
};

export default ArbeidsgiverOrgnummer;
