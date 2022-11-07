import React from 'react'
import { Label, Button, ErrorMessage, Radio, RadioGroup, UNSAFE_DatePicker } from '@navikt/ds-react'
import { sub } from 'date-fns'
import { useController } from 'react-hook-form'

import { FormShape } from '../Form'
import { formatDatePeriod, toDate } from '../../../../../../utils/dateUtils'

import styles from './EgenmeldingsperioderForKortePerioderOgSånt.module.css'

interface Props {
    index: number
    sykmeldingFom: Date | string
    arbeidsgiver: string
}

function EgenmeldingsperioderForKortePerioderOgSånt({ index, sykmeldingFom, arbeidsgiver }: Props): JSX.Element {
    const firstPossibleDate = toDate(sykmeldingFom)
    const lastPossibleDate = sub(firstPossibleDate, { days: 15 })

    const { field: jaNeiField, fieldState: jaNeiFieldState } = useController<
        FormShape,
        `harEgenmeldingsperioder.${number}.harPerioder`
    >({
        name: `harEgenmeldingsperioder.${index}.harPerioder`,
        defaultValue: null,
        rules: {
            required: 'Du må svare på om du har egenmeldingsperioder',
        },
    })
    const { field: datoerField, fieldState: datoerFieldState } = useController<
        FormShape,
        `harEgenmeldingsperioder.${number}.datoer`
    >({
        name: `harEgenmeldingsperioder.${index}.datoer`,
        defaultValue: [],
        rules: {
            validate: (value) => {
                if (jaNeiField.value == 'Ja' && (value == null || value.length === 0)) {
                    return 'Du velge legge til minst en dato'
                }

                return undefined
            },
        },
    })
    const { field: videreField, fieldState: videreFieldState } = useController<
        FormShape,
        `harEgenmeldingsperioder.${number}.hasClickedVidere`
    >({
        name: `harEgenmeldingsperioder.${index}.hasClickedVidere`,
        defaultValue: null,
        rules: {
            validate: (value) => {
                if (jaNeiField.value == 'Ja' && value == null) {
                    return 'Klikk videre når du er ferdig å velge datoer'
                }

                return undefined
            },
        },
    })

    return (
        <div>
            <RadioGroup
                name={jaNeiField.name}
                legend={`Var du syk med egenmelding hos ${arbeidsgiver} i perioden ${formatDatePeriod(
                    lastPossibleDate,
                    firstPossibleDate,
                )}`}
                value={jaNeiField.value}
                onChange={(value: 'Ja' | 'Nei') => {
                    jaNeiField.onChange(value)
                }}
                error={jaNeiFieldState.error?.message}
            >
                <Radio value="Ja">Ja</Radio>
                <Radio value="Nei">Nei</Radio>
            </RadioGroup>
            {jaNeiField.value == 'Ja' && (
                <div className={styles.datePickerSection}>
                    <Label>Velg dagene du var syk med egenmelding</Label>
                    <UNSAFE_DatePicker.Standalone
                        mode="multiple"
                        min={1}
                        max={16}
                        selected={datoerField.value ?? []}
                        onSelect={(value) => {
                            datoerField.onChange(value)
                        }}
                        toDate={firstPossibleDate}
                        fromDate={lastPossibleDate}
                    />
                    {datoerFieldState.error && <ErrorMessage>{datoerFieldState.error?.message}</ErrorMessage>}
                </div>
            )}
            {jaNeiField.value == 'Ja' &&
                videreField.value != true &&
                datoerField.value &&
                datoerField.value.length > 0 && (
                    <>
                        <Button type="button" onClick={() => videreField.onChange(true)}>
                            Videre
                        </Button>
                        {videreFieldState.error && <ErrorMessage>{videreFieldState.error?.message}</ErrorMessage>}
                    </>
                )}
            {jaNeiField.value == 'Ja' && videreField.value == true && (
                <EgenmeldingsperioderForKortePerioderOgSånt
                    index={index + 1}
                    sykmeldingFom={sub(lastPossibleDate, { days: 1 })}
                    arbeidsgiver={arbeidsgiver}
                />
            )}
        </div>
    )
}

export default EgenmeldingsperioderForKortePerioderOgSånt
