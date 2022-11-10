import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormValues } from '../../SendSykmeldingForm'
import { YesOrNo } from '../../../../fetching/graphql.generated'
import { getTrengerNySykmelding } from '../shared/sykmeldingUtils'

import UriktigeOpplysningerField from './UriktigeOpplysningerField'
import ErOpplysningeneRiktige from './ErOpplysningeneRiktige'
import UriktigeOpplysningerInfo from './UriktigeOpplysningerInfo'

function OpplysningerRiktigeSection(): JSX.Element {
    const { watch } = useFormContext<FormValues>()

    const [erOpplysningeneRiktige, uriktigeOpplysninger] = watch(['erOpplysningeneRiktige', 'uriktigeOpplysninger'])
    const trengerNySykmelding = getTrengerNySykmelding(uriktigeOpplysninger)

    return (
        <div>
            <ErOpplysningeneRiktige />
            {erOpplysningeneRiktige === YesOrNo.No && <UriktigeOpplysningerField />}
            {!trengerNySykmelding && (uriktigeOpplysninger ?? []).length > 0 && (
                <UriktigeOpplysningerInfo uriktigeOpplysninger={uriktigeOpplysninger ?? []} />
            )}
        </div>
    )
}

export default OpplysningerRiktigeSection
