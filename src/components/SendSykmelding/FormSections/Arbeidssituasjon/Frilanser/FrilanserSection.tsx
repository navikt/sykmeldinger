import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { YesOrNo } from 'queries'

import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'

import HarBruktEgenmeldingsPerioderField from './HarBruktEgenmeldingsPerioderField'
import FrilanserEgenmeldingPerioderField from './FrilanserEgenmeldingPerioderField'
import HarForsikringField from './HarForsikringField'

interface Props {
    oppfolgingsdato: string
}

function FrilanserSection({ oppfolgingsdato }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()
    const harBruktEgenmelding = watch('harBruktEgenmelding')

    return (
        <SectionWrapper title="Fravær før sykmeldingen">
            <HarBruktEgenmeldingsPerioderField oppfolgingsdato={oppfolgingsdato} />
            {harBruktEgenmelding === YesOrNo.YES && (
                <FrilanserEgenmeldingPerioderField oppfolgingsdato={oppfolgingsdato} />
            )}
            <HarForsikringField />
        </SectionWrapper>
    )
}

export default FrilanserSection
