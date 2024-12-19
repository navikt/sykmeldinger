import * as R from 'remeda'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Alert, BodyShort, Heading, Select } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { FormValues } from '../../SendSykmeldingForm'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

const initialOptions = [
    'Pensjonist',
    'Student',
    'Vikar',
    'Lærling',
    'Dagpenger',
    'Flere arbeidsforhold',
    'Arbeidsavklaringspenger (AAP)',
    'Uføretrygd',
]

function AnnetExtraSelect(): ReactElement {
    const { field } = useController<FormValues, 'extra.annetSituasjon'>({
        name: 'extra.annetSituasjon',
    })

    return (
        <>
            <div className="mt-4 max-w-md">
                <Select
                    onChange={(event) => {
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
                    autoComplete="off"
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
                </Select>
            </div>
            <TryToHelpWarnings value={field.value} />
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
                        ditt over fra «annet» til «ansatt».
                    </BodyShort>
                </FeedbackToUser>
            )
        case 'Student':
            return (
                <FeedbackToUser>
                    <BodyShort>
                        Dersom du er sykmeldt i et arbeidsforhold du har ved siden av studiene, bør du endre valget ditt
                        over fra «annet» til «ansatt».
                    </BodyShort>
                </FeedbackToUser>
            )
        case 'Arbeidsavklaringspenger (AAP)':
            return (
                <FeedbackToUser>
                    <BodyShort>
                        Dersom du er sykmeldt i et arbeidsforhold du har ved siden av arbeidsavklaringspenger, bør du
                        endre valget ditt over fra «annet» til «ansatt».
                    </BodyShort>
                </FeedbackToUser>
            )
        case 'Uføretrygd':
            return (
                <FeedbackToUser>
                    <BodyShort>
                        Dersom du er sykmeldt i et arbeidsforhold du har ved siden av uføretrygd, bør du endre valget
                        ditt over fra «annet» til «ansatt».
                    </BodyShort>
                </FeedbackToUser>
            )
        default:
            return null
    }
}

function FeedbackToUser({ children }: PropsWithChildren): ReactElement {
    return (
        <Alert variant="warning" className="mt-4 max-w-md" role="status">
            <Heading level="3" size="small" spacing>
                Har du valgt rett situasjon?
            </Heading>
            {children}
        </Alert>
    )
}

export default AnnetExtraSelect
