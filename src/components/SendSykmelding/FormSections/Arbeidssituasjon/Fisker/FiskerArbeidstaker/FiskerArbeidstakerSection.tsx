import React, { ReactElement } from 'react'

import { BrukerinformasjonFragment, SykmeldingFragment } from 'queries'

import { SectionWrapper } from '../../../../../FormComponents/FormStructure'
import ArbeidsgiverSection from '../../Arbeidsgiver/ArbeidsgiverSection'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinformasjon: BrukerinformasjonFragment
    oppfolgingsdato: string
}

function FiskerArbeidstakerSection({ sykmelding, brukerinformasjon, oppfolgingsdato }: Props): ReactElement {
    return (
        <SectionWrapper>
            <ArbeidsgiverSection
                sykmelding={sykmelding}
                arbeidsgivere={brukerinformasjon.arbeidsgivere}
                oppfolgingsdato={oppfolgingsdato}
            />
        </SectionWrapper>
    )
}

export default FiskerArbeidstakerSection
