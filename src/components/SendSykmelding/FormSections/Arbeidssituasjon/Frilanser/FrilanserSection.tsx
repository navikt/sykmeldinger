import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormValues } from '../../../SendSykmeldingForm'
import { YesOrNo } from '../../../../../fetching/graphql.generated'
import { SectionWrapper } from '../../shared/FormStructure'

import HarBruktEgenmeldingField from './HarBruktEgenmeldingField'
import EgenmeldingerField from './EgenmeldingerField'
import HarForsikringField from './HarForsikringField'

interface Props {
    oppfolgingsdato: string
}

function FrilanserSection({ oppfolgingsdato }: Props): JSX.Element {
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
