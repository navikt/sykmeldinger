import React from 'react'
import { useFormContext } from 'react-hook-form'

import {
    ArbeidssituasjonType,
    BrukerinformasjonFragment,
    Periodetype,
    SykmeldingFragment,
    SykmeldingUtenforVentetidFragment,
} from '../../../../fetching/graphql.generated'
import { FormValues } from '../../SendSykmeldingForm'
import { useShouldArbeidssituasjonShow } from '../shared/sykmeldingUtils'
import { getSykmeldingStartDate } from '../../../../utils/sykmeldingUtils'
import { SectionWrapper } from '../shared/FormStructure'

import { ArbeidssituasjonInfo, ArbeidssituasjonStatusInfo, StrengtFortroligInfo } from './ArbeidssituasjonInfo'
import ArbeidssituasjonField from './ArbeidssituasjonField'
import ArbeidsgiverSection from './Arbeidsgiver/ArbeidsgiverSection'
import FrilanserSection from './Frilanser/FrilanserSection'
import SendesTilArbeidsgiverInfo from './SendesTilArbeidsgiver/SendesTilArbeidsgiverInfo'

interface Props {
    sykmelding: SykmeldingFragment
    brukerinformasjon: BrukerinformasjonFragment
    sykmeldingUtenforVentetid: SykmeldingUtenforVentetidFragment
}

function ArbeidssituasjonSection({
    sykmelding,
    sykmeldingUtenforVentetid,
    brukerinformasjon,
}: Props): JSX.Element | null {
    const shouldArbeidssituasjonShow = useShouldArbeidssituasjonShow()
    const harAvventendePeriode = sykmelding.sykmeldingsperioder.some((it) => it.type === Periodetype.AVVENTENDE)
    const {
        shouldShowArbeidsgiverOrgnummer,
        shouldShowEgenmeldingsperioderSporsmal,
        shouldShowStrengtFortroligInfo,
        shouldShowSendesTilArbeidsgiverInfo,
    } = useDynamicSubSections(brukerinformasjon, sykmeldingUtenforVentetid)

    // Don't show arbeidssituasjon section given certain criteria
    if (!shouldArbeidssituasjonShow) return null

    return (
        <SectionWrapper title="Din arbeidssituasjon">
            <ArbeidssituasjonInfo />
            <ArbeidssituasjonField harAvventendePeriode={harAvventendePeriode} />
            <ArbeidssituasjonStatusInfo />
            {shouldShowStrengtFortroligInfo && <StrengtFortroligInfo />}
            {shouldShowArbeidsgiverOrgnummer && <ArbeidsgiverSection arbeidsgivere={brukerinformasjon.arbeidsgivere} />}
            {shouldShowEgenmeldingsperioderSporsmal && (
                <FrilanserSection
                    oppfolgingsdato={sykmeldingUtenforVentetid.oppfolgingsdato || getSykmeldingStartDate(sykmelding)}
                />
            )}
            {shouldShowSendesTilArbeidsgiverInfo && <SendesTilArbeidsgiverInfo sykmelding={sykmelding} />}
        </SectionWrapper>
    )
}

type UseDynamicSubSections = {
    shouldShowStrengtFortroligInfo: boolean
    shouldShowArbeidsgiverOrgnummer: boolean
    shouldShowEgenmeldingsperioderSporsmal: boolean
    shouldShowSendesTilArbeidsgiverInfo: boolean
}

function useDynamicSubSections(
    brukerinformasjon: BrukerinformasjonFragment,
    sykmeldingUtenforVentetid: SykmeldingUtenforVentetidFragment,
): UseDynamicSubSections {
    const { watch } = useFormContext<FormValues>()
    const [arbeidssituasjon, arbeidsgiverOrgnummer] = watch(['arbeidssituasjon', 'arbeidsgiverOrgnummer'])
    const shouldShowStrengtFortroligInfo: boolean =
        arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER && brukerinformasjon.strengtFortroligAdresse
    const shouldShowArbeidsgiverOrgnummer: boolean =
        arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER && !brukerinformasjon.strengtFortroligAdresse
    const isFrilanserOrNaeringsdrivende: boolean =
        arbeidssituasjon === ArbeidssituasjonType.FRILANSER ||
        arbeidssituasjon === ArbeidssituasjonType.NAERINGSDRIVENDE
    const shouldShowEgenmeldingsperioderSporsmal: boolean =
        isFrilanserOrNaeringsdrivende && !sykmeldingUtenforVentetid.erUtenforVentetid
    const shouldShowSendesTilArbeidsgiverInfo =
        arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER &&
        arbeidsgiverOrgnummer != null &&
        !brukerinformasjon.strengtFortroligAdresse

    return {
        shouldShowStrengtFortroligInfo,
        shouldShowArbeidsgiverOrgnummer,
        shouldShowEgenmeldingsperioderSporsmal,
        shouldShowSendesTilArbeidsgiverInfo,
    }
}

export default ArbeidssituasjonSection
