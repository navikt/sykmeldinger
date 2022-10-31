import React, { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Alert, Radio, RadioGroup, ReadMore } from '@navikt/ds-react'

import { FormShape, JaEllerNeiType } from '../Form'
import { NaermesteLederFragment } from '../../../../../../fetching/graphql.generated'
import QuestionWrapper from '../layout/QuestionWrapper'
import Spacing from '../../../../../Spacing/Spacing'

interface RiktigNarmesteLederProps {
    naermesteLeder: NaermesteLederFragment
}

const fieldName = 'riktigNarmesteLeder'

function RiktigNarmesteLeder({ naermesteLeder }: RiktigNarmesteLederProps): JSX.Element {
    const { control, watch, register, unregister, setValue } = useFormContext<FormShape>()
    const sporsmaltekst = `Er det ${naermesteLeder.navn} som skal følge deg opp på jobben mens du er syk?`
    const watchRiktigNarmesteLeder = watch(fieldName)

    useEffect(() => {
        register(`${fieldName}.sporsmaltekst`, { value: sporsmaltekst })
        register(`${fieldName}.svartekster`, { value: JSON.stringify(JaEllerNeiType) })
        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`])
    }, [register, unregister, sporsmaltekst])

    // Reset the answer if the prop changes
    useEffect(() => {
        setValue(`${fieldName}.svar`, null)
    }, [naermesteLeder, setValue])

    return (
        <QuestionWrapper>
            <Controller
                control={control}
                name={`${fieldName}.svar`}
                defaultValue={null}
                rules={{
                    required:
                        'Du må svare på om dette er riktig person som skal følge deg opp på jobben når du er syk.',
                }}
                render={({ field, fieldState }) => (
                    <RadioGroup
                        {...field}
                        id={fieldName}
                        legend={
                            <div>
                                <div style={{ marginBottom: '0.5rem' }}>{sporsmaltekst}</div>
                                <ReadMore header="Les om hva det innebærer">
                                    Den vi spør om, vil få se sykmeldingen din og kan bli kontaktet av NAV underveis i
                                    sykefraværet. Hør med arbeidsgiveren din hvis du mener det er en annen de skulle
                                    meldt inn i stedet.
                                </ReadMore>
                            </div>
                        }
                        onChange={(value: 'JA' | 'NEI') => field.onChange(value)}
                        error={fieldState.error?.message}
                    >
                        <Radio value="JA">Ja</Radio>
                        <Radio value="NEI">Nei</Radio>
                    </RadioGroup>
                )}
            />

            {watchRiktigNarmesteLeder?.svar === 'JA' && (
                <Spacing direction="top" amount="small">
                    <Alert variant="info" role="alert" aria-live="polite">
                        Vi sender sykmeldingen til {naermesteLeder.navn}, som finner den ved å logge inn på nav.no
                    </Alert>
                </Spacing>
            )}

            {watchRiktigNarmesteLeder?.svar === 'NEI' && (
                <Spacing direction="top" amount="small">
                    <Alert variant="info" role="alert" aria-live="polite">
                        Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.
                    </Alert>
                </Spacing>
            )}
        </QuestionWrapper>
    )
}

export default RiktigNarmesteLeder
