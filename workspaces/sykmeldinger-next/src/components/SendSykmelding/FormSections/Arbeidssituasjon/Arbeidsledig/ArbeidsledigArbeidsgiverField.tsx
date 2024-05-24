import React, { ReactElement } from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { TidligereArbeidsgiver } from 'queries'

import { QuestionWrapper, SectionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { FormValues } from '../../../SendSykmeldingForm'

interface Props {
    arbeidsgivere: readonly TidligereArbeidsgiver[]
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
                    onChange={(value) => {
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
                    {arbeidsgivere.map((arbeidsgiver: TidligereArbeidsgiver) => (
                        <Radio
                            key={arbeidsgiver?.orgnummer}
                            value={arbeidsgiver?.orgnummer}
                            className="overflow-anywhere"
                            description={`org.nr: ${arbeidsgiver?.orgnummer}`}
                        >
                            {arbeidsgiver?.orgNavn}
                        </Radio>
                    ))}
                    <Radio key="ikke-relevant" value="ingen" className="overflow-anywhere">
                        Ikke relevant
                    </Radio>
                </RadioGroup>
            </QuestionWrapper>
        </SectionWrapper>
    )
}

export default ArbeidsledigArbeidsgiverField
