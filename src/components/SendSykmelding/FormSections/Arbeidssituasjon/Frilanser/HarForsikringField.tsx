import React from 'react'

import { QuestionWrapper } from '../../shared/FormStructure'
import YesNoField from '../../shared/YesNoField'
import { sporsmal } from '../../../../../utils/sporsmal'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'

function HarForsikringField(): JSX.Element {
    return (
        <QuestionWrapper>
            <YesNoField
                name="harForsikring"
                legend={sporsmal.harForsikring}
                rules={{
                    required:
                        'Du må svare på om du har forsikring som gjelder for de første 16 dagene av sykefraværet.',
                }}
                onChange={(value) => {
                    logAmplitudeEvent(
                        {
                            eventName: 'skjema spørsmål besvart',
                            data: {
                                skjemanavn: 'åpen sykmelding',
                                spørsmål: sporsmal.harForsikring,
                                svar: value,
                            },
                        },
                        { newForm: true },
                    )
                }}
            />
        </QuestionWrapper>
    )
}

export default HarForsikringField
