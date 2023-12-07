import { JaEllerNei } from './sykmelding/SykmeldingStatus'

export type SykmeldingUserEventV3Api = {
    erOpplysningeneRiktige: SporsmalSvar<JaEllerNei>
    uriktigeOpplysninger: SporsmalSvar<Array<UriktigeOpplysningerV3>> | null
    arbeidssituasjon: SporsmalSvar<ArbeidssituasjonV3>
    arbeidsgiverOrgnummer: SporsmalSvar<string> | null
    riktigNarmesteLeder: SporsmalSvar<JaEllerNei> | null
    harBruktEgenmelding: SporsmalSvar<JaEllerNei> | null
    egenmeldingsperioder: SporsmalSvar<Array<EgenmeldingsperiodeV3>> | null
    harForsikring: SporsmalSvar<JaEllerNei> | null
    egenmeldingsdager: SporsmalSvar<Array<string>> | null
    harBruktEgenmeldingsdager: SporsmalSvar<JaEllerNei> | null
    fisker: {
        blad: SporsmalSvar<'A' | 'B'> | null
        lottOgHyre: SporsmalSvar<'LOTT' | 'HYRE' | 'BEGGE'> | null
    } | null
}

type SporsmalSvar<T> = {
    sporsmaltekst: string
    svar: T
}

type EgenmeldingsperiodeV3 = {
    fom: string
    tom: string
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
