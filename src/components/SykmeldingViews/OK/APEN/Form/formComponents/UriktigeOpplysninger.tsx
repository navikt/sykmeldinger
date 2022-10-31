import React, { useEffect, useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, CheckboxGroup } from '@navikt/ds-react'

import { FormShape, UriktigeOpplysningerType } from '../Form'
import QuestionWrapper from '../layout/QuestionWrapper'
import { AvbrytContext } from '../../AvbrytContext'
import Spacing from '../../../../../Spacing/Spacing'
import UriktigeOpplysningerInfo from '../UriktigeOpplysningerInfo'

const fieldName = 'uriktigeOpplysninger'

function UriktigeOpplysninger(): JSX.Element {
    const { register, unregister, control, watch } = useFormContext<FormShape>()
    const watchUriktigeOpplysninger = watch(fieldName)
    const { setMaAvbryte } = useContext(AvbrytContext)

    const uriktigeOpplysinger = watchUriktigeOpplysninger?.svar ?? []
    const trengerNySykmelding =
        uriktigeOpplysinger.includes('PERIODE') || uriktigeOpplysinger.includes('SYKMELDINGSGRAD_FOR_LAV')

    useEffect(() => {
        setMaAvbryte(trengerNySykmelding)
    }, [trengerNySykmelding, setMaAvbryte])

    useEffect(() => {
        register('uriktigeOpplysninger.sporsmaltekst', {
            value: 'Hvilke opplysninger stemmer ikke?',
        })
        register('uriktigeOpplysninger.svartekster', {
            value: JSON.stringify(UriktigeOpplysningerType),
        })

        return () => {
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`])
            setMaAvbryte(false)
        }
    }, [register, unregister, setMaAvbryte])

    return (
        <QuestionWrapper>
            <Controller
                name={`${fieldName}.svar`}
                control={control}
                defaultValue={[]}
                rules={{
                    validate: (value) =>
                        value == null || value.length <= 0
                            ? 'Du må svare på hvilke opplysninger som ikke stemmer.'
                            : undefined,
                }}
                render={({ field, fieldState }) => (
                    <CheckboxGroup
                        {...field}
                        id={fieldName}
                        legend="Hvilke opplysninger stemmer ikke?"
                        onChange={(value: (keyof typeof UriktigeOpplysningerType)[]) => field.onChange(value)}
                        error={fieldState.error?.message}
                    >
                        {Object.entries(UriktigeOpplysningerType).map(([key, label]) => (
                            <Checkbox key={key} value={key}>
                                {label}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                )}
            />

            <Spacing direction="top" amount="small">
                <UriktigeOpplysningerInfo uriktigeOpplysninger={watchUriktigeOpplysninger?.svar} />
            </Spacing>
        </QuestionWrapper>
    )
}

export default UriktigeOpplysninger
