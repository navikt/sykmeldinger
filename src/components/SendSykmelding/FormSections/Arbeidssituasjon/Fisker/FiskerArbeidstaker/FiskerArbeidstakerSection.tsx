import React, { ReactElement, useState } from 'react'
import { Link as DsLink } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment, SykmeldingFragment } from 'queries'

import { SectionWrapper } from '../../../../../FormComponents/FormStructure'
import ArbeidsgiverSection from '../../Arbeidsgiver/ArbeidsgiverSection'
import { FormValues } from '../../../../SendSykmeldingForm'

import ArbeidsgivereMissingForFiskereInfo from './ArbeidsgivereMissingForFiskereInfo'
import ArbeidsgiverFiskereFallbackSection from './ArbeidsgiverFiskereFallbackSection'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinformasjon: BrukerinformasjonFragment
}

function FiskerArbeidstakerSection({ sykmelding, brukerinformasjon }: Props): ReactElement {
    const { setValue, clearErrors } = useFormContext<FormValues>()
    const [overrideArbeidsgiver, setOverrideArbeidsgiver] = useState(false)
    const hasNoArbeidsgivere = brukerinformasjon.arbeidsgivere.length === 0
    if (hasNoArbeidsgivere) {
        return (
            <SectionWrapper>
                <ArbeidsgivereMissingForFiskereInfo />
                <ArbeidsgiverFiskereFallbackSection sykmelding={sykmelding} />
            </SectionWrapper>
        )
    }

    if (overrideArbeidsgiver) {
        return (
            <SectionWrapper>
                <div className="mt-2 italic">
                    Du har valgt å bekrefte sykmeldingen til NAV isteden for å sende den inn til arbeidsgiver.
                    <DsLink
                        as="button"
                        type="button"
                        className="mt-2"
                        onClick={() => {
                            setValue('fisker.overstyrArbeidsgiver', null)
                            clearErrors()
                            setOverrideArbeidsgiver(false)
                        }}
                    >
                        Klikk her for å endre tilbake til å sende sykmeldingen til arbeidsgiver.
                    </DsLink>
                </div>
                <ArbeidsgiverFiskereFallbackSection sykmelding={sykmelding} />
            </SectionWrapper>
        )
    }

    return (
        <ArbeidsgiverSection sykmelding={sykmelding} arbeidsgivere={brukerinformasjon.arbeidsgivere}>
            <div className="mt-2 italic">
                Dersom du som fisker ikke finner korrekt arbeidsgiver, kan du alikevel velge å bekrefte sykmeldingen til
                arbeidsgiver. Dette betyr at arbeidsgiver ikke vil motta sykmeldingen.
                <DsLink as="button" type="button" className="mt-4" onClick={() => setOverrideArbeidsgiver(true)}>
                    Dersom du ønsker å bekrefte sykmeldingen for nav, kan du gjøre dette her
                </DsLink>
                .
            </div>
        </ArbeidsgiverSection>
    )
}

export default FiskerArbeidstakerSection
