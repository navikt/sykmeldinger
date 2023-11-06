import { ReactElement } from 'react'
import { Checkbox, CheckboxGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { UriktigeOpplysningerType } from 'queries'

import { FormValues } from '../../SendSykmeldingForm'
import { QuestionWrapper } from '../../../FormComponents/FormStructure'
import { sporsmal, uriktigeOpplysningerEnumToText } from '../../../../utils/sporsmal'

function UriktigeOpplysningerField(): ReactElement {
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
                legend={sporsmal.uriktigeOpplysninger}
                error={fieldState.error?.message}
            >
                {/* This is not mapped directly from the enum values because we want to dictate the order */}
                <Checkbox value={UriktigeOpplysningerType.PERIODE}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.PERIODE)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_LAV}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_LAV)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_HOY}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_HOY)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.ARBEIDSGIVER}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.ARBEIDSGIVER)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.DIAGNOSE}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.DIAGNOSE)}
                </Checkbox>
                <Checkbox value={UriktigeOpplysningerType.ANDRE_OPPLYSNINGER}>
                    {uriktigeOpplysningerEnumToText(UriktigeOpplysningerType.ANDRE_OPPLYSNINGER)}
                </Checkbox>
            </CheckboxGroup>
        </QuestionWrapper>
    )
}

export default UriktigeOpplysningerField
