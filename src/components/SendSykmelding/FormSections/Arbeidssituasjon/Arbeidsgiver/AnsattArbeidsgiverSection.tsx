import React, { ReactElement } from 'react'

import { BrukerinformasjonFragment, SykmeldingFragment } from 'queries'

import { SectionWrapper } from '../../../../FormComponents/FormStructure'

import ArbeidsgivereMissingInfo from './ArbeidsgivereMissingInfo'
import ArbeidsgiverSection from './ArbeidsgiverSection'
import ArbeidsgiverField from './ArbeidsgiverField'

interface Props {
    sykmelding: SykmeldingFragment
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

function AnsattArbeidsgiverSection({ sykmelding, arbeidsgivere }: Props): ReactElement {
    const hasNoArbeidsgivere = arbeidsgivere.length === 0
    if (hasNoArbeidsgivere) {
        return (
            <SectionWrapper>
                {/* Kind of a hack: Rendering this field with no arbeidsgivere stops user for submitting */}
                <ArbeidsgiverField arbeidsgivere={[]} />
                <ArbeidsgivereMissingInfo />
            </SectionWrapper>
        )
    }

    return <ArbeidsgiverSection sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} />
}

export default AnsattArbeidsgiverSection
