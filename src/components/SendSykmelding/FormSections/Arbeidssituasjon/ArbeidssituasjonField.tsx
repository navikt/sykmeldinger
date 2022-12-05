import React from 'react'
import { useController } from 'react-hook-form'
import { Radio, RadioGroup } from '@navikt/ds-react'

import { FormValues } from '../../SendSykmeldingForm'
import { QuestionWrapper } from '../shared/FormStructure'
import { arbeidsSituasjonEnumToText, sporsmolOgSvar } from '../../../../utils/sporsmolOgSvar'
import { ArbeidssituasjonType } from '../../../../fetching/graphql.generated'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

interface Props {
    harAvventendePeriode: boolean
}

function ArbeidssituasjonField({ harAvventendePeriode }: Props): JSX.Element {
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
                legend={sporsmolOgSvar.arbeidssituasjon.sporsmaltekst}
                onChange={(value: ArbeidssituasjonType) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: { skjemanavn: 'arbeidssituasjon', spørsmål: 'Jeg er sykmeldt som', svar: value },
                    })
                    field.onChange(value)
                }}
                error={fieldState.error?.message}
            >
                {/* This is not mapped directly from the enum values because we want to dictate the order */}
                <Radio value={ArbeidssituasjonType.Arbeidstaker}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.Arbeidstaker)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Frilanser}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.Frilanser)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Naeringsdrivende}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.Naeringsdrivende)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Arbeidsledig}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.Arbeidsledig)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Permittert}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.Permittert)}
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Annet}>
                    {arbeidsSituasjonEnumToText(ArbeidssituasjonType.Annet)}
                </Radio>
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default ArbeidssituasjonField
