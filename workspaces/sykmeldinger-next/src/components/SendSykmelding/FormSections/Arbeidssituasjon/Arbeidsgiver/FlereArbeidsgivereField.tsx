import React, { ReactElement } from 'react'
import { RadioGroup, Radio, ReadMore } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { YesOrNo } from 'queries'

import { FormValues } from '../../../SendSykmeldingForm'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { sporsmal } from '../../../../../utils/sporsmal'
import { QuestionWrapper } from '../../../../FormComponents/FormStructure'

function FlereArbeidsgivereField(): ReactElement {
    const { field, fieldState } = useController<FormValues>({
        name: 'erSykmeldtFraFlereArbeidsforhold',
        rules: { required: 'Du må svare på om du har flere arbeidsforhold.' },
    })

    return (
        <QuestionWrapper>
            <RadioGroup
                {...field}
                id={field.name}
                legend={sporsmal.erSykmeldtFraFlereArbeidsforhold}
                onChange={(value: YesOrNo) => {
                    field.onChange(value)
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'trenger flere sykmeldinger',
                            spørsmål: sporsmal.erSykmeldtFraFlereArbeidsforhold,
                            svar: value,
                        },
                    })
                }}
                error={fieldState.error?.message}
            >
                <ReadMore header="Hvorfor spør vi om dette?">
                    Du er registrert med flere aktive arbeidsforhold i Aa-registeret, men har bare én ny sykmelding.
                </ReadMore>
                <Radio value={YesOrNo.YES}>Ja</Radio>
                <Radio value={YesOrNo.NO}>Nei</Radio>
            </RadioGroup>
        </QuestionWrapper>
    )
}

export default FlereArbeidsgivereField
