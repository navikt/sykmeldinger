/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    Date: { input: string; output: string }
    DateTime: { input: string; output: string }
    JSON: { input: unknown; output: unknown }
}

export type Adresse = {
    readonly __typename: 'Adresse'
    readonly gate?: Maybe<Scalars['String']['output']>
    readonly kommune?: Maybe<Scalars['String']['output']>
    readonly land?: Maybe<Scalars['String']['output']>
    readonly postboks?: Maybe<Scalars['String']['output']>
    readonly postnummer?: Maybe<Scalars['Int']['output']>
}

export type AktivitetIkkeMuligPeriode = {
    readonly __typename: 'AktivitetIkkeMuligPeriode'
    readonly arbeidsrelatertArsak?: Maybe<ArbeidsrelatertArsak>
    readonly medisinskArsak?: Maybe<MedisinskArsak>
}

export enum AnnenFraverGrunn {
    ABORT = 'ABORT',
    ARBEIDSRETTET_TILTAK = 'ARBEIDSRETTET_TILTAK',
    BEHANDLING_FORHINDRER_ARBEID = 'BEHANDLING_FORHINDRER_ARBEID',
    BEHANDLING_STERILISERING = 'BEHANDLING_STERILISERING',
    DONOR = 'DONOR',
    GODKJENT_HELSEINSTITUSJON = 'GODKJENT_HELSEINSTITUSJON',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = 'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND',
    NODVENDIG_KONTROLLUNDENRSOKELSE = 'NODVENDIG_KONTROLLUNDENRSOKELSE',
    SMITTEFARE = 'SMITTEFARE',
    UFOR_GRUNNET_BARNLOSHET = 'UFOR_GRUNNET_BARNLOSHET',
}

export type AnnenFraversArsak = {
    readonly __typename: 'AnnenFraversArsak'
    readonly beskrivelse?: Maybe<Scalars['String']['output']>
    readonly grunn: ReadonlyArray<AnnenFraverGrunn>
}

export type Arbeidsgiver = {
    readonly __typename: 'Arbeidsgiver'
    readonly aktivtArbeidsforhold: Scalars['Boolean']['output']
    readonly naermesteLeder?: Maybe<NaermesteLeder>
    readonly navn: Scalars['String']['output']
    readonly orgnummer: Scalars['String']['output']
}

export type ArbeidsgiverOrgnummerBrukerSvar = {
    readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: Scalars['String']['output']
}

export type ArbeidsgiverStatus = {
    readonly __typename: 'ArbeidsgiverStatus'
    readonly orgNavn: Scalars['String']['output']
    readonly orgnummer: Scalars['String']['output']
}

export type ArbeidsgiverSykmelding = {
    readonly __typename: 'ArbeidsgiverSykmelding'
    readonly navn?: Maybe<Scalars['String']['output']>
}

export type ArbeidsledigBrukerSvar = {
    readonly __typename: 'ArbeidsledigBrukerSvar'
    readonly arbeidsledigFraOrgnummer?: Maybe<ArbeidsledigFraOrgnummerBrukerSvar>
}

export type ArbeidsledigFraOrgnummerBrukerSvar = {
    readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: Scalars['String']['output']
}

export type ArbeidsledigInput = {
    readonly arbeidsledigFraOrgnummer?: InputMaybe<Scalars['String']['input']>
}

export type ArbeidsrelatertArsak = {
    readonly __typename: 'ArbeidsrelatertArsak'
    readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
    readonly beskrivelse?: Maybe<Scalars['String']['output']>
}

export enum ArbeidsrelatertArsakType {
    ANNET = 'ANNET',
    MANGLENDE_TILRETTELEGGING = 'MANGLENDE_TILRETTELEGGING',
}

export type ArbeidssituasjonBrukerSvar = {
    readonly __typename: 'ArbeidssituasjonBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: ArbeidssituasjonType
}

export type ArbeidssituasjonSvar = {
    readonly __typename: 'ArbeidssituasjonSvar'
    readonly svar: ArbeidssituasjonType
    readonly svarType: Svartype
}

export enum ArbeidssituasjonType {
    ANNET = 'ANNET',
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    FISKER = 'FISKER',
    FRILANSER = 'FRILANSER',
    JORDBRUKER = 'JORDBRUKER',
    NAERINGSDRIVENDE = 'NAERINGSDRIVENDE',
    PERMITTERT = 'PERMITTERT',
}

export type Behandler = {
    readonly __typename: 'Behandler'
    readonly adresse?: Maybe<Adresse>
    readonly etternavn: Scalars['String']['output']
    readonly fornavn: Scalars['String']['output']
    readonly mellomnavn?: Maybe<Scalars['String']['output']>
    readonly tlf?: Maybe<Scalars['String']['output']>
}

export type Behandlingsutfall = {
    readonly __typename: 'Behandlingsutfall'
    readonly ruleHits: ReadonlyArray<RegelInfo>
    readonly status: RegelStatus
}

export enum Blad {
    A = 'A',
    B = 'B',
}

export type BladBrukerSvar = {
    readonly __typename: 'BladBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: Blad
}

export type BrukerSvar = {
    readonly __typename: 'BrukerSvar'
    readonly arbeidsgiverOrgnummer?: Maybe<ArbeidsgiverOrgnummerBrukerSvar>
    readonly arbeidsledig?: Maybe<ArbeidsledigBrukerSvar>
    readonly arbeidssituasjon: ArbeidssituasjonBrukerSvar
    readonly egenmeldingsdager?: Maybe<EgenmeldingsdagerBrukerSvar>
    readonly egenmeldingsperioder?: Maybe<FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar>
    readonly erOpplysningeneRiktige: ErOpplysningeneRiktigeBrukerSvar
    readonly fisker?: Maybe<FiskerBrukerSvar>
    readonly harBruktEgenmelding?: Maybe<HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar>
    readonly harBruktEgenmeldingsdager?: Maybe<HarBruktEgenmeldingsdagerBrukerSvar>
    readonly harForsikring?: Maybe<HarForsikringBrukerSvar>
    readonly riktigNarmesteLeder?: Maybe<RiktigNarmesteLederBrukerSvar>
    readonly uriktigeOpplysninger?: Maybe<UriktigeOpplysningerBrukerSvar>
}

export type Brukerinformasjon = {
    readonly __typename: 'Brukerinformasjon'
    readonly arbeidsgivere: ReadonlyArray<Arbeidsgiver>
}

export type DagerSvar = {
    readonly __typename: 'DagerSvar'
    readonly svar: ReadonlyArray<Scalars['Date']['output']>
    readonly svarType: Svartype
}

export type DateRange = {
    readonly fom?: InputMaybe<Scalars['Date']['input']>
    readonly tom?: InputMaybe<Scalars['Date']['input']>
}

export type Diagnose = {
    readonly __typename: 'Diagnose'
    readonly kode: Scalars['String']['output']
    readonly system: Scalars['String']['output']
    readonly tekst?: Maybe<Scalars['String']['output']>
}

export type EgenmeldingsdagerBrukerSvar = {
    readonly __typename: 'EgenmeldingsdagerBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: ReadonlyArray<Scalars['Date']['output']>
}

export type ErIArbeid = {
    readonly __typename: 'ErIArbeid'
    readonly annetArbeidPaSikt: Scalars['Boolean']['output']
    readonly arbeidFOM?: Maybe<Scalars['Date']['output']>
    readonly egetArbeidPaSikt: Scalars['Boolean']['output']
    readonly vurderingsdato?: Maybe<Scalars['Date']['output']>
}

export type ErIkkeIArbeid = {
    readonly __typename: 'ErIkkeIArbeid'
    readonly arbeidsforFOM?: Maybe<Scalars['Date']['output']>
    readonly arbeidsforPaSikt: Scalars['Boolean']['output']
    readonly vurderingsdato?: Maybe<Scalars['Date']['output']>
}

export type ErOpplysningeneRiktigeBrukerSvar = {
    readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: JaEllerNei
}

export type FiskerBrukerSvar = {
    readonly __typename: 'FiskerBrukerSvar'
    readonly blad: BladBrukerSvar
    readonly lottOgHyre: LottOgHyreBrukerSvar
}

export type FiskerInput = {
    readonly blad?: InputMaybe<Blad>
    readonly lottOgHyre?: InputMaybe<LottOgHyre>
}

export type FomTom = {
    readonly __typename: 'FomTom'
    readonly fom: Scalars['Date']['output']
    readonly tom: Scalars['Date']['output']
}

export type FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar = {
    readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: ReadonlyArray<FomTom>
}

export type GradertPeriode = {
    readonly __typename: 'GradertPeriode'
    readonly grad: Scalars['Int']['output']
    readonly reisetilskudd: Scalars['Boolean']['output']
}

export type HarBruktEgenmeldingsdagerBrukerSvar = {
    readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: JaEllerNei
}

export type HarForsikringBrukerSvar = {
    readonly __typename: 'HarForsikringBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: JaEllerNei
}

export type HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar = {
    readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: JaEllerNei
}

export enum JaEllerNei {
    JA = 'JA',
    NEI = 'NEI',
}

export type JaNeiSvar = {
    readonly __typename: 'JaNeiSvar'
    readonly svar: YesOrNo
    readonly svarType: Svartype
}

export type KontaktMedPasient = {
    readonly __typename: 'KontaktMedPasient'
    readonly begrunnelseIkkeKontakt?: Maybe<Scalars['String']['output']>
    readonly kontaktDato?: Maybe<Scalars['Date']['output']>
}

export enum LottOgHyre {
    BEGGE = 'BEGGE',
    HYRE = 'HYRE',
    LOTT = 'LOTT',
}

export type LottOgHyreBrukerSvar = {
    readonly __typename: 'LottOgHyreBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: LottOgHyre
}

export type MedisinskArsak = {
    readonly __typename: 'MedisinskArsak'
    readonly arsak: ReadonlyArray<MedisinskArsakType>
    readonly beskrivelse?: Maybe<Scalars['String']['output']>
}

export enum MedisinskArsakType {
    AKTIVITET_FORHINDRER_BEDRING = 'AKTIVITET_FORHINDRER_BEDRING',
    AKTIVITET_FORVERRER_TILSTAND = 'AKTIVITET_FORVERRER_TILSTAND',
    ANNET = 'ANNET',
    TILSTAND_HINDRER_AKTIVITET = 'TILSTAND_HINDRER_AKTIVITET',
}

export type MedisinskVurdering = {
    readonly __typename: 'MedisinskVurdering'
    readonly annenFraversArsak?: Maybe<AnnenFraversArsak>
    readonly biDiagnoser: ReadonlyArray<Diagnose>
    readonly hovedDiagnose?: Maybe<Diagnose>
    readonly svangerskap: Scalars['Boolean']['output']
    readonly yrkesskade: Scalars['Boolean']['output']
    readonly yrkesskadeDato?: Maybe<Scalars['Date']['output']>
}

export type MeldingTilNav = {
    readonly __typename: 'MeldingTilNAV'
    readonly beskrivBistand?: Maybe<Scalars['String']['output']>
    readonly bistandUmiddelbart: Scalars['Boolean']['output']
}

export type Merknad = {
    readonly __typename: 'Merknad'
    readonly beskrivelse?: Maybe<Scalars['String']['output']>
    readonly type: Merknadtype
}

export enum Merknadtype {
    DELVIS_GODKJENT = 'DELVIS_GODKJENT',
    TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER = 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
    TILBAKEDATERT_PAPIRSYKMELDING = 'TILBAKEDATERT_PAPIRSYKMELDING',
    UGYLDIG_TILBAKEDATERING = 'UGYLDIG_TILBAKEDATERING',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
}

export type Mutation = {
    readonly __typename: 'Mutation'
    readonly changeSykmeldingStatus: Sykmelding
    readonly dev_changeScenario: Scalars['Boolean']['output']
    readonly dev_setAntallArbeidsgivere: Scalars['Boolean']['output']
    readonly feedback: Scalars['Boolean']['output']
    readonly sendSykmelding: Sykmelding
    readonly updateEgenmeldingsdager: Sykmelding
}

export type MutationChangeSykmeldingStatusArgs = {
    status: SykmeldingChangeStatus
    sykmeldingId: Scalars['String']['input']
}

export type MutationDev_ChangeScenarioArgs = {
    scenario: Scalars['String']['input']
}

export type MutationDev_SetAntallArbeidsgivereArgs = {
    antall: Scalars['Int']['input']
}

export type MutationFeedbackArgs = {
    feedback: Scalars['JSON']['input']
}

export type MutationSendSykmeldingArgs = {
    sykmeldingId: Scalars['String']['input']
    values: SendSykmeldingValues
}

export type MutationUpdateEgenmeldingsdagerArgs = {
    egenmeldingsdager: ReadonlyArray<Scalars['Date']['input']>
    sykmeldingId: Scalars['String']['input']
}

export type NaermesteLeder = {
    readonly __typename: 'NaermesteLeder'
    readonly navn: Scalars['String']['output']
}

export type Pasient = {
    readonly __typename: 'Pasient'
    readonly etternavn?: Maybe<Scalars['String']['output']>
    readonly fnr?: Maybe<Scalars['String']['output']>
    readonly fornavn?: Maybe<Scalars['String']['output']>
    readonly mellomnavn?: Maybe<Scalars['String']['output']>
    readonly overSyttiAar?: Maybe<Scalars['Boolean']['output']>
}

export type Periode = {
    readonly __typename: 'Periode'
    readonly aktivitetIkkeMulig?: Maybe<AktivitetIkkeMuligPeriode>
    readonly behandlingsdager?: Maybe<Scalars['Int']['output']>
    readonly fom: Scalars['Date']['output']
    readonly gradert?: Maybe<GradertPeriode>
    readonly innspillTilArbeidsgiver?: Maybe<Scalars['String']['output']>
    readonly reisetilskudd: Scalars['Boolean']['output']
    readonly tom: Scalars['Date']['output']
    readonly type: Periodetype
}

export type PerioderSvar = {
    readonly __typename: 'PerioderSvar'
    readonly svar: ReadonlyArray<FomTom>
    readonly svarType: Svartype
}

export enum Periodetype {
    AKTIVITET_IKKE_MULIG = 'AKTIVITET_IKKE_MULIG',
    AVVENTENDE = 'AVVENTENDE',
    BEHANDLINGSDAGER = 'BEHANDLINGSDAGER',
    GRADERT = 'GRADERT',
    REISETILSKUDD = 'REISETILSKUDD',
}

export type Prognose = {
    readonly __typename: 'Prognose'
    readonly arbeidsforEtterPeriode: Scalars['Boolean']['output']
    readonly erIArbeid?: Maybe<ErIArbeid>
    readonly erIkkeIArbeid?: Maybe<ErIkkeIArbeid>
    readonly hensynArbeidsplassen?: Maybe<Scalars['String']['output']>
}

export type Query = {
    readonly __typename: 'Query'
    readonly brukerinformasjon: Brukerinformasjon
    readonly sykmelding: Sykmelding
    readonly sykmeldingUtenforVentetid: UtenforVentetid
    readonly sykmeldinger: ReadonlyArray<Sykmelding>
    readonly tidligereArbeidsgivere?: Maybe<ReadonlyArray<TidligereArbeidsgiver>>
}

export type QueryBrukerinformasjonArgs = {
    id: Scalars['String']['input']
}

export type QuerySykmeldingArgs = {
    id: Scalars['String']['input']
}

export type QuerySykmeldingUtenforVentetidArgs = {
    id: Scalars['String']['input']
}

export type QueryTidligereArbeidsgivereArgs = {
    id: Scalars['String']['input']
}

export type RegelInfo = {
    readonly __typename: 'RegelInfo'
    readonly messageForSender: Scalars['String']['output']
    readonly messageForUser: Scalars['String']['output']
    readonly ruleName: Scalars['String']['output']
    readonly ruleStatus: RegelStatus
}

export enum RegelStatus {
    INVALID = 'INVALID',
    MANUAL_PROCESSING = 'MANUAL_PROCESSING',
    OK = 'OK',
}

export type RiktigNarmesteLederBrukerSvar = {
    readonly __typename: 'RiktigNarmesteLederBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: JaEllerNei
}

export type SendSykmeldingValues = {
    readonly arbeidsgiverOrgnummer?: InputMaybe<Scalars['String']['input']>
    readonly arbeidsledig?: InputMaybe<ArbeidsledigInput>
    readonly arbeidssituasjon?: InputMaybe<ArbeidssituasjonType>
    readonly egenmeldingsdager?: InputMaybe<ReadonlyArray<Scalars['Date']['input']>>
    readonly egenmeldingsperioder?: InputMaybe<ReadonlyArray<DateRange>>
    readonly erOpplysningeneRiktige?: InputMaybe<YesOrNo>
    readonly fisker?: InputMaybe<FiskerInput>
    readonly harBruktEgenmelding?: InputMaybe<YesOrNo>
    readonly harEgenmeldingsdager?: InputMaybe<YesOrNo>
    readonly harForsikring?: InputMaybe<YesOrNo>
    readonly riktigNarmesteLeder?: InputMaybe<YesOrNo>
    readonly uriktigeOpplysninger?: InputMaybe<ReadonlyArray<UriktigeOpplysningerType>>
}

export enum ShortName {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    EGENMELDINGSDAGER = 'EGENMELDINGSDAGER',
    FORSIKRING = 'FORSIKRING',
    FRAVAER = 'FRAVAER',
    NY_NARMESTE_LEDER = 'NY_NARMESTE_LEDER',
    PERIODE = 'PERIODE',
}

export type Sporsmal = {
    readonly __typename: 'Sporsmal'
    readonly shortName: ShortName
    readonly svar: SvarTypeUnion
    readonly tekst: Scalars['String']['output']
}

export enum StatusEvent {
    APEN = 'APEN',
    AVBRUTT = 'AVBRUTT',
    BEKREFTET = 'BEKREFTET',
    SENDT = 'SENDT',
    UTGATT = 'UTGATT',
}

export enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER = 'SKJERMET_FOR_ARBEIDSGIVER',
    SKJERMET_FOR_NAV = 'SKJERMET_FOR_NAV',
}

export type SvarTypeUnion = ArbeidssituasjonSvar | DagerSvar | JaNeiSvar | PerioderSvar

export enum Svartype {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    DAGER = 'DAGER',
    JA_NEI = 'JA_NEI',
    PERIODER = 'PERIODER',
}

export type Sykmelding = {
    readonly __typename: 'Sykmelding'
    readonly andreTiltak?: Maybe<Scalars['String']['output']>
    readonly arbeidsgiver?: Maybe<ArbeidsgiverSykmelding>
    readonly behandler: Behandler
    readonly behandletTidspunkt: Scalars['Date']['output']
    readonly behandlingsutfall: Behandlingsutfall
    readonly egenmeldt?: Maybe<Scalars['Boolean']['output']>
    readonly id: Scalars['String']['output']
    readonly kontaktMedPasient: KontaktMedPasient
    readonly medisinskVurdering?: Maybe<MedisinskVurdering>
    readonly meldingTilArbeidsgiver?: Maybe<Scalars['String']['output']>
    readonly meldingTilNAV?: Maybe<MeldingTilNav>
    readonly merknader?: Maybe<ReadonlyArray<Merknad>>
    readonly mottattTidspunkt: Scalars['Date']['output']
    readonly papirsykmelding?: Maybe<Scalars['Boolean']['output']>
    readonly pasient?: Maybe<Pasient>
    readonly prognose?: Maybe<Prognose>
    readonly rulesetVersion: Scalars['Int']['output']
    readonly sykmeldingStatus: SykmeldingStatus
    readonly sykmeldingsperioder: ReadonlyArray<Periode>
    readonly tiltakArbeidsplassen?: Maybe<Scalars['String']['output']>
    readonly tiltakNAV?: Maybe<Scalars['String']['output']>
    readonly utdypendeOpplysninger: Scalars['JSON']['output']
    readonly utenlandskSykmelding?: Maybe<UtenlandskSykmelding>
}

export enum SykmeldingCategory {
    OLDER = 'OLDER',
    PROCESSING = 'PROCESSING',
    UNSENT = 'UNSENT',
}

export enum SykmeldingChangeStatus {
    AVBRYT = 'AVBRYT',
    BEKREFT_AVVIST = 'BEKREFT_AVVIST',
}

export type SykmeldingStatus = {
    readonly __typename: 'SykmeldingStatus'
    readonly arbeidsgiver?: Maybe<ArbeidsgiverStatus>
    readonly brukerSvar?: Maybe<BrukerSvar>
    readonly sporsmalOgSvarListe: ReadonlyArray<Sporsmal>
    readonly statusEvent: StatusEvent
    readonly timestamp: Scalars['Date']['output']
}

export type TidligereArbeidsgiver = {
    readonly __typename: 'TidligereArbeidsgiver'
    readonly orgNavn: Scalars['String']['output']
    readonly orgnummer: Scalars['String']['output']
}

export type UriktigeOpplysningerBrukerSvar = {
    readonly __typename: 'UriktigeOpplysningerBrukerSvar'
    readonly sporsmaltekst: Scalars['String']['output']
    readonly svar: ReadonlyArray<UriktigeOpplysningerType>
}

export enum UriktigeOpplysningerType {
    ANDRE_OPPLYSNINGER = 'ANDRE_OPPLYSNINGER',
    ARBEIDSGIVER = 'ARBEIDSGIVER',
    DIAGNOSE = 'DIAGNOSE',
    PERIODE = 'PERIODE',
    SYKMELDINGSGRAD_FOR_HOY = 'SYKMELDINGSGRAD_FOR_HOY',
    SYKMELDINGSGRAD_FOR_LAV = 'SYKMELDINGSGRAD_FOR_LAV',
}

export type UtdypendeOpplysning = {
    readonly __typename: 'UtdypendeOpplysning'
    readonly restriksjoner: ReadonlyArray<SvarRestriksjon>
    readonly sporsmal?: Maybe<Scalars['String']['output']>
    readonly svar: Scalars['String']['output']
}

export type UtenforVentetid = {
    readonly __typename: 'UtenforVentetid'
    readonly erUtenforVentetid: Scalars['Boolean']['output']
    readonly oppfolgingsdato?: Maybe<Scalars['Date']['output']>
}

export type UtenlandskSykmelding = {
    readonly __typename: 'UtenlandskSykmelding'
    readonly land: Scalars['String']['output']
}

export enum YesOrNo {
    NO = 'NO',
    YES = 'YES',
}

export type Dev_ChangeUserScenarioMutationVariables = Exact<{
    scenario: Scalars['String']['input']
}>

export type Dev_ChangeUserScenarioMutation = { readonly __typename: 'Mutation'; readonly dev_changeScenario: boolean }

export type Dev_SetAntallArbeidsgivereMutationVariables = Exact<{
    antall: Scalars['Int']['input']
}>

export type Dev_SetAntallArbeidsgivereMutation = {
    readonly __typename: 'Mutation'
    readonly dev_setAntallArbeidsgivere: boolean
}

export type FeedbackMutationVariables = Exact<{
    feedback: Scalars['JSON']['input']
}>

export type FeedbackMutation = { readonly __typename: 'Mutation'; readonly feedback: boolean }

export type EndreEgenmeldingsdagerMutationVariables = Exact<{
    sykmeldingId: Scalars['String']['input']
    egenmeldingsdager: ReadonlyArray<Scalars['Date']['input']> | Scalars['Date']['input']
}>

export type EndreEgenmeldingsdagerMutation = {
    readonly __typename: 'Mutation'
    readonly updateEgenmeldingsdager: {
        readonly __typename: 'Sykmelding'
        readonly id: string
        readonly mottattTidspunkt: string
        readonly utdypendeOpplysninger: unknown
        readonly tiltakArbeidsplassen?: string | null
        readonly tiltakNAV?: string | null
        readonly andreTiltak?: string | null
        readonly meldingTilArbeidsgiver?: string | null
        readonly behandletTidspunkt: string
        readonly egenmeldt?: boolean | null
        readonly papirsykmelding?: boolean | null
        readonly rulesetVersion: number
        readonly behandlingsutfall: {
            readonly __typename: 'Behandlingsutfall'
            readonly status: RegelStatus
            readonly ruleHits: ReadonlyArray<{
                readonly __typename: 'RegelInfo'
                readonly messageForSender: string
                readonly messageForUser: string
                readonly ruleName: string
                readonly ruleStatus: RegelStatus
            }>
        }
        readonly arbeidsgiver?: { readonly __typename: 'ArbeidsgiverSykmelding'; readonly navn?: string | null } | null
        readonly sykmeldingsperioder: ReadonlyArray<{
            readonly __typename: 'Periode'
            readonly fom: string
            readonly tom: string
            readonly behandlingsdager?: number | null
            readonly innspillTilArbeidsgiver?: string | null
            readonly type: Periodetype
            readonly reisetilskudd: boolean
            readonly gradert?: {
                readonly __typename: 'GradertPeriode'
                readonly grad: number
                readonly reisetilskudd: boolean
            } | null
            readonly aktivitetIkkeMulig?: {
                readonly __typename: 'AktivitetIkkeMuligPeriode'
                readonly medisinskArsak?: {
                    readonly __typename: 'MedisinskArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<MedisinskArsakType>
                } | null
                readonly arbeidsrelatertArsak?: {
                    readonly __typename: 'ArbeidsrelatertArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        readonly sykmeldingStatus: {
            readonly __typename: 'SykmeldingStatus'
            readonly statusEvent: StatusEvent
            readonly timestamp: string
            readonly arbeidsgiver?: {
                readonly __typename: 'ArbeidsgiverStatus'
                readonly orgnummer: string
                readonly orgNavn: string
            } | null
            readonly sporsmalOgSvarListe: ReadonlyArray<{
                readonly __typename: 'Sporsmal'
                readonly tekst: string
                readonly shortName: ShortName
                readonly svar:
                    | {
                          readonly __typename: 'ArbeidssituasjonSvar'
                          readonly svarType: Svartype
                          readonly arbeidsituasjon: ArbeidssituasjonType
                      }
                    | {
                          readonly __typename: 'DagerSvar'
                          readonly svarType: Svartype
                          readonly dager: ReadonlyArray<string>
                      }
                    | { readonly __typename: 'JaNeiSvar'; readonly svarType: Svartype; readonly jaNei: YesOrNo }
                    | {
                          readonly __typename: 'PerioderSvar'
                          readonly svarType: Svartype
                          readonly perioder: ReadonlyArray<{
                              readonly __typename: 'FomTom'
                              readonly fom: string
                              readonly tom: string
                          }>
                      }
            }>
            readonly brukerSvar?: {
                readonly __typename: 'BrukerSvar'
                readonly erOpplysningeneRiktige: {
                    readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                }
                readonly uriktigeOpplysninger?: {
                    readonly __typename: 'UriktigeOpplysningerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<UriktigeOpplysningerType>
                } | null
                readonly arbeidssituasjon: {
                    readonly __typename: 'ArbeidssituasjonBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ArbeidssituasjonType
                }
                readonly arbeidsgiverOrgnummer?: {
                    readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: string
                } | null
                readonly riktigNarmesteLeder?: {
                    readonly __typename: 'RiktigNarmesteLederBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly harBruktEgenmeldingsdager?: {
                    readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsdager?: {
                    readonly __typename: 'EgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<string>
                } | null
                readonly harBruktEgenmelding?: {
                    readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsperioder?: {
                    readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<{
                        readonly __typename: 'FomTom'
                        readonly fom: string
                        readonly tom: string
                    }>
                } | null
                readonly harForsikring?: {
                    readonly __typename: 'HarForsikringBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly fisker?: {
                    readonly __typename: 'FiskerBrukerSvar'
                    readonly blad: {
                        readonly __typename: 'BladBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: Blad
                    }
                    readonly lottOgHyre: {
                        readonly __typename: 'LottOgHyreBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: LottOgHyre
                    }
                } | null
                readonly arbeidsledig?: {
                    readonly __typename: 'ArbeidsledigBrukerSvar'
                    readonly arbeidsledigFraOrgnummer?: {
                        readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: string
                    } | null
                } | null
            } | null
        }
        readonly medisinskVurdering?: {
            readonly __typename: 'MedisinskVurdering'
            readonly svangerskap: boolean
            readonly yrkesskade: boolean
            readonly yrkesskadeDato?: string | null
            readonly hovedDiagnose?: {
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            } | null
            readonly biDiagnoser: ReadonlyArray<{
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            }>
            readonly annenFraversArsak?: {
                readonly __typename: 'AnnenFraversArsak'
                readonly grunn: ReadonlyArray<AnnenFraverGrunn>
                readonly beskrivelse?: string | null
            } | null
        } | null
        readonly prognose?: {
            readonly __typename: 'Prognose'
            readonly arbeidsforEtterPeriode: boolean
            readonly hensynArbeidsplassen?: string | null
            readonly erIArbeid?: {
                readonly __typename: 'ErIArbeid'
                readonly egetArbeidPaSikt: boolean
                readonly annetArbeidPaSikt: boolean
                readonly arbeidFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
            readonly erIkkeIArbeid?: {
                readonly __typename: 'ErIkkeIArbeid'
                readonly arbeidsforPaSikt: boolean
                readonly arbeidsforFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
        } | null
        readonly meldingTilNAV?: {
            readonly __typename: 'MeldingTilNAV'
            readonly beskrivBistand?: string | null
            readonly bistandUmiddelbart: boolean
        } | null
        readonly kontaktMedPasient: {
            readonly __typename: 'KontaktMedPasient'
            readonly begrunnelseIkkeKontakt?: string | null
            readonly kontaktDato?: string | null
        }
        readonly behandler: {
            readonly __typename: 'Behandler'
            readonly fornavn: string
            readonly mellomnavn?: string | null
            readonly etternavn: string
            readonly tlf?: string | null
            readonly adresse?: {
                readonly __typename: 'Adresse'
                readonly gate?: string | null
                readonly postnummer?: number | null
                readonly kommune?: string | null
                readonly postboks?: string | null
                readonly land?: string | null
            } | null
        }
        readonly merknader?: ReadonlyArray<{
            readonly __typename: 'Merknad'
            readonly beskrivelse?: string | null
            readonly type: Merknadtype
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
            readonly overSyttiAar?: boolean | null
        } | null
        readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
    }
}

export type NaermesteLederFragment = { readonly __typename: 'NaermesteLeder'; readonly navn: string }

export type BrukerinformasjonFragment = {
    readonly __typename: 'Brukerinformasjon'
    readonly arbeidsgivere: ReadonlyArray<{
        readonly __typename: 'Arbeidsgiver'
        readonly orgnummer: string
        readonly navn: string
        readonly aktivtArbeidsforhold: boolean
        readonly naermesteLeder?: { readonly __typename: 'NaermesteLeder'; readonly navn: string } | null
    }>
}

export type SykmeldingUtenforVentetidFragment = {
    readonly __typename: 'UtenforVentetid'
    readonly erUtenforVentetid: boolean
    readonly oppfolgingsdato?: string | null
}

export type SykmeldingErUtenforVentetidQueryVariables = Exact<{
    sykmeldingId: Scalars['String']['input']
}>

export type SykmeldingErUtenforVentetidQuery = {
    readonly __typename: 'Query'
    readonly sykmeldingUtenforVentetid: {
        readonly __typename: 'UtenforVentetid'
        readonly erUtenforVentetid: boolean
        readonly oppfolgingsdato?: string | null
    }
}

export type BrukerinformasjonQueryVariables = Exact<{
    sykmeldingId: Scalars['String']['input']
}>

export type BrukerinformasjonQuery = {
    readonly __typename: 'Query'
    readonly brukerinformasjon: {
        readonly __typename: 'Brukerinformasjon'
        readonly arbeidsgivere: ReadonlyArray<{
            readonly __typename: 'Arbeidsgiver'
            readonly orgnummer: string
            readonly navn: string
            readonly aktivtArbeidsforhold: boolean
            readonly naermesteLeder?: { readonly __typename: 'NaermesteLeder'; readonly navn: string } | null
        }>
    }
}

export type TidligereArbeidsgiverFragment = {
    readonly __typename: 'TidligereArbeidsgiver'
    readonly orgNavn: string
    readonly orgnummer: string
}

export type TidligereArbeidsgivereByIdQueryVariables = Exact<{
    sykmeldingId: Scalars['String']['input']
}>

export type TidligereArbeidsgivereByIdQuery = {
    readonly __typename: 'Query'
    readonly tidligereArbeidsgivere?: ReadonlyArray<{
        readonly __typename: 'TidligereArbeidsgiver'
        readonly orgNavn: string
        readonly orgnummer: string
    }> | null
}

export type ChangeSykmeldingStatusMutationVariables = Exact<{
    sykmeldingId: Scalars['String']['input']
    status: SykmeldingChangeStatus
}>

export type ChangeSykmeldingStatusMutation = {
    readonly __typename: 'Mutation'
    readonly changeSykmeldingStatus: {
        readonly __typename: 'Sykmelding'
        readonly id: string
        readonly mottattTidspunkt: string
        readonly utdypendeOpplysninger: unknown
        readonly tiltakArbeidsplassen?: string | null
        readonly tiltakNAV?: string | null
        readonly andreTiltak?: string | null
        readonly meldingTilArbeidsgiver?: string | null
        readonly behandletTidspunkt: string
        readonly egenmeldt?: boolean | null
        readonly papirsykmelding?: boolean | null
        readonly rulesetVersion: number
        readonly behandlingsutfall: {
            readonly __typename: 'Behandlingsutfall'
            readonly status: RegelStatus
            readonly ruleHits: ReadonlyArray<{
                readonly __typename: 'RegelInfo'
                readonly messageForSender: string
                readonly messageForUser: string
                readonly ruleName: string
                readonly ruleStatus: RegelStatus
            }>
        }
        readonly arbeidsgiver?: { readonly __typename: 'ArbeidsgiverSykmelding'; readonly navn?: string | null } | null
        readonly sykmeldingsperioder: ReadonlyArray<{
            readonly __typename: 'Periode'
            readonly fom: string
            readonly tom: string
            readonly behandlingsdager?: number | null
            readonly innspillTilArbeidsgiver?: string | null
            readonly type: Periodetype
            readonly reisetilskudd: boolean
            readonly gradert?: {
                readonly __typename: 'GradertPeriode'
                readonly grad: number
                readonly reisetilskudd: boolean
            } | null
            readonly aktivitetIkkeMulig?: {
                readonly __typename: 'AktivitetIkkeMuligPeriode'
                readonly medisinskArsak?: {
                    readonly __typename: 'MedisinskArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<MedisinskArsakType>
                } | null
                readonly arbeidsrelatertArsak?: {
                    readonly __typename: 'ArbeidsrelatertArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        readonly sykmeldingStatus: {
            readonly __typename: 'SykmeldingStatus'
            readonly statusEvent: StatusEvent
            readonly timestamp: string
            readonly arbeidsgiver?: {
                readonly __typename: 'ArbeidsgiverStatus'
                readonly orgnummer: string
                readonly orgNavn: string
            } | null
            readonly sporsmalOgSvarListe: ReadonlyArray<{
                readonly __typename: 'Sporsmal'
                readonly tekst: string
                readonly shortName: ShortName
                readonly svar:
                    | {
                          readonly __typename: 'ArbeidssituasjonSvar'
                          readonly svarType: Svartype
                          readonly arbeidsituasjon: ArbeidssituasjonType
                      }
                    | {
                          readonly __typename: 'DagerSvar'
                          readonly svarType: Svartype
                          readonly dager: ReadonlyArray<string>
                      }
                    | { readonly __typename: 'JaNeiSvar'; readonly svarType: Svartype; readonly jaNei: YesOrNo }
                    | {
                          readonly __typename: 'PerioderSvar'
                          readonly svarType: Svartype
                          readonly perioder: ReadonlyArray<{
                              readonly __typename: 'FomTom'
                              readonly fom: string
                              readonly tom: string
                          }>
                      }
            }>
            readonly brukerSvar?: {
                readonly __typename: 'BrukerSvar'
                readonly erOpplysningeneRiktige: {
                    readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                }
                readonly uriktigeOpplysninger?: {
                    readonly __typename: 'UriktigeOpplysningerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<UriktigeOpplysningerType>
                } | null
                readonly arbeidssituasjon: {
                    readonly __typename: 'ArbeidssituasjonBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ArbeidssituasjonType
                }
                readonly arbeidsgiverOrgnummer?: {
                    readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: string
                } | null
                readonly riktigNarmesteLeder?: {
                    readonly __typename: 'RiktigNarmesteLederBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly harBruktEgenmeldingsdager?: {
                    readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsdager?: {
                    readonly __typename: 'EgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<string>
                } | null
                readonly harBruktEgenmelding?: {
                    readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsperioder?: {
                    readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<{
                        readonly __typename: 'FomTom'
                        readonly fom: string
                        readonly tom: string
                    }>
                } | null
                readonly harForsikring?: {
                    readonly __typename: 'HarForsikringBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly fisker?: {
                    readonly __typename: 'FiskerBrukerSvar'
                    readonly blad: {
                        readonly __typename: 'BladBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: Blad
                    }
                    readonly lottOgHyre: {
                        readonly __typename: 'LottOgHyreBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: LottOgHyre
                    }
                } | null
                readonly arbeidsledig?: {
                    readonly __typename: 'ArbeidsledigBrukerSvar'
                    readonly arbeidsledigFraOrgnummer?: {
                        readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: string
                    } | null
                } | null
            } | null
        }
        readonly medisinskVurdering?: {
            readonly __typename: 'MedisinskVurdering'
            readonly svangerskap: boolean
            readonly yrkesskade: boolean
            readonly yrkesskadeDato?: string | null
            readonly hovedDiagnose?: {
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            } | null
            readonly biDiagnoser: ReadonlyArray<{
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            }>
            readonly annenFraversArsak?: {
                readonly __typename: 'AnnenFraversArsak'
                readonly grunn: ReadonlyArray<AnnenFraverGrunn>
                readonly beskrivelse?: string | null
            } | null
        } | null
        readonly prognose?: {
            readonly __typename: 'Prognose'
            readonly arbeidsforEtterPeriode: boolean
            readonly hensynArbeidsplassen?: string | null
            readonly erIArbeid?: {
                readonly __typename: 'ErIArbeid'
                readonly egetArbeidPaSikt: boolean
                readonly annetArbeidPaSikt: boolean
                readonly arbeidFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
            readonly erIkkeIArbeid?: {
                readonly __typename: 'ErIkkeIArbeid'
                readonly arbeidsforPaSikt: boolean
                readonly arbeidsforFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
        } | null
        readonly meldingTilNAV?: {
            readonly __typename: 'MeldingTilNAV'
            readonly beskrivBistand?: string | null
            readonly bistandUmiddelbart: boolean
        } | null
        readonly kontaktMedPasient: {
            readonly __typename: 'KontaktMedPasient'
            readonly begrunnelseIkkeKontakt?: string | null
            readonly kontaktDato?: string | null
        }
        readonly behandler: {
            readonly __typename: 'Behandler'
            readonly fornavn: string
            readonly mellomnavn?: string | null
            readonly etternavn: string
            readonly tlf?: string | null
            readonly adresse?: {
                readonly __typename: 'Adresse'
                readonly gate?: string | null
                readonly postnummer?: number | null
                readonly kommune?: string | null
                readonly postboks?: string | null
                readonly land?: string | null
            } | null
        }
        readonly merknader?: ReadonlyArray<{
            readonly __typename: 'Merknad'
            readonly beskrivelse?: string | null
            readonly type: Merknadtype
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
            readonly overSyttiAar?: boolean | null
        } | null
        readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
    }
}

export type SendSykmeldingMutationVariables = Exact<{
    sykmeldingId: Scalars['String']['input']
    values: SendSykmeldingValues
}>

export type SendSykmeldingMutation = {
    readonly __typename: 'Mutation'
    readonly sendSykmelding: {
        readonly __typename: 'Sykmelding'
        readonly id: string
        readonly mottattTidspunkt: string
        readonly utdypendeOpplysninger: unknown
        readonly tiltakArbeidsplassen?: string | null
        readonly tiltakNAV?: string | null
        readonly andreTiltak?: string | null
        readonly meldingTilArbeidsgiver?: string | null
        readonly behandletTidspunkt: string
        readonly egenmeldt?: boolean | null
        readonly papirsykmelding?: boolean | null
        readonly rulesetVersion: number
        readonly behandlingsutfall: {
            readonly __typename: 'Behandlingsutfall'
            readonly status: RegelStatus
            readonly ruleHits: ReadonlyArray<{
                readonly __typename: 'RegelInfo'
                readonly messageForSender: string
                readonly messageForUser: string
                readonly ruleName: string
                readonly ruleStatus: RegelStatus
            }>
        }
        readonly arbeidsgiver?: { readonly __typename: 'ArbeidsgiverSykmelding'; readonly navn?: string | null } | null
        readonly sykmeldingsperioder: ReadonlyArray<{
            readonly __typename: 'Periode'
            readonly fom: string
            readonly tom: string
            readonly behandlingsdager?: number | null
            readonly innspillTilArbeidsgiver?: string | null
            readonly type: Periodetype
            readonly reisetilskudd: boolean
            readonly gradert?: {
                readonly __typename: 'GradertPeriode'
                readonly grad: number
                readonly reisetilskudd: boolean
            } | null
            readonly aktivitetIkkeMulig?: {
                readonly __typename: 'AktivitetIkkeMuligPeriode'
                readonly medisinskArsak?: {
                    readonly __typename: 'MedisinskArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<MedisinskArsakType>
                } | null
                readonly arbeidsrelatertArsak?: {
                    readonly __typename: 'ArbeidsrelatertArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        readonly sykmeldingStatus: {
            readonly __typename: 'SykmeldingStatus'
            readonly statusEvent: StatusEvent
            readonly timestamp: string
            readonly arbeidsgiver?: {
                readonly __typename: 'ArbeidsgiverStatus'
                readonly orgnummer: string
                readonly orgNavn: string
            } | null
            readonly sporsmalOgSvarListe: ReadonlyArray<{
                readonly __typename: 'Sporsmal'
                readonly tekst: string
                readonly shortName: ShortName
                readonly svar:
                    | {
                          readonly __typename: 'ArbeidssituasjonSvar'
                          readonly svarType: Svartype
                          readonly arbeidsituasjon: ArbeidssituasjonType
                      }
                    | {
                          readonly __typename: 'DagerSvar'
                          readonly svarType: Svartype
                          readonly dager: ReadonlyArray<string>
                      }
                    | { readonly __typename: 'JaNeiSvar'; readonly svarType: Svartype; readonly jaNei: YesOrNo }
                    | {
                          readonly __typename: 'PerioderSvar'
                          readonly svarType: Svartype
                          readonly perioder: ReadonlyArray<{
                              readonly __typename: 'FomTom'
                              readonly fom: string
                              readonly tom: string
                          }>
                      }
            }>
            readonly brukerSvar?: {
                readonly __typename: 'BrukerSvar'
                readonly erOpplysningeneRiktige: {
                    readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                }
                readonly uriktigeOpplysninger?: {
                    readonly __typename: 'UriktigeOpplysningerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<UriktigeOpplysningerType>
                } | null
                readonly arbeidssituasjon: {
                    readonly __typename: 'ArbeidssituasjonBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ArbeidssituasjonType
                }
                readonly arbeidsgiverOrgnummer?: {
                    readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: string
                } | null
                readonly riktigNarmesteLeder?: {
                    readonly __typename: 'RiktigNarmesteLederBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly harBruktEgenmeldingsdager?: {
                    readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsdager?: {
                    readonly __typename: 'EgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<string>
                } | null
                readonly harBruktEgenmelding?: {
                    readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsperioder?: {
                    readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<{
                        readonly __typename: 'FomTom'
                        readonly fom: string
                        readonly tom: string
                    }>
                } | null
                readonly harForsikring?: {
                    readonly __typename: 'HarForsikringBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly fisker?: {
                    readonly __typename: 'FiskerBrukerSvar'
                    readonly blad: {
                        readonly __typename: 'BladBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: Blad
                    }
                    readonly lottOgHyre: {
                        readonly __typename: 'LottOgHyreBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: LottOgHyre
                    }
                } | null
                readonly arbeidsledig?: {
                    readonly __typename: 'ArbeidsledigBrukerSvar'
                    readonly arbeidsledigFraOrgnummer?: {
                        readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: string
                    } | null
                } | null
            } | null
        }
        readonly medisinskVurdering?: {
            readonly __typename: 'MedisinskVurdering'
            readonly svangerskap: boolean
            readonly yrkesskade: boolean
            readonly yrkesskadeDato?: string | null
            readonly hovedDiagnose?: {
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            } | null
            readonly biDiagnoser: ReadonlyArray<{
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            }>
            readonly annenFraversArsak?: {
                readonly __typename: 'AnnenFraversArsak'
                readonly grunn: ReadonlyArray<AnnenFraverGrunn>
                readonly beskrivelse?: string | null
            } | null
        } | null
        readonly prognose?: {
            readonly __typename: 'Prognose'
            readonly arbeidsforEtterPeriode: boolean
            readonly hensynArbeidsplassen?: string | null
            readonly erIArbeid?: {
                readonly __typename: 'ErIArbeid'
                readonly egetArbeidPaSikt: boolean
                readonly annetArbeidPaSikt: boolean
                readonly arbeidFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
            readonly erIkkeIArbeid?: {
                readonly __typename: 'ErIkkeIArbeid'
                readonly arbeidsforPaSikt: boolean
                readonly arbeidsforFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
        } | null
        readonly meldingTilNAV?: {
            readonly __typename: 'MeldingTilNAV'
            readonly beskrivBistand?: string | null
            readonly bistandUmiddelbart: boolean
        } | null
        readonly kontaktMedPasient: {
            readonly __typename: 'KontaktMedPasient'
            readonly begrunnelseIkkeKontakt?: string | null
            readonly kontaktDato?: string | null
        }
        readonly behandler: {
            readonly __typename: 'Behandler'
            readonly fornavn: string
            readonly mellomnavn?: string | null
            readonly etternavn: string
            readonly tlf?: string | null
            readonly adresse?: {
                readonly __typename: 'Adresse'
                readonly gate?: string | null
                readonly postnummer?: number | null
                readonly kommune?: string | null
                readonly postboks?: string | null
                readonly land?: string | null
            } | null
        }
        readonly merknader?: ReadonlyArray<{
            readonly __typename: 'Merknad'
            readonly beskrivelse?: string | null
            readonly type: Merknadtype
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
            readonly overSyttiAar?: boolean | null
        } | null
        readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
    }
}

export type PeriodeFragment = {
    readonly __typename: 'Periode'
    readonly fom: string
    readonly tom: string
    readonly behandlingsdager?: number | null
    readonly innspillTilArbeidsgiver?: string | null
    readonly type: Periodetype
    readonly reisetilskudd: boolean
    readonly gradert?: {
        readonly __typename: 'GradertPeriode'
        readonly grad: number
        readonly reisetilskudd: boolean
    } | null
    readonly aktivitetIkkeMulig?: {
        readonly __typename: 'AktivitetIkkeMuligPeriode'
        readonly medisinskArsak?: {
            readonly __typename: 'MedisinskArsak'
            readonly beskrivelse?: string | null
            readonly arsak: ReadonlyArray<MedisinskArsakType>
        } | null
        readonly arbeidsrelatertArsak?: {
            readonly __typename: 'ArbeidsrelatertArsak'
            readonly beskrivelse?: string | null
            readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
        } | null
    } | null
}

export type SvarUnion_ArbeidssituasjonSvar_Fragment = {
    readonly __typename: 'ArbeidssituasjonSvar'
    readonly svarType: Svartype
    readonly arbeidsituasjon: ArbeidssituasjonType
}

export type SvarUnion_DagerSvar_Fragment = {
    readonly __typename: 'DagerSvar'
    readonly svarType: Svartype
    readonly dager: ReadonlyArray<string>
}

export type SvarUnion_JaNeiSvar_Fragment = {
    readonly __typename: 'JaNeiSvar'
    readonly svarType: Svartype
    readonly jaNei: YesOrNo
}

export type SvarUnion_PerioderSvar_Fragment = {
    readonly __typename: 'PerioderSvar'
    readonly svarType: Svartype
    readonly perioder: ReadonlyArray<{ readonly __typename: 'FomTom'; readonly fom: string; readonly tom: string }>
}

export type SvarUnionFragment =
    | SvarUnion_ArbeidssituasjonSvar_Fragment
    | SvarUnion_DagerSvar_Fragment
    | SvarUnion_JaNeiSvar_Fragment
    | SvarUnion_PerioderSvar_Fragment

export type SykmeldingStatusFragment = {
    readonly __typename: 'SykmeldingStatus'
    readonly statusEvent: StatusEvent
    readonly timestamp: string
    readonly arbeidsgiver?: {
        readonly __typename: 'ArbeidsgiverStatus'
        readonly orgnummer: string
        readonly orgNavn: string
    } | null
    readonly sporsmalOgSvarListe: ReadonlyArray<{
        readonly __typename: 'Sporsmal'
        readonly tekst: string
        readonly shortName: ShortName
        readonly svar:
            | {
                  readonly __typename: 'ArbeidssituasjonSvar'
                  readonly svarType: Svartype
                  readonly arbeidsituasjon: ArbeidssituasjonType
              }
            | { readonly __typename: 'DagerSvar'; readonly svarType: Svartype; readonly dager: ReadonlyArray<string> }
            | { readonly __typename: 'JaNeiSvar'; readonly svarType: Svartype; readonly jaNei: YesOrNo }
            | {
                  readonly __typename: 'PerioderSvar'
                  readonly svarType: Svartype
                  readonly perioder: ReadonlyArray<{
                      readonly __typename: 'FomTom'
                      readonly fom: string
                      readonly tom: string
                  }>
              }
    }>
    readonly brukerSvar?: {
        readonly __typename: 'BrukerSvar'
        readonly erOpplysningeneRiktige: {
            readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: JaEllerNei
        }
        readonly uriktigeOpplysninger?: {
            readonly __typename: 'UriktigeOpplysningerBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: ReadonlyArray<UriktigeOpplysningerType>
        } | null
        readonly arbeidssituasjon: {
            readonly __typename: 'ArbeidssituasjonBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: ArbeidssituasjonType
        }
        readonly arbeidsgiverOrgnummer?: {
            readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: string
        } | null
        readonly riktigNarmesteLeder?: {
            readonly __typename: 'RiktigNarmesteLederBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: JaEllerNei
        } | null
        readonly harBruktEgenmeldingsdager?: {
            readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: JaEllerNei
        } | null
        readonly egenmeldingsdager?: {
            readonly __typename: 'EgenmeldingsdagerBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: ReadonlyArray<string>
        } | null
        readonly harBruktEgenmelding?: {
            readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: JaEllerNei
        } | null
        readonly egenmeldingsperioder?: {
            readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: ReadonlyArray<{ readonly __typename: 'FomTom'; readonly fom: string; readonly tom: string }>
        } | null
        readonly harForsikring?: {
            readonly __typename: 'HarForsikringBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: JaEllerNei
        } | null
        readonly fisker?: {
            readonly __typename: 'FiskerBrukerSvar'
            readonly blad: {
                readonly __typename: 'BladBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: Blad
            }
            readonly lottOgHyre: {
                readonly __typename: 'LottOgHyreBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: LottOgHyre
            }
        } | null
        readonly arbeidsledig?: {
            readonly __typename: 'ArbeidsledigBrukerSvar'
            readonly arbeidsledigFraOrgnummer?: {
                readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: string
            } | null
        } | null
    } | null
}

export type BrukerSvarFragment = {
    readonly __typename: 'BrukerSvar'
    readonly erOpplysningeneRiktige: {
        readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: JaEllerNei
    }
    readonly uriktigeOpplysninger?: {
        readonly __typename: 'UriktigeOpplysningerBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: ReadonlyArray<UriktigeOpplysningerType>
    } | null
    readonly arbeidssituasjon: {
        readonly __typename: 'ArbeidssituasjonBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: ArbeidssituasjonType
    }
    readonly arbeidsgiverOrgnummer?: {
        readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: string
    } | null
    readonly riktigNarmesteLeder?: {
        readonly __typename: 'RiktigNarmesteLederBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: JaEllerNei
    } | null
    readonly harBruktEgenmeldingsdager?: {
        readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: JaEllerNei
    } | null
    readonly egenmeldingsdager?: {
        readonly __typename: 'EgenmeldingsdagerBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: ReadonlyArray<string>
    } | null
    readonly harBruktEgenmelding?: {
        readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: JaEllerNei
    } | null
    readonly egenmeldingsperioder?: {
        readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: ReadonlyArray<{ readonly __typename: 'FomTom'; readonly fom: string; readonly tom: string }>
    } | null
    readonly harForsikring?: {
        readonly __typename: 'HarForsikringBrukerSvar'
        readonly sporsmaltekst: string
        readonly svar: JaEllerNei
    } | null
    readonly fisker?: {
        readonly __typename: 'FiskerBrukerSvar'
        readonly blad: { readonly __typename: 'BladBrukerSvar'; readonly sporsmaltekst: string; readonly svar: Blad }
        readonly lottOgHyre: {
            readonly __typename: 'LottOgHyreBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: LottOgHyre
        }
    } | null
    readonly arbeidsledig?: {
        readonly __typename: 'ArbeidsledigBrukerSvar'
        readonly arbeidsledigFraOrgnummer?: {
            readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
            readonly sporsmaltekst: string
            readonly svar: string
        } | null
    } | null
}

export type MedisinskVurderingFragment = {
    readonly __typename: 'MedisinskVurdering'
    readonly svangerskap: boolean
    readonly yrkesskade: boolean
    readonly yrkesskadeDato?: string | null
    readonly hovedDiagnose?: {
        readonly __typename: 'Diagnose'
        readonly tekst?: string | null
        readonly kode: string
        readonly system: string
    } | null
    readonly biDiagnoser: ReadonlyArray<{
        readonly __typename: 'Diagnose'
        readonly tekst?: string | null
        readonly kode: string
        readonly system: string
    }>
    readonly annenFraversArsak?: {
        readonly __typename: 'AnnenFraversArsak'
        readonly grunn: ReadonlyArray<AnnenFraverGrunn>
        readonly beskrivelse?: string | null
    } | null
}

export type SykmeldingFragment = {
    readonly __typename: 'Sykmelding'
    readonly id: string
    readonly mottattTidspunkt: string
    readonly utdypendeOpplysninger: unknown
    readonly tiltakArbeidsplassen?: string | null
    readonly tiltakNAV?: string | null
    readonly andreTiltak?: string | null
    readonly meldingTilArbeidsgiver?: string | null
    readonly behandletTidspunkt: string
    readonly egenmeldt?: boolean | null
    readonly papirsykmelding?: boolean | null
    readonly rulesetVersion: number
    readonly behandlingsutfall: {
        readonly __typename: 'Behandlingsutfall'
        readonly status: RegelStatus
        readonly ruleHits: ReadonlyArray<{
            readonly __typename: 'RegelInfo'
            readonly messageForSender: string
            readonly messageForUser: string
            readonly ruleName: string
            readonly ruleStatus: RegelStatus
        }>
    }
    readonly arbeidsgiver?: { readonly __typename: 'ArbeidsgiverSykmelding'; readonly navn?: string | null } | null
    readonly sykmeldingsperioder: ReadonlyArray<{
        readonly __typename: 'Periode'
        readonly fom: string
        readonly tom: string
        readonly behandlingsdager?: number | null
        readonly innspillTilArbeidsgiver?: string | null
        readonly type: Periodetype
        readonly reisetilskudd: boolean
        readonly gradert?: {
            readonly __typename: 'GradertPeriode'
            readonly grad: number
            readonly reisetilskudd: boolean
        } | null
        readonly aktivitetIkkeMulig?: {
            readonly __typename: 'AktivitetIkkeMuligPeriode'
            readonly medisinskArsak?: {
                readonly __typename: 'MedisinskArsak'
                readonly beskrivelse?: string | null
                readonly arsak: ReadonlyArray<MedisinskArsakType>
            } | null
            readonly arbeidsrelatertArsak?: {
                readonly __typename: 'ArbeidsrelatertArsak'
                readonly beskrivelse?: string | null
                readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
            } | null
        } | null
    }>
    readonly sykmeldingStatus: {
        readonly __typename: 'SykmeldingStatus'
        readonly statusEvent: StatusEvent
        readonly timestamp: string
        readonly arbeidsgiver?: {
            readonly __typename: 'ArbeidsgiverStatus'
            readonly orgnummer: string
            readonly orgNavn: string
        } | null
        readonly sporsmalOgSvarListe: ReadonlyArray<{
            readonly __typename: 'Sporsmal'
            readonly tekst: string
            readonly shortName: ShortName
            readonly svar:
                | {
                      readonly __typename: 'ArbeidssituasjonSvar'
                      readonly svarType: Svartype
                      readonly arbeidsituasjon: ArbeidssituasjonType
                  }
                | {
                      readonly __typename: 'DagerSvar'
                      readonly svarType: Svartype
                      readonly dager: ReadonlyArray<string>
                  }
                | { readonly __typename: 'JaNeiSvar'; readonly svarType: Svartype; readonly jaNei: YesOrNo }
                | {
                      readonly __typename: 'PerioderSvar'
                      readonly svarType: Svartype
                      readonly perioder: ReadonlyArray<{
                          readonly __typename: 'FomTom'
                          readonly fom: string
                          readonly tom: string
                      }>
                  }
        }>
        readonly brukerSvar?: {
            readonly __typename: 'BrukerSvar'
            readonly erOpplysningeneRiktige: {
                readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: JaEllerNei
            }
            readonly uriktigeOpplysninger?: {
                readonly __typename: 'UriktigeOpplysningerBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: ReadonlyArray<UriktigeOpplysningerType>
            } | null
            readonly arbeidssituasjon: {
                readonly __typename: 'ArbeidssituasjonBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: ArbeidssituasjonType
            }
            readonly arbeidsgiverOrgnummer?: {
                readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: string
            } | null
            readonly riktigNarmesteLeder?: {
                readonly __typename: 'RiktigNarmesteLederBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: JaEllerNei
            } | null
            readonly harBruktEgenmeldingsdager?: {
                readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: JaEllerNei
            } | null
            readonly egenmeldingsdager?: {
                readonly __typename: 'EgenmeldingsdagerBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: ReadonlyArray<string>
            } | null
            readonly harBruktEgenmelding?: {
                readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: JaEllerNei
            } | null
            readonly egenmeldingsperioder?: {
                readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: ReadonlyArray<{
                    readonly __typename: 'FomTom'
                    readonly fom: string
                    readonly tom: string
                }>
            } | null
            readonly harForsikring?: {
                readonly __typename: 'HarForsikringBrukerSvar'
                readonly sporsmaltekst: string
                readonly svar: JaEllerNei
            } | null
            readonly fisker?: {
                readonly __typename: 'FiskerBrukerSvar'
                readonly blad: {
                    readonly __typename: 'BladBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: Blad
                }
                readonly lottOgHyre: {
                    readonly __typename: 'LottOgHyreBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: LottOgHyre
                }
            } | null
            readonly arbeidsledig?: {
                readonly __typename: 'ArbeidsledigBrukerSvar'
                readonly arbeidsledigFraOrgnummer?: {
                    readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: string
                } | null
            } | null
        } | null
    }
    readonly medisinskVurdering?: {
        readonly __typename: 'MedisinskVurdering'
        readonly svangerskap: boolean
        readonly yrkesskade: boolean
        readonly yrkesskadeDato?: string | null
        readonly hovedDiagnose?: {
            readonly __typename: 'Diagnose'
            readonly tekst?: string | null
            readonly kode: string
            readonly system: string
        } | null
        readonly biDiagnoser: ReadonlyArray<{
            readonly __typename: 'Diagnose'
            readonly tekst?: string | null
            readonly kode: string
            readonly system: string
        }>
        readonly annenFraversArsak?: {
            readonly __typename: 'AnnenFraversArsak'
            readonly grunn: ReadonlyArray<AnnenFraverGrunn>
            readonly beskrivelse?: string | null
        } | null
    } | null
    readonly prognose?: {
        readonly __typename: 'Prognose'
        readonly arbeidsforEtterPeriode: boolean
        readonly hensynArbeidsplassen?: string | null
        readonly erIArbeid?: {
            readonly __typename: 'ErIArbeid'
            readonly egetArbeidPaSikt: boolean
            readonly annetArbeidPaSikt: boolean
            readonly arbeidFOM?: string | null
            readonly vurderingsdato?: string | null
        } | null
        readonly erIkkeIArbeid?: {
            readonly __typename: 'ErIkkeIArbeid'
            readonly arbeidsforPaSikt: boolean
            readonly arbeidsforFOM?: string | null
            readonly vurderingsdato?: string | null
        } | null
    } | null
    readonly meldingTilNAV?: {
        readonly __typename: 'MeldingTilNAV'
        readonly beskrivBistand?: string | null
        readonly bistandUmiddelbart: boolean
    } | null
    readonly kontaktMedPasient: {
        readonly __typename: 'KontaktMedPasient'
        readonly begrunnelseIkkeKontakt?: string | null
        readonly kontaktDato?: string | null
    }
    readonly behandler: {
        readonly __typename: 'Behandler'
        readonly fornavn: string
        readonly mellomnavn?: string | null
        readonly etternavn: string
        readonly tlf?: string | null
        readonly adresse?: {
            readonly __typename: 'Adresse'
            readonly gate?: string | null
            readonly postnummer?: number | null
            readonly kommune?: string | null
            readonly postboks?: string | null
            readonly land?: string | null
        } | null
    }
    readonly merknader?: ReadonlyArray<{
        readonly __typename: 'Merknad'
        readonly beskrivelse?: string | null
        readonly type: Merknadtype
    }> | null
    readonly pasient?: {
        readonly __typename: 'Pasient'
        readonly fnr?: string | null
        readonly fornavn?: string | null
        readonly mellomnavn?: string | null
        readonly etternavn?: string | null
        readonly overSyttiAar?: boolean | null
    } | null
    readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
}

export type SykmeldingerQueryVariables = Exact<{ [key: string]: never }>

export type SykmeldingerQuery = {
    readonly __typename: 'Query'
    readonly sykmeldinger: ReadonlyArray<{
        readonly __typename: 'Sykmelding'
        readonly id: string
        readonly mottattTidspunkt: string
        readonly utdypendeOpplysninger: unknown
        readonly tiltakArbeidsplassen?: string | null
        readonly tiltakNAV?: string | null
        readonly andreTiltak?: string | null
        readonly meldingTilArbeidsgiver?: string | null
        readonly behandletTidspunkt: string
        readonly egenmeldt?: boolean | null
        readonly papirsykmelding?: boolean | null
        readonly rulesetVersion: number
        readonly behandlingsutfall: {
            readonly __typename: 'Behandlingsutfall'
            readonly status: RegelStatus
            readonly ruleHits: ReadonlyArray<{
                readonly __typename: 'RegelInfo'
                readonly messageForSender: string
                readonly messageForUser: string
                readonly ruleName: string
                readonly ruleStatus: RegelStatus
            }>
        }
        readonly arbeidsgiver?: { readonly __typename: 'ArbeidsgiverSykmelding'; readonly navn?: string | null } | null
        readonly sykmeldingsperioder: ReadonlyArray<{
            readonly __typename: 'Periode'
            readonly fom: string
            readonly tom: string
            readonly behandlingsdager?: number | null
            readonly innspillTilArbeidsgiver?: string | null
            readonly type: Periodetype
            readonly reisetilskudd: boolean
            readonly gradert?: {
                readonly __typename: 'GradertPeriode'
                readonly grad: number
                readonly reisetilskudd: boolean
            } | null
            readonly aktivitetIkkeMulig?: {
                readonly __typename: 'AktivitetIkkeMuligPeriode'
                readonly medisinskArsak?: {
                    readonly __typename: 'MedisinskArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<MedisinskArsakType>
                } | null
                readonly arbeidsrelatertArsak?: {
                    readonly __typename: 'ArbeidsrelatertArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        readonly sykmeldingStatus: {
            readonly __typename: 'SykmeldingStatus'
            readonly statusEvent: StatusEvent
            readonly timestamp: string
            readonly arbeidsgiver?: {
                readonly __typename: 'ArbeidsgiverStatus'
                readonly orgnummer: string
                readonly orgNavn: string
            } | null
            readonly sporsmalOgSvarListe: ReadonlyArray<{
                readonly __typename: 'Sporsmal'
                readonly tekst: string
                readonly shortName: ShortName
                readonly svar:
                    | {
                          readonly __typename: 'ArbeidssituasjonSvar'
                          readonly svarType: Svartype
                          readonly arbeidsituasjon: ArbeidssituasjonType
                      }
                    | {
                          readonly __typename: 'DagerSvar'
                          readonly svarType: Svartype
                          readonly dager: ReadonlyArray<string>
                      }
                    | { readonly __typename: 'JaNeiSvar'; readonly svarType: Svartype; readonly jaNei: YesOrNo }
                    | {
                          readonly __typename: 'PerioderSvar'
                          readonly svarType: Svartype
                          readonly perioder: ReadonlyArray<{
                              readonly __typename: 'FomTom'
                              readonly fom: string
                              readonly tom: string
                          }>
                      }
            }>
            readonly brukerSvar?: {
                readonly __typename: 'BrukerSvar'
                readonly erOpplysningeneRiktige: {
                    readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                }
                readonly uriktigeOpplysninger?: {
                    readonly __typename: 'UriktigeOpplysningerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<UriktigeOpplysningerType>
                } | null
                readonly arbeidssituasjon: {
                    readonly __typename: 'ArbeidssituasjonBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ArbeidssituasjonType
                }
                readonly arbeidsgiverOrgnummer?: {
                    readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: string
                } | null
                readonly riktigNarmesteLeder?: {
                    readonly __typename: 'RiktigNarmesteLederBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly harBruktEgenmeldingsdager?: {
                    readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsdager?: {
                    readonly __typename: 'EgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<string>
                } | null
                readonly harBruktEgenmelding?: {
                    readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsperioder?: {
                    readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<{
                        readonly __typename: 'FomTom'
                        readonly fom: string
                        readonly tom: string
                    }>
                } | null
                readonly harForsikring?: {
                    readonly __typename: 'HarForsikringBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly fisker?: {
                    readonly __typename: 'FiskerBrukerSvar'
                    readonly blad: {
                        readonly __typename: 'BladBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: Blad
                    }
                    readonly lottOgHyre: {
                        readonly __typename: 'LottOgHyreBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: LottOgHyre
                    }
                } | null
                readonly arbeidsledig?: {
                    readonly __typename: 'ArbeidsledigBrukerSvar'
                    readonly arbeidsledigFraOrgnummer?: {
                        readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: string
                    } | null
                } | null
            } | null
        }
        readonly medisinskVurdering?: {
            readonly __typename: 'MedisinskVurdering'
            readonly svangerskap: boolean
            readonly yrkesskade: boolean
            readonly yrkesskadeDato?: string | null
            readonly hovedDiagnose?: {
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            } | null
            readonly biDiagnoser: ReadonlyArray<{
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            }>
            readonly annenFraversArsak?: {
                readonly __typename: 'AnnenFraversArsak'
                readonly grunn: ReadonlyArray<AnnenFraverGrunn>
                readonly beskrivelse?: string | null
            } | null
        } | null
        readonly prognose?: {
            readonly __typename: 'Prognose'
            readonly arbeidsforEtterPeriode: boolean
            readonly hensynArbeidsplassen?: string | null
            readonly erIArbeid?: {
                readonly __typename: 'ErIArbeid'
                readonly egetArbeidPaSikt: boolean
                readonly annetArbeidPaSikt: boolean
                readonly arbeidFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
            readonly erIkkeIArbeid?: {
                readonly __typename: 'ErIkkeIArbeid'
                readonly arbeidsforPaSikt: boolean
                readonly arbeidsforFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
        } | null
        readonly meldingTilNAV?: {
            readonly __typename: 'MeldingTilNAV'
            readonly beskrivBistand?: string | null
            readonly bistandUmiddelbart: boolean
        } | null
        readonly kontaktMedPasient: {
            readonly __typename: 'KontaktMedPasient'
            readonly begrunnelseIkkeKontakt?: string | null
            readonly kontaktDato?: string | null
        }
        readonly behandler: {
            readonly __typename: 'Behandler'
            readonly fornavn: string
            readonly mellomnavn?: string | null
            readonly etternavn: string
            readonly tlf?: string | null
            readonly adresse?: {
                readonly __typename: 'Adresse'
                readonly gate?: string | null
                readonly postnummer?: number | null
                readonly kommune?: string | null
                readonly postboks?: string | null
                readonly land?: string | null
            } | null
        }
        readonly merknader?: ReadonlyArray<{
            readonly __typename: 'Merknad'
            readonly beskrivelse?: string | null
            readonly type: Merknadtype
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
            readonly overSyttiAar?: boolean | null
        } | null
        readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
    }>
}

export type SykmeldingByIdQueryVariables = Exact<{
    id: Scalars['String']['input']
}>

export type SykmeldingByIdQuery = {
    readonly __typename: 'Query'
    readonly sykmelding: {
        readonly __typename: 'Sykmelding'
        readonly id: string
        readonly mottattTidspunkt: string
        readonly utdypendeOpplysninger: unknown
        readonly tiltakArbeidsplassen?: string | null
        readonly tiltakNAV?: string | null
        readonly andreTiltak?: string | null
        readonly meldingTilArbeidsgiver?: string | null
        readonly behandletTidspunkt: string
        readonly egenmeldt?: boolean | null
        readonly papirsykmelding?: boolean | null
        readonly rulesetVersion: number
        readonly behandlingsutfall: {
            readonly __typename: 'Behandlingsutfall'
            readonly status: RegelStatus
            readonly ruleHits: ReadonlyArray<{
                readonly __typename: 'RegelInfo'
                readonly messageForSender: string
                readonly messageForUser: string
                readonly ruleName: string
                readonly ruleStatus: RegelStatus
            }>
        }
        readonly arbeidsgiver?: { readonly __typename: 'ArbeidsgiverSykmelding'; readonly navn?: string | null } | null
        readonly sykmeldingsperioder: ReadonlyArray<{
            readonly __typename: 'Periode'
            readonly fom: string
            readonly tom: string
            readonly behandlingsdager?: number | null
            readonly innspillTilArbeidsgiver?: string | null
            readonly type: Periodetype
            readonly reisetilskudd: boolean
            readonly gradert?: {
                readonly __typename: 'GradertPeriode'
                readonly grad: number
                readonly reisetilskudd: boolean
            } | null
            readonly aktivitetIkkeMulig?: {
                readonly __typename: 'AktivitetIkkeMuligPeriode'
                readonly medisinskArsak?: {
                    readonly __typename: 'MedisinskArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<MedisinskArsakType>
                } | null
                readonly arbeidsrelatertArsak?: {
                    readonly __typename: 'ArbeidsrelatertArsak'
                    readonly beskrivelse?: string | null
                    readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        readonly sykmeldingStatus: {
            readonly __typename: 'SykmeldingStatus'
            readonly statusEvent: StatusEvent
            readonly timestamp: string
            readonly arbeidsgiver?: {
                readonly __typename: 'ArbeidsgiverStatus'
                readonly orgnummer: string
                readonly orgNavn: string
            } | null
            readonly sporsmalOgSvarListe: ReadonlyArray<{
                readonly __typename: 'Sporsmal'
                readonly tekst: string
                readonly shortName: ShortName
                readonly svar:
                    | {
                          readonly __typename: 'ArbeidssituasjonSvar'
                          readonly svarType: Svartype
                          readonly arbeidsituasjon: ArbeidssituasjonType
                      }
                    | {
                          readonly __typename: 'DagerSvar'
                          readonly svarType: Svartype
                          readonly dager: ReadonlyArray<string>
                      }
                    | { readonly __typename: 'JaNeiSvar'; readonly svarType: Svartype; readonly jaNei: YesOrNo }
                    | {
                          readonly __typename: 'PerioderSvar'
                          readonly svarType: Svartype
                          readonly perioder: ReadonlyArray<{
                              readonly __typename: 'FomTom'
                              readonly fom: string
                              readonly tom: string
                          }>
                      }
            }>
            readonly brukerSvar?: {
                readonly __typename: 'BrukerSvar'
                readonly erOpplysningeneRiktige: {
                    readonly __typename: 'ErOpplysningeneRiktigeBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                }
                readonly uriktigeOpplysninger?: {
                    readonly __typename: 'UriktigeOpplysningerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<UriktigeOpplysningerType>
                } | null
                readonly arbeidssituasjon: {
                    readonly __typename: 'ArbeidssituasjonBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ArbeidssituasjonType
                }
                readonly arbeidsgiverOrgnummer?: {
                    readonly __typename: 'ArbeidsgiverOrgnummerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: string
                } | null
                readonly riktigNarmesteLeder?: {
                    readonly __typename: 'RiktigNarmesteLederBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly harBruktEgenmeldingsdager?: {
                    readonly __typename: 'HarBruktEgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsdager?: {
                    readonly __typename: 'EgenmeldingsdagerBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<string>
                } | null
                readonly harBruktEgenmelding?: {
                    readonly __typename: 'HarFrilanserEllerSelvstendigBruktEgenmeldingBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly egenmeldingsperioder?: {
                    readonly __typename: 'FrilanserEllerSelvstendigEgenmeldingsperioderBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: ReadonlyArray<{
                        readonly __typename: 'FomTom'
                        readonly fom: string
                        readonly tom: string
                    }>
                } | null
                readonly harForsikring?: {
                    readonly __typename: 'HarForsikringBrukerSvar'
                    readonly sporsmaltekst: string
                    readonly svar: JaEllerNei
                } | null
                readonly fisker?: {
                    readonly __typename: 'FiskerBrukerSvar'
                    readonly blad: {
                        readonly __typename: 'BladBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: Blad
                    }
                    readonly lottOgHyre: {
                        readonly __typename: 'LottOgHyreBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: LottOgHyre
                    }
                } | null
                readonly arbeidsledig?: {
                    readonly __typename: 'ArbeidsledigBrukerSvar'
                    readonly arbeidsledigFraOrgnummer?: {
                        readonly __typename: 'ArbeidsledigFraOrgnummerBrukerSvar'
                        readonly sporsmaltekst: string
                        readonly svar: string
                    } | null
                } | null
            } | null
        }
        readonly medisinskVurdering?: {
            readonly __typename: 'MedisinskVurdering'
            readonly svangerskap: boolean
            readonly yrkesskade: boolean
            readonly yrkesskadeDato?: string | null
            readonly hovedDiagnose?: {
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            } | null
            readonly biDiagnoser: ReadonlyArray<{
                readonly __typename: 'Diagnose'
                readonly tekst?: string | null
                readonly kode: string
                readonly system: string
            }>
            readonly annenFraversArsak?: {
                readonly __typename: 'AnnenFraversArsak'
                readonly grunn: ReadonlyArray<AnnenFraverGrunn>
                readonly beskrivelse?: string | null
            } | null
        } | null
        readonly prognose?: {
            readonly __typename: 'Prognose'
            readonly arbeidsforEtterPeriode: boolean
            readonly hensynArbeidsplassen?: string | null
            readonly erIArbeid?: {
                readonly __typename: 'ErIArbeid'
                readonly egetArbeidPaSikt: boolean
                readonly annetArbeidPaSikt: boolean
                readonly arbeidFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
            readonly erIkkeIArbeid?: {
                readonly __typename: 'ErIkkeIArbeid'
                readonly arbeidsforPaSikt: boolean
                readonly arbeidsforFOM?: string | null
                readonly vurderingsdato?: string | null
            } | null
        } | null
        readonly meldingTilNAV?: {
            readonly __typename: 'MeldingTilNAV'
            readonly beskrivBistand?: string | null
            readonly bistandUmiddelbart: boolean
        } | null
        readonly kontaktMedPasient: {
            readonly __typename: 'KontaktMedPasient'
            readonly begrunnelseIkkeKontakt?: string | null
            readonly kontaktDato?: string | null
        }
        readonly behandler: {
            readonly __typename: 'Behandler'
            readonly fornavn: string
            readonly mellomnavn?: string | null
            readonly etternavn: string
            readonly tlf?: string | null
            readonly adresse?: {
                readonly __typename: 'Adresse'
                readonly gate?: string | null
                readonly postnummer?: number | null
                readonly kommune?: string | null
                readonly postboks?: string | null
                readonly land?: string | null
            } | null
        }
        readonly merknader?: ReadonlyArray<{
            readonly __typename: 'Merknad'
            readonly beskrivelse?: string | null
            readonly type: Merknadtype
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
            readonly overSyttiAar?: boolean | null
        } | null
        readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
    }
}

export const NaermesteLederFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NaermesteLeder' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NaermesteLeder' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
            },
        },
    ],
} as unknown as DocumentNode<NaermesteLederFragment, unknown>
export const BrukerinformasjonFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Brukerinformasjon' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Brukerinformasjon' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgivere' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'aktivtArbeidsforhold' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'naermesteLeder' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NaermesteLeder' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NaermesteLeder' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NaermesteLeder' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
            },
        },
    ],
} as unknown as DocumentNode<BrukerinformasjonFragment, unknown>
export const SykmeldingUtenforVentetidFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingUtenforVentetid' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenforVentetid' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'erUtenforVentetid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppfolgingsdato' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingUtenforVentetidFragment, unknown>
export const TidligereArbeidsgiverFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TidligereArbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TidligereArbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TidligereArbeidsgiverFragment, unknown>
export const PeriodeFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'innspillTilArbeidsgiver' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'medisinskArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<PeriodeFragment, unknown>
export const SvarUnionFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SvarUnionFragment, unknown>
export const BrukerSvarFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<BrukerSvarFragment, unknown>
export const SykmeldingStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'statusEvent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sporsmalOgSvarListe' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'shortName' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SvarUnion' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerSvar' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'BrukerSvar' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingStatusFragment, unknown>
export const MedisinskVurderingFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MedisinskVurderingFragment, unknown>
export const SykmeldingFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mottattTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandlingsutfall' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ruleHits' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SykmeldingStatus' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'prognose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforEtterPeriode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'hensynArbeidsplassen' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'egetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'annetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIkkeIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'utdypendeOpplysninger' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakArbeidsplassen' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakNAV' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'andreTiltak' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'adresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'gate' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'kommune' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postboks' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'land' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'egenmeldt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'papirsykmelding' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'merknader' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'overSyttiAar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utenlandskSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'land' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'rulesetVersion' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'innspillTilArbeidsgiver' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'medisinskArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'statusEvent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sporsmalOgSvarListe' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'shortName' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SvarUnion' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerSvar' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'BrukerSvar' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingFragment, unknown>
export const Dev_ChangeUserScenarioDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'Dev_ChangeUserScenario' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'scenario' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dev_changeScenario' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'scenario' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'scenario' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<Dev_ChangeUserScenarioMutation, Dev_ChangeUserScenarioMutationVariables>
export const Dev_SetAntallArbeidsgivereDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'Dev_SetAntallArbeidsgivere' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'antall' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dev_setAntallArbeidsgivere' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'antall' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'antall' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<Dev_SetAntallArbeidsgivereMutation, Dev_SetAntallArbeidsgivereMutationVariables>
export const FeedbackDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'Feedback' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'feedback' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'JSON' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feedback' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'feedback' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'feedback' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FeedbackMutation, FeedbackMutationVariables>
export const EndreEgenmeldingsdagerDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'EndreEgenmeldingsdager' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'egenmeldingsdager' } },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: { kind: 'NamedType', name: { kind: 'Name', value: 'Date' } },
                            },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateEgenmeldingsdager' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sykmeldingId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'egenmeldingsdager' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'egenmeldingsdager' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelding' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'innspillTilArbeidsgiver' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'medisinskArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'statusEvent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sporsmalOgSvarListe' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'shortName' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SvarUnion' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerSvar' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'BrukerSvar' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mottattTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandlingsutfall' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ruleHits' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SykmeldingStatus' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'prognose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforEtterPeriode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'hensynArbeidsplassen' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'egetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'annetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIkkeIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'utdypendeOpplysninger' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakArbeidsplassen' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakNAV' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'andreTiltak' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'adresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'gate' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'kommune' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postboks' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'land' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'egenmeldt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'papirsykmelding' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'merknader' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'overSyttiAar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utenlandskSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'land' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'rulesetVersion' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<EndreEgenmeldingsdagerMutation, EndreEgenmeldingsdagerMutationVariables>
export const SykmeldingErUtenforVentetidDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'SykmeldingErUtenforVentetid' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingUtenforVentetid' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SykmeldingUtenforVentetid' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingUtenforVentetid' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenforVentetid' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'erUtenforVentetid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppfolgingsdato' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingErUtenforVentetidQuery, SykmeldingErUtenforVentetidQueryVariables>
export const BrukerinformasjonDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Brukerinformasjon' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerinformasjon' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Brukerinformasjon' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NaermesteLeder' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NaermesteLeder' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Brukerinformasjon' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Brukerinformasjon' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgivere' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'aktivtArbeidsforhold' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'naermesteLeder' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NaermesteLeder' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<BrukerinformasjonQuery, BrukerinformasjonQueryVariables>
export const TidligereArbeidsgivereByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'TidligereArbeidsgivereById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tidligereArbeidsgivere' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'TidligereArbeidsgiver' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'TidligereArbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TidligereArbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TidligereArbeidsgivereByIdQuery, TidligereArbeidsgivereByIdQueryVariables>
export const ChangeSykmeldingStatusDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'ChangeSykmeldingStatus' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingChangeStatus' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'changeSykmeldingStatus' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sykmeldingId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'status' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelding' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'innspillTilArbeidsgiver' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'medisinskArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'statusEvent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sporsmalOgSvarListe' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'shortName' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SvarUnion' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerSvar' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'BrukerSvar' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mottattTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandlingsutfall' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ruleHits' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SykmeldingStatus' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'prognose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforEtterPeriode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'hensynArbeidsplassen' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'egetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'annetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIkkeIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'utdypendeOpplysninger' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakArbeidsplassen' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakNAV' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'andreTiltak' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'adresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'gate' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'kommune' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postboks' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'land' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'egenmeldt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'papirsykmelding' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'merknader' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'overSyttiAar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utenlandskSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'land' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'rulesetVersion' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ChangeSykmeldingStatusMutation, ChangeSykmeldingStatusMutationVariables>
export const SendSykmeldingDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'SendSykmelding' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SendSykmeldingValues' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sendSykmelding' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sykmeldingId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'values' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelding' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'innspillTilArbeidsgiver' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'medisinskArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'statusEvent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sporsmalOgSvarListe' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'shortName' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SvarUnion' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerSvar' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'BrukerSvar' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mottattTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandlingsutfall' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ruleHits' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SykmeldingStatus' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'prognose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforEtterPeriode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'hensynArbeidsplassen' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'egetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'annetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIkkeIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'utdypendeOpplysninger' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakArbeidsplassen' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakNAV' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'andreTiltak' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'adresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'gate' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'kommune' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postboks' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'land' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'egenmeldt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'papirsykmelding' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'merknader' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'overSyttiAar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utenlandskSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'land' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'rulesetVersion' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SendSykmeldingMutation, SendSykmeldingMutationVariables>
export const SykmeldingerDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Sykmeldinger' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldinger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelding' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'innspillTilArbeidsgiver' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'medisinskArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'statusEvent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sporsmalOgSvarListe' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'shortName' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SvarUnion' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerSvar' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'BrukerSvar' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mottattTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandlingsutfall' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ruleHits' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SykmeldingStatus' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'prognose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforEtterPeriode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'hensynArbeidsplassen' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'egetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'annetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIkkeIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'utdypendeOpplysninger' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakArbeidsplassen' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakNAV' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'andreTiltak' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'adresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'gate' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'kommune' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postboks' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'land' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'egenmeldt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'papirsykmelding' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'merknader' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'overSyttiAar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utenlandskSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'land' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'rulesetVersion' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingerQuery, SykmeldingerQueryVariables>
export const SykmeldingByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'SykmeldingById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmelding' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelding' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'innspillTilArbeidsgiver' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'medisinskArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SvarUnion' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SvarTypeUnion' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JaNeiSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'jaNei' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidssituasjonSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'arbeidsituasjon' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PerioderSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'perioder' },
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DagerSvar' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'dager' },
                                    name: { kind: 'Name', value: 'svar' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'BrukerSvar' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BrukerSvar' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'erOpplysningeneRiktige' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uriktigeOpplysninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidssituasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiverOrgnummer' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'riktigNarmesteLeder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsdager' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harBruktEgenmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'egenmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'harForsikring' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fisker' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'blad' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lottOgHyre' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsledig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'arbeidsledigFraOrgnummer' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'sporsmaltekst' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'statusEvent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgNavn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sporsmalOgSvarListe' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'shortName' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'svar' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'SvarUnion' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerSvar' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'BrukerSvar' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mottattTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandlingsutfall' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ruleHits' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'navn' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingsperioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingStatus' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SykmeldingStatus' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'prognose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforEtterPeriode' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'hensynArbeidsplassen' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'egetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'annetArbeidPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'erIkkeIArbeid' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforPaSikt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'arbeidsforFOM' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'vurderingsdato' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'utdypendeOpplysninger' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakArbeidsplassen' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tiltakNAV' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'andreTiltak' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'adresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'gate' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'kommune' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'postboks' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'land' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'egenmeldt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'papirsykmelding' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'merknader' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'overSyttiAar' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utenlandskSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'land' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'rulesetVersion' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingByIdQuery, SykmeldingByIdQueryVariables>
