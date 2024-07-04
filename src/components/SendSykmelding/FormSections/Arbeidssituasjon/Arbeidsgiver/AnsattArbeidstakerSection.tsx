import React, { ReactElement } from 'react'

import { BrukerinformasjonFragment, SykmeldingFragment } from 'queries'

import ArbeidsgivereMissingInfo from './ArbeidsgivereMissingInfo'
import ArbeidsgiverSection from './ArbeidsgiverSection'

type Props = {
    sykmelding: SykmeldingFragment
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

function AnsattArbeidstakerSection({ sykmelding, arbeidsgivere }: Props): ReactElement {
    return (
        <div>
            <ArbeidsgiverSection sykmelding={sykmelding} arbeidsgivere={arbeidsgivere} />
            {arbeidsgivere.length === 0 && <ArbeidsgivereMissingInfo />}
        </div>
    )
}

export default AnsattArbeidstakerSection
