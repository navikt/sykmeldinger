import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment, Periodetype, SykmeldingFragment } from 'queries'

import { useShouldArbeidssituasjonShow } from '../shared/sykmeldingUtils'
import { getSykmeldingStartDate } from '../../../../utils/sykmeldingUtils'
import { SectionWrapper } from '../../../FormComponents/FormStructure'
import { isArbeidsledig, isFrilanserOrNaeringsdrivendeOrJordbruker } from '../../../../utils/arbeidssituasjonUtils'
import { FormValues } from '../../SendSykmeldingForm'
import { useFlag } from '../../../../toggles/context'

import { ArbeidssituasjonInfo } from './ArbeidssituasjonInfo'
import ArbeidssituasjonField from './ArbeidssituasjonField'
import ArbeidsgiverSection from './Arbeidsgiver/ArbeidsgiverSection'
import FrilanserSection from './Frilanser/FrilanserSection'
import { useArbeidssituasjonSubSections } from './formProgressUtils'
import FiskerSection from './Fisker/FiskerSection'
import ArbeidsledigSection from './Arbeidsledig/ArbeidsledigSection'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinformasjon: BrukerinformasjonFragment
}

function ArbeidssituasjonSection({ sykmelding, brukerinformasjon }: Props): ReactElement | null {
    const endreArbeidssituasjonToggle = useFlag('SYKMELDINGER_ENDRE_ARBEIDSSITUASJON')
    const { watch } = useFormContext<FormValues>()
    const arbeidssituasjon = watch('arbeidssituasjon')

    const { shouldShowArbeidsgiverOrgnummer, shouldShowFisker } = useArbeidssituasjonSubSections()
    const harAvventendePeriode = sykmelding.sykmeldingsperioder.some((it) => it.type === Periodetype.AVVENTENDE)

    // Don't show arbeidssituasjon section given certain criteria
    if (!useShouldArbeidssituasjonShow()) return null

    return (
        <SectionWrapper title="Din arbeidssituasjon">
            <ArbeidssituasjonInfo />
            <ArbeidssituasjonField harAvventendePeriode={harAvventendePeriode} />
            {shouldShowArbeidsgiverOrgnummer && (
                <ArbeidsgiverSection sykmelding={sykmelding} arbeidsgivere={brukerinformasjon.arbeidsgivere} />
            )}
            {shouldShowFisker && <FiskerSection sykmelding={sykmelding} brukerinformasjon={brukerinformasjon} />}
            {isFrilanserOrNaeringsdrivendeOrJordbruker(arbeidssituasjon) && (
                <FrilanserSection
                    sykmeldingId={sykmelding.id}
                    sykmeldingStartDato={getSykmeldingStartDate(sykmelding.sykmeldingsperioder)}
                />
            )}
            {endreArbeidssituasjonToggle.enabled &&
                isArbeidsledig(arbeidssituasjon) &&
                brukerinformasjon.arbeidsgivere.length >= 2 && (
                    <ArbeidsledigSection
                        sykmelding={sykmelding}
                        brukerinfoArbeidsgivere={brukerinformasjon.arbeidsgivere}
                    />
                )}
        </SectionWrapper>
    )
}

export default ArbeidssituasjonSection
