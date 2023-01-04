import React from 'react'

import { sporsmal } from '../../../../utils/sporsmal'
import { QuestionWrapper } from '../shared/FormStructure'
import YesNoField from '../shared/YesNoField'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'

function ErOpplysningeneRiktigeField(): JSX.Element {
    return (
        <QuestionWrapper>
            <YesNoField
                name="erOpplysningeneRiktige"
                legend={sporsmal.erOpplysningeneRiktige}
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

export default ErOpplysningeneRiktigeField
