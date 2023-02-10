import { Button, ErrorMessage } from '@navikt/ds-react'
import { useController, useFormContext } from 'react-hook-form'
import { add, isAfter, isBefore, sub } from 'date-fns'

import { FormValues } from '../../../SendSykmeldingForm'
import { sortDatesASC } from '../../../../../utils/dateUtils'
import { YesOrNo } from '../../../../../fetching/graphql.generated'

import HarbruktEgenmelding from './HarbruktEgenmelding'
import ValgtEgenmeldingsdager from './ValgtEgenmeldingsdager'
import EgenmeldingDatesPickerSubField from './EgenmeldingDatesPickerSubField'
import styles from './EgenmeldingerFieldRecursive.module.css'

interface Props {
    index: number
    previous: {
        earliestPossibleDate: Date
        earliestSelectedDate: Date | null
    }
    metadata: {
        previousSykmeldingTom: Date | null
        arbeidsgiverNavn: string
    }
}

function EgenmeldingerField({ index, previous, metadata }: Props): JSX.Element | null {
    const { watch, setValue } = useFormContext<FormValues>()
    const harPerioder: YesOrNo | null = watch(`egenmeldingsperioderAnsatt.${index}.harPerioder`)
    const selectedDates: Date[] | null = watch(`egenmeldingsperioderAnsatt.${index}.datoer`)

    const [earliestPossibleDate, latestPossibleDate] = currentPeriodDatePicker(previous, metadata.previousSykmeldingTom)
    const { field: videreField } = useController<FormValues, `egenmeldingsperioderAnsatt.${number}.hasClickedVidere`>({
        name: `egenmeldingsperioderAnsatt.${index}.hasClickedVidere`,
        defaultValue: null,
    })

    if (isAfter(earliestPossibleDate, latestPossibleDate)) {
        // The user has hit the previous sykmelding, we don't need to ask anymore.
        return null
    }

    const missingDates: boolean = !selectedDates || selectedDates.length === 0
    const missingDatesOnVidereClick: boolean = missingDates && videreField.value === false
    const sortedDates: Date[] | null = selectedDates && selectedDates.length > 0 ? sortDatesASC(selectedDates) : null
    const hasPeriod: boolean = harPerioder === YesOrNo.YES

    return (
        <div className="egenmeldingsperiod-ansatt">
            <HarbruktEgenmelding
                index={index}
                arbeidsgiverNavn={metadata.arbeidsgiverNavn}
                lastPossibleDate={earliestPossibleDate}
                firstPossibleDate={latestPossibleDate}
                onNo={() => {
                    setValue(`egenmeldingsperioderAnsatt.${index}.datoer`, null)
                }}
            />
            {hasPeriod && videreField.value !== true && (
                <>
                    <EgenmeldingDatesPickerSubField
                        index={index}
                        earliestPossibleDate={earliestPossibleDate}
                        latestPossibleDate={latestPossibleDate}
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            if (missingDates) {
                                videreField.onChange(false)
                            } else {
                                videreField.onChange(true)
                            }
                        }}
                    >
                        Videre
                    </Button>
                    {missingDatesOnVidereClick && (
                        <ErrorMessage className={styles.videreError}>Du må velge minst en dato</ErrorMessage>
                    )}
                </>
            )}
            {hasPeriod && videreField.value === true && sortedDates && sortedDates.length > 0 && (
                <ValgtEgenmeldingsdager dates={sortedDates} onEditClicked={() => videreField.onChange(false)} />
            )}
            {videreField.value === true && (
                <EgenmeldingerField
                    index={index + 1}
                    metadata={metadata}
                    previous={{
                        earliestSelectedDate: sortedDates ? sortedDates[0] : null,
                        earliestPossibleDate: earliestPossibleDate,
                    }}
                />
            )}
        </div>
    )
}

export function currentPeriodDatePicker(
    previous: Props['previous'],
    previousSykmeldingTom: Date | null,
): [earliest: Date, latest: Date] {
    const latest = sub(previous.earliestPossibleDate, { days: 1 })
    const earliest = previous.earliestSelectedDate
        ? sub(previous.earliestSelectedDate, { days: 16 })
        : sub(previous.earliestPossibleDate, { days: 16 })

    // Earliest should be limited by previous sykmelding
    if (previousSykmeldingTom && isBefore(earliest, previousSykmeldingTom)) {
        return [add(previousSykmeldingTom, { days: 1 }), latest]
    } else {
        return [earliest, latest]
    }
}

export default EgenmeldingerField
