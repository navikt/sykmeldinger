import React from 'react'

import { sporsmolOgSvar } from '../../../../utils/sporsmolOgSvar'
import QuestionWrapper from '../shared/QuestionWrapper'
import YesNoField from '../shared/YesNoField'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

function ErOpplysningeneRiktige(): JSX.Element {
    return (
        <QuestionWrapper>
            <YesNoField
                name="erOpplysningeneRiktige"
                legend={sporsmolOgSvar.erOpplysningeneRiktige.sporsmaltekst}
                rules={{
                    required: 'Du må svare på om opplysningene i sykmeldingen er riktige.',
                }}
                onChange={(value) => {
                    logAmplitudeEvent(
                        { eventName: 'skjema startet', data: { skjemanavn: 'åpen sykmelding' } },
                        { 'stemmer opplysningene': value },
                    )
                }}
            />
        </QuestionWrapper>
    )
}

export default ErOpplysningeneRiktige
