import { useFormContext } from 'react-hook-form'

import {
    ArbeidssituasjonType,
    BrukerinformasjonFragment,
    SykmeldingUtenforVentetidFragment,
} from '../../../../fetching/graphql.generated'
import { isActiveArbeidsgiver } from '../../../../utils/arbeidsgiverUtils'
import { isArbeidstaker, isFrilanserOrNaeringsdrivende } from '../../../../utils/arbeidssituasjonUtils'
import { hasCompletedEgenmeldingsperioderAnsatt } from '../../../../utils/egenmeldingsperioderAnsattUtils'
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

    const hasStrengtFortroligAdresse: boolean = brukerinformasjon.strengtFortroligAdresse
    const hasActiveArbeidsgiver: boolean = isActiveArbeidsgiver(brukerinformasjon.arbeidsgivere, arbeidsgiverOrgnummer)
    const hasCompletedEgenmeldingsperioder: boolean =
        hasCompletedEgenmeldingsperioderAnsatt(egenmeldingsperioderAnsatt) || !isArbeidstaker(arbeidssituasjon)

    const shouldShowStrengtFortroligInfo: boolean = isArbeidstaker(arbeidssituasjon) && hasStrengtFortroligAdresse
    const shouldShowArbeidsgiverOrgnummer: boolean = isArbeidstaker(arbeidssituasjon) && !hasStrengtFortroligAdresse
    const shouldShowEgenmeldingsperioderSporsmal: boolean =
        isFrilanserOrNaeringsdrivende(arbeidssituasjon) && !sykmeldingUtenforVentetid.erUtenforVentetid
    const shouldShowSendesTilArbeidsgiverInfo: boolean =
        shouldShowArbeidsgiverOrgnummer &&
        arbeidsgiverOrgnummer != null &&
        (!hasActiveArbeidsgiver || hasCompletedEgenmeldingsperioder)

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
