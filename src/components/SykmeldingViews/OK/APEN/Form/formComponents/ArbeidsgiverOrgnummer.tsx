import React, { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Alert, Radio, RadioGroup, ReadMore } from '@navikt/ds-react'

import { FormShape } from '../Form'
import { BrukerinformasjonFragment } from '../../../../../../fetching/graphql.generated'
import QuestionWrapper from '../layout/QuestionWrapper'

import RiktigNarmesteLeder from './RiktigNarmesteLeder'

interface ArbeidsgiverOrgnummerProps {
    brukerinformasjon: BrukerinformasjonFragment
}

const fieldName = 'arbeidsgiverOrgnummer'
const sporsmaltekst = 'Velg arbeidsgiver'

function ArbeidsgiverOrgnummer({ brukerinformasjon }: ArbeidsgiverOrgnummerProps): JSX.Element {
    const { arbeidsgivere } = brukerinformasjon
    const { register, unregister, control, watch } = useFormContext<FormShape>()
    const watchArbeidsgiverOrgnummer = watch(fieldName)
    const harArbeidsgiver = arbeidsgivere.length > 0

    useEffect(() => {
        register(`${fieldName}.sporsmaltekst`, {
            value: sporsmaltekst,
        })
        register(`${fieldName}.svartekster`, {
            value: JSON.stringify(arbeidsgivere.map((ag) => ({ navn: ag.navn, orgnummer: ag.orgnummer }))),
        })
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`])
    }, [arbeidsgivere, register, unregister])

    const valgtArbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === watchArbeidsgiverOrgnummer?.svar)

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                rules={{
                    required: 'Arbeidsgiver må være valgt siden du har valgt at du er ansatt.',
                }}
                defaultValue={null}
                render={({ field, fieldState }) => (
                    <RadioGroup
                        {...field}
                        id={fieldName}
                        legend={
                            <div>
                                <div
                                    id={!harArbeidsgiver ? fieldName : undefined}
                                    style={{ marginBottom: arbeidsgivere.length ? '0.5rem' : undefined }}
                                >
                                    {sporsmaltekst}
                                </div>
                                {harArbeidsgiver && (
                                    <ReadMore header="Ser du ikke arbeidsgiveren din her?">
                                        Be arbeidsgiveren din om å registrere deg i A-meldingen. Da blir det oppdatert
                                        her slik at du kan få sendt den til arbeidsgiveren.
                                    </ReadMore>
                                )}
                            </div>
                        }
                        onChange={(value: string) => field.onChange(value)}
                        error={fieldState.error?.message}
                    >
                        {arbeidsgivere.map((arbeidsgiver) => (
                            <Radio key={arbeidsgiver.orgnummer} value={arbeidsgiver.orgnummer}>
                                {arbeidsgiver.navn} (org.nr: {arbeidsgiver.orgnummer})
                            </Radio>
                        ))}
                    </RadioGroup>
                )}
            />

            {!harArbeidsgiver && (
                <Alert variant="warning">
                    Vi klarer ikke å finne noen arbeidsforhold registrert på deg. Be arbeidsgiveren din om å registrere
                    deg i A-meldingen. Da blir det oppdatert her slik at du kan få sendt den til arbeidsgiveren.
                </Alert>
            )}

            {valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder && (
                <RiktigNarmesteLeder naermesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
        </QuestionWrapper>
    )
}

export default ArbeidsgiverOrgnummer
