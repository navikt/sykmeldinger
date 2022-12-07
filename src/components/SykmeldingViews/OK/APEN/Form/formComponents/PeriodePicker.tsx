import { ReactNode, useState } from 'react'
import { useController } from 'react-hook-form'
import { Button, ErrorMessage, UNSAFE_DatePicker, UNSAFE_useRangeDatepicker, RangeValidationT } from '@navikt/ds-react'
import { Interval, isWithinInterval } from 'date-fns'

import { DateRange, FormShape } from '../Form'

import styles from './PeriodePicker.module.css'

type FormName = `egenmeldingsperioder.svar.${number}.range`

export interface PeriodePickerProps {
    name: FormName
    maxDate: Date
    otherPeriods: { id: string; range: DateRange }[]
    removeButton: ReactNode | undefined
}

function PeriodePicker({ name, maxDate, otherPeriods, removeButton }: PeriodePickerProps): JSX.Element {
    const [rangeError, setRangeError] = useState<RangeValidationT | null>(null)
    const { field, fieldState } = useController<FormShape, FormName>({
        name: `${name}`,
        rules: {
            validate: (value) => {
                if (rangeError?.from.isInvalid) {
                    return 'Fra dato må være på formatet DD.MM.YYYY.'
                }
                if (rangeError?.to.isInvalid) {
                    return 'Til dato må være på formatet DD.MM.YYYY.'
                }
                if (rangeError?.from?.isAfter) {
                    return 'Fra dato kan ikke være oppfølgingsdato eller senere.'
                }
                if (rangeError?.to?.isAfter) {
                    return 'Til dato kan ikke være oppfølgingsdato eller senere.'
                }
                if (rangeError?.to?.isBeforeFrom) {
                    return 'Fra kan ikke være etter til dato.'
                }

                const fom = value.fom
                const tom = value.tom
                if (!fom) {
                    return 'Du må fylle inn fra dato.'
                }
                if (!tom) {
                    return 'Du må fylle inn til dato.'
                }

                if (
                    otherPeriods.some((period) => {
                        if (period.range.fom == null || period.range.tom == null) return false
                        const interval: Interval = { start: period.range.fom, end: period.range.tom }
                        return isWithinInterval(fom, interval) || isWithinInterval(tom, interval)
                    })
                ) {
                    return 'Du kan ikke ha overlappende perioder.'
                }

                return undefined
            },
        },
    })

    const { datepickerProps, toInputProps, fromInputProps, setSelected } = UNSAFE_useRangeDatepicker({
        toDate: maxDate,
        today: maxDate,
        onRangeChange: (value) => {
            field.onChange({
                fom: value?.from,
                tom: value?.to,
            })
        },
        onValidate: (value) => {
            setRangeError(value)
        },
    })

    return (
        <div className={styles.periodePicker}>
            <UNSAFE_DatePicker {...datepickerProps}>
                <UNSAFE_DatePicker.Input
                    id={`${name}.fom`}
                    {...fromInputProps}
                    label="Fra og med:"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={!!fieldState.error?.message}
                />

                <UNSAFE_DatePicker.Input
                    id={`${name}.tom`}
                    {...toInputProps}
                    label="Til og med:"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={!!fieldState.error?.message}
                />
            </UNSAFE_DatePicker>
            {fieldState.error && (
                <ErrorMessage className={styles.periodErrorMessage}>{fieldState.error?.message}</ErrorMessage>
            )}
            <div className={styles.periodePickerButtons}>
                <Button
                    variant="tertiary"
                    type="button"
                    onClick={() => {
                        setSelected({ from: undefined, to: undefined })
                    }}
                >
                    Nullstill dato
                </Button>
                {removeButton}
            </div>
        </div>
    )
}

export default PeriodePicker
