import { Button, ErrorMessage } from '@navikt/ds-react'
import { useController, useFormContext } from 'react-hook-form'
import { add, isAfter, isBefore, sub } from 'date-fns'
import { useLayoutEffect } from 'react'

import { FormValues } from '../../../SendSykmeldingForm'
import { sortDatesASC } from '../../../../../utils/dateUtils'
import { YesOrNo } from '../../../../../fetching/graphql.generated'
import { EgenmeldingsdagerForm } from '../../../../../utils/egenmeldingsdagerUtils'

import HarBruktEgenmelding from './HarBruktEgenmelding'
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
    const egenmeldingsdager = watch('egenmeldingsdager')
    const harPerioder: YesOrNo | null = watch(`egenmeldingsdager.${index}.harPerioder`)
    const selectedDates: Date[] | null = watch(`egenmeldingsdager.${index}.datoer`)
    const hasClickedVidere: boolean | null = watch(`egenmeldingsdager.${index}.hasClickedVidere`)

    const [earliestPossibleDate, latestPossibleDate] = currentPeriodDatePicker(previous, metadata.previousSykmeldingTom)
    const hasHitPreviousSykmeldingTom = isAfter(earliestPossibleDate, latestPossibleDate)

    useLayoutEffect(() => {
        if (hasHitPreviousSykmeldingTom) return

        // TODO: This is a hack to fix weird RHF-watch issue. Keep an eye on if it's fixed so we can remove this useEffect.
        setValue(`egenmeldingsdager.${index}.harPerioder`, null)
    }, [hasHitPreviousSykmeldingTom, index, setValue])

    if (hasHitPreviousSykmeldingTom) {
        // The user has hit the previous sykmelding, we don't need to ask anymore.
        return null
    }

    const missingDates: boolean = !selectedDates || selectedDates.length === 0
    const missingDatesOnVidereClick: boolean = missingDates && hasClickedVidere === false
    const sortedDates: Date[] | null = selectedDates && selectedDates.length > 0 ? sortDatesASC(selectedDates) : null
    const hasPeriod: boolean = harPerioder === YesOrNo.YES

    return (
        <div className="egenmeldingsperiod-ansatt">
            <HarBruktEgenmelding
                index={index}
                arbeidsgiverNavn={metadata.arbeidsgiverNavn}
                lastPossibleDate={earliestPossibleDate}
                firstPossibleDate={latestPossibleDate}
                onNo={() => {
                    setValue(`egenmeldingsdager.${index}.datoer`, null)
                    setValue(`egenmeldingsdager.${index}.hasClickedVidere`, null)
                }}
                disabled={!missingDates && hasClickedVidere === true}
            />
            {hasPeriod && hasClickedVidere !== true && (
                <>
                    <EgenmeldingDatesPickerSubField
                        index={index}
                        earliestPossibleDate={earliestPossibleDate}
                        latestPossibleDate={latestPossibleDate}
                    />
                    <VidereButtonField index={index} missingDates={missingDates} />
                    {missingDatesOnVidereClick && (
                        <ErrorMessage className={styles.videreError}>Du må velge minst en dato</ErrorMessage>
                    )}
                </>
            )}
            {hasPeriod && hasClickedVidere === true && sortedDates && sortedDates.length > 0 && (
                <ValgtEgenmeldingsdager
                    dates={sortedDates}
                    onEditClicked={() => {
                        setValue('egenmeldingsdager', laterPeriodsRemoved(index, egenmeldingsdager))
                        setValue(`egenmeldingsdager.${index}.hasClickedVidere`, null)
                    }}
                />
            )}
            {hasClickedVidere === true && (
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

function VidereButtonField({ index, missingDates }: { index: number; missingDates: boolean }): JSX.Element {
    const { field: videreField } = useController<FormValues, `egenmeldingsdager.${number}.hasClickedVidere`>({
        name: `egenmeldingsdager.${index}.hasClickedVidere`,
        defaultValue: null,
    })

    return (
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

export function laterPeriodsRemoved(
    index: number,
    list?: EgenmeldingsdagerForm[] | null,
): EgenmeldingsdagerForm[] | null {
    return list?.slice(0, index + 1) ?? null
}

export default EgenmeldingerField
