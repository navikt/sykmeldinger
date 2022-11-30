import React from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { UseControllerProps } from 'react-hook-form/dist/types/controller'

import { FormValues } from '../../SendSykmeldingForm'
import { YesOrNo } from '../../../../fetching/graphql.generated'

interface Props {
    name: 'erOpplysningeneRiktige' | 'riktigNarmesteLeder'
    legend: string
    onChange?: (value: YesOrNo) => void
    rules?: UseControllerProps['rules']
}

function YesNoField({ name, legend, onChange, rules }: Props): JSX.Element {
    const { field, fieldState } = useController<FormValues>({
        name,
        rules,
    })

    return (
        <RadioGroup
            {...field}
            legend={legend}
            error={fieldState.error?.message}
            onChange={(value: YesOrNo) => {
                field.onChange(value)
                onChange?.(value)
            }}
        >
            <Radio value={YesOrNo.Yes}>Ja</Radio>
            <Radio value={YesOrNo.No}>Nei</Radio>
        </RadioGroup>
    )
}

export default YesNoField
