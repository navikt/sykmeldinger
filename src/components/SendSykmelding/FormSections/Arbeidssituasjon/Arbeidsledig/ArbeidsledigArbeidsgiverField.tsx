import React, { ReactElement } from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { ArbeidssituasjonType } from 'queries'

import { QuestionWrapper, SectionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { FormValues } from '../../../SendSykmeldingForm'
import { PossibleArbeidsgiver } from '../../../../../hooks/useFindRelevantArbeidsgivere'

interface Props {
    arbeidsgivere: PossibleArbeidsgiver[]
}

function ArbeidsledigArbeidsgiverField({ arbeidsgivere }: Props): ReactElement | null {
    const { field, fieldState } = useController<FormValues>({
        name: 'arbeidsledig.arbeidsledigFraOrgnummer',
        rules: { required: 'Du må svare på hvilket arbeid du har blitt arbeidsledig fra.' },
    })

    return (
        <SectionWrapper>
            <QuestionWrapper>
                <RadioGroup
                    {...field}
                    id={field.name}
                    legend={sporsmal.arbeidsledigFra}
                    onChange={(value: ArbeidssituasjonType) => {
                        logAmplitudeEvent({
                            eventName: 'skjema spørsmål besvart',
                            data: {
                                skjemanavn: 'endret arbeidssituasjon',
                                spørsmål: sporsmal.arbeidsledigFra,
                                svar: value,
                            },
                        })
                        field.onChange(value)
                    }}
                    error={fieldState.error?.message}
                >
                    {arbeidsgivere.map((arbeidsgiver: PossibleArbeidsgiver) => (
                        <Radio
                            key={arbeidsgiver?.orgnummer}
                            value={arbeidsgiver?.orgnummer}
                            className="overflow-anywhere"
                            description={`org.nr: ${arbeidsgiver?.orgnummer}`}
                        >
                            {arbeidsgiver?.navn}
                        </Radio>
                    ))}
                </RadioGroup>
            </QuestionWrapper>
        </SectionWrapper>
    )
}

export default ArbeidsledigArbeidsgiverField
