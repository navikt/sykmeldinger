import React, { ReactElement } from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController, useFormContext } from 'react-hook-form'

import { SykmeldingFragment } from 'queries'

import { QuestionWrapper, SectionWrapper } from '../../../../FormComponents/FormStructure'
import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { FormValues } from '../../../SendSykmeldingForm'

interface Props {
    arbeidsgivere: NonNullable<SykmeldingFragment['tidligereArbeidsgiverList']>
}

function ArbeidsledigArbeidsgiverField({ arbeidsgivere }: Props): ReactElement {
    const { setValue } = useFormContext<FormValues>()
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
                        const tidligereOrgNavn = value && arbeidsgivere.find((ag) => ag?.orgnummer === value)?.orgNavn
                        field.onChange(value)
                        setValue('arbeidsledig.arbeidsledigOrgnavn', tidligereOrgNavn)
                    }}
                    error={fieldState.error?.message}
                >
                    {arbeidsgivere.map((arbeidsgiver) => (
                        <Radio
                            key={arbeidsgiver?.orgnummer}
                            value={arbeidsgiver?.orgnummer}
                            className="overflow-anywhere"
                            description={`org.nr: ${arbeidsgiver?.orgnummer}`}
                        >
                            {arbeidsgiver?.orgNavn}
                        </Radio>
                    ))}
                </RadioGroup>
            </QuestionWrapper>
        </SectionWrapper>
    )
}

export default ArbeidsledigArbeidsgiverField
