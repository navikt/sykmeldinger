import React, { ReactElement } from 'react'

import { BrukerinformasjonFragment, SykmeldingFragment } from 'queries'

import { SectionWrapper } from '../../../../../FormComponents/FormStructure'
import ArbeidsgiverSection from '../../Arbeidsgiver/ArbeidsgiverSection'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinformasjon: BrukerinformasjonFragment
}

function FiskerArbeidstakerSection({ sykmelding, brukerinformasjon }: Props): ReactElement {
    return (
        <SectionWrapper>
            <ArbeidsgiverSection sykmelding={sykmelding} arbeidsgivere={brukerinformasjon.arbeidsgivere} />
        </SectionWrapper>
    )
}

export default FiskerArbeidstakerSection
