import React, { useEffect } from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { isValid, parseISO } from 'date-fns'
import { Datepicker } from '@navikt/ds-datepicker'
import dayjs from 'dayjs'
import { BodyShort, Button, Label } from '@navikt/ds-react'
import { Add, Close } from '@navikt/ds-icons'

import QuestionWrapper from '../layout/QuestionWrapper'
import { FormShape } from '../Form'

import styles from './Egenmeldingsperioder.module.css'

interface EgenmeldingsperioderProps {
    oppfolgingsdato: string
}

const fieldName = 'egenmeldingsperioder'

const Egenmeldingsperioder: React.FC<EgenmeldingsperioderProps> = ({ oppfolgingsdato }) => {
    const sporsmaltekst = `Hvilke dager var du borte fra jobb før ${dayjs(oppfolgingsdato).format('D. MMMM YYYY')}?`
    const maxDate = dayjs(oppfolgingsdato).subtract(1, 'day')

    const { control, register, getValues, unregister } = useFormContext<FormShape>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${fieldName}.svar`,
    })

    useEffect(() => {
        append({ fom: null, tom: null })
    }, [append])

    useEffect(() => {
        register(`${fieldName}.sporsmaltekst`, {
            value: sporsmaltekst,
        })
        register(`${fieldName}.svartekster`, {
            value: JSON.stringify('Fom, Tom'),
        })

        return () =>
            unregister([fieldName, `${fieldName}.sporsmaltekst`, `${fieldName}.svartekster`, `${fieldName}.svar`])
    }, [register, unregister, sporsmaltekst])

    return (
        <QuestionWrapper>
            <label htmlFor={fieldName}>{sporsmaltekst}</label>
            <div id={fieldName} className={styles.egenmeldingsperioder}>
                {fields.map((field, index) => (
                    <div key={field.id} className={styles.egenmeldingsperiode}>
                        <Controller
                            control={control}
                            name={`${fieldName}.svar.${index}.fom`}
                            defaultValue={null}
                            rules={{
                                required: 'fom dato mangler.',
                                validate: (fom) => {
                                    if (fom && !isValid(parseISO(fom))) {
                                        return 'Startdato må være på formatet dd.mm.yyyy'
                                    }

                                    // Test max date
                                    if (dayjs(fom).isAfter(maxDate)) {
                                        return 'Startdato kan ikke være oppfølgingsdato eller senere.'
                                    }

                                    // Test current peirod
                                    const tom: string | null = getValues(`${fieldName}.svar.${index}.tom`)
                                    if (tom && dayjs(tom).isBefore(fom)) {
                                        return 'Startdato kan ikke være etter sluttdato.'
                                    }

                                    // Test cross-period
                                    if (
                                        fields
                                            .filter((f) => f.id !== field.id)
                                            .filter((f) => !!f.fom && !!f.tom)
                                            .some((f) => dayjs(fom).isBetween(f.fom, f.tom, null, '[]'))
                                    ) {
                                        return 'Du kan ikke ha overlappende perioder.'
                                    }

                                    return true
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <div className={styles.periodeFom}>
                                    <BodyShort>Fra og med:</BodyShort>
                                    <Datepicker
                                        locale="nb"
                                        inputLabel=""
                                        value={field.value ? field.value : undefined}
                                        onChange={field.onChange}
                                        limitations={{
                                            maxDate: maxDate.format('YYYY-MM-DD'),
                                        }}
                                        inputProps={{ name: field.name, placeholder: 'dd.mm.åååå' }}
                                        dayPickerProps={{ initialMonth: maxDate.toDate() }}
                                    />
                                    {fieldState.error?.message && (
                                        <Label style={{ color: 'darkred', maxWidth: '12rem' }}>
                                            {fieldState.error?.message}
                                        </Label>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name={`${fieldName}.svar.${index}.tom`}
                            defaultValue={null}
                            rules={{
                                required: 'tom dato mangler.',
                                validate: (tom) => {
                                    if (tom && !isValid(parseISO(tom))) {
                                        return 'Sluttdato må være på formatet dd.mm.yyyy'
                                    }

                                    // Test max date
                                    if (dayjs(tom).isAfter(maxDate)) {
                                        return 'Sluttdato kan ikke være oppfølgingsdato eller senere.'
                                    }

                                    // Test current peirod
                                    const fom: string | null = getValues(`${fieldName}.svar.${index}.fom`)
                                    if (fom && dayjs(fom).isAfter(tom)) {
                                        return 'Sluttdato kan ikke være før startdato.'
                                    }

                                    // Test cross-period
                                    if (
                                        fields
                                            .filter((f) => f.id !== field.id)
                                            .filter((f) => !!f.fom && !!f.tom)
                                            .some((f) => dayjs(fom).isBetween(f.fom, f.tom, null, '[]'))
                                    ) {
                                        return 'Du kan ikke ha overlappende perioder.'
                                    }

                                    return true
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <div className={styles.periodeTom}>
                                    <BodyShort>Til og med:</BodyShort>
                                    <Datepicker
                                        locale="nb"
                                        value={field.value ? field.value : undefined}
                                        inputLabel=""
                                        onChange={field.onChange}
                                        limitations={{
                                            maxDate: maxDate.format('YYYY-MM-DD'),
                                        }}
                                        inputProps={{ name: field.name, placeholder: 'dd.mm.åååå' }}
                                        dayPickerProps={{ initialMonth: maxDate.toDate() }}
                                    />
                                    {fieldState.error?.message && (
                                        <Label style={{ color: 'darkred', maxWidth: '11rem' }}>
                                            {fieldState.error?.message}
                                        </Label>
                                    )}
                                </div>
                            )}
                        />
                        {index > 0 && (
                            <Button variant="tertiary" size="small" type="button" onClick={() => remove(index)}>
                                <Close />
                                Fjern periode
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            <Button variant="tertiary" size="small" type="button" onClick={() => append({ fom: null, tom: null })}>
                <Add />
                Legg til ekstra periode
            </Button>
        </QuestionWrapper>
    )
}

export default Egenmeldingsperioder
