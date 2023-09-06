import { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Radio, RadioGroup } from '@navikt/ds-react'

import { FormValues } from '../../SendSykmeldingForm'
import { QuestionWrapper } from '../../../FormComponents/FormStructure'
import { arbeidsSituasjonEnumToText, sporsmal } from '../../../../utils/sporsmal'
import { ArbeidssituasjonType } from '../../../../fetching/graphql.generated'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

interface Props {
    harAvventendePeriode: boolean
}

function ArbeidssituasjonField({ harAvventendePeriode }: Props): ReactElement {
    const { setValue } = useFormContext<FormValues>()
    const { field, fieldState } = useController<FormValues>({
        name: 'arbeidssituasjon',
        rules: { required: 'Du må svare på hvilket arbeid du er sykmeldt fra.' },
        shouldUnregister: true,
        defaultValue: null,
    })

    return (
        <QuestionWrapper>
            <RadioGroup
                {...field}
                id={field.name}
                legend={sporsmal.arbeidssituasjon}
                onChange={(value: ArbeidssituasjonType) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: { skjemanavn: 'arbeidssituasjon', spørsmål: 'Jeg er sykmeldt som', svar: value },
                    })
                    field.onChange(value)

                    if (value !== ArbeidssituasjonType.ARBEIDSTAKER) {
                        setValue('egenmeldingsdager', null)
                    }
                }}
                error={fieldState.error?.message}
            >
                {/* This is not mapped directly from the enum values because we want to dictate the order */}
                <Radio value={ArbeidssituasjonType.ARBEIDSTAKER}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.ARBEIDSTAKER)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.FRILANSER}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.FRILANSER)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.NAERINGSDRIVENDE}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.NAERINGSDRIVENDE)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.ARBEIDSLEDIG}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.ARBEIDSLEDIG)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.PERMITTERT}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.PERMITTERT)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.ANNET}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.ANNET)}
                </Radio>
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default ArbeidssituasjonField
