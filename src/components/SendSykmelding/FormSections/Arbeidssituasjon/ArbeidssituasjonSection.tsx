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

import ArbeidssituasjonField from './ArbeidssituasjonField'
import { ArbeidssituasjonInfo, ArbeidssituasjonStatusInfo, StrengtFortroligInfo } from './ArbeidssituasjonInfo'
import styles from './ArbeidssituasjonSection.module.css'
import ArbeidsgiverSection from './Arbeidsgiver/ArbeidsgiverSection'

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
    const harAvventendePeriode = sykmelding.sykmeldingsperioder.some((it) => it.type === Periodetype.Avventende)
    const { shouldShowArbeidsgiverOrgnummer, shouldShowEgenmeldingsperioderSporsmal, shouldShowStrengtFortroligInfo } =
        useDynamicSubSections(brukerinformasjon, sykmeldingUtenforVentetid)

    // Don't show arbeidssituasjon section given certain criteria
    if (!shouldArbeidssituasjonShow) return null

    return (
        <div className={styles.arbedissituasjonRoot}>
            <ArbeidssituasjonInfo />
            <ArbeidssituasjonField harAvventendePeriode={harAvventendePeriode} />
            <ArbeidssituasjonStatusInfo />
            {shouldShowStrengtFortroligInfo && <StrengtFortroligInfo />}
            {shouldShowArbeidsgiverOrgnummer && <ArbeidsgiverSection arbeidsgivere={brukerinformasjon.arbeidsgivere} />}
            {shouldShowEgenmeldingsperioderSporsmal && (
                <>
                    <div>TODO: Egenmelding periode field</div>
                    <div>TODO: forsikring field</div>
                </>
            )}
        </div>
    )
}

type UseDynamicSubSections = {
    shouldShowStrengtFortroligInfo: boolean
    shouldShowArbeidsgiverOrgnummer: boolean
    shouldShowEgenmeldingsperioderSporsmal: boolean
}

function useDynamicSubSections(
    brukerinformasjon: BrukerinformasjonFragment,
    sykmeldingUtenforVentetid: SykmeldingUtenforVentetidFragment,
): UseDynamicSubSections {
    const { watch } = useFormContext<FormValues>()
    const arbeidssituasjon: ArbeidssituasjonType | null = watch('arbeidssituasjon')
    const shouldShowStrengtFortroligInfo: boolean =
        arbeidssituasjon === ArbeidssituasjonType.Arbeidstaker && brukerinformasjon.strengtFortroligAdresse
    const shouldShowArbeidsgiverOrgnummer: boolean =
        arbeidssituasjon === ArbeidssituasjonType.Arbeidstaker && !brukerinformasjon.strengtFortroligAdresse
    const isFrilanserOrNaeringsdrivende: boolean =
        arbeidssituasjon === ArbeidssituasjonType.Frilanser ||
        arbeidssituasjon === ArbeidssituasjonType.Naeringsdrivende
    const shouldShowEgenmeldingsperioderSporsmal: boolean =
        isFrilanserOrNaeringsdrivende && !sykmeldingUtenforVentetid.erUtenforVentetid

    return {
        shouldShowStrengtFortroligInfo,
        shouldShowArbeidsgiverOrgnummer,
        shouldShowEgenmeldingsperioderSporsmal,
    }
}

export default ArbeidssituasjonSection
