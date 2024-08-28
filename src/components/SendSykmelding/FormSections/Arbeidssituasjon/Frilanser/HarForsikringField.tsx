import { ReactElement } from 'react'

import { QuestionWrapper } from '../../../../FormComponents/FormStructure'
import YesNoField from '../../../../FormComponents/YesNoField/YesNoField'
import { sporsmal } from '../../../../../utils/sporsmal'
import { FormValues } from '../../../SendSykmeldingForm'

function HarForsikringField(): ReactElement {
    return (
        <QuestionWrapper>
            <YesNoField<FormValues>
                name="harForsikring"
                legend={sporsmal.harForsikring}
                rules={{
                    required:
                        'Du må svare på om du har forsikring som gjelder for de første 16 dagene av sykefraværet.',
                }}
            />
        </QuestionWrapper>
    )
}

export default HarForsikringField
