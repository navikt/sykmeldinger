import * as R from 'remeda'

import { UriktigeOpplysningerType } from '../server/graphql/resolver-types.generated'
import { ArbeidssituasjonType } from '../fetching/graphql.generated'

import { toReadableDate } from './dateUtils'

enum JaEllerNeiType {
    JA = 'Ja',
    NEI = 'Nei',
}

const JaEllerNeiSvarTekster = JSON.stringify(JaEllerNeiType)

export const sporsmolOgSvar = {
    erOpplysningeneRiktige: {
        sporsmaltekst: 'Stemmer opplysningene?',
        svartekster: JaEllerNeiSvarTekster,
    },
    arbeidssituasjon: {
        sporsmaltekst: 'Jeg er sykmeldt som',
        svartekster: JSON.stringify(
            R.pipe(
                ArbeidssituasjonType,
                R.mapKeys((it) => it.toUpperCase()),
                R.mapValues((value) => arbeidsSituasjonEnumToText(value)),
            ),
        ),
    },
    arbeidsgiverOrgnummer: {
        sporsmaltekst: 'Velg arbeidsgiver',
        svartekster: (arbeidsgivere: { navn: string; orgnummer: string }[]) =>
            arbeidsgivere.map((arbeidsgiver) => ({
                navn: arbeidsgiver.navn,
                orgnummer: arbeidsgiver.orgnummer,
            })),
    },
    riktigNarmesteLeder: {
        sporsmalstekst: (narmesteLederNavn: string) =>
            `Er det ${narmesteLederNavn} som skal følge deg opp på jobben mens du er syk?`,
        svartekster: JaEllerNeiSvarTekster,
    },
    harBruktEgenmelding: {
        sporsmaltekst: (oppfolgingsdato: string) =>
            `Vi har registrert at du ble syk ${toReadableDate(
                oppfolgingsdato,
            )}. Brukte du egenmelding eller noen annen sykmelding før denne datoen?`,
        svartekster: JaEllerNeiSvarTekster,
    },
    egenmeldingsperioder: {
        sporsmaltekst: (oppfolgingsdato: string) =>
            `Hvilke dager var du borte fra jobb før ${toReadableDate(oppfolgingsdato)}?`,
        // Not sure why this is a stringifed string, but we'll keep it the same so the data doesn't change
        svartekster: JSON.stringify('Fom, Tom'),
    },
    harForsikring: {
        sporsmaltekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
        svartekster: JaEllerNeiSvarTekster,
    },
    uriktigeOpplysninger: {
        sporsmaltekst: 'Hvilke opplysninger stemmer ikke?',
        svartekster: JSON.stringify(
            R.pipe(
                UriktigeOpplysningerType,
                R.mapKeys((it) => it.toUpperCase()),
                R.mapValues((value) => uriktigeOpplysningerEnumToText(value)),
            ),
        ),
    },
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
