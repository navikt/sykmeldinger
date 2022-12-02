import React from 'react'
import { useController } from 'react-hook-form'
import { Radio, RadioGroup } from '@navikt/ds-react'

import { FormValues } from '../../SendSykmeldingForm'
import { QuestionWrapper } from '../shared/FormStructure'
import { sporsmolOgSvar } from '../../../../utils/sporsmolOgSvar'
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
                <Radio value={ArbeidssituasjonType.Arbeidstaker}>ansatt</Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Frilanser}>
                    frilanser
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Naeringsdrivende}>
                    selvstendig næringsdrivende
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Arbeidsledig}>
                    arbeidsledig
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Permittert}>
                    permittert
                </Radio>
                <Radio disabled={harAvventendePeriode} value={ArbeidssituasjonType.Annet}>
                    annet
                </Radio>
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default ArbeidssituasjonField
