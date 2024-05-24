import * as R from 'remeda'
import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'
import { Alert, BodyShort, Heading, Select, TextField } from '@navikt/ds-react'
import { useController, useFormContext } from 'react-hook-form'

import { FormValues } from '../../SendSykmeldingForm'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

const initialOptions = [
    'Pensjonist',
    'Student',
    'Konkurs',
    'Vikar',
    'Lærling',
    'Dagpenger',
    'Foreldrepermisjon',
    'Varig tilrettelagt arbeid (VTA)',
    'Flere arbeidsforhold',
    'Arbeidsavklaringspenger (AAP)',
]

function AnnetExtraSelect(): ReactElement {
    const { register, watch, setValue } = useFormContext<FormValues>()
    const { field } = useController<FormValues, 'extra.annetSituasjon'>({
        name: 'extra.annetSituasjon',
    })
    const extraText = watch('extra.annetSituasjonTekst')
    const inferredOption: string | null = getInferredOption(extraText)

    const hasAmplitudedInferredOption = useRef(false)

    useEffect(() => {
        if (!inferredOption || hasAmplitudedInferredOption.current) return

        logAmplitudeEvent({
            eventName: 'skjema spørsmål besvart',
            data: {
                skjemanavn: 'åpen sykmelding',
                spørsmål: 'Hvilken situasjon er du i som gjorde at du valgte annet? (draft)',
                svar: inferredOption,
            },
        })

        hasAmplitudedInferredOption.current = true
    }, [inferredOption])

    return (
        <>
            <div className="mt-4 max-w-md">
                <Select
                    onChange={(event) => {
                        setValue('extra.annetSituasjonTekst', '')
                        field.onChange(event.currentTarget.value)

                        logAmplitudeEvent({
                            eventName: 'skjema spørsmål besvart',
                            data: {
                                skjemanavn: 'åpen sykmelding',
                                spørsmål: 'Hvilken situasjon er du i som gjorde at du valgte annet? (draft)',
                                svar: event.currentTarget.value,
                            },
                        })
                    }}
                    label="Hvilken situasjon er du i som gjorde at du valgte annet?"
                >
                    <option value="" disabled selected>
                        Velg situasjon
                    </option>
                    {R.pipe(
                        initialOptions,
                        R.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        )),
                    )}
                    <option value="annet-annet">Ingen av disse, skriv inn selv</option>
                </Select>
                {field.value && field.value === 'annet-annet' && (
                    <>
                        <TextField
                            {...register('extra.annetSituasjonTekst')}
                            label="Beskriv din situasjon selv"
                            className="mt-4"
                            maxLength={25}
                        />
                        <BodyShort spacing size="small" className="mt-1 italic">
                            1-2 ord, ikke skriv navn eller lignende personopplysninger
                        </BodyShort>
                    </>
                )}
            </div>
            <TryToHelpWarnings value={inferredOption ?? field.value} />
        </>
    )
}

function TryToHelpWarnings({ value }: { value: string | null }): ReactElement | null {
    switch (value) {
        case 'Flere arbeidsforhold':
            return (
                <FeedbackToUser>
                    <BodyShort spacing className="font-bold">
                        Du bør endre valget ditt over fra «annet» til «ansatt».
                    </BodyShort>
                    <BodyShort spacing>
                        Hvis du har flere arbeidsforhold, må du sende en sykmelding for hvert arbeidsforhold.
                    </BodyShort>
                    <BodyShort>
                        Dersom du ikke har fått èn sykmelding per arbeidsforhold, må du ta kontakt med legen og be om
                        dette.
                    </BodyShort>
                </FeedbackToUser>
            )
        case 'Vikar':
            return (
                <FeedbackToUser>
                    <BodyShort spacing>Som vikar er du ansatt på samme måte som en arbeidstaker.</BodyShort>
                    <BodyShort className="font-bold">Du bør endre valget ditt over fra «annet» til «ansatt».</BodyShort>
                </FeedbackToUser>
            )
        case 'Lærling':
            return (
                <FeedbackToUser>
                    <BodyShort spacing>Som lærling er du ansatt på samme måte som en arbeidstaker</BodyShort>
                    <BodyShort className="font-bold">Du bør endre valget ditt over fra «annet» til «ansatt».</BodyShort>
                </FeedbackToUser>
            )
        case 'Dagpenger':
            return (
                <FeedbackToUser>
                    <BodyShort spacing>
                        Dersom du mottar dagpenger betyr dette at du er arbeidsledig eller permittert.
                    </BodyShort>
                    <BodyShort className="font-bold">
                        Du bør derfor endre valget ditt over fra «annet» til «arbeidsledig» eller «permittert».
                    </BodyShort>
                </FeedbackToUser>
            )
        case 'Pensjonist':
            return (
                <FeedbackToUser>
                    <BodyShort>
                        Dersom du er sykmeldt i et arbeidsforhold du har ved siden av alderspensjon, bør du endre valget
                        ditt over fra «annet» til «ansatt»
                    </BodyShort>
                </FeedbackToUser>
            )
        case 'Student':
            return (
                <FeedbackToUser>
                    <BodyShort>
                        Dersom du er sykmeldt i et arbeidsforhold du har ved siden av studiene, bør du endre valget ditt
                        over fra «annet» til «ansatt»
                    </BodyShort>
                </FeedbackToUser>
            )
        case 'Arbeidsavklaringspenger (AAP)':
            return (
                <FeedbackToUser>
                    <BodyShort>
                        Dersom du er sykmeldt i en deltidsstilling du har ved siden av arbeidsavklaringspenger, bør du
                        endre valget ditt over fra «annet» til «ansatt»
                    </BodyShort>
                </FeedbackToUser>
            )
        default:
            return null
    }
}

function FeedbackToUser({ children }: PropsWithChildren): ReactElement {
    return (
        <Alert variant="warning" className="mt-4 max-w-md">
            <Heading level="3" size="small" spacing>
                Har du valgt rett situasjon?
            </Heading>
            {children}
        </Alert>
    )
}

function getInferredOption(value: string | null): string | null {
    if (value == null) return null

    if (value.toLowerCase().includes('vikar')) return 'Vikar'

    return null
}

export default AnnetExtraSelect
