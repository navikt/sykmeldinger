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
    egenmeldingsperioder: null,
    harBruktEgenmelding: null,
    harForsikring: null,
    uriktigeOpplysninger: null,
}
