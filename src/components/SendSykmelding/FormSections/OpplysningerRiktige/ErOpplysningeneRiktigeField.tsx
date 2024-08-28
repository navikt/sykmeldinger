import { ReactElement } from 'react'

import { sporsmal } from '../../../../utils/sporsmal'
import { QuestionWrapper } from '../../../FormComponents/FormStructure'
import YesNoField from '../../../FormComponents/YesNoField/YesNoField'
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
            />
        </QuestionWrapper>
    )
}

export default ErOpplysningeneRiktigeField
