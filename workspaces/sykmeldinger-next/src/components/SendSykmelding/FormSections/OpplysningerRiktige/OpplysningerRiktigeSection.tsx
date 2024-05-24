import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { YesOrNo } from 'queries'

import { FormValues } from '../../SendSykmeldingForm'
import { getTrengerNySykmelding } from '../shared/sykmeldingUtils'
import { SectionWrapper } from '../../../FormComponents/FormStructure'

import UriktigeOpplysningerField from './UriktigeOpplysningerField'
import ErOpplysningeneRiktigeField from './ErOpplysningeneRiktigeField'
import UriktigeOpplysningerInfo from './UriktigeOpplysningerInfo'

function OpplysningerRiktigeSection(): ReactElement {
    const { watch } = useFormContext<FormValues>()

    const [erOpplysningeneRiktige, uriktigeOpplysninger] = watch(['erOpplysningeneRiktige', 'uriktigeOpplysninger'])
    const trengerNySykmelding = getTrengerNySykmelding(uriktigeOpplysninger)

    return (
        <SectionWrapper>
            <ErOpplysningeneRiktigeField />
            {erOpplysningeneRiktige === YesOrNo.NO && <UriktigeOpplysningerField />}
            {!trengerNySykmelding && (uriktigeOpplysninger ?? []).length > 0 && (
                <UriktigeOpplysningerInfo uriktigeOpplysninger={uriktigeOpplysninger ?? []} />
            )}
        </SectionWrapper>
    )
}

export default OpplysningerRiktigeSection
