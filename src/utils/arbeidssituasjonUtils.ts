import { ArbeidssituasjonType } from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'

export const isArbeidstaker = (
    arbeidssituasjon?: ArbeidssituasjonType | null,
    fisker?: FormValues['fisker'] | null,
): boolean => {
    if (fisker?.overstyrArbeidsgiver != null) {
        return false
    }

    switch (arbeidssituasjon) {
        case ArbeidssituasjonType.ARBEIDSTAKER:
            return true
        case ArbeidssituasjonType.FISKER:
            return fisker?.lottOgHyre === 'HYRE' || fisker?.lottOgHyre === 'BEGGE'
        default:
            return false
    }
}

export const isFisker = (arbeidssituasjon?: ArbeidssituasjonType | null): boolean =>
    arbeidssituasjon === ArbeidssituasjonType.FISKER

export const isFrilanserOrNaeringsdrivendeOrJordbruker = (arbeidssituasjon?: ArbeidssituasjonType | null): boolean =>
    arbeidssituasjon === ArbeidssituasjonType.FRILANSER ||
    arbeidssituasjon === ArbeidssituasjonType.NAERINGSDRIVENDE ||
    arbeidssituasjon === ArbeidssituasjonType.JORDBRUKER

export const isArbeidsledig = (arbeidssituasjon?: ArbeidssituasjonType | null): boolean =>
    arbeidssituasjon === ArbeidssituasjonType.ARBEIDSLEDIG || arbeidssituasjon === ArbeidssituasjonType.PERMITTERT
