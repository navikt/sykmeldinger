import { useFormContext } from 'react-hook-form'

import {
    ArbeidssituasjonType,
    BrukerinformasjonFragment,
    SykmeldingUtenforVentetidFragment,
    YesOrNo,
} from '../../../../fetching/graphql.generated'
import { FormValues } from '../../SendSykmeldingForm'

type UseDynamicSubSections = {
    shouldShowStrengtFortroligInfo: boolean
    shouldShowArbeidsgiverOrgnummer: boolean
    shouldShowEgenmeldingsperioderSporsmal: boolean
    shouldShowSendesTilArbeidsgiverInfo: boolean
}

/**
 * Used for the new form with egenmeldingsspørsmål
 */
export function useArbeidssituasjonSubSections(
    brukerinformasjon: BrukerinformasjonFragment,
    sykmeldingUtenforVentetid: SykmeldingUtenforVentetidFragment,
): UseDynamicSubSections {
    const { watch } = useFormContext<FormValues>()
    const [arbeidssituasjon, arbeidsgiverOrgnummer, egenmeldingsperioderAnsatt] = watch([
        'arbeidssituasjon',
        'arbeidsgiverOrgnummer',
        'egenmeldingsperioderAnsatt',
    ])
    // TODO: https://trello.com/c/KMllIcoG/2499-forbedring-av-logikk
    const valgtArbeidsgiver = brukerinformasjon.arbeidsgivere.find((ag) => ag.orgnummer === arbeidsgiverOrgnummer)
    const inactiveArbeidsgiver = valgtArbeidsgiver?.aktivtArbeidsforhold && valgtArbeidsgiver?.naermesteLeder != null

    const shouldShowStrengtFortroligInfo: boolean =
        arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER && brukerinformasjon.strengtFortroligAdresse
    const shouldShowArbeidsgiverOrgnummer: boolean =
        arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER && !brukerinformasjon.strengtFortroligAdresse
    const isFrilanserOrNaeringsdrivende: boolean =
        arbeidssituasjon === ArbeidssituasjonType.FRILANSER ||
        arbeidssituasjon === ArbeidssituasjonType.NAERINGSDRIVENDE
    const shouldShowEgenmeldingsperioderSporsmal: boolean =
        isFrilanserOrNaeringsdrivende && !sykmeldingUtenforVentetid.erUtenforVentetid
    // TODO: https://trello.com/c/KMllIcoG/2499-forbedring-av-logikk
    const hasEgenmeldingsperioderAnsatt: boolean | null =
        egenmeldingsperioderAnsatt && egenmeldingsperioderAnsatt.length >= 1
    const hasCompletedEgenmeldingsperioderAnsatt: boolean =
        (hasEgenmeldingsperioderAnsatt &&
            egenmeldingsperioderAnsatt?.[egenmeldingsperioderAnsatt.length - 1].harPerioder === YesOrNo.NO) ||
        (hasEgenmeldingsperioderAnsatt &&
            egenmeldingsperioderAnsatt?.[egenmeldingsperioderAnsatt.length - 1].hasClickedVidere === true) ||
        arbeidssituasjon !== ArbeidssituasjonType.ARBEIDSTAKER
    const shouldShowSendesTilArbeidsgiverInfo: boolean =
        arbeidssituasjon === ArbeidssituasjonType.ARBEIDSTAKER &&
        arbeidsgiverOrgnummer != null &&
        !brukerinformasjon.strengtFortroligAdresse &&
        (!inactiveArbeidsgiver || hasCompletedEgenmeldingsperioderAnsatt)

    return {
        shouldShowStrengtFortroligInfo,
        shouldShowArbeidsgiverOrgnummer,
        shouldShowEgenmeldingsperioderSporsmal,
        shouldShowSendesTilArbeidsgiverInfo,
    }
}

/**
 * Used for the form without egenmeldingsspørsmål
 */
export function useDynamicSubSections(
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
