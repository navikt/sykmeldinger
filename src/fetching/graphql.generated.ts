import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    Date: string
    DateTime: string
    JSON: unknown
}

export type Adresse = {
    readonly __typename: 'Adresse'
    readonly gate?: Maybe<Scalars['String']>
    readonly kommune?: Maybe<Scalars['String']>
    readonly land?: Maybe<Scalars['String']>
    readonly postboks?: Maybe<Scalars['String']>
    readonly postnummer?: Maybe<Scalars['Int']>
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
    readonly beskrivelse?: Maybe<Scalars['String']>
    readonly grunn: ReadonlyArray<AnnenFraverGrunn>
}

export type Arbeidsgiver = {
    readonly __typename: 'Arbeidsgiver'
    readonly aktivtArbeidsforhold: Scalars['Boolean']
    readonly naermesteLeder?: Maybe<NaermesteLeder>
    readonly navn: Scalars['String']
    readonly orgnummer: Scalars['String']
}

export type ArbeidsgiverStatus = {
    readonly __typename: 'ArbeidsgiverStatus'
    readonly orgNavn: Scalars['String']
    readonly orgnummer: Scalars['String']
}

export type ArbeidsgiverSykmelding = {
    readonly __typename: 'ArbeidsgiverSykmelding'
    readonly navn?: Maybe<Scalars['String']>
}

export type ArbeidsrelatertArsak = {
    readonly __typename: 'ArbeidsrelatertArsak'
    readonly arsak: ReadonlyArray<ArbeidsrelatertArsakType>
    readonly beskrivelse?: Maybe<Scalars['String']>
}

export enum ArbeidsrelatertArsakType {
    ANNET = 'ANNET',
    MANGLENDE_TILRETTELEGGING = 'MANGLENDE_TILRETTELEGGING',
}

export enum ArbeidssituasjonType {
    ANNET = 'ANNET',
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
    ARBEIDSTAKER = 'ARBEIDSTAKER',
    FRILANSER = 'FRILANSER',
    NAERINGSDRIVENDE = 'NAERINGSDRIVENDE',
    PERMITTERT = 'PERMITTERT',
}

export type Behandler = {
    readonly __typename: 'Behandler'
    readonly adresse?: Maybe<Adresse>
    readonly etternavn: Scalars['String']
    readonly fornavn: Scalars['String']
    readonly mellomnavn?: Maybe<Scalars['String']>
    readonly tlf?: Maybe<Scalars['String']>
}

export type Behandlingsutfall = {
    readonly __typename: 'Behandlingsutfall'
    readonly ruleHits: ReadonlyArray<RegelInfo>
    readonly status: RegelStatus
}

export type Brukerinformasjon = {
    readonly __typename: 'Brukerinformasjon'
    readonly arbeidsgivere: ReadonlyArray<Arbeidsgiver>
    readonly strengtFortroligAdresse: Scalars['Boolean']
}

export type DateRange = {
    readonly fom?: InputMaybe<Scalars['Date']>
    readonly tom?: InputMaybe<Scalars['Date']>
}

export type Diagnose = {
    readonly __typename: 'Diagnose'
    readonly kode: Scalars['String']
    readonly system: Scalars['String']
    readonly tekst?: Maybe<Scalars['String']>
}

export type ErIArbeid = {
    readonly __typename: 'ErIArbeid'
    readonly annetArbeidPaSikt: Scalars['Boolean']
    readonly arbeidFOM?: Maybe<Scalars['Date']>
    readonly egetArbeidPaSikt: Scalars['Boolean']
    readonly vurderingsdato?: Maybe<Scalars['Date']>
}

export type ErIkkeIArbeid = {
    readonly __typename: 'ErIkkeIArbeid'
    readonly arbeidsforFOM?: Maybe<Scalars['Date']>
    readonly arbeidsforPaSikt: Scalars['Boolean']
    readonly vurderingsdato?: Maybe<Scalars['Date']>
}

export type GradertPeriode = {
    readonly __typename: 'GradertPeriode'
    readonly grad: Scalars['Int']
    readonly reisetilskudd: Scalars['Boolean']
}

export type KontaktMedPasient = {
    readonly __typename: 'KontaktMedPasient'
    readonly begrunnelseIkkeKontakt?: Maybe<Scalars['String']>
    readonly kontaktDato?: Maybe<Scalars['Date']>
}

export type MedisinskArsak = {
    readonly __typename: 'MedisinskArsak'
    readonly arsak: ReadonlyArray<MedisinskArsakType>
    readonly beskrivelse?: Maybe<Scalars['String']>
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
    readonly svangerskap: Scalars['Boolean']
    readonly yrkesskade: Scalars['Boolean']
    readonly yrkesskadeDato?: Maybe<Scalars['Date']>
}

export type MeldingTilNav = {
    readonly __typename: 'MeldingTilNAV'
    readonly beskrivBistand?: Maybe<Scalars['String']>
    readonly bistandUmiddelbart: Scalars['Boolean']
}

export type Merknad = {
    readonly __typename: 'Merknad'
    readonly beskrivelse?: Maybe<Scalars['String']>
    readonly type: Scalars['String']
}

export type Mutation = {
    readonly __typename: 'Mutation'
    readonly changeSykmeldingStatus: Sykmelding
    readonly sendSykmelding: Sykmelding
}

export type MutationChangeSykmeldingStatusArgs = {
    status: SykmeldingChangeStatus
    sykmeldingId: Scalars['ID']
}

export type MutationSendSykmeldingArgs = {
    sykmeldingId: Scalars['ID']
    values: SendSykmeldingValues
}

export type NaermesteLeder = {
    readonly __typename: 'NaermesteLeder'
    readonly navn: Scalars['String']
}

export type Pasient = {
    readonly __typename: 'Pasient'
    readonly etternavn?: Maybe<Scalars['String']>
    readonly fnr?: Maybe<Scalars['String']>
    readonly fornavn?: Maybe<Scalars['String']>
    readonly mellomnavn?: Maybe<Scalars['String']>
}

export type Periode = {
    readonly __typename: 'Periode'
    readonly aktivitetIkkeMulig?: Maybe<AktivitetIkkeMuligPeriode>
    readonly behandlingsdager?: Maybe<Scalars['Int']>
    readonly fom: Scalars['Date']
    readonly gradert?: Maybe<GradertPeriode>
    readonly innspillTilArbeidsgiver?: Maybe<Scalars['String']>
    readonly reisetilskudd: Scalars['Boolean']
    readonly tom: Scalars['Date']
    readonly type: Periodetype
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
    readonly arbeidsforEtterPeriode: Scalars['Boolean']
    readonly erIArbeid?: Maybe<ErIArbeid>
    readonly erIkkeIArbeid?: Maybe<ErIkkeIArbeid>
    readonly hensynArbeidsplassen?: Maybe<Scalars['String']>
}

export type Query = {
    readonly __typename: 'Query'
    readonly brukerinformasjon: Brukerinformasjon
    readonly sykmelding: Sykmelding
    readonly sykmeldingUtenforVentetid: UtenforVentetid
    readonly sykmeldinger: ReadonlyArray<Sykmelding>
}

export type QuerySykmeldingArgs = {
    id: Scalars['ID']
}

export type QuerySykmeldingUtenforVentetidArgs = {
    id: Scalars['ID']
}

export type RegelInfo = {
    readonly __typename: 'RegelInfo'
    readonly messageForSender: Scalars['String']
    readonly messageForUser: Scalars['String']
    readonly ruleName: Scalars['String']
    readonly ruleStatus: RegelStatus
}

export enum RegelStatus {
    INVALID = 'INVALID',
    MANUAL_PROCESSING = 'MANUAL_PROCESSING',
    OK = 'OK',
}

export type SendSykmeldingValues = {
    readonly arbeidsgiverOrgnummer?: InputMaybe<Scalars['String']>
    readonly arbeidssituasjon?: InputMaybe<ArbeidssituasjonType>
    readonly egenmeldingsdager?: InputMaybe<ReadonlyArray<Scalars['Date']>>
    readonly egenmeldingsperioder?: InputMaybe<ReadonlyArray<DateRange>>
    readonly erOpplysningeneRiktige?: InputMaybe<YesOrNo>
    readonly harBruktEgenmelding?: InputMaybe<YesOrNo>
    readonly harEgenmeldingsdager?: InputMaybe<YesOrNo>
    readonly harForsikring?: InputMaybe<YesOrNo>
    readonly riktigNarmesteLeder?: InputMaybe<YesOrNo>
    readonly uriktigeOpplysninger?: InputMaybe<ReadonlyArray<UriktigeOpplysningerType>>
}

export enum ShortName {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    FORSIKRING = 'FORSIKRING',
    FRAVAER = 'FRAVAER',
    NY_NARMESTE_LEDER = 'NY_NARMESTE_LEDER',
    PERIODE = 'PERIODE',
}

export type Sporsmal = {
    readonly __typename: 'Sporsmal'
    readonly shortName: ShortName
    readonly svar: Svar
    readonly tekst: Scalars['String']
}

export enum StatusEvent {
    APEN = 'APEN',
    AVBRUTT = 'AVBRUTT',
    BEKREFTET = 'BEKREFTET',
    SENDT = 'SENDT',
    UTGATT = 'UTGATT',
}

export type Svar = {
    readonly __typename: 'Svar'
    readonly svar: Scalars['String']
    readonly svarType: Svartype
}

export enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER = 'SKJERMET_FOR_ARBEIDSGIVER',
    SKJERMET_FOR_NAV = 'SKJERMET_FOR_NAV',
}

export enum Svartype {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    JA_NEI = 'JA_NEI',
    PERIODER = 'PERIODER',
}

export type Sykmelding = {
    readonly __typename: 'Sykmelding'
    readonly andreTiltak?: Maybe<Scalars['String']>
    readonly arbeidsgiver?: Maybe<ArbeidsgiverSykmelding>
    readonly behandler: Behandler
    readonly behandletTidspunkt: Scalars['Date']
    readonly behandlingsutfall: Behandlingsutfall
    readonly egenmeldt?: Maybe<Scalars['Boolean']>
    readonly id: Scalars['String']
    readonly kontaktMedPasient: KontaktMedPasient
    readonly medisinskVurdering?: Maybe<MedisinskVurdering>
    readonly meldingTilArbeidsgiver?: Maybe<Scalars['String']>
    readonly meldingTilNAV?: Maybe<MeldingTilNav>
    readonly merknader?: Maybe<ReadonlyArray<Merknad>>
    readonly mottattTidspunkt: Scalars['Date']
    readonly papirsykmelding?: Maybe<Scalars['Boolean']>
    readonly pasient?: Maybe<Pasient>
    readonly prognose?: Maybe<Prognose>
    readonly rulesetVersion: Scalars['Int']
    readonly sykmeldingStatus: SykmeldingStatus
    readonly sykmeldingsperioder: ReadonlyArray<Periode>
    readonly tiltakArbeidsplassen?: Maybe<Scalars['String']>
    readonly tiltakNAV?: Maybe<Scalars['String']>
    readonly utdypendeOpplysninger: Scalars['JSON']
    readonly utenlandskSykmelding?: Maybe<UtenlandskSykmelding>
}

export enum SykmeldingChangeStatus {
    AVBRYT = 'AVBRYT',
    BEKREFT_AVVIST = 'BEKREFT_AVVIST',
}

export type SykmeldingStatus = {
    readonly __typename: 'SykmeldingStatus'
    readonly arbeidsgiver?: Maybe<ArbeidsgiverStatus>
    readonly sporsmalOgSvarListe: ReadonlyArray<Sporsmal>
    readonly statusEvent: StatusEvent
    readonly timestamp: Scalars['Date']
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
    readonly sporsmal?: Maybe<Scalars['String']>
    readonly svar: Scalars['String']
}

export type UtenforVentetid = {
    readonly __typename: 'UtenforVentetid'
    readonly erUtenforVentetid: Scalars['Boolean']
    readonly oppfolgingsdato?: Maybe<Scalars['Date']>
}

export type UtenlandskSykmelding = {
    readonly __typename: 'UtenlandskSykmelding'
    readonly land: Scalars['String']
}

export enum YesOrNo {
    NO = 'NO',
    YES = 'YES',
}

export type NaermesteLederFragment = { readonly __typename: 'NaermesteLeder'; readonly navn: string }

export type BrukerinformasjonFragment = {
    readonly __typename: 'Brukerinformasjon'
    readonly strengtFortroligAdresse: boolean
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

export type ExtraFormDataQueryVariables = Exact<{
    sykmeldingId: Scalars['ID']
}>

export type ExtraFormDataQuery = {
    readonly __typename: 'Query'
    readonly brukerinformasjon: {
        readonly __typename: 'Brukerinformasjon'
        readonly strengtFortroligAdresse: boolean
        readonly arbeidsgivere: ReadonlyArray<{
            readonly __typename: 'Arbeidsgiver'
            readonly orgnummer: string
            readonly navn: string
            readonly aktivtArbeidsforhold: boolean
            readonly naermesteLeder?: { readonly __typename: 'NaermesteLeder'; readonly navn: string } | null
        }>
    }
    readonly sykmeldingUtenforVentetid: {
        readonly __typename: 'UtenforVentetid'
        readonly erUtenforVentetid: boolean
        readonly oppfolgingsdato?: string | null
    }
}

export type ChangeSykmeldingStatusMutationVariables = Exact<{
    sykmeldingId: Scalars['ID']
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
                readonly svar: { readonly __typename: 'Svar'; readonly svar: string; readonly svarType: Svartype }
            }>
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
            readonly type: string
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
        } | null
        readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
    }
}

export type SendSykmeldingMutationVariables = Exact<{
    sykmeldingId: Scalars['ID']
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
                readonly svar: { readonly __typename: 'Svar'; readonly svar: string; readonly svarType: Svartype }
            }>
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
            readonly type: string
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
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
        readonly svar: { readonly __typename: 'Svar'; readonly svar: string; readonly svarType: Svartype }
    }>
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
            readonly svar: { readonly __typename: 'Svar'; readonly svar: string; readonly svarType: Svartype }
        }>
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
        readonly type: string
    }> | null
    readonly pasient?: {
        readonly __typename: 'Pasient'
        readonly fnr?: string | null
        readonly fornavn?: string | null
        readonly mellomnavn?: string | null
        readonly etternavn?: string | null
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
                readonly svar: { readonly __typename: 'Svar'; readonly svar: string; readonly svarType: Svartype }
            }>
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
            readonly type: string
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
        } | null
        readonly utenlandskSykmelding?: { readonly __typename: 'UtenlandskSykmelding'; readonly land: string } | null
    }>
}

export type SykmeldingByIdQueryVariables = Exact<{
    id: Scalars['ID']
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
                readonly svar: { readonly __typename: 'Svar'; readonly svar: string; readonly svarType: Svartype }
            }>
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
            readonly type: string
        }> | null
        readonly pasient?: {
            readonly __typename: 'Pasient'
            readonly fnr?: string | null
            readonly fornavn?: string | null
            readonly mellomnavn?: string | null
            readonly etternavn?: string | null
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
                    { kind: 'Field', name: { kind: 'Name', value: 'strengtFortroligAdresse' } },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
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
export const ExtraFormDataDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'ExtraFormData' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brukerinformasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Brukerinformasjon' } },
                            ],
                        },
                    },
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
                    { kind: 'Field', name: { kind: 'Name', value: 'strengtFortroligAdresse' } },
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
} as unknown as DocumentNode<ExtraFormDataQuery, ExtraFormDataQueryVariables>
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
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
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
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
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
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'svar' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'svarType' } },
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
