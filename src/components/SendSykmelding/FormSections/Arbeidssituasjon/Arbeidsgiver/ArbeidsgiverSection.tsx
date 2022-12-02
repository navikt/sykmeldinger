import React from 'react'
import { useFormContext } from 'react-hook-form'

import ArbeidsgiverField from '../ArbeidsgiverField'
import ArbeidsgiverRiktigNarmesteLederField from '../ArbeidsgiverRiktigNarmesteLederField'
import { BrukerinformasjonFragment } from '../../../../../fetching/graphql.generated'
import { FormValues } from '../../../SendSykmeldingForm'
import { SectionWrapper } from '../../shared/FormStructure'

interface Props {
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere']
}

function ArbeidsgiverSection({ arbeidsgivere }: Props): JSX.Element {
    const { watch } = useFormContext<FormValues>()
    const valgtArbeidsgiverOrgnummer: string | null = watch('arbeidsgiverOrgnummer')
    const valgtArbeidsgiver = arbeidsgivere.find((ag) => ag.orgnummer === valgtArbeidsgiverOrgnummer)

    return (
        <SectionWrapper>
            <ArbeidsgiverField arbeidsgivere={arbeidsgivere} />
            {valgtArbeidsgiver?.naermesteLeder != null && (
                <ArbeidsgiverRiktigNarmesteLederField narmesteLeder={valgtArbeidsgiver.naermesteLeder} />
            )}
        </SectionWrapper>
    )
}

export default ArbeidsgiverSection
