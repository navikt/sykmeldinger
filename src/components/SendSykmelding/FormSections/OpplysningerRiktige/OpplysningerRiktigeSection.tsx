import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { YesOrNo } from 'queries'

import { FormValues } from '../../SendSykmeldingForm'
import { SectionWrapper } from '../../../FormComponents/FormStructure'

import UriktigeOpplysningerField from './UriktigeOpplysningerField'
import ErOpplysningeneRiktigeField from './ErOpplysningeneRiktigeField'

function OpplysningerRiktigeSection(): ReactElement {
    const { watch } = useFormContext<FormValues>()

    const erOpplysningeneRiktige = watch('erOpplysningeneRiktige')

    return (
        <SectionWrapper>
            <ErOpplysningeneRiktigeField />
            {erOpplysningeneRiktige === YesOrNo.NO && <UriktigeOpplysningerField />}
        </SectionWrapper>
    )
}

export default OpplysningerRiktigeSection
