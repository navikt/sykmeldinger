export type SykmeldingUserEventV3Api = {
    erOpplysningeneRiktige: SporsmalSvar<JaEllerNeiV3>
    uriktigeOpplysninger: SporsmalSvar<Array<UriktigeOpplysningerV3>> | null
    arbeidssituasjon: SporsmalSvar<ArbeidssituasjonV3>
    arbeidsgiverOrgnummer: SporsmalSvar<string> | null
    riktigNarmesteLeder: SporsmalSvar<JaEllerNeiV3> | null
    harBruktEgenmelding: SporsmalSvar<JaEllerNeiV3> | null
    egenmeldingsperioder: SporsmalSvar<Array<EgenmeldingsperiodeV3>> | null
    harForsikring: SporsmalSvar<JaEllerNeiV3> | null
}

type SporsmalSvar<T> = {
    sporsmaltekst: string
    svartekster: string
    svar: T
}

type EgenmeldingsperiodeV3 = {
    fom: string
    tom: string
}

export enum JaEllerNeiV3 {
    JA = 'JA',
    NEI = 'NEI',
}

export enum UriktigeOpplysningerV3 {
    PERIODE = 'PERIODE',
    SYKMELDINGSGRAD_FOR_HOY = 'SYKMELDINGSGRAD_FOR_HOY',
    SYKMELDINGSGRAD_FOR_LAV = 'SYKMELDINGSGRAD_FOR_LAV',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    DIAGNOSE = 'DIAGNOSE',
    ANDRE_OPPLYSNINGER = 'ANDRE_OPPLYSNINGER',
}

export enum ArbeidssituasjonV3 {
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    FRILANSER = 'FRILANSER',
    NAERINGSDRIVENDE = 'NAERINGSDRIVENDE',
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
    ANNET = 'ANNET',
}
