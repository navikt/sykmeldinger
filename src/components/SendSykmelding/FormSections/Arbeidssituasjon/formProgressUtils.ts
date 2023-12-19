import { useFormContext } from 'react-hook-form'

import { ArbeidssituasjonType, BrukerinformasjonFragment, SykmeldingUtenforVentetidFragment } from 'queries'

import { isActiveArbeidsgiver } from '../../../../utils/arbeidsgiverUtils'
import { isArbeidstaker, isFisker, isFrilanserOrNaeringsdrivende } from '../../../../utils/arbeidssituasjonUtils'
import { hasCompletedEgenmeldingsdager } from '../../../../utils/egenmeldingsdagerUtils'
import { FormValues } from '../../SendSykmeldingForm'
import { EgenmeldingsdagerFormValue } from '../../../FormComponents/Egenmelding/EgenmeldingerField'

type UseDynamicSubSections = {
    shouldShowArbeidsgiverOrgnummer: boolean
    shouldShowEgenmeldingsperioderSporsmal: boolean
    shouldShowFisker: boolean
}

export function useArbeidssituasjonSubSections(
    sykmeldingUtenforVentetid: SykmeldingUtenforVentetidFragment,
): UseDynamicSubSections {
    const { watch } = useFormContext<FormValues>()
    const [arbeidssituasjon] = watch(['arbeidssituasjon'])

    const shouldShowArbeidsgiverOrgnummer: boolean = isArbeidstaker(arbeidssituasjon)
    const shouldShowEgenmeldingsperioderSporsmal: boolean =
        isFrilanserOrNaeringsdrivende(arbeidssituasjon) && !sykmeldingUtenforVentetid.erUtenforVentetid

    return {
        shouldShowArbeidsgiverOrgnummer,
        shouldShowEgenmeldingsperioderSporsmal,
        shouldShowFisker: isFisker(arbeidssituasjon),
    }
}

/**
 * When user is arbeidsgiver, we should show the "Sendes til arbeidsgiver" info if:
 * - User has selected an active arbeidsgiver
 *   - has selected nærmeste leder
 *   - has skipped nærmeste leder because it's inactive
 * - User has filled out egenmeldingsdager
 *   - until user has hit previous sykmelding date, or answers no on "Har du flere egenmeldingsdager?"
 *   - has skipped egenmeldingsdager because it's not relevant
 */
export function useShouldShowSendesTilArbeidsgiverInfo(
    arbeidsgivere: BrukerinformasjonFragment['arbeidsgivere'],
): boolean {
    const { watch } = useFormContext<FormValues>()
    const [arbeidssituasjon, arbeidsgiverOrgnummer, fisker, egenmeldingsdager, egenmeldingsdagerHitPrevious] = watch([
        'arbeidssituasjon',
        'arbeidsgiverOrgnummer',
        'fisker',
        'egenmeldingsdager',
        'egenmeldingsdagerHitPrevious',
    ])

    const arbeidstaker: boolean = isArbeidstaker(arbeidssituasjon, fisker)
    const hasSelectedArbeidstaker: boolean = arbeidsgiverOrgnummer != null
    const hasActiveArbeidsgiver: boolean = isActiveArbeidsgiver(arbeidsgivere, arbeidsgiverOrgnummer)
    const egenmeldingsdagerCompletedOrSkipped: boolean = isEgenmeldingsdagerCompleteOrSkipped(
        arbeidssituasjon,
        egenmeldingsdager,
        egenmeldingsdagerHitPrevious,
        fisker,
    )

    return arbeidstaker && hasSelectedArbeidstaker && (!hasActiveArbeidsgiver || egenmeldingsdagerCompletedOrSkipped)
}

function isEgenmeldingsdagerCompleteOrSkipped(
    arbeidssituasjon: ArbeidssituasjonType | null,
    egenmeldingsdager: EgenmeldingsdagerFormValue[] | null,
    egenmeldingsdagerHitPrevious: boolean | null,
    fisker?: FormValues['fisker'],
): boolean {
    return (
        hasCompletedEgenmeldingsdager(egenmeldingsdager) ||
        egenmeldingsdagerHitPrevious === true ||
        !isArbeidstaker(arbeidssituasjon, fisker)
    )
}
