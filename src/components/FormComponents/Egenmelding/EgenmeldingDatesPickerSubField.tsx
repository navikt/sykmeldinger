import { useController } from 'react-hook-form'
import { ErrorMessage, Label, UNSAFE_DatePicker } from '@navikt/ds-react'
import { endOfMonth, isSameMonth, startOfMonth } from 'date-fns'

import { sporsmal } from '../../../utils/sporsmal'

import { EgenmeldingsdagerSubForm } from './EgenmeldingerField'

interface Props {
    index: number
    earliestPossibleDate: Date
    latestPossibleDate: Date
}

function EgenmeldingDatesPickerSubField({ index, earliestPossibleDate, latestPossibleDate }: Props): JSX.Element {
    const { field: datoerField, fieldState: datoerFieldState } = useController<
        EgenmeldingsdagerSubForm,
        `egenmeldingsdager.${number}.datoer`
    >({
        name: `egenmeldingsdager.${index}.datoer`,
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
        <div className="my-4">
            <Label>{sporsmal.egenmeldingsdager}</Label>
            {!isSameMonth(earliestPossibleDate, latestPossibleDate) && window.innerWidth >= 768 ? (
                <div className="flex">
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
                    className="max-[350px]:-ml-5"
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
            {datoerFieldState.error && <ErrorMessage className="mb-4">{datoerFieldState.error?.message}</ErrorMessage>}
        </div>
    )
}

export default EgenmeldingDatesPickerSubField