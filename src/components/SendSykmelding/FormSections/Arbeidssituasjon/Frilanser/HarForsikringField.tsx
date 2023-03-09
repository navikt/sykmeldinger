import React from 'react'

import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import YesNoField from '../../../../FormComponents/YesNoField/YesNoField'
import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'
import { FormValues } from '../../../SendSykmeldingForm'

function HarForsikringField(): JSX.Element {
    return (
        <QuestionWrapper>
            <YesNoField<FormValues>
                name="harForsikring"
                legend={sporsmal.harForsikring}
                rules={{
                    required:
                        'Du må svare på om du har forsikring som gjelder for de første 16 dagene av sykefraværet.',
                }}
                onChange={(value) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'åpen sykmelding',
                            spørsmål: sporsmal.harForsikring,
                            svar: value,
                        },
                    })
                }}
                defaultValue={null}
            />
        </QuestionWrapper>
    )
}

export default HarForsikringField
