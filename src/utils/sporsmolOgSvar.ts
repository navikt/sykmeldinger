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
    arbeidsgiverOrgnummer: null,
    egenmeldingsperioder: null,
    harBruktEgenmelding: null,
    harForsikring: null,
    riktigNarmesteLeder: null,
    uriktigeOpplysninger: null,
}
