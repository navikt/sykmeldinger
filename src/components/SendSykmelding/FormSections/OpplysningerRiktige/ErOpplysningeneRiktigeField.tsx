import { ReactElement } from 'react'

import { sporsmal } from '../../../../utils/sporsmal'
import { QuestionWrapper } from '../../../FormComponents/FormStructure'
import YesNoField from '../../../FormComponents/YesNoField/YesNoField'
import { logAmplitudeEvent } from '../../../../amplitude/amplitude'
import { FormValues } from '../../SendSykmeldingForm'

function ErOpplysningeneRiktigeField(): ReactElement {
    return (
        <QuestionWrapper>
            <YesNoField<FormValues>
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
                defaultValue={null}
            />
        </QuestionWrapper>
    )
}

export default ErOpplysningeneRiktigeField
