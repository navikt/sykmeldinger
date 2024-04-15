import * as R from 'remeda'
import React, { ReactElement, useEffect, useRef } from 'react'
import { Alert, BodyShort, Select, TextField } from '@navikt/ds-react'
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
                <Alert variant="warning" className="mt-4">
                    <BodyShort spacing>
                        Hvis du har flere arbeidsforhold, må du sende en sykmelding for hvert arbeidsforhold.
                    </BodyShort>
                    <BodyShort
                        spacing
                        className="font-bold"
                    >{`Du bør endre valget ditt over fra "annet" til "ansatt".`}</BodyShort>
                    <BodyShort>
                        Dersom du ikke har fått èn sykmelding per arbeidsforhold, må du ta kontakt med legen og be om
                        dette.
                    </BodyShort>
                </Alert>
            )
        case 'Vikar':
            return (
                <Alert variant="warning" className="mt-4">
                    <BodyShort spacing>Som vikar er du ansatt på samme måte som en arbeidstaker.</BodyShort>
                    <BodyShort className="font-bold">{`Du bør endre valget ditt over fra "annet" til "ansatt".`}</BodyShort>
                </Alert>
            )
        case 'Lærling':
            return (
                <Alert variant="warning" className="mt-4">
                    <BodyShort spacing>Som lærling er du ansatt på samme måte som en arbeidstaker</BodyShort>
                    <BodyShort className="font-bold">{`Du bør endre valget ditt over fra "annet" til "ansatt".`}</BodyShort>
                </Alert>
            )
        case 'Dagpenger':
            return (
                <Alert variant="warning" className="mt-4">
                    <BodyShort spacing>
                        Dersom du er på dagpenger betyr dette at du er arbeidsledig eller permittert.
                    </BodyShort>
                    <BodyShort className="font-bold">{`Du bør derfor endre valget ditt over fra "annet" til "arbeidsledig" eller "permittert".`}</BodyShort>
                </Alert>
            )
        default:
            return null
    }
}

function getInferredOption(value: string | null): string | null {
    if (value == null) return null

    if (value.toLowerCase().includes('vikar')) return 'Vikar'

    return null
}

export default AnnetExtraSelect
