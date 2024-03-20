import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { Alert, BodyShort, Select, TextField } from '@navikt/ds-react'
import { useController, useFormContext } from 'react-hook-form'

import { FormValues } from '../../SendSykmeldingForm'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

const initialOptions = ['Student', 'Konkurs', 'Flere arbeidsgivere']

function AnnetExtraSelect(): ReactElement {
    const { register } = useFormContext<FormValues>()
    const { field } = useController<FormValues, 'extra.annetSituasjon'>({
        name: 'extra.annetSituasjon',
    })

    return (
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
            >
                <option value="" disabled>
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
                <TextField {...register('extra.annetSituasjonTekst')} label="Beskrivelse" className="mt-4" />
            )}
            {field.value && field.value === 'Flere arbeidsgivere' && (
                <Alert variant="warning" className="mt-4">
                    <BodyShort spacing>
                        Hvis du har flere arbeidsgivere, må du sende en sykmelding for hver arbeidsgiver.
                    </BodyShort>
                    <BodyShort
                        spacing
                        className="font-bold"
                    >{`Du må endre valget ditt over fra "Annet" til "Arbeidstaker".`}</BodyShort>
                    <BodyShort>
                        Dersom legen din ikke har sendt deg èn sykmelding per arbeidsgiver, må du ta kontakt med legen
                        og be om dette.
                    </BodyShort>
                </Alert>
            )}
        </div>
    )
}

export default AnnetExtraSelect
