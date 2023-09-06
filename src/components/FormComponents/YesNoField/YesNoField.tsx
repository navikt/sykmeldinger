import { ReactElement, ReactNode } from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { UseControllerProps } from 'react-hook-form/dist/types/controller'
import { FieldPath, FieldPathValue, FieldValues } from 'react-hook-form/dist/types'

import { YesOrNo } from '../../../fetching/graphql.generated'

interface Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TName
    legend: string
    subtext?: string | ReactNode
    onChange?: (value: YesOrNo) => void
    defaultValue?: FieldPathValue<TFieldValues, TName>
    rules?: UseControllerProps['rules']
    shouldUnregister?: boolean
}

function YesNoField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    name,
    legend,
    subtext,
    onChange,
    defaultValue,
    rules,
    shouldUnregister = true,
}: Props<TFieldValues, TName>): ReactElement {
    const { field, fieldState } = useController<TFieldValues, TName>({
        name,
        rules,
        shouldUnregister,
        defaultValue,
    })

    return (
        <RadioGroup
            {...field}
            id={field.name}
            legend={legend}
            error={fieldState.error?.message}
            onChange={(value: YesOrNo) => {
                field.onChange(value as FieldPathValue<TFieldValues, TName>)
                onChange?.(value)
            }}
        >
            {subtext && <div className="mb-2">{subtext}</div>}
            <Radio value={YesOrNo.YES}>Ja</Radio>
            <Radio value={YesOrNo.NO}>Nei</Radio>
        </RadioGroup>
    )
}

export default YesNoField
