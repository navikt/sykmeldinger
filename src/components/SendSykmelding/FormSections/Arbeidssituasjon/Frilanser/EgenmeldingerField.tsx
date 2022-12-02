import React, { useLayoutEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button, Label } from '@navikt/ds-react'
import { Add } from '@navikt/ds-icons'

import { FormValues } from '../../../SendSykmeldingForm'
import { QuestionWrapper } from '../../shared/FormStructure'
import { sporsmolOgSvar } from '../../../../../utils/sporsmolOgSvar'

import EgenmeldingPeriodSubField from './EgenmeldingPeriodSubField'
import styles from './EgenmeldingerField.module.css'

export type EgenmeldingField = `egenmeldingsperioder.${number}`

interface Props {
    oppfolgingsdato: string
}

function EgenmeldingerField({ oppfolgingsdato }: Props): JSX.Element {
    const { control } = useFormContext<FormValues>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'egenmeldingsperioder',
        shouldUnregister: true,
    })

    // useFieldArray doesn't allow us to set an initial value, so we have to do it manually on mount
    useLayoutEffect(() => {
        append({ fom: null, tom: null })
    }, [append])

    return (
        <QuestionWrapper>
            <Label as="h3">{sporsmolOgSvar.egenmeldingsperioder.sporsmaltekst(oppfolgingsdato)}</Label>
            <div className={styles.dateFieldsWrapper}>
                {fields.map((field, index) => (
                    <EgenmeldingPeriodSubField
                        key={field.id}
                        index={index}
                        remove={remove}
                        otherPeriods={fields.filter((it) => it.id !== field.id)}
                    />
                ))}
            </div>
            <Button
                className={styles.addPeriodButton}
                variant="tertiary"
                icon={<Add role="img" aria-hidden />}
                type="button"
                onClick={() => append({ fom: null, tom: null })}
            >
                Legg til ekstra periode
            </Button>
        </QuestionWrapper>
    )
}

export default EgenmeldingerField
