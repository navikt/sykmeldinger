import React from 'react'
import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { FormValues } from '../../SendSykmeldingForm'
import { UriktigeOpplysningerType } from '../../../../fetching/graphql.generated'
import QuestionWrapper from '../shared/QuestionWrapper'

function UriktigeOpplysningerField(): JSX.Element {
    const { field, fieldState } = useController<FormValues, 'uriktigeOpplysninger'>({
        name: 'uriktigeOpplysninger',
        rules: {
            validate: (value) =>
                value == null || value.length <= 0 ? 'Du må svare på hvilke opplysninger som ikke stemmer.' : undefined,
        },
    })

    return (
        <QuestionWrapper>
            <CheckboxGroup
                {...field}
                value={field.value ?? []}
                id={field.name}
                legend="Hvilke opplysninger stemmer ikke?"
                error={fieldState.error?.message}
            >
                <Checkbox value={UriktigeOpplysningerType.Periode}>Periode</Checkbox>
                <Checkbox value={UriktigeOpplysningerType.SykmeldingsgradForLav}>Sykmeldingsgraden er for lav</Checkbox>
                <Checkbox value={UriktigeOpplysningerType.SykmeldingsgradForHoy}>Sykmeldingsgraden er for høy</Checkbox>
                <Checkbox value={UriktigeOpplysningerType.Arbeidsgiver}>Arbeidsgiver</Checkbox>
                <Checkbox value={UriktigeOpplysningerType.Diagnose}>Diagnose</Checkbox>
                <Checkbox value={UriktigeOpplysningerType.AndreOpplysninger}>Andre opplysninger</Checkbox>
            </CheckboxGroup>
        </QuestionWrapper>
    )
}

export default UriktigeOpplysningerField
