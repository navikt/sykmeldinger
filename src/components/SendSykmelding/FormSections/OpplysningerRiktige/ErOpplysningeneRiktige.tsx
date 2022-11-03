import React from 'react'

import { useAmplitude } from '../../../../amplitude/amplitude'
import { sporsmolOgSvar } from '../../../../utils/sporsmolOgSvar'
import QuestionWrapper from '../shared/QuestionWrapper'
import YesNoField from '../shared/YesNoField'

function ErOpplysningeneRiktige(): JSX.Element {
    const logEvent = useAmplitude()

    return (
        <QuestionWrapper>
            <YesNoField
                name="erOpplysningeneRiktige"
                legend={sporsmolOgSvar.erOpplysningeneRiktige.sporsmaltekst}
                rules={{
                    required: 'Du må svare på om opplysningene i sykmeldingen er riktige.',
                }}
                onChange={(value) => {
                    logEvent(
                        { eventName: 'skjema startet', data: { skjemanavn: 'åpen sykmelding' } },
                        { 'stemmer opplysningene': value },
                    )
                }}
            />
        </QuestionWrapper>
    )
}

export default ErOpplysningeneRiktige
