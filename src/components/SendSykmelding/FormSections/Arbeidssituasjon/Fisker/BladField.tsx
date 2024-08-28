import React, { ReactElement } from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { ArbeidssituasjonType } from 'queries'

import { sporsmal } from '../../../../../utils/sporsmal'
import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import { FormValues } from '../../../SendSykmeldingForm'

function BladField(): ReactElement {
    const { field, fieldState } = useController<FormValues>({
        name: 'fisker.blad',
        rules: { required: 'Du må svare på hvilket blad' },
    })

    return (
        <QuestionWrapper>
            <RadioGroup
                {...field}
                id={field.name}
                legend={sporsmal.fisker.velgBlad}
                onChange={(value: ArbeidssituasjonType) => {
                    field.onChange(value)
                }}
                error={fieldState.error?.message}
            >
                <Radio value="A">Blad A (biyrkefisker)</Radio>
                <Radio value="B">Blad B (hovedyrkefisker)</Radio>
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default BladField
