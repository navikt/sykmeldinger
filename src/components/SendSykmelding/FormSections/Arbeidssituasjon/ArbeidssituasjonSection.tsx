import { ReactElement } from 'react'

import {
    BrukerinformasjonFragment,
    Periodetype,
    SykmeldingFragment,
    SykmeldingUtenforVentetidFragment,
} from '../../../../fetching/graphql.generated'
import { useShouldArbeidssituasjonShow } from '../shared/sykmeldingUtils'
import { getSykmeldingStartDate } from '../../../../utils/sykmeldingUtils'
import { SectionWrapper } from '../../../FormComponents/FormStructure'

import { ArbeidssituasjonInfo, ArbeidssituasjonStatusInfo, StrengtFortroligInfo } from './ArbeidssituasjonInfo'
import ArbeidssituasjonField from './ArbeidssituasjonField'
import ArbeidsgiverSection from './Arbeidsgiver/ArbeidsgiverSection'
import FrilanserSection from './Frilanser/FrilanserSection'
import SendesTilArbeidsgiverInfo from './SendesTilArbeidsgiver/SendesTilArbeidsgiverInfo'
import { useArbeidssituasjonSubSections } from './formProgressUtils'

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
    const shouldArbeidssituasjonShow = useShouldArbeidssituasjonShow()
    const harAvventendePeriode = sykmelding.sykmeldingsperioder.some((it) => it.type === Periodetype.AVVENTENDE)
    const {
        shouldShowArbeidsgiverOrgnummer,
        shouldShowEgenmeldingsperioderSporsmal,
        shouldShowStrengtFortroligInfo,
        shouldShowSendesTilArbeidsgiverInfo,
    } = useArbeidssituasjonSubSections(brukerinformasjon, sykmeldingUtenforVentetid)

    // Don't show arbeidssituasjon section given certain criteria
    if (!shouldArbeidssituasjonShow) return null

    return (
        <SectionWrapper title="Din arbeidssituasjon">
            <ArbeidssituasjonInfo />
            <ArbeidssituasjonField harAvventendePeriode={harAvventendePeriode} />
            {!(<ArbeidssituasjonStatusInfo />)}
            {shouldShowStrengtFortroligInfo && <StrengtFortroligInfo />}
            {shouldShowArbeidsgiverOrgnummer && (
                <ArbeidsgiverSection sykmelding={sykmelding} arbeidsgivere={brukerinformasjon.arbeidsgivere} />
            )}
            {shouldShowEgenmeldingsperioderSporsmal && (
                <FrilanserSection
                    oppfolgingsdato={
                        sykmeldingUtenforVentetid.oppfolgingsdato ||
                        getSykmeldingStartDate(sykmelding.sykmeldingsperioder)
                    }
                />
            )}
            {shouldShowSendesTilArbeidsgiverInfo && <SendesTilArbeidsgiverInfo sykmelding={sykmelding} />}
        </SectionWrapper>
    )
}

export default ArbeidssituasjonSection
