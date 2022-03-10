import React, { useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import { FormShape } from '../Form';
import Brukerinformasjon from '../../../../../../models/Brukerinformasjon';
import QuestionWrapper from '../layout/QuestionWrapper';
import Ekspanderbar from '../../../../../../components/Ekspanderbar/Ekspanderbar';

import RiktigNarmesteLeder from './RiktigNarmesteLeder';

interface ArbeidsgiverOrgnummerProps {
    brukerinformasjon: Brukerinformasjon;
}

const ArbeidsgiverOrgnummer: React.FC<ArbeidsgiverOrgnummerProps> = ({ brukerinformasjon }) => {
    const { arbeidsgivere } = brukerinformasjon;
    const { register, unregister, errors, control, watch } = useFormContext<FormShape>();
    const fieldName: keyof FormShape = 'arbeidsgiverOrgnummer';
    const sporsmaltekst = 'Velg arbeidsgiver';
    const watchArbeidsgiverOrgnummer = watch(fieldName);

    const harArbeidsgiver = arbeidsgivere.length > 0;

    useEffect(() => {
        register({
            name: `${fieldName}.sporsmaltekst`,
            value: sporsmaltekst,
        });
        register({
            name: `${fieldName}.svartekster`,
            value: JSON.stringify(arbeidsgivere.map((ag) => ({ navn: ag.navn, orgnummer: ag.orgnummer }))),
        });
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`]);
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
                rules={{
                    required: 'Arbeidsgiver må være valgt siden du har valgt at du er ansatt',
                }}
                render={({ onChange, value, name }) => (
                    <RadioPanelGruppe
                        name={name}
                        legend={
                            <div>
                                <div
                                    id={!harArbeidsgiver ? fieldName : undefined}
                                    style={{ marginBottom: arbeidsgivere.length ? '0.5rem' : undefined }}
                                >
                                    {sporsmaltekst}
                                </div>
                                {harArbeidsgiver && (
                                    <Ekspanderbar title="Ser du ikke arbeidsgiveren din her?">
                                        Be arbeidsgiveren din om å registrere deg i A-meldingen. Da blir det oppdatert
                                        her slik at du kan få sendt den til arbeidsgiveren.
                                    </Ekspanderbar>
                                )}
                            </div>
                        }
                        radios={arbeidsgivere.map((arbeidsgiver, index) => ({
                            label: `${arbeidsgiver.navn} (org.nr: ${arbeidsgiver.orgnummer})`,
                            value: arbeidsgiver.orgnummer,
                            id: index === 0 ? fieldName : undefined,
                        }))}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        feil={errors.arbeidsgiverOrgnummer?.svar?.message}
                    />
                )}
            />

            {!harArbeidsgiver && (
                <AlertStripeAdvarsel>
                    Vi klarer ikke å finne noen arbeidsforhold registrert på deg. Be arbeidsgiveren din om å registrere
                    deg i A-meldingen. Da blir det oppdatert her slik at du kan få sendt den til arbeidsgiveren.
                </AlertStripeAdvarsel>
            )}

            {valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder && (
                <RiktigNarmesteLeder naermesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
        </QuestionWrapper>
    );
};

export default ArbeidsgiverOrgnummer;
