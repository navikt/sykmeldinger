import React, { ReactNode } from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { UseControllerProps } from 'react-hook-form/dist/types/controller'

import { FormValues } from '../../SendSykmeldingForm'
import { YesOrNo } from '../../../../fetching/graphql.generated'

import styles from './YesNoField.module.css'

interface Props {
    name:
        | 'erOpplysningeneRiktige'
        | 'riktigNarmesteLeder'
        | 'harBruktEgenmelding'
        | 'harForsikring'
        | `egenmeldingsdager.${number}.harPerioder`
    legend: string
    subtext?: string | ReactNode
    onChange?: (value: YesOrNo) => void
    rules?: UseControllerProps['rules']
    shouldUnregister?: boolean
}

function YesNoField({ name, legend, subtext, onChange, rules, shouldUnregister = true }: Props): JSX.Element {
    const { field, fieldState } = useController<FormValues>({
        name,
        rules,
        shouldUnregister,
        defaultValue: null,
    })

    return (
        <RadioGroup
            {...field}
            id={field.name}
            legend={legend}
            error={fieldState.error?.message}
            onChange={(value: YesOrNo) => {
                field.onChange(value)
                onChange?.(value)
            }}
        >
            {subtext && <div className={styles.subText}>{subtext}</div>}
            <Radio value={YesOrNo.YES}>Ja</Radio>
            <Radio value={YesOrNo.NO}>Nei</Radio>
        </RadioGroup>
    )
}

export default YesNoField
