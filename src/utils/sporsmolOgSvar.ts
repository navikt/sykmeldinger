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
        sporsmaltekst: 'Hva er din arbeidssituasjon?',
        svartekster: JaEllerNeiSvarTekster,
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
    harForsikring: null,
    uriktigeOpplysninger: null,
}
