import { Button, ErrorMessage, Label, UNSAFE_DatePicker } from '@navikt/ds-react'
import { useController, UseFieldArrayAppend, useFormContext } from 'react-hook-form'
import { endOfMonth, isSameMonth, startOfMonth, sub } from 'date-fns'

import { FormValues } from '../../../SendSykmeldingForm'
import { sortDatesASC, toDate } from '../../../../../utils/dateUtils'
import { YesOrNo } from '../../../../../fetching/graphql.generated'

import HarbruktEgenmelding from './HarbruktEgenmelding'
import ValgtEgenmeldingsdager from './ValgtEgenmeldingsdager'
import styles from './EgenmeldingerField.module.css'

interface Props {
    index: number
    sykmeldingFom: Date | string
    arbeidsgiverNavn: string
    append: UseFieldArrayAppend<FormValues, 'egenmeldingsperioderAnsatt'>
}

function EgenmeldingerField({ index, sykmeldingFom, arbeidsgiverNavn, append }: Props): JSX.Element {
    const { watch } = useFormContext<FormValues>()
    const egenmeldingsperioderAnsatt = watch('egenmeldingsperioderAnsatt')
    const harPerioder: YesOrNo | null = watch(`egenmeldingsperioderAnsatt.${index}.harPerioder`)

    const firstPossibleDate: Date = sub(toDate(sykmeldingFom), { days: index * 16 + 1 })
    const lastPossibleDate: Date = sub(firstPossibleDate, { days: 15 }) // TODO: back to previous sykmelding | ?

    const { field: datoerField, fieldState: datoerFieldState } = useController<
        FormValues,
        `egenmeldingsperioderAnsatt.${number}.datoer`
    >({
        name: `egenmeldingsperioderAnsatt.${index}.datoer`,
        defaultValue: [],
        rules: {
            validate: (value) => {
                if (harPerioder === YesOrNo.YES && (!value || value.length === 0)) {
                    return 'Du må velge minst en dato'
                }
                return undefined
            },
        },
    })

    const { field: videreField } = useController<FormValues, `egenmeldingsperioderAnsatt.${number}.hasClickedVidere`>({
        name: `egenmeldingsperioderAnsatt.${index}.hasClickedVidere`,
        defaultValue: null,
    })

    const sortedDates: Date[] | null =
        datoerField.value && datoerField.value?.length > 0 ? sortDatesASC(datoerField.value) : null

    const hasPeriod: boolean = harPerioder === YesOrNo.YES
    const missingDates: boolean = !datoerField.value || datoerField.value.length === 0
    const missingDatesOnVidereClick: boolean = missingDates && videreField.value === false && !datoerFieldState.error

    return (
        <div className="egenmeldingsperiod-ansatt">
            <HarbruktEgenmelding
                index={index}
                arbeidsgiverNavn={arbeidsgiverNavn}
                lastPossibleDate={lastPossibleDate}
                firstPossibleDate={firstPossibleDate}
                datoerField={datoerField}
            />
            {hasPeriod && videreField.value !== true && (
                <div className={styles.velgDager}>
                    <Label>Velg dagene du brukte egenmelding</Label>
                    {!isSameMonth(lastPossibleDate, firstPossibleDate) && window.innerWidth >= 768 ? (
                        <div className={styles.twoDatepickers}>
                            <UNSAFE_DatePicker.Standalone
                                mode="multiple"
                                selected={datoerField.value ?? []}
                                onSelect={(value) => {
                                    datoerField.onChange(value)
                                }}
                                fromDate={lastPossibleDate}
                                toDate={endOfMonth(lastPossibleDate)}
                            />
                            <UNSAFE_DatePicker.Standalone
                                mode="multiple"
                                selected={datoerField.value ?? []}
                                onSelect={(value) => {
                                    datoerField.onChange(value)
                                }}
                                fromDate={startOfMonth(firstPossibleDate)}
                                toDate={firstPossibleDate}
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
                            fromDate={lastPossibleDate}
                            toDate={firstPossibleDate}
                        />
                    )}
                    {datoerFieldState.error && (
                        <ErrorMessage className={styles.datoError}>{datoerFieldState.error?.message}</ErrorMessage>
                    )}
                    <>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                if (missingDates) {
                                    videreField.onChange(false)
                                } else {
                                    videreField.onChange(true)
                                    if (
                                        egenmeldingsperioderAnsatt?.[egenmeldingsperioderAnsatt.length - 1]
                                            .hasClickedVidere === true
                                    ) {
                                        append({ harPerioder: null, datoer: null, hasClickedVidere: null })
                                    }
                                }
                            }}
                        >
                            Videre
                        </Button>
                        {missingDatesOnVidereClick && (
                            <ErrorMessage className={styles.videreError}>Du må velge minst en dato</ErrorMessage>
                        )}
                    </>
                </div>
            )}
            {hasPeriod && videreField.value === true && sortedDates && sortedDates.length > 0 && (
                <ValgtEgenmeldingsdager dates={sortedDates} videreField={videreField} />
            )}
        </div>
    )
}

export default EgenmeldingerField
