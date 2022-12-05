import React from 'react'
import { useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment } from '../../../../../fetching/graphql.generated'
import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../shared/FormStructure'

import ArbeidsgivereMissingInfo from './ArbeidsgivereMissingInfo'
import ArbeidsgiverRiktigNarmesteLederField from './ArbeidsgiverRiktigNarmesteLederField'
import ArbeidsgiverField from './ArbeidsgiverField'

interface Props {
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

function ArbeidsgiverSection({ arbeidsgivere }: Props): JSX.Element {
    const { watch } = useFormContext<FormValues>()
    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')
    const valgtArbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === valgtArbeidsgiverOrgnummer)
    const noArbeidsgivere = arbeidsgivere.length === 0

    return (
        <SectionWrapper>
            <ArbeidsgiverField arbeidsgivere={arbeidsgivere} />
            {noArbeidsgivere && <ArbeidsgivereMissingInfo />}
            {valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder != null && (
                <ArbeidsgiverRiktigNarmesteLederField narmesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
        </SectionWrapper>
    )
}

export default ArbeidsgiverSection
