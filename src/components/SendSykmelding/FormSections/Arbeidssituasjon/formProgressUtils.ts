import { useFormContext } from 'react-hook-form'

import { BrukerinformasjonFragment, SykmeldingUtenforVentetidFragment } from 'queries'

import { isActiveArbeidsgiver } from '../../../../utils/arbeidsgiverUtils'
import { isArbeidstaker, isFrilanserOrNaeringsdrivende } from '../../../../utils/arbeidssituasjonUtils'
import { hasCompletedEgenmeldingsdager } from '../../../../utils/egenmeldingsdagerUtils'
import { FormValues } from '../../SendSykmeldingForm'

type UseDynamicSubSections = {
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
    const egenmeldingsdagerHitPrevious = watch('egenmeldingsdagerHitPrevious')

    const hasActiveArbeidsgiver: boolean = isActiveArbeidsgiver(brukerinformasjon.arbeidsgivere, arbeidsgiverOrgnummer)
    const wasEgenmeldingsdagerRelevant: boolean =
        hasCompletedEgenmeldingsdager(egenmeldingsdager) ||
        egenmeldingsdagerHitPrevious === true ||
        !isArbeidstaker(arbeidssituasjon)

    const shouldShowArbeidsgiverOrgnummer: boolean = isArbeidstaker(arbeidssituasjon)
    const shouldShowEgenmeldingsperioderSporsmal: boolean =
        isFrilanserOrNaeringsdrivende(arbeidssituasjon) && !sykmeldingUtenforVentetid.erUtenforVentetid
    const shouldShowSendesTilArbeidsgiverInfo: boolean =
        shouldShowArbeidsgiverOrgnummer &&
        arbeidsgiverOrgnummer != null &&
        (!hasActiveArbeidsgiver || wasEgenmeldingsdagerRelevant)

    return {
        shouldShowArbeidsgiverOrgnummer,
        shouldShowEgenmeldingsperioderSporsmal,
        shouldShowSendesTilArbeidsgiverInfo,
    }
}
