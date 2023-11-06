import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { YesOrNo } from 'queries'

import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../../../FormComponents/FormStructure'

import HarBruktEgenmeldingField from './HarBruktEgenmeldingField'
import EgenmeldingerField from './EgenmeldingerField'
import HarForsikringField from './HarForsikringField'

interface Props {
    oppfolgingsdato: string
}

function FrilanserSection({ oppfolgingsdato }: Props): ReactElement {
    const { watch } = useFormContext<FormValues>()
    const harBruktEgenmelding = watch('harBruktEgenmelding')

    return (
        <SectionWrapper title="Fravær før sykmeldingen">
            <HarBruktEgenmeldingField oppfolgingsdato={oppfolgingsdato} />
            {harBruktEgenmelding === YesOrNo.YES && <EgenmeldingerField oppfolgingsdato={oppfolgingsdato} />}
            <HarForsikringField />
        </SectionWrapper>
    )
}

export default FrilanserSection
