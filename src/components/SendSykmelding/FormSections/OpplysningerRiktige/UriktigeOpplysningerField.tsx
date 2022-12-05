import React from 'react'
import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { FormValues } from '../../SendSykmeldingForm'
import { UriktigeOpplysningerType } from '../../../../fetching/graphql.generated'
import { QuestionWrapper } from '../shared/FormStructure'
import { sporsmolOgSvar, uriktigeOpplysningerEnumToText } from '../../../../utils/sporsmolOgSvar'

function UriktigeOpplysningerField(): JSX.Element {
    const { field, fieldState } = useController<FormValues, 'uriktigeOpplysninger'>({
        name: 'uriktigeOpplysninger',
        rules: {
            validate: (value) =>
                value == null || value.length <= 0 ? 'Du må svare på hvilke opplysninger som ikke stemmer.' : undefined,
        },
        shouldUnregister: true,
        defaultValue: null,
    })

    return (
        <QuestionWrapper>
            <CheckboxGroup
                {...field}
                value={field.value ?? []}
                id={field.name}
                legend={sporsmolOgSvar.uriktigeOpplysninger.sporsmaltekst}
                error={fieldState.error?.message}
            >
                {/* This is not mapped directly from the enum values because we want to dictate the order */}
                <Checkbox value={UriktigeOpplysningerType.Periode}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.Periode)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.SykmeldingsgradForLav}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.SykmeldingsgradForLav)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.SykmeldingsgradForHoy}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.SykmeldingsgradForHoy)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.Arbeidsgiver}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.Arbeidsgiver)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.Diagnose}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.Diagnose)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.AndreOpplysninger}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.AndreOpplysninger)}
                </Checkbox>
            </CheckboxGroup>
        </QuestionWrapper>
    )
}

export default UriktigeOpplysningerField
