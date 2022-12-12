import { UriktigeOpplysningerType } from '../server/graphql/resolver-types.generated'
import { ArbeidssituasjonType } from '../fetching/graphql.generated'

import { toReadableDate } from './dateUtils'

export const sporsmal = {
    erOpplysningeneRiktige: 'Stemmer opplysningene?',
    arbeidssituasjon: 'Jeg er sykmeldt som',
    arbeidsgiverOrgnummer: 'Velg arbeidsgiver',
    riktigNarmesteLeder: (narmesteLederNavn: string) =>
        `Er det ${narmesteLederNavn} som skal følge deg opp på jobben mens du er syk?`,
    harBruktEgenmelding: (oppfolgingsdato: string) =>
        `Vi har registrert at du ble syk ${toReadableDate(
            oppfolgingsdato,
        )}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`,
    egenmeldingsperioder: (oppfolgingsdato: string) =>
        `Hvilke dager var du borte fra jobb før ${toReadableDate(oppfolgingsdato)}?`,
    harForsikring: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
    uriktigeOpplysninger: 'Hvilke opplysninger stemmer ikke?',
}

export function arbeidsSituasjonEnumToText(arbeidssituasjon: ArbeidssituasjonType): string {
    switch (arbeidssituasjon) {
        case ArbeidssituasjonType.ARBEIDSTAKER:
            return 'ansatt'
        case ArbeidssituasjonType.FRILANSER:
            return 'frilanser'
        case ArbeidssituasjonType.NAERINGSDRIVENDE:
            return 'selvstendig næringsdrivende'
        case ArbeidssituasjonType.ARBEIDSLEDIG:
            return 'arbeidsledig'
        case ArbeidssituasjonType.PERMITTERT:
            return 'permittert'
        case ArbeidssituasjonType.ANNET:
            return 'annet'
    }
}

export function uriktigeOpplysningerEnumToText(uriktigeOpplysninger: UriktigeOpplysningerType): string {
    switch (uriktigeOpplysninger) {
        case UriktigeOpplysningerType.PERIODE:
            return 'Periode'
        case UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_LAV:
            return 'Sykmeldingsgraden er for lav'
        case UriktigeOpplysningerType.SYKMELDINGSGRAD_FOR_HOY:
            return 'Sykmeldingsgraden er for høy'
        case UriktigeOpplysningerType.ARBEIDSGIVER:
            return 'Arbeidsgiver'
        case UriktigeOpplysningerType.DIAGNOSE:
            return 'Diagnose'
        case UriktigeOpplysningerType.ANDRE_OPPLYSNINGER:
            return 'Andre opplysninger'
    }
}
