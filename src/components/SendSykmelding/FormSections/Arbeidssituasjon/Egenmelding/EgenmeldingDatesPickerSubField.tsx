import { useController } from 'react-hook-form'
import { ErrorMessage, Label, UNSAFE_DatePicker } from '@navikt/ds-react'
import { endOfMonth, isSameMonth, startOfMonth } from 'date-fns'

import { FormValues } from '../../../SendSykmeldingForm'

import styles from './EgenmeldingDatesPickerSubField.module.css'

interface Props {
    index: number
    earliestPossibleDate: Date
    latestPossibleDate: Date
}

function EgenmeldingDatesPickerSubField({ index, earliestPossibleDate, latestPossibleDate }: Props): JSX.Element {
    const { field: datoerField, fieldState: datoerFieldState } = useController<
        FormValues,
        `egenmeldingsperioderAnsatt.${number}.datoer`
    >({
        name: `egenmeldingsperioderAnsatt.${index}.datoer`,
        defaultValue: [],
        rules: {
            validate: (value) => {
                if (!value || value.length === 0) {
                    return 'Du må velge minst en dato'
                }
                return undefined
            },
        },
    })

    return (
        <div className={styles.velgDager}>
            <Label>Velg dagene du brukte egenmelding</Label>
            {!isSameMonth(earliestPossibleDate, latestPossibleDate) && window.innerWidth >= 768 ? (
                <div className={styles.twoDatepickers}>
                    <UNSAFE_DatePicker.Standalone
                        mode="multiple"
                        selected={datoerField.value ?? []}
                        onSelect={(value) => {
                            datoerField.onChange(value)
                        }}
                        fromDate={earliestPossibleDate}
                        toDate={endOfMonth(earliestPossibleDate)}
                    />
                    <UNSAFE_DatePicker.Standalone
                        mode="multiple"
                        selected={datoerField.value ?? []}
                        onSelect={(value) => {
                            datoerField.onChange(value)
                        }}
                        fromDate={startOfMonth(latestPossibleDate)}
                        toDate={latestPossibleDate}
                    />
                </div>
            ) : (
                <UNSAFE_DatePicker.Standalone
                    mode="multiple"
                    min={1}
                    max={16}
                    selected={datoerField.value ?? []}
                    onSelect={(value) => {
                        datoerField.onChange(value)
                    }}
                    fromDate={earliestPossibleDate}
                    toDate={latestPossibleDate}
                />
            )}
            {datoerFieldState.error && (
                <ErrorMessage className={styles.datoError}>{datoerFieldState.error?.message}</ErrorMessage>
            )}
        </div>
    )
}

export default EgenmeldingDatesPickerSubField
