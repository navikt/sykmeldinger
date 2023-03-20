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
    Date: any
    DateTime: any
    JSON: any
}

export type Adresse = {
    __typename?: 'Adresse'
    gate?: Maybe<Scalars['String']>
    kommune?: Maybe<Scalars['String']>
    land?: Maybe<Scalars['String']>
    postboks?: Maybe<Scalars['String']>
    postnummer?: Maybe<Scalars['Int']>
}

export type AktivitetIkkeMuligPeriode = {
    __typename?: 'AktivitetIkkeMuligPeriode'
    arbeidsrelatertArsak?: Maybe<ArbeidsrelatertArsak>
    medisinskArsak?: Maybe<MedisinskArsak>
}

export enum AnnenFraverGrunn {
    Abort = 'ABORT',
    ArbeidsrettetTiltak = 'ARBEIDSRETTET_TILTAK',
    BehandlingForhindrerArbeid = 'BEHANDLING_FORHINDRER_ARBEID',
    BehandlingSterilisering = 'BEHANDLING_STERILISERING',
    Donor = 'DONOR',
    GodkjentHelseinstitusjon = 'GODKJENT_HELSEINSTITUSJON',
    MottarTilskuddGrunnetHelsetilstand = 'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND',
    NodvendigKontrollundenrsokelse = 'NODVENDIG_KONTROLLUNDENRSOKELSE',
    Smittefare = 'SMITTEFARE',
    UforGrunnetBarnloshet = 'UFOR_GRUNNET_BARNLOSHET',
}

export type AnnenFraversArsak = {
    __typename?: 'AnnenFraversArsak'
    beskrivelse?: Maybe<Scalars['String']>
    grunn: Array<AnnenFraverGrunn>
}

export type Arbeidsgiver = {
    __typename?: 'Arbeidsgiver'
    aktivtArbeidsforhold: Scalars['Boolean']
    naermesteLeder?: Maybe<NaermesteLeder>
    navn: Scalars['String']
    orgnummer: Scalars['String']
}

export type ArbeidsgiverStatus = {
    __typename?: 'ArbeidsgiverStatus'
    orgNavn: Scalars['String']
    orgnummer: Scalars['String']
}

export type ArbeidsgiverSykmelding = {
    __typename?: 'ArbeidsgiverSykmelding'
    navn?: Maybe<Scalars['String']>
}

export type ArbeidsrelatertArsak = {
    __typename?: 'ArbeidsrelatertArsak'
    arsak: Array<ArbeidsrelatertArsakType>
    beskrivelse?: Maybe<Scalars['String']>
}

export enum ArbeidsrelatertArsakType {
    Annet = 'ANNET',
    ManglendeTilrettelegging = 'MANGLENDE_TILRETTELEGGING',
}

export type ArbeidssituasjonSvar = {
    __typename?: 'ArbeidssituasjonSvar'
    svar: ArbeidssituasjonType
    svarType: Svartype
}

export enum ArbeidssituasjonType {
    Annet = 'ANNET',
    Arbeidsledig = 'ARBEIDSLEDIG',
    Arbeidstaker = 'ARBEIDSTAKER',
    Frilanser = 'FRILANSER',
    Naeringsdrivende = 'NAERINGSDRIVENDE',
    Permittert = 'PERMITTERT',
}

export type Behandler = {
    __typename?: 'Behandler'
    adresse?: Maybe<Adresse>
    etternavn: Scalars['String']
    fornavn: Scalars['String']
    mellomnavn?: Maybe<Scalars['String']>
    tlf?: Maybe<Scalars['String']>
}

export type Behandlingsutfall = {
    __typename?: 'Behandlingsutfall'
    ruleHits: Array<RegelInfo>
    status: RegelStatus
}

export type Brukerinformasjon = {
    __typename?: 'Brukerinformasjon'
    arbeidsgivere: Array<Arbeidsgiver>
    strengtFortroligAdresse: Scalars['Boolean']
}

export type DagerSvar = {
    __typename?: 'DagerSvar'
    svar: Array<Scalars['Date']>
    svarType: Svartype
}

export type DateRange = {
    fom?: InputMaybe<Scalars['Date']>
    tom?: InputMaybe<Scalars['Date']>
}

export type Diagnose = {
    __typename?: 'Diagnose'
    kode: Scalars['String']
    system: Scalars['String']
    tekst?: Maybe<Scalars['String']>
}

export type ErIArbeid = {
    __typename?: 'ErIArbeid'
    annetArbeidPaSikt: Scalars['Boolean']
    arbeidFOM?: Maybe<Scalars['Date']>
    egetArbeidPaSikt: Scalars['Boolean']
    vurderingsdato?: Maybe<Scalars['Date']>
}

export type ErIkkeIArbeid = {
    __typename?: 'ErIkkeIArbeid'
    arbeidsforFOM?: Maybe<Scalars['Date']>
    arbeidsforPaSikt: Scalars['Boolean']
    vurderingsdato?: Maybe<Scalars['Date']>
}

export type FomTom = {
    __typename?: 'FomTom'
    fom: Scalars['Date']
    tom: Scalars['Date']
}

export type GradertPeriode = {
    __typename?: 'GradertPeriode'
    grad: Scalars['Int']
    reisetilskudd: Scalars['Boolean']
}

export type JaNeiSvar = {
    __typename?: 'JaNeiSvar'
    svar: YesOrNo
    svarType: Svartype
}

export type KontaktMedPasient = {
    __typename?: 'KontaktMedPasient'
    begrunnelseIkkeKontakt?: Maybe<Scalars['String']>
    kontaktDato?: Maybe<Scalars['Date']>
}

export type MedisinskArsak = {
    __typename?: 'MedisinskArsak'
    arsak: Array<MedisinskArsakType>
    beskrivelse?: Maybe<Scalars['String']>
}

export enum MedisinskArsakType {
    AktivitetForhindrerBedring = 'AKTIVITET_FORHINDRER_BEDRING',
    AktivitetForverrerTilstand = 'AKTIVITET_FORVERRER_TILSTAND',
    Annet = 'ANNET',
    TilstandHindrerAktivitet = 'TILSTAND_HINDRER_AKTIVITET',
}

export type MedisinskVurdering = {
    __typename?: 'MedisinskVurdering'
    annenFraversArsak?: Maybe<AnnenFraversArsak>
    biDiagnoser: Array<Diagnose>
    hovedDiagnose?: Maybe<Diagnose>
    svangerskap: Scalars['Boolean']
    yrkesskade: Scalars['Boolean']
    yrkesskadeDato?: Maybe<Scalars['Date']>
}

export type MeldingTilNav = {
    __typename?: 'MeldingTilNAV'
    beskrivBistand?: Maybe<Scalars['String']>
    bistandUmiddelbart: Scalars['Boolean']
}

export type Merknad = {
    __typename?: 'Merknad'
    beskrivelse?: Maybe<Scalars['String']>
    type: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    changeSykmeldingStatus: Sykmelding
    sendSykmelding: Sykmelding
    updateEgenmeldingsdager: Sykmelding
}

export type MutationChangeSykmeldingStatusArgs = {
    status: SykmeldingChangeStatus
    sykmeldingId: Scalars['ID']
}

export type MutationSendSykmeldingArgs = {
    sykmeldingId: Scalars['ID']
    values: SendSykmeldingValues
}

export type MutationUpdateEgenmeldingsdagerArgs = {
    egenmeldingsdager: Array<Scalars['Date']>
    sykmeldingId: Scalars['ID']
}

export type NaermesteLeder = {
    __typename?: 'NaermesteLeder'
    navn: Scalars['String']
}

export type Pasient = {
    __typename?: 'Pasient'
    etternavn?: Maybe<Scalars['String']>
    fnr?: Maybe<Scalars['String']>
    fornavn?: Maybe<Scalars['String']>
    mellomnavn?: Maybe<Scalars['String']>
}

export type Periode = {
    __typename?: 'Periode'
    aktivitetIkkeMulig?: Maybe<AktivitetIkkeMuligPeriode>
    behandlingsdager?: Maybe<Scalars['Int']>
    fom: Scalars['Date']
    gradert?: Maybe<GradertPeriode>
    innspillTilArbeidsgiver?: Maybe<Scalars['String']>
    reisetilskudd: Scalars['Boolean']
    tom: Scalars['Date']
    type: Periodetype
}

export type PerioderSvar = {
    __typename?: 'PerioderSvar'
    svar: Array<FomTom>
    svarType: Svartype
}

export enum Periodetype {
    AktivitetIkkeMulig = 'AKTIVITET_IKKE_MULIG',
    Avventende = 'AVVENTENDE',
    Behandlingsdager = 'BEHANDLINGSDAGER',
    Gradert = 'GRADERT',
    Reisetilskudd = 'REISETILSKUDD',
}

export type Prognose = {
    __typename?: 'Prognose'
    arbeidsforEtterPeriode: Scalars['Boolean']
    erIArbeid?: Maybe<ErIArbeid>
    erIkkeIArbeid?: Maybe<ErIkkeIArbeid>
    hensynArbeidsplassen?: Maybe<Scalars['String']>
}

export type Query = {
    __typename?: 'Query'
    brukerinformasjon: Brukerinformasjon
    sykmelding: Sykmelding
    sykmeldingUtenforVentetid: UtenforVentetid
    sykmeldinger: Array<Sykmelding>
}

export type QuerySykmeldingArgs = {
    id: Scalars['ID']
}

export type QuerySykmeldingUtenforVentetidArgs = {
    id: Scalars['ID']
}

export type RegelInfo = {
    __typename?: 'RegelInfo'
    messageForSender: Scalars['String']
    messageForUser: Scalars['String']
    ruleName: Scalars['String']
    ruleStatus: RegelStatus
}

export enum RegelStatus {
    Invalid = 'INVALID',
    ManualProcessing = 'MANUAL_PROCESSING',
    Ok = 'OK',
}

export type SendSykmeldingValues = {
    arbeidsgiverOrgnummer?: InputMaybe<Scalars['String']>
    arbeidssituasjon?: InputMaybe<ArbeidssituasjonType>
    egenmeldingsdager?: InputMaybe<Array<Scalars['Date']>>
    egenmeldingsperioder?: InputMaybe<Array<DateRange>>
    erOpplysningeneRiktige?: InputMaybe<YesOrNo>
    harBruktEgenmelding?: InputMaybe<YesOrNo>
    harEgenmeldingsdager?: InputMaybe<YesOrNo>
    harForsikring?: InputMaybe<YesOrNo>
    riktigNarmesteLeder?: InputMaybe<YesOrNo>
    uriktigeOpplysninger?: InputMaybe<Array<UriktigeOpplysningerType>>
}

export enum ShortName {
    Arbeidssituasjon = 'ARBEIDSSITUASJON',
    Egenmeldingsdager = 'EGENMELDINGSDAGER',
    Forsikring = 'FORSIKRING',
    Fravaer = 'FRAVAER',
    NyNarmesteLeder = 'NY_NARMESTE_LEDER',
    Periode = 'PERIODE',
}

export type Sporsmal = {
    __typename?: 'Sporsmal'
    shortName: ShortName
    svar: SvarTypeUnion
    tekst: Scalars['String']
}

export enum StatusEvent {
    Apen = 'APEN',
    Avbrutt = 'AVBRUTT',
    Bekreftet = 'BEKREFTET',
    Sendt = 'SENDT',
    Utgatt = 'UTGATT',
}

export enum SvarRestriksjon {
    SkjermetForArbeidsgiver = 'SKJERMET_FOR_ARBEIDSGIVER',
    SkjermetForNav = 'SKJERMET_FOR_NAV',
}

export type SvarTypeUnion = ArbeidssituasjonSvar | DagerSvar | JaNeiSvar | PerioderSvar

export enum Svartype {
    Arbeidssituasjon = 'ARBEIDSSITUASJON',
    Dager = 'DAGER',
    JaNei = 'JA_NEI',
    Perioder = 'PERIODER',
}

export type Sykmelding = {
    __typename?: 'Sykmelding'
    andreTiltak?: Maybe<Scalars['String']>
    arbeidsgiver?: Maybe<ArbeidsgiverSykmelding>
    behandler: Behandler
    behandletTidspunkt: Scalars['Date']
    behandlingsutfall: Behandlingsutfall
    egenmeldt?: Maybe<Scalars['Boolean']>
    id: Scalars['String']
    kontaktMedPasient: KontaktMedPasient
    medisinskVurdering?: Maybe<MedisinskVurdering>
    meldingTilArbeidsgiver?: Maybe<Scalars['String']>
    meldingTilNAV?: Maybe<MeldingTilNav>
    merknader?: Maybe<Array<Merknad>>
    mottattTidspunkt: Scalars['Date']
    papirsykmelding?: Maybe<Scalars['Boolean']>
    pasient?: Maybe<Pasient>
    prognose?: Maybe<Prognose>
    rulesetVersion: Scalars['Int']
    sykmeldingStatus: SykmeldingStatus
    sykmeldingsperioder: Array<Periode>
    tiltakArbeidsplassen?: Maybe<Scalars['String']>
    tiltakNAV?: Maybe<Scalars['String']>
    utdypendeOpplysninger: Scalars['JSON']
    utenlandskSykmelding?: Maybe<UtenlandskSykmelding>
}

export enum SykmeldingChangeStatus {
    Avbryt = 'AVBRYT',
    BekreftAvvist = 'BEKREFT_AVVIST',
}

export type SykmeldingStatus = {
    __typename?: 'SykmeldingStatus'
    arbeidsgiver?: Maybe<ArbeidsgiverStatus>
    sporsmalOgSvarListe: Array<Sporsmal>
    statusEvent: StatusEvent
    timestamp: Scalars['Date']
}

export enum UriktigeOpplysningerType {
    AndreOpplysninger = 'ANDRE_OPPLYSNINGER',
    Arbeidsgiver = 'ARBEIDSGIVER',
    Diagnose = 'DIAGNOSE',
    Periode = 'PERIODE',
    SykmeldingsgradForHoy = 'SYKMELDINGSGRAD_FOR_HOY',
    SykmeldingsgradForLav = 'SYKMELDINGSGRAD_FOR_LAV',
}

export type UtdypendeOpplysning = {
    __typename?: 'UtdypendeOpplysning'
    restriksjoner: Array<SvarRestriksjon>
    sporsmal?: Maybe<Scalars['String']>
    svar: Scalars['String']
}

export type UtenforVentetid = {
    __typename?: 'UtenforVentetid'
    erUtenforVentetid: Scalars['Boolean']
    oppfolgingsdato?: Maybe<Scalars['Date']>
}

export type UtenlandskSykmelding = {
    __typename?: 'UtenlandskSykmelding'
    land: Scalars['String']
}

export enum YesOrNo {
    No = 'NO',
    Yes = 'YES',
}

export type EndreEgenmeldingsdagerMutationVariables = Exact<{
    sykmeldingId: Scalars['ID']
    egenmeldingsdager: Array<Scalars['Date']> | Scalars['Date']
}>

export type EndreEgenmeldingsdagerMutation = {
    __typename?: 'Mutation'
    updateEgenmeldingsdager: {
        __typename?: 'Sykmelding'
        id: string
        mottattTidspunkt: any
        utdypendeOpplysninger: any
        tiltakArbeidsplassen?: string | null
        tiltakNAV?: string | null
        andreTiltak?: string | null
        meldingTilArbeidsgiver?: string | null
        behandletTidspunkt: any
        egenmeldt?: boolean | null
        papirsykmelding?: boolean | null
        rulesetVersion: number
        behandlingsutfall: {
            __typename?: 'Behandlingsutfall'
            status: RegelStatus
            ruleHits: Array<{
                __typename?: 'RegelInfo'
                messageForSender: string
                messageForUser: string
                ruleName: string
                ruleStatus: RegelStatus
            }>
        }
        arbeidsgiver?: { __typename?: 'ArbeidsgiverSykmelding'; navn?: string | null } | null
        sykmeldingsperioder: Array<{
            __typename?: 'Periode'
            fom: any
            tom: any
            behandlingsdager?: number | null
            innspillTilArbeidsgiver?: string | null
            type: Periodetype
            reisetilskudd: boolean
            gradert?: { __typename?: 'GradertPeriode'; grad: number; reisetilskudd: boolean } | null
            aktivitetIkkeMulig?: {
                __typename?: 'AktivitetIkkeMuligPeriode'
                medisinskArsak?: {
                    __typename?: 'MedisinskArsak'
                    beskrivelse?: string | null
                    arsak: Array<MedisinskArsakType>
                } | null
                arbeidsrelatertArsak?: {
                    __typename?: 'ArbeidsrelatertArsak'
                    beskrivelse?: string | null
                    arsak: Array<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        sykmeldingStatus: {
            __typename?: 'SykmeldingStatus'
            statusEvent: StatusEvent
            timestamp: any
            arbeidsgiver?: { __typename?: 'ArbeidsgiverStatus'; orgnummer: string; orgNavn: string } | null
            sporsmalOgSvarListe: Array<{
                __typename?: 'Sporsmal'
                tekst: string
                shortName: ShortName
                svar:
                    | { __typename: 'ArbeidssituasjonSvar'; svarType: Svartype; arbeidsituasjon: ArbeidssituasjonType }
                    | { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }
                    | { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }
                    | {
                          __typename: 'PerioderSvar'
                          svarType: Svartype
                          perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
                      }
            }>
        }
        medisinskVurdering?: {
            __typename?: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato?: any | null
            hovedDiagnose?: { __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string } | null
            biDiagnoser: Array<{ __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string }>
            annenFraversArsak?: {
                __typename?: 'AnnenFraversArsak'
                grunn: Array<AnnenFraverGrunn>
                beskrivelse?: string | null
            } | null
        } | null
        prognose?: {
            __typename?: 'Prognose'
            arbeidsforEtterPeriode: boolean
            hensynArbeidsplassen?: string | null
            erIArbeid?: {
                __typename?: 'ErIArbeid'
                egetArbeidPaSikt: boolean
                annetArbeidPaSikt: boolean
                arbeidFOM?: any | null
                vurderingsdato?: any | null
            } | null
            erIkkeIArbeid?: {
                __typename?: 'ErIkkeIArbeid'
                arbeidsforPaSikt: boolean
                arbeidsforFOM?: any | null
                vurderingsdato?: any | null
            } | null
        } | null
        meldingTilNAV?: {
            __typename?: 'MeldingTilNAV'
            beskrivBistand?: string | null
            bistandUmiddelbart: boolean
        } | null
        kontaktMedPasient: {
            __typename?: 'KontaktMedPasient'
            begrunnelseIkkeKontakt?: string | null
            kontaktDato?: any | null
        }
        behandler: {
            __typename?: 'Behandler'
            fornavn: string
            mellomnavn?: string | null
            etternavn: string
            tlf?: string | null
            adresse?: {
                __typename?: 'Adresse'
                gate?: string | null
                postnummer?: number | null
                kommune?: string | null
                postboks?: string | null
                land?: string | null
            } | null
        }
        merknader?: Array<{ __typename?: 'Merknad'; beskrivelse?: string | null; type: string }> | null
        pasient?: {
            __typename?: 'Pasient'
            fnr?: string | null
            fornavn?: string | null
            mellomnavn?: string | null
            etternavn?: string | null
        } | null
        utenlandskSykmelding?: { __typename?: 'UtenlandskSykmelding'; land: string } | null
    }
}

export type NaermesteLederFragment = { __typename?: 'NaermesteLeder'; navn: string }

export type BrukerinformasjonFragment = {
    __typename?: 'Brukerinformasjon'
    strengtFortroligAdresse: boolean
    arbeidsgivere: Array<{
        __typename?: 'Arbeidsgiver'
        orgnummer: string
        navn: string
        aktivtArbeidsforhold: boolean
        naermesteLeder?: { __typename?: 'NaermesteLeder'; navn: string } | null
    }>
}

export type SykmeldingUtenforVentetidFragment = {
    __typename?: 'UtenforVentetid'
    erUtenforVentetid: boolean
    oppfolgingsdato?: any | null
}

export type ExtraFormDataQueryVariables = Exact<{
    sykmeldingId: Scalars['ID']
}>

export type ExtraFormDataQuery = {
    __typename?: 'Query'
    brukerinformasjon: {
        __typename?: 'Brukerinformasjon'
        strengtFortroligAdresse: boolean
        arbeidsgivere: Array<{
            __typename?: 'Arbeidsgiver'
            orgnummer: string
            navn: string
            aktivtArbeidsforhold: boolean
            naermesteLeder?: { __typename?: 'NaermesteLeder'; navn: string } | null
        }>
    }
    sykmeldingUtenforVentetid: {
        __typename?: 'UtenforVentetid'
        erUtenforVentetid: boolean
        oppfolgingsdato?: any | null
    }
}

export type ChangeSykmeldingStatusMutationVariables = Exact<{
    sykmeldingId: Scalars['ID']
    status: SykmeldingChangeStatus
}>

export type ChangeSykmeldingStatusMutation = {
    __typename?: 'Mutation'
    changeSykmeldingStatus: {
        __typename?: 'Sykmelding'
        id: string
        mottattTidspunkt: any
        utdypendeOpplysninger: any
        tiltakArbeidsplassen?: string | null
        tiltakNAV?: string | null
        andreTiltak?: string | null
        meldingTilArbeidsgiver?: string | null
        behandletTidspunkt: any
        egenmeldt?: boolean | null
        papirsykmelding?: boolean | null
        rulesetVersion: number
        behandlingsutfall: {
            __typename?: 'Behandlingsutfall'
            status: RegelStatus
            ruleHits: Array<{
                __typename?: 'RegelInfo'
                messageForSender: string
                messageForUser: string
                ruleName: string
                ruleStatus: RegelStatus
            }>
        }
        arbeidsgiver?: { __typename?: 'ArbeidsgiverSykmelding'; navn?: string | null } | null
        sykmeldingsperioder: Array<{
            __typename?: 'Periode'
            fom: any
            tom: any
            behandlingsdager?: number | null
            innspillTilArbeidsgiver?: string | null
            type: Periodetype
            reisetilskudd: boolean
            gradert?: { __typename?: 'GradertPeriode'; grad: number; reisetilskudd: boolean } | null
            aktivitetIkkeMulig?: {
                __typename?: 'AktivitetIkkeMuligPeriode'
                medisinskArsak?: {
                    __typename?: 'MedisinskArsak'
                    beskrivelse?: string | null
                    arsak: Array<MedisinskArsakType>
                } | null
                arbeidsrelatertArsak?: {
                    __typename?: 'ArbeidsrelatertArsak'
                    beskrivelse?: string | null
                    arsak: Array<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        sykmeldingStatus: {
            __typename?: 'SykmeldingStatus'
            statusEvent: StatusEvent
            timestamp: any
            arbeidsgiver?: { __typename?: 'ArbeidsgiverStatus'; orgnummer: string; orgNavn: string } | null
            sporsmalOgSvarListe: Array<{
                __typename?: 'Sporsmal'
                tekst: string
                shortName: ShortName
                svar:
                    | { __typename: 'ArbeidssituasjonSvar'; svarType: Svartype; arbeidsituasjon: ArbeidssituasjonType }
                    | { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }
                    | { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }
                    | {
                          __typename: 'PerioderSvar'
                          svarType: Svartype
                          perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
                      }
            }>
        }
        medisinskVurdering?: {
            __typename?: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato?: any | null
            hovedDiagnose?: { __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string } | null
            biDiagnoser: Array<{ __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string }>
            annenFraversArsak?: {
                __typename?: 'AnnenFraversArsak'
                grunn: Array<AnnenFraverGrunn>
                beskrivelse?: string | null
            } | null
        } | null
        prognose?: {
            __typename?: 'Prognose'
            arbeidsforEtterPeriode: boolean
            hensynArbeidsplassen?: string | null
            erIArbeid?: {
                __typename?: 'ErIArbeid'
                egetArbeidPaSikt: boolean
                annetArbeidPaSikt: boolean
                arbeidFOM?: any | null
                vurderingsdato?: any | null
            } | null
            erIkkeIArbeid?: {
                __typename?: 'ErIkkeIArbeid'
                arbeidsforPaSikt: boolean
                arbeidsforFOM?: any | null
                vurderingsdato?: any | null
            } | null
        } | null
        meldingTilNAV?: {
            __typename?: 'MeldingTilNAV'
            beskrivBistand?: string | null
            bistandUmiddelbart: boolean
        } | null
        kontaktMedPasient: {
            __typename?: 'KontaktMedPasient'
            begrunnelseIkkeKontakt?: string | null
            kontaktDato?: any | null
        }
        behandler: {
            __typename?: 'Behandler'
            fornavn: string
            mellomnavn?: string | null
            etternavn: string
            tlf?: string | null
            adresse?: {
                __typename?: 'Adresse'
                gate?: string | null
                postnummer?: number | null
                kommune?: string | null
                postboks?: string | null
                land?: string | null
            } | null
        }
        merknader?: Array<{ __typename?: 'Merknad'; beskrivelse?: string | null; type: string }> | null
        pasient?: {
            __typename?: 'Pasient'
            fnr?: string | null
            fornavn?: string | null
            mellomnavn?: string | null
            etternavn?: string | null
        } | null
        utenlandskSykmelding?: { __typename?: 'UtenlandskSykmelding'; land: string } | null
    }
}

export type SendSykmeldingMutationVariables = Exact<{
    sykmeldingId: Scalars['ID']
    values: SendSykmeldingValues
}>

export type SendSykmeldingMutation = {
    __typename?: 'Mutation'
    sendSykmelding: {
        __typename?: 'Sykmelding'
        id: string
        mottattTidspunkt: any
        utdypendeOpplysninger: any
        tiltakArbeidsplassen?: string | null
        tiltakNAV?: string | null
        andreTiltak?: string | null
        meldingTilArbeidsgiver?: string | null
        behandletTidspunkt: any
        egenmeldt?: boolean | null
        papirsykmelding?: boolean | null
        rulesetVersion: number
        behandlingsutfall: {
            __typename?: 'Behandlingsutfall'
            status: RegelStatus
            ruleHits: Array<{
                __typename?: 'RegelInfo'
                messageForSender: string
                messageForUser: string
                ruleName: string
                ruleStatus: RegelStatus
            }>
        }
        arbeidsgiver?: { __typename?: 'ArbeidsgiverSykmelding'; navn?: string | null } | null
        sykmeldingsperioder: Array<{
            __typename?: 'Periode'
            fom: any
            tom: any
            behandlingsdager?: number | null
            innspillTilArbeidsgiver?: string | null
            type: Periodetype
            reisetilskudd: boolean
            gradert?: { __typename?: 'GradertPeriode'; grad: number; reisetilskudd: boolean } | null
            aktivitetIkkeMulig?: {
                __typename?: 'AktivitetIkkeMuligPeriode'
                medisinskArsak?: {
                    __typename?: 'MedisinskArsak'
                    beskrivelse?: string | null
                    arsak: Array<MedisinskArsakType>
                } | null
                arbeidsrelatertArsak?: {
                    __typename?: 'ArbeidsrelatertArsak'
                    beskrivelse?: string | null
                    arsak: Array<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        sykmeldingStatus: {
            __typename?: 'SykmeldingStatus'
            statusEvent: StatusEvent
            timestamp: any
            arbeidsgiver?: { __typename?: 'ArbeidsgiverStatus'; orgnummer: string; orgNavn: string } | null
            sporsmalOgSvarListe: Array<{
                __typename?: 'Sporsmal'
                tekst: string
                shortName: ShortName
                svar:
                    | { __typename: 'ArbeidssituasjonSvar'; svarType: Svartype; arbeidsituasjon: ArbeidssituasjonType }
                    | { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }
                    | { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }
                    | {
                          __typename: 'PerioderSvar'
                          svarType: Svartype
                          perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
                      }
            }>
        }
        medisinskVurdering?: {
            __typename?: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato?: any | null
            hovedDiagnose?: { __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string } | null
            biDiagnoser: Array<{ __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string }>
            annenFraversArsak?: {
                __typename?: 'AnnenFraversArsak'
                grunn: Array<AnnenFraverGrunn>
                beskrivelse?: string | null
            } | null
        } | null
        prognose?: {
            __typename?: 'Prognose'
            arbeidsforEtterPeriode: boolean
            hensynArbeidsplassen?: string | null
            erIArbeid?: {
                __typename?: 'ErIArbeid'
                egetArbeidPaSikt: boolean
                annetArbeidPaSikt: boolean
                arbeidFOM?: any | null
                vurderingsdato?: any | null
            } | null
            erIkkeIArbeid?: {
                __typename?: 'ErIkkeIArbeid'
                arbeidsforPaSikt: boolean
                arbeidsforFOM?: any | null
                vurderingsdato?: any | null
            } | null
        } | null
        meldingTilNAV?: {
            __typename?: 'MeldingTilNAV'
            beskrivBistand?: string | null
            bistandUmiddelbart: boolean
        } | null
        kontaktMedPasient: {
            __typename?: 'KontaktMedPasient'
            begrunnelseIkkeKontakt?: string | null
            kontaktDato?: any | null
        }
        behandler: {
            __typename?: 'Behandler'
            fornavn: string
            mellomnavn?: string | null
            etternavn: string
            tlf?: string | null
            adresse?: {
                __typename?: 'Adresse'
                gate?: string | null
                postnummer?: number | null
                kommune?: string | null
                postboks?: string | null
                land?: string | null
            } | null
        }
        merknader?: Array<{ __typename?: 'Merknad'; beskrivelse?: string | null; type: string }> | null
        pasient?: {
            __typename?: 'Pasient'
            fnr?: string | null
            fornavn?: string | null
            mellomnavn?: string | null
            etternavn?: string | null
        } | null
        utenlandskSykmelding?: { __typename?: 'UtenlandskSykmelding'; land: string } | null
    }
}

export type PeriodeFragment = {
    __typename?: 'Periode'
    fom: any
    tom: any
    behandlingsdager?: number | null
    innspillTilArbeidsgiver?: string | null
    type: Periodetype
    reisetilskudd: boolean
    gradert?: { __typename?: 'GradertPeriode'; grad: number; reisetilskudd: boolean } | null
    aktivitetIkkeMulig?: {
        __typename?: 'AktivitetIkkeMuligPeriode'
        medisinskArsak?: {
            __typename?: 'MedisinskArsak'
            beskrivelse?: string | null
            arsak: Array<MedisinskArsakType>
        } | null
        arbeidsrelatertArsak?: {
            __typename?: 'ArbeidsrelatertArsak'
            beskrivelse?: string | null
            arsak: Array<ArbeidsrelatertArsakType>
        } | null
    } | null
}

type SvarUnion_ArbeidssituasjonSvar_Fragment = {
    __typename: 'ArbeidssituasjonSvar'
    svarType: Svartype
    arbeidsituasjon: ArbeidssituasjonType
}

type SvarUnion_DagerSvar_Fragment = { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }

type SvarUnion_JaNeiSvar_Fragment = { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }

type SvarUnion_PerioderSvar_Fragment = {
    __typename: 'PerioderSvar'
    svarType: Svartype
    perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
}

export type SvarUnionFragment =
    | SvarUnion_ArbeidssituasjonSvar_Fragment
    | SvarUnion_DagerSvar_Fragment
    | SvarUnion_JaNeiSvar_Fragment
    | SvarUnion_PerioderSvar_Fragment

export type SykmeldingStatusFragment = {
    __typename?: 'SykmeldingStatus'
    statusEvent: StatusEvent
    timestamp: any
    arbeidsgiver?: { __typename?: 'ArbeidsgiverStatus'; orgnummer: string; orgNavn: string } | null
    sporsmalOgSvarListe: Array<{
        __typename?: 'Sporsmal'
        tekst: string
        shortName: ShortName
        svar:
            | { __typename: 'ArbeidssituasjonSvar'; svarType: Svartype; arbeidsituasjon: ArbeidssituasjonType }
            | { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }
            | { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }
            | {
                  __typename: 'PerioderSvar'
                  svarType: Svartype
                  perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
              }
    }>
}

export type MedisinskVurderingFragment = {
    __typename?: 'MedisinskVurdering'
    svangerskap: boolean
    yrkesskade: boolean
    yrkesskadeDato?: any | null
    hovedDiagnose?: { __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string } | null
    biDiagnoser: Array<{ __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string }>
    annenFraversArsak?: {
        __typename?: 'AnnenFraversArsak'
        grunn: Array<AnnenFraverGrunn>
        beskrivelse?: string | null
    } | null
}

export type SykmeldingFragment = {
    __typename?: 'Sykmelding'
    id: string
    mottattTidspunkt: any
    utdypendeOpplysninger: any
    tiltakArbeidsplassen?: string | null
    tiltakNAV?: string | null
    andreTiltak?: string | null
    meldingTilArbeidsgiver?: string | null
    behandletTidspunkt: any
    egenmeldt?: boolean | null
    papirsykmelding?: boolean | null
    rulesetVersion: number
    behandlingsutfall: {
        __typename?: 'Behandlingsutfall'
        status: RegelStatus
        ruleHits: Array<{
            __typename?: 'RegelInfo'
            messageForSender: string
            messageForUser: string
            ruleName: string
            ruleStatus: RegelStatus
        }>
    }
    arbeidsgiver?: { __typename?: 'ArbeidsgiverSykmelding'; navn?: string | null } | null
    sykmeldingsperioder: Array<{
        __typename?: 'Periode'
        fom: any
        tom: any
        behandlingsdager?: number | null
        innspillTilArbeidsgiver?: string | null
        type: Periodetype
        reisetilskudd: boolean
        gradert?: { __typename?: 'GradertPeriode'; grad: number; reisetilskudd: boolean } | null
        aktivitetIkkeMulig?: {
            __typename?: 'AktivitetIkkeMuligPeriode'
            medisinskArsak?: {
                __typename?: 'MedisinskArsak'
                beskrivelse?: string | null
                arsak: Array<MedisinskArsakType>
            } | null
            arbeidsrelatertArsak?: {
                __typename?: 'ArbeidsrelatertArsak'
                beskrivelse?: string | null
                arsak: Array<ArbeidsrelatertArsakType>
            } | null
        } | null
    }>
    sykmeldingStatus: {
        __typename?: 'SykmeldingStatus'
        statusEvent: StatusEvent
        timestamp: any
        arbeidsgiver?: { __typename?: 'ArbeidsgiverStatus'; orgnummer: string; orgNavn: string } | null
        sporsmalOgSvarListe: Array<{
            __typename?: 'Sporsmal'
            tekst: string
            shortName: ShortName
            svar:
                | { __typename: 'ArbeidssituasjonSvar'; svarType: Svartype; arbeidsituasjon: ArbeidssituasjonType }
                | { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }
                | { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }
                | {
                      __typename: 'PerioderSvar'
                      svarType: Svartype
                      perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
                  }
        }>
    }
    medisinskVurdering?: {
        __typename?: 'MedisinskVurdering'
        svangerskap: boolean
        yrkesskade: boolean
        yrkesskadeDato?: any | null
        hovedDiagnose?: { __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string } | null
        biDiagnoser: Array<{ __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string }>
        annenFraversArsak?: {
            __typename?: 'AnnenFraversArsak'
            grunn: Array<AnnenFraverGrunn>
            beskrivelse?: string | null
        } | null
    } | null
    prognose?: {
        __typename?: 'Prognose'
        arbeidsforEtterPeriode: boolean
        hensynArbeidsplassen?: string | null
        erIArbeid?: {
            __typename?: 'ErIArbeid'
            egetArbeidPaSikt: boolean
            annetArbeidPaSikt: boolean
            arbeidFOM?: any | null
            vurderingsdato?: any | null
        } | null
        erIkkeIArbeid?: {
            __typename?: 'ErIkkeIArbeid'
            arbeidsforPaSikt: boolean
            arbeidsforFOM?: any | null
            vurderingsdato?: any | null
        } | null
    } | null
    meldingTilNAV?: { __typename?: 'MeldingTilNAV'; beskrivBistand?: string | null; bistandUmiddelbart: boolean } | null
    kontaktMedPasient: {
        __typename?: 'KontaktMedPasient'
        begrunnelseIkkeKontakt?: string | null
        kontaktDato?: any | null
    }
    behandler: {
        __typename?: 'Behandler'
        fornavn: string
        mellomnavn?: string | null
        etternavn: string
        tlf?: string | null
        adresse?: {
            __typename?: 'Adresse'
            gate?: string | null
            postnummer?: number | null
            kommune?: string | null
            postboks?: string | null
            land?: string | null
        } | null
    }
    merknader?: Array<{ __typename?: 'Merknad'; beskrivelse?: string | null; type: string }> | null
    pasient?: {
        __typename?: 'Pasient'
        fnr?: string | null
        fornavn?: string | null
        mellomnavn?: string | null
        etternavn?: string | null
    } | null
    utenlandskSykmelding?: { __typename?: 'UtenlandskSykmelding'; land: string } | null
}

export type SykmeldingerQueryVariables = Exact<{ [key: string]: never }>

export type SykmeldingerQuery = {
    __typename?: 'Query'
    sykmeldinger: Array<{
        __typename?: 'Sykmelding'
        id: string
        mottattTidspunkt: any
        utdypendeOpplysninger: any
        tiltakArbeidsplassen?: string | null
        tiltakNAV?: string | null
        andreTiltak?: string | null
        meldingTilArbeidsgiver?: string | null
        behandletTidspunkt: any
        egenmeldt?: boolean | null
        papirsykmelding?: boolean | null
        rulesetVersion: number
        behandlingsutfall: {
            __typename?: 'Behandlingsutfall'
            status: RegelStatus
            ruleHits: Array<{
                __typename?: 'RegelInfo'
                messageForSender: string
                messageForUser: string
                ruleName: string
                ruleStatus: RegelStatus
            }>
        }
        arbeidsgiver?: { __typename?: 'ArbeidsgiverSykmelding'; navn?: string | null } | null
        sykmeldingsperioder: Array<{
            __typename?: 'Periode'
            fom: any
            tom: any
            behandlingsdager?: number | null
            innspillTilArbeidsgiver?: string | null
            type: Periodetype
            reisetilskudd: boolean
            gradert?: { __typename?: 'GradertPeriode'; grad: number; reisetilskudd: boolean } | null
            aktivitetIkkeMulig?: {
                __typename?: 'AktivitetIkkeMuligPeriode'
                medisinskArsak?: {
                    __typename?: 'MedisinskArsak'
                    beskrivelse?: string | null
                    arsak: Array<MedisinskArsakType>
                } | null
                arbeidsrelatertArsak?: {
                    __typename?: 'ArbeidsrelatertArsak'
                    beskrivelse?: string | null
                    arsak: Array<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        sykmeldingStatus: {
            __typename?: 'SykmeldingStatus'
            statusEvent: StatusEvent
            timestamp: any
            arbeidsgiver?: { __typename?: 'ArbeidsgiverStatus'; orgnummer: string; orgNavn: string } | null
            sporsmalOgSvarListe: Array<{
                __typename?: 'Sporsmal'
                tekst: string
                shortName: ShortName
                svar:
                    | { __typename: 'ArbeidssituasjonSvar'; svarType: Svartype; arbeidsituasjon: ArbeidssituasjonType }
                    | { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }
                    | { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }
                    | {
                          __typename: 'PerioderSvar'
                          svarType: Svartype
                          perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
                      }
            }>
        }
        medisinskVurdering?: {
            __typename?: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato?: any | null
            hovedDiagnose?: { __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string } | null
            biDiagnoser: Array<{ __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string }>
            annenFraversArsak?: {
                __typename?: 'AnnenFraversArsak'
                grunn: Array<AnnenFraverGrunn>
                beskrivelse?: string | null
            } | null
        } | null
        prognose?: {
            __typename?: 'Prognose'
            arbeidsforEtterPeriode: boolean
            hensynArbeidsplassen?: string | null
            erIArbeid?: {
                __typename?: 'ErIArbeid'
                egetArbeidPaSikt: boolean
                annetArbeidPaSikt: boolean
                arbeidFOM?: any | null
                vurderingsdato?: any | null
            } | null
            erIkkeIArbeid?: {
                __typename?: 'ErIkkeIArbeid'
                arbeidsforPaSikt: boolean
                arbeidsforFOM?: any | null
                vurderingsdato?: any | null
            } | null
        } | null
        meldingTilNAV?: {
            __typename?: 'MeldingTilNAV'
            beskrivBistand?: string | null
            bistandUmiddelbart: boolean
        } | null
        kontaktMedPasient: {
            __typename?: 'KontaktMedPasient'
            begrunnelseIkkeKontakt?: string | null
            kontaktDato?: any | null
        }
        behandler: {
            __typename?: 'Behandler'
            fornavn: string
            mellomnavn?: string | null
            etternavn: string
            tlf?: string | null
            adresse?: {
                __typename?: 'Adresse'
                gate?: string | null
                postnummer?: number | null
                kommune?: string | null
                postboks?: string | null
                land?: string | null
            } | null
        }
        merknader?: Array<{ __typename?: 'Merknad'; beskrivelse?: string | null; type: string }> | null
        pasient?: {
            __typename?: 'Pasient'
            fnr?: string | null
            fornavn?: string | null
            mellomnavn?: string | null
            etternavn?: string | null
        } | null
        utenlandskSykmelding?: { __typename?: 'UtenlandskSykmelding'; land: string } | null
    }>
}

export type SykmeldingByIdQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type SykmeldingByIdQuery = {
    __typename?: 'Query'
    sykmelding: {
        __typename?: 'Sykmelding'
        id: string
        mottattTidspunkt: any
        utdypendeOpplysninger: any
        tiltakArbeidsplassen?: string | null
        tiltakNAV?: string | null
        andreTiltak?: string | null
        meldingTilArbeidsgiver?: string | null
        behandletTidspunkt: any
        egenmeldt?: boolean | null
        papirsykmelding?: boolean | null
        rulesetVersion: number
        behandlingsutfall: {
            __typename?: 'Behandlingsutfall'
            status: RegelStatus
            ruleHits: Array<{
                __typename?: 'RegelInfo'
                messageForSender: string
                messageForUser: string
                ruleName: string
                ruleStatus: RegelStatus
            }>
        }
        arbeidsgiver?: { __typename?: 'ArbeidsgiverSykmelding'; navn?: string | null } | null
        sykmeldingsperioder: Array<{
            __typename?: 'Periode'
            fom: any
            tom: any
            behandlingsdager?: number | null
            innspillTilArbeidsgiver?: string | null
            type: Periodetype
            reisetilskudd: boolean
            gradert?: { __typename?: 'GradertPeriode'; grad: number; reisetilskudd: boolean } | null
            aktivitetIkkeMulig?: {
                __typename?: 'AktivitetIkkeMuligPeriode'
                medisinskArsak?: {
                    __typename?: 'MedisinskArsak'
                    beskrivelse?: string | null
                    arsak: Array<MedisinskArsakType>
                } | null
                arbeidsrelatertArsak?: {
                    __typename?: 'ArbeidsrelatertArsak'
                    beskrivelse?: string | null
                    arsak: Array<ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        sykmeldingStatus: {
            __typename?: 'SykmeldingStatus'
            statusEvent: StatusEvent
            timestamp: any
            arbeidsgiver?: { __typename?: 'ArbeidsgiverStatus'; orgnummer: string; orgNavn: string } | null
            sporsmalOgSvarListe: Array<{
                __typename?: 'Sporsmal'
                tekst: string
                shortName: ShortName
                svar:
                    | { __typename: 'ArbeidssituasjonSvar'; svarType: Svartype; arbeidsituasjon: ArbeidssituasjonType }
                    | { __typename: 'DagerSvar'; svarType: Svartype; dager: Array<any> }
                    | { __typename: 'JaNeiSvar'; svarType: Svartype; jaNei: YesOrNo }
                    | {
                          __typename: 'PerioderSvar'
                          svarType: Svartype
                          perioder: Array<{ __typename?: 'FomTom'; fom: any; tom: any }>
                      }
            }>
        }
        medisinskVurdering?: {
            __typename?: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato?: any | null
            hovedDiagnose?: { __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string } | null
            biDiagnoser: Array<{ __typename?: 'Diagnose'; tekst?: string | null; kode: string; system: string }>
            annenFraversArsak?: {
                __typename?: 'AnnenFraversArsak'
                grunn: Array<AnnenFraverGrunn>
                beskrivelse?: string | null
            } | null
        } | null
        prognose?: {
            __typename?: 'Prognose'
            arbeidsforEtterPeriode: boolean
            hensynArbeidsplassen?: string | null
            erIArbeid?: {
                __typename?: 'ErIArbeid'
                egetArbeidPaSikt: boolean
                annetArbeidPaSikt: boolean
                arbeidFOM?: any | null
                vurderingsdato?: any | null
            } | null
            erIkkeIArbeid?: {
                __typename?: 'ErIkkeIArbeid'
                arbeidsforPaSikt: boolean
                arbeidsforFOM?: any | null
                vurderingsdato?: any | null
            } | null
        } | null
        meldingTilNAV?: {
            __typename?: 'MeldingTilNAV'
            beskrivBistand?: string | null
            bistandUmiddelbart: boolean
        } | null
        kontaktMedPasient: {
            __typename?: 'KontaktMedPasient'
            begrunnelseIkkeKontakt?: string | null
            kontaktDato?: any | null
        }
        behandler: {
            __typename?: 'Behandler'
            fornavn: string
            mellomnavn?: string | null
            etternavn: string
            tlf?: string | null
            adresse?: {
                __typename?: 'Adresse'
                gate?: string | null
                postnummer?: number | null
                kommune?: string | null
                postboks?: string | null
                land?: string | null
            } | null
        }
        merknader?: Array<{ __typename?: 'Merknad'; beskrivelse?: string | null; type: string }> | null
        pasient?: {
            __typename?: 'Pasient'
            fnr?: string | null
            fornavn?: string | null
            mellomnavn?: string | null
            etternavn?: string | null
        } | null
        utenlandskSykmelding?: { __typename?: 'UtenlandskSykmelding'; land: string } | null
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
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
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
} as unknown as DocumentNode<EndreEgenmeldingsdagerMutation, EndreEgenmeldingsdagerMutationVariables>
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
