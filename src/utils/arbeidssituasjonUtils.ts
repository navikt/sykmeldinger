import { ArbeidssituasjonType } from 'queries'

import { FormValues } from '../components/SendSykmelding/SendSykmeldingForm'

export const isArbeidstaker = (
    arbeidssituasjon?: ArbeidssituasjonType | null,
    fisker?: FormValues['fisker'],
): boolean => {
    switch (arbeidssituasjon) {
        case ArbeidssituasjonType.ARBEIDSTAKER:
            return true
        case ArbeidssituasjonType.FISKER:
            return fisker?.lottOgHyre === 'HYRE'
        default:
            return false
    }
}

export const isFisker = (arbeidssituasjon?: ArbeidssituasjonType | null): boolean =>
    arbeidssituasjon === ArbeidssituasjonType.FISKER

export const isFrilanserOrNaeringsdrivende = (arbeidssituasjon?: ArbeidssituasjonType | null): boolean =>
    arbeidssituasjon === ArbeidssituasjonType.FRILANSER || arbeidssituasjon === ArbeidssituasjonType.NAERINGSDRIVENDE
