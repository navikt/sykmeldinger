import React, { useEffect } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { sub } from 'date-fns'
import { Button } from '@navikt/ds-react'
import { Add, Close } from '@navikt/ds-icons'

import QuestionWrapper from '../layout/QuestionWrapper'
import { FormShape } from '../Form'
import { toDate, toReadableDate } from '../../../../../../utils/dateUtils'

import PeriodePicker from './PeriodePicker'
import styles from './Egenmeldingsperioder.module.css'

interface EgenmeldingsperioderProps {
    oppfolgingsdato: string
}

const fieldName = 'egenmeldingsperioder'

const Egenmeldingsperioder: React.FC<EgenmeldingsperioderProps> = ({ oppfolgingsdato }) => {
    const sporsmaltekst = `Hvilke dager var du borte fra jobb før ${toReadableDate(oppfolgingsdato)}?`
    const maxDate = sub(toDate(oppfolgingsdato), { days: 1 })

    const { control, register, unregister } = useFormContext<FormShape>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${fieldName}.svar`,
    })

    useEffect(() => {
        append({ range: { fom: undefined, tom: undefined } })
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
                        <PeriodePicker
                            name={`egenmeldingsperioder.svar.${index}.range`}
                            maxDate={maxDate}
                            otherPeriods={fields.filter((it) => it.id !== field.id)}
                            removeButton={
                                index > 0 && (
                                    <Button
                                        variant="tertiary"
                                        type="button"
                                        onClick={() => remove(index)}
                                        icon={<Close />}
                                    >
                                        Fjern periode
                                    </Button>
                                )
                            }
                        />
                    </div>
                ))}
            </div>

            <Button
                variant="tertiary"
                size="small"
                type="button"
                onClick={() => append({ range: { fom: undefined, tom: undefined } })}
                icon={<Add />}
            >
                Legg til ekstra periode
            </Button>
        </QuestionWrapper>
    )
}

export default Egenmeldingsperioder
