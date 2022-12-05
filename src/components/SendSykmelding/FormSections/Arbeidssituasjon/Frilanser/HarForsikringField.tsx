import React from 'react'

import { QuestionWrapper } from '../../shared/FormStructure'
import YesNoField from '../../shared/YesNoField'
import { sporsmolOgSvar } from '../../../../../utils/sporsmolOgSvar'
import { logAmplitudeEvent } from '../../../../../amplitude/amplitude'

function HarForsikringField(): JSX.Element {
    return (
        <QuestionWrapper>
            <YesNoField
                name="harForsikring"
                legend={sporsmolOgSvar.harForsikring.sporsmaltekst}
                rules={{
                    required: 'Du må svare på om du har forsikring som gjelder for de første 16 dagene av sykefraværet',
                }}
                onChange={(value) => {
                    logAmplitudeEvent({
                        eventName: 'skjema spørsmål besvart',
                        data: {
                            skjemanavn: 'åpen sykmelding',
                            spørsmål: sporsmolOgSvar.harForsikring.sporsmaltekst,
                            svar: value,
                        },
                    })
                }}
            />
        </QuestionWrapper>
    )
}

export default HarForsikringField
