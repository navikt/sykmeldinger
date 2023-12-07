import React, { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { YesOrNo } from 'queries'

import HarBruktEgenmeldingsPerioderField from '../../Frilanser/HarBruktEgenmeldingsPerioderField'
import { SectionWrapper } from '../../../../../FormComponents/FormStructure'
import { FormValues } from '../../../../SendSykmeldingForm'
import HarForsikringField from '../../Frilanser/HarForsikringField'
import FrilanserEgenmeldingPerioderField from '../../Frilanser/FrilanserEgenmeldingPerioderField'

interface Props {
    askForsikring: boolean
    oppfolgingsdato: string
}

function FiskerSelvstendigSection({ oppfolgingsdato, askForsikring }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()
    const harBruktEgenmelding = watch('harBruktEgenmelding')

    return (
        <SectionWrapper title="Fravær før sykmeldingen">
            <HarBruktEgenmeldingsPerioderField oppfolgingsdato={oppfolgingsdato} />
            {harBruktEgenmelding === YesOrNo.YES && (
                <FrilanserEgenmeldingPerioderField oppfolgingsdato={oppfolgingsdato} />
            )}
            {harBruktEgenmelding != null && askForsikring && <HarForsikringField />}
        </SectionWrapper>
    )
}

export default FiskerSelvstendigSection
