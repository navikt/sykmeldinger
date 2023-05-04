import { useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment, SykmeldingUtenforVentetidFragment } from '../../../../fetching/graphql.generated'
import { isActiveArbeidsgiver } from '../../../../utils/arbeidsgiverUtils'
import { isArbeidstaker, isFrilanserOrNaeringsdrivende } from '../../../../utils/arbeidssituasjonUtils'
import { hasCompletedEgenmeldingsdager } from '../../../../utils/egenmeldingsdagerUtils'
import { FormValues } from '../../SendSykmeldingForm'

type UseDynamicSubSections = {
    shouldShowStrengtFortroligInfo: boolean
    shouldShowArbeidsgiverOrgnummer: boolean
    shouldShowEgenmeldingsperioderSporsmal: boolean
    shouldShowSendesTilArbeidsgiverInfo: boolean
}

export function useArbeidssituasjonSubSections(
    brukerinformasjon: BrukerinformasjonFragment,
    sykmeldingUtenforVentetid: SykmeldingUtenforVentetidFragment,
): UseDynamicSubSections {
    const { watch } = useFormContext<FormValues>()
    const [arbeidssituasjon, arbeidsgiverOrgnummer] = watch(['arbeidssituasjon', 'arbeidsgiverOrgnummer'])
    const egenmeldingsdager = watch('egenmeldingsdager')

    const hasStrengtFortroligAdresse: boolean = brukerinformasjon.strengtFortroligAdresse
    const hasActiveArbeidsgiver: boolean = isActiveArbeidsgiver(brukerinformasjon.arbeidsgivere, arbeidsgiverOrgnummer)
    const hasCompletedEgenmeldingsperioder: boolean =
        hasCompletedEgenmeldingsdager(egenmeldingsdager) || !isArbeidstaker(arbeidssituasjon)

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
