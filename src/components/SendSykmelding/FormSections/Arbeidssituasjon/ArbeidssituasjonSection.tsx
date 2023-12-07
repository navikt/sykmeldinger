import { ReactElement } from 'react'

import { BrukerinformasjonFragment, Periodetype, SykmeldingFragment, SykmeldingUtenforVentetidFragment } from 'queries'

import { useShouldArbeidssituasjonShow } from '../shared/sykmeldingUtils'
import { getSykmeldingStartDate } from '../../../../utils/sykmeldingUtils'
import { SectionWrapper } from '../../../FormComponents/FormStructure'

import { ArbeidssituasjonInfo, ArbeidssituasjonStatusInfo } from './ArbeidssituasjonInfo'
import ArbeidssituasjonField from './ArbeidssituasjonField'
import ArbeidsgiverSection from './Arbeidsgiver/ArbeidsgiverSection'
import FrilanserSection from './Frilanser/FrilanserSection'
import { useArbeidssituasjonSubSections } from './formProgressUtils'
import FiskerSection from './Fisker/FiskerSection'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinformasjon: BrukerinformasjonFragment
    sykmeldingUtenforVentetid: SykmeldingUtenforVentetidFragment
}

function ArbeidssituasjonSection({
    sykmelding,
    sykmeldingUtenforVentetid,
    brukerinformasjon,
}: Props): ReactElement | null {
    const harAvventendePeriode = sykmelding.sykmeldingsperioder.some((it) => it.type === Periodetype.AVVENTENDE)
    const { shouldShowArbeidsgiverOrgnummer, shouldShowEgenmeldingsperioderSporsmal, shouldShowFisker } =
        useArbeidssituasjonSubSections(sykmeldingUtenforVentetid)

    // Don't show arbeidssituasjon section given certain criteria
    if (!useShouldArbeidssituasjonShow()) return null

    return (
        <SectionWrapper title="Din arbeidssituasjon">
            <ArbeidssituasjonInfo />
            <ArbeidssituasjonField harAvventendePeriode={harAvventendePeriode} />
            {!(<ArbeidssituasjonStatusInfo />)}
            {shouldShowArbeidsgiverOrgnummer && (
                <ArbeidsgiverSection sykmelding={sykmelding} arbeidsgivere={brukerinformasjon.arbeidsgivere} />
            )}
            {shouldShowFisker && (
                <FiskerSection
                    sykmelding={sykmelding}
                    brukerinformasjon={brukerinformasjon}
                    oppfolgingsdato={
                        sykmeldingUtenforVentetid.oppfolgingsdato ||
                        getSykmeldingStartDate(sykmelding.sykmeldingsperioder)
                    }
                />
            )}
            {shouldShowEgenmeldingsperioderSporsmal && (
                <FrilanserSection
                    oppfolgingsdato={
                        sykmeldingUtenforVentetid.oppfolgingsdato ||
                        getSykmeldingStartDate(sykmelding.sykmeldingsperioder)
                    }
                />
            )}
        </SectionWrapper>
    )
}

export default ArbeidssituasjonSection
