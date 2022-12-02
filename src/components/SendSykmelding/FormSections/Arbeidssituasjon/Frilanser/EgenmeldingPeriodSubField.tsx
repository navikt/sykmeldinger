import { useController } from 'react-hook-form'
import { Button, RangeValidationT, UNSAFE_DatePicker, UNSAFE_useRangeDatepicker } from '@navikt/ds-react'
import { Close } from '@navikt/ds-icons'
import React, { useState } from 'react'
import { Interval, isWithinInterval } from 'date-fns'

import { FormValues } from '../../../SendSykmeldingForm'

import { EgenmeldingField } from './EgenmeldingerField'
import styles from './EgenmeldingPeriodSubField.module.css'

interface EgenmeldingPeriodSubFieldProps {
    index: number
    remove: (index: number) => void
    otherPeriods: FormValues['egenmeldingsperioder']
}

function EgenmeldingPeriodSubField({ index, remove, otherPeriods }: EgenmeldingPeriodSubFieldProps): JSX.Element {
    const [rangeError, setRangeError] = useState<RangeValidationT | null>(null)
    const { field: toField, fieldState: toFieldState } = useController<FormValues, `${EgenmeldingField}.tom`>({
        name: `egenmeldingsperioder.${index}.tom`,
        rules: {
            validate: (tomValue) => {
                if (rangeError?.to.isInvalid) {
                    return 'Til dato må være på formatet DD.MM.YYYY'
                }
                if (rangeError?.to?.isAfter) {
                    return 'Til dato kan ikke være oppfølgingsdato eller senere.'
                }
                if (rangeError?.to?.isBeforeFrom) {
                    return 'Fra kan ikke være etter til dato.'
                }

                if (!tomValue) {
                    return 'Du må fylle inn til dato.'
                }

                return undefined
            },
        },
        shouldUnregister: true,
        defaultValue: null,
    })
    const { field: fromField, fieldState: fromFieldState } = useController<FormValues, `${EgenmeldingField}.fom`>({
        name: `egenmeldingsperioder.${index}.fom`,
        rules: {
            validate: (fomValue) => {
                if (rangeError?.from.isInvalid) {
                    return 'Fra dato må være på formatet DD.MM.YYYY'
                }
                if (rangeError?.from?.isAfter) {
                    return 'Fra dato kan ikke være oppfølgingsdato eller senere.'
                }

                if (!fomValue) {
                    return 'Du må fylle inn fra dato.'
                }

                if (
                    otherPeriods?.some((period) => {
                        if (toField.value == null) return

                        if (period.fom == null || period.tom == null) return false
                        const interval: Interval = { start: period.fom, end: period.tom }
                        return isWithinInterval(fomValue, interval) || isWithinInterval(toField.value, interval)
                    })
                ) {
                    return 'Du kan ikke ha overlappende perioder.'
                }

                return undefined
            },
        },
        shouldUnregister: true,
        defaultValue: null,
    })

    const { datepickerProps, toInputProps, fromInputProps, setSelected } = UNSAFE_useRangeDatepicker({
        defaultSelected: {
            from: fromField.value ?? undefined,
            to: toField.value ?? undefined,
        },
        onRangeChange: (value) => {
            value?.from && fromField.onChange(value.from)
            value?.to && toField.onChange(value.to)
        },
        onValidate: setRangeError,
    })

    return (
        <div>
            <UNSAFE_DatePicker {...datepickerProps} wrapperClassName={styles.dateFields}>
                <UNSAFE_DatePicker.Input
                    id={fromField.name}
                    {...fromInputProps}
                    label="Fra og med"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={fromFieldState.error?.message}
                />

                <UNSAFE_DatePicker.Input
                    id={toField.name}
                    {...toInputProps}
                    label="Til og med"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={toFieldState.error?.message}
                />
            </UNSAFE_DatePicker>
            <div className={styles.fieldButtons}>
                <Button
                    variant="tertiary"
                    type="button"
                    onClick={() => {
                        setSelected({ from: undefined, to: undefined })
                        fromField.onChange(null)
                        toField.onChange(null)
                    }}
                >
                    Nullstill dato
                </Button>
                {index > 0 && (
                    <Button
                        variant="tertiary"
                        type="button"
                        icon={<Close role="img" aria-hidden />}
                        onClick={() => remove(index)}
                    >
                        Fjern periode
                    </Button>
                )}
            </div>
        </div>
    )
}

export default EgenmeldingPeriodSubField