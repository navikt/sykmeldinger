import { Button, ErrorMessage } from '@navikt/ds-react'
import { useController, useFormContext } from 'react-hook-form'
import { add, isAfter, isBefore, sub } from 'date-fns'
import { useLayoutEffect, useRef } from 'react'
import * as R from 'remeda'
import cn from 'classnames'

import { sortDatesASC } from '../../../utils/dateUtils'
import { YesOrNo } from '../../../fetching/graphql.generated'

import HarBruktEgenmelding from './HarBruktEgenmelding'
import ValgtEgenmeldingsdager from './ValgtEgenmeldingsdager'
import EgenmeldingDatesPickerSubField from './EgenmeldingDatesPickerSubField'

export type EgenmeldingsdagerSubForm = {
    egenmeldingsdager: EgenmeldingsdagerFormValue[] | null
}

export type EgenmeldingsdagerFormValue = {
    harPerioder: YesOrNo | null
    datoer: Date[] | null
    hasClickedVidere: boolean | null
}

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
    editSentEgenmelding?: boolean
}

function EgenmeldingerField({ index, previous, metadata, editSentEgenmelding = false }: Props): JSX.Element | null {
    const { watch, setValue, getValues } = useFormContext<EgenmeldingsdagerSubForm>()
    const harPerioder: YesOrNo | null = watch(`egenmeldingsdager.${index}.harPerioder`)
    const selectedDates: Date[] | null = watch(`egenmeldingsdager.${index}.datoer`)
    const hasClickedVidere: boolean | null = watch(`egenmeldingsdager.${index}.hasClickedVidere`)

    const [earliestPossibleDate, latestPossibleDate] = currentPeriodDatePicker(previous, metadata.previousSykmeldingTom)
    const hasHitPreviousSykmeldingTom = isAfter(earliestPossibleDate, latestPossibleDate)

    const harPerioderRef = useRef(harPerioder)
    useLayoutEffect(() => {
        if (hasHitPreviousSykmeldingTom) return

        // TODO: This is a hack to fix weird RHF-watch issue. Keep an eye on if it's fixed so we can remove this useEffect.
        setValue(`egenmeldingsdager.${index}.harPerioder`, harPerioderRef.current ?? null)
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
        <>
            <section
                aria-labelledby={`egenmeldingsdager.${index}.harPerioder`}
                className={cn({ 'mt-10 border-t-2 border-border-divider': index !== 0 })}
            >
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
                            resetClickedVidere={() => setValue(`egenmeldingsdager.${index}.hasClickedVidere`, null)}
                        />
                        <VidereButtonField index={index} missingDates={missingDates} />
                        {missingDatesOnVidereClick && (
                            <ErrorMessage className="mt-4">Du må velge minst en dato</ErrorMessage>
                        )}
                    </>
                )}
                {hasPeriod && hasClickedVidere === true && sortedDates && sortedDates.length > 0 && (
                    <ValgtEgenmeldingsdager
                        dates={sortedDates}
                        onEditClicked={() => {
                            setValue(
                                'egenmeldingsdager',
                                laterPeriodsRemoved(index, editSentEgenmelding, getValues('egenmeldingsdager')),
                            )
                            setValue(`egenmeldingsdager.${index}.hasClickedVidere`, null)
                        }}
                    />
                )}
            </section>
            {hasClickedVidere === true && (
                <EgenmeldingerField
                    index={index + 1}
                    metadata={metadata}
                    previous={{
                        earliestSelectedDate: sortedDates ? sortedDates[0] : null,
                        earliestPossibleDate: earliestPossibleDate,
                    }}
                    editSentEgenmelding={editSentEgenmelding}
                />
            )}
        </>
    )
}

function VidereButtonField({ index, missingDates }: { index: number; missingDates: boolean }): JSX.Element {
    const { field, fieldState } = useController<
        EgenmeldingsdagerSubForm,
        `egenmeldingsdager.${number}.hasClickedVidere`
    >({
        name: `egenmeldingsdager.${index}.hasClickedVidere`,
        rules: {
            required: 'Du må klikke deg videre når du har valgt datoene du har brukt egenmelding på',
        },
        defaultValue: null,
    })

    return (
        <>
            <Button
                type="button"
                variant="secondary"
                onClick={() => {
                    if (missingDates) {
                        field.onChange(false)
                    } else {
                        field.onChange(true)
                    }
                }}
            >
                Videre
            </Button>
            {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
        </>
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
    editSentEgenmelding: boolean,
    list?: readonly EgenmeldingsdagerFormValue[] | null,
): EgenmeldingsdagerFormValue[] | null {
    if (list == null) return null

    if (editSentEgenmelding) {
        return R.pipe(
            list,
            R.take(index + 1),
            R.concat([
                {
                    harPerioder: null,
                    datoer: null,
                    hasClickedVidere: null,
                },
            ]),
        )
    }

    return R.pipe(list, R.take(index + 1))
}

export default EgenmeldingerField
