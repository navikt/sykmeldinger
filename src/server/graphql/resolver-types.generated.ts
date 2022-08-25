/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { RequestContext } from './resolvers';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: string;
    DateTime: string;
    JSON: unknown;
};

export type Adresse = {
    __typename?: 'Adresse';
    gate: Maybe<Scalars['String']>;
    kommune: Maybe<Scalars['String']>;
    land: Maybe<Scalars['String']>;
    postboks: Maybe<Scalars['String']>;
    postnummer: Maybe<Scalars['Int']>;
};

export type AktivitetIkkeMuligPeriode = {
    __typename?: 'AktivitetIkkeMuligPeriode';
    arbeidsrelatertArsak: Maybe<ArbeidsrelatertArsak>;
    medisinskArsak: Maybe<MedisinskArsak>;
};

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
    __typename?: 'AnnenFraversArsak';
    beskrivelse: Maybe<Scalars['String']>;
    grunn: Array<AnnenFraverGrunn>;
};

export type Arbeidsgiver = {
    __typename?: 'Arbeidsgiver';
    aktivtArbeidsforhold: Scalars['Boolean'];
    juridiskOrgnummer: Scalars['String'];
    naermesteLeder: Maybe<NaermesteLeder>;
    navn: Scalars['String'];
    orgnummer: Scalars['String'];
    stilling: Scalars['String'];
    stillingsprosent: Scalars['String'];
};

export type ArbeidsgiverStatus = {
    __typename?: 'ArbeidsgiverStatus';
    juridiskOrgnummer: Maybe<Scalars['String']>;
    orgNavn: Scalars['String'];
    orgnummer: Scalars['String'];
};

export type ArbeidsgiverSykmelding = {
    __typename?: 'ArbeidsgiverSykmelding';
    navn: Maybe<Scalars['String']>;
    stillingsprosent: Maybe<Scalars['Float']>;
};

export type ArbeidsrelatertArsak = {
    __typename?: 'ArbeidsrelatertArsak';
    arsak: Array<ArbeidsrelatertArsakType>;
    beskrivelse: Maybe<Scalars['String']>;
};

export enum ArbeidsrelatertArsakType {
    Annet = 'ANNET',
    ManglendeTilrettelegging = 'MANGLENDE_TILRETTELEGGING',
}

export type Behandler = {
    __typename?: 'Behandler';
    adresse: Maybe<Adresse>;
    etternavn: Scalars['String'];
    fornavn: Scalars['String'];
    mellomnavn: Maybe<Scalars['String']>;
    tlf: Maybe<Scalars['String']>;
};

export type Behandlingsutfall = {
    __typename?: 'Behandlingsutfall';
    ruleHits: Array<RegelInfo>;
    status: RegelStatus;
};

export type Brukerinformasjon = {
    __typename?: 'Brukerinformasjon';
    arbeidsgivere: Array<Arbeidsgiver>;
    strengtFortroligAdresse: Scalars['Boolean'];
};

export type Diagnose = {
    __typename?: 'Diagnose';
    kode: Scalars['String'];
    system: Scalars['String'];
    tekst: Maybe<Scalars['String']>;
};

export type ErIArbeid = {
    __typename?: 'ErIArbeid';
    annetArbeidPaSikt: Scalars['Boolean'];
    arbeidFOM: Maybe<Scalars['Date']>;
    egetArbeidPaSikt: Scalars['Boolean'];
    vurderingsdato: Maybe<Scalars['Date']>;
};

export type ErIkkeIArbeid = {
    __typename?: 'ErIkkeIArbeid';
    arbeidsforFOM: Maybe<Scalars['Date']>;
    arbeidsforPaSikt: Scalars['Boolean'];
    vurderingsdato: Maybe<Scalars['Date']>;
};

export type GradertPeriode = {
    __typename?: 'GradertPeriode';
    grad: Scalars['Int'];
    reisetilskudd: Scalars['Boolean'];
};

export type KontaktMedPasient = {
    __typename?: 'KontaktMedPasient';
    begrunnelseIkkeKontakt: Maybe<Scalars['String']>;
    kontaktDato: Maybe<Scalars['Date']>;
};

export type MedisinskArsak = {
    __typename?: 'MedisinskArsak';
    arsak: Array<MedisinskArsakType>;
    beskrivelse: Maybe<Scalars['String']>;
};

export enum MedisinskArsakType {
    AktivitetForhindrerBedring = 'AKTIVITET_FORHINDRER_BEDRING',
    AktivitetForverrerTilstand = 'AKTIVITET_FORVERRER_TILSTAND',
    Annet = 'ANNET',
    TilstandHindrerAktivitet = 'TILSTAND_HINDRER_AKTIVITET',
}

export type MedisinskVurdering = {
    __typename?: 'MedisinskVurdering';
    annenFraversArsak: Maybe<AnnenFraversArsak>;
    biDiagnoser: Array<Diagnose>;
    hovedDiagnose: Maybe<Diagnose>;
    svangerskap: Scalars['Boolean'];
    yrkesskade: Scalars['Boolean'];
    yrkesskadeDato: Maybe<Scalars['Date']>;
};

export type MeldingTilNav = {
    __typename?: 'MeldingTilNAV';
    beskrivBistand: Maybe<Scalars['String']>;
    bistandUmiddelbart: Scalars['Boolean'];
};

export type Merknad = {
    __typename?: 'Merknad';
    beskrivelse: Maybe<Scalars['String']>;
    type: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    changeSykmeldingStatus: Sykmelding;
    submitSykmelding: Sykmelding;
};

export type MutationChangeSykmeldingStatusArgs = {
    status: SykmeldingChangeStatus;
    sykmeldingId: Scalars['ID'];
};

export type MutationSubmitSykmeldingArgs = {
    sykmeldingId: Scalars['ID'];
    values: Scalars['JSON'];
};

export type NaermesteLeder = {
    __typename?: 'NaermesteLeder';
    aktivTom: Maybe<Scalars['Date']>;
    aktoerId: Scalars['String'];
    arbeidsgiverForskuttererLoenn: Maybe<Scalars['Boolean']>;
    epost: Maybe<Scalars['String']>;
    mobil: Maybe<Scalars['String']>;
    navn: Scalars['String'];
    organisasjonsnavn: Scalars['String'];
    orgnummer: Scalars['String'];
};

export type Pasient = {
    __typename?: 'Pasient';
    etternavn: Maybe<Scalars['String']>;
    fnr: Maybe<Scalars['String']>;
    fornavn: Maybe<Scalars['String']>;
    mellomnavn: Maybe<Scalars['String']>;
};

export type Periode = {
    __typename?: 'Periode';
    aktivitetIkkeMulig: Maybe<AktivitetIkkeMuligPeriode>;
    behandlingsdager: Maybe<Scalars['Int']>;
    fom: Scalars['Date'];
    gradert: Maybe<GradertPeriode>;
    innspillTilArbeidsgiver: Maybe<Scalars['String']>;
    reisetilskudd: Scalars['Boolean'];
    tom: Scalars['Date'];
    type: Periodetype;
};

export enum Periodetype {
    AktivitetIkkeMulig = 'AKTIVITET_IKKE_MULIG',
    Avventende = 'AVVENTENDE',
    Behandlingsdager = 'BEHANDLINGSDAGER',
    Gradert = 'GRADERT',
    Reisetilskudd = 'REISETILSKUDD',
}

export type Prognose = {
    __typename?: 'Prognose';
    arbeidsforEtterPeriode: Scalars['Boolean'];
    erIArbeid: Maybe<ErIArbeid>;
    erIkkeIArbeid: Maybe<ErIkkeIArbeid>;
    hensynArbeidsplassen: Maybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    brukerinformasjon: Brukerinformasjon;
    sykmelding: Sykmelding;
    sykmeldingUtenforVentetid: UtenforVentetid;
    sykmeldinger: Array<Sykmelding>;
};

export type QuerySykmeldingArgs = {
    id: Scalars['ID'];
};

export type QuerySykmeldingUtenforVentetidArgs = {
    id: Scalars['ID'];
};

export type RegelInfo = {
    __typename?: 'RegelInfo';
    messageForSender: Scalars['String'];
    messageForUser: Scalars['String'];
    ruleName: Scalars['String'];
    ruleStatus: RegelStatus;
};

export enum RegelStatus {
    Invalid = 'INVALID',
    ManualProcessing = 'MANUAL_PROCESSING',
    Ok = 'OK',
}

export enum ShortName {
    Arbeidssituasjon = 'ARBEIDSSITUASJON',
    Forsikring = 'FORSIKRING',
    Fravaer = 'FRAVAER',
    NyNarmesteLeder = 'NY_NARMESTE_LEDER',
    Periode = 'PERIODE',
}

export type Sporsmal = {
    __typename?: 'Sporsmal';
    shortName: ShortName;
    svar: Svar;
    tekst: Scalars['String'];
};

export enum StatusEvent {
    Apen = 'APEN',
    Avbrutt = 'AVBRUTT',
    Bekreftet = 'BEKREFTET',
    Sendt = 'SENDT',
    Utgatt = 'UTGATT',
}

export type Svar = {
    __typename?: 'Svar';
    svar: Scalars['String'];
    svarType: Svartype;
};

export enum SvarRestriksjon {
    SkjermetForArbeidsgiver = 'SKJERMET_FOR_ARBEIDSGIVER',
    SkjermetForNav = 'SKJERMET_FOR_NAV',
}

export enum Svartype {
    Arbeidssituasjon = 'ARBEIDSSITUASJON',
    JaNei = 'JA_NEI',
    Perioder = 'PERIODER',
}

export type Sykmelding = {
    __typename?: 'Sykmelding';
    andreTiltak: Maybe<Scalars['String']>;
    arbeidsgiver: Maybe<ArbeidsgiverSykmelding>;
    behandler: Behandler;
    behandletTidspunkt: Scalars['Date'];
    behandlingsutfall: Behandlingsutfall;
    egenmeldt: Maybe<Scalars['Boolean']>;
    harRedusertArbeidsgiverperiode: Maybe<Scalars['Boolean']>;
    id: Scalars['String'];
    kontaktMedPasient: KontaktMedPasient;
    legekontorOrgnummer: Maybe<Scalars['String']>;
    medisinskVurdering: Maybe<MedisinskVurdering>;
    meldingTilArbeidsgiver: Maybe<Scalars['String']>;
    meldingTilNAV: Maybe<MeldingTilNav>;
    merknader: Maybe<Array<Merknad>>;
    mottattTidspunkt: Scalars['Date'];
    navnFastlege: Maybe<Scalars['String']>;
    papirsykmelding: Maybe<Scalars['Boolean']>;
    pasient: Maybe<Pasient>;
    prognose: Maybe<Prognose>;
    skjermesForPasient: Scalars['Boolean'];
    syketilfelleStartDato: Maybe<Scalars['Date']>;
    sykmeldingStatus: SykmeldingStatus;
    sykmeldingsperioder: Array<Periode>;
    tiltakArbeidsplassen: Maybe<Scalars['String']>;
    tiltakNAV: Maybe<Scalars['String']>;
    utdypendeOpplysninger: Scalars['JSON'];
};

export enum SykmeldingChangeStatus {
    Avbryt = 'AVBRYT',
    BekreftAvvist = 'BEKREFT_AVVIST',
    Gjenapne = 'GJENAPNE',
}

export type SykmeldingStatus = {
    __typename?: 'SykmeldingStatus';
    arbeidsgiver: Maybe<ArbeidsgiverStatus>;
    sporsmalOgSvarListe: Array<Sporsmal>;
    statusEvent: StatusEvent;
    timestamp: Scalars['Date'];
};

export type UtdypendeOpplysning = {
    __typename?: 'UtdypendeOpplysning';
    restriksjoner: Array<SvarRestriksjon>;
    sporsmal: Maybe<Scalars['String']>;
    svar: Scalars['String'];
};

export type UtenforVentetid = {
    __typename?: 'UtenforVentetid';
    erUtenforVentetid: Scalars['Boolean'];
    oppfolgingsdato: Maybe<Scalars['Date']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    Adresse: ResolverTypeWrapper<Adresse>;
    AktivitetIkkeMuligPeriode: ResolverTypeWrapper<AktivitetIkkeMuligPeriode>;
    AnnenFraverGrunn: AnnenFraverGrunn;
    AnnenFraversArsak: ResolverTypeWrapper<AnnenFraversArsak>;
    Arbeidsgiver: ResolverTypeWrapper<Arbeidsgiver>;
    ArbeidsgiverStatus: ResolverTypeWrapper<ArbeidsgiverStatus>;
    ArbeidsgiverSykmelding: ResolverTypeWrapper<ArbeidsgiverSykmelding>;
    ArbeidsrelatertArsak: ResolverTypeWrapper<ArbeidsrelatertArsak>;
    ArbeidsrelatertArsakType: ArbeidsrelatertArsakType;
    Behandler: ResolverTypeWrapper<Behandler>;
    Behandlingsutfall: ResolverTypeWrapper<Behandlingsutfall>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Brukerinformasjon: ResolverTypeWrapper<Brukerinformasjon>;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    Diagnose: ResolverTypeWrapper<Diagnose>;
    ErIArbeid: ResolverTypeWrapper<ErIArbeid>;
    ErIkkeIArbeid: ResolverTypeWrapper<ErIkkeIArbeid>;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    GradertPeriode: ResolverTypeWrapper<GradertPeriode>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    JSON: ResolverTypeWrapper<Scalars['JSON']>;
    KontaktMedPasient: ResolverTypeWrapper<KontaktMedPasient>;
    MedisinskArsak: ResolverTypeWrapper<MedisinskArsak>;
    MedisinskArsakType: MedisinskArsakType;
    MedisinskVurdering: ResolverTypeWrapper<MedisinskVurdering>;
    MeldingTilNAV: ResolverTypeWrapper<MeldingTilNav>;
    Merknad: ResolverTypeWrapper<Merknad>;
    Mutation: ResolverTypeWrapper<{}>;
    NaermesteLeder: ResolverTypeWrapper<NaermesteLeder>;
    Pasient: ResolverTypeWrapper<Pasient>;
    Periode: ResolverTypeWrapper<Periode>;
    Periodetype: Periodetype;
    Prognose: ResolverTypeWrapper<Prognose>;
    Query: ResolverTypeWrapper<{}>;
    RegelInfo: ResolverTypeWrapper<RegelInfo>;
    RegelStatus: RegelStatus;
    ShortName: ShortName;
    Sporsmal: ResolverTypeWrapper<Sporsmal>;
    StatusEvent: StatusEvent;
    String: ResolverTypeWrapper<Scalars['String']>;
    Svar: ResolverTypeWrapper<Svar>;
    SvarRestriksjon: SvarRestriksjon;
    Svartype: Svartype;
    Sykmelding: ResolverTypeWrapper<Sykmelding>;
    SykmeldingChangeStatus: SykmeldingChangeStatus;
    SykmeldingStatus: ResolverTypeWrapper<SykmeldingStatus>;
    UtdypendeOpplysning: ResolverTypeWrapper<UtdypendeOpplysning>;
    UtenforVentetid: ResolverTypeWrapper<UtenforVentetid>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    Adresse: Adresse;
    AktivitetIkkeMuligPeriode: AktivitetIkkeMuligPeriode;
    AnnenFraversArsak: AnnenFraversArsak;
    Arbeidsgiver: Arbeidsgiver;
    ArbeidsgiverStatus: ArbeidsgiverStatus;
    ArbeidsgiverSykmelding: ArbeidsgiverSykmelding;
    ArbeidsrelatertArsak: ArbeidsrelatertArsak;
    Behandler: Behandler;
    Behandlingsutfall: Behandlingsutfall;
    Boolean: Scalars['Boolean'];
    Brukerinformasjon: Brukerinformasjon;
    Date: Scalars['Date'];
    DateTime: Scalars['DateTime'];
    Diagnose: Diagnose;
    ErIArbeid: ErIArbeid;
    ErIkkeIArbeid: ErIkkeIArbeid;
    Float: Scalars['Float'];
    GradertPeriode: GradertPeriode;
    ID: Scalars['ID'];
    Int: Scalars['Int'];
    JSON: Scalars['JSON'];
    KontaktMedPasient: KontaktMedPasient;
    MedisinskArsak: MedisinskArsak;
    MedisinskVurdering: MedisinskVurdering;
    MeldingTilNAV: MeldingTilNav;
    Merknad: Merknad;
    Mutation: {};
    NaermesteLeder: NaermesteLeder;
    Pasient: Pasient;
    Periode: Periode;
    Prognose: Prognose;
    Query: {};
    RegelInfo: RegelInfo;
    Sporsmal: Sporsmal;
    String: Scalars['String'];
    Svar: Svar;
    Sykmelding: Sykmelding;
    SykmeldingStatus: SykmeldingStatus;
    UtdypendeOpplysning: UtdypendeOpplysning;
    UtenforVentetid: UtenforVentetid;
}>;

export type AdresseResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Adresse'] = ResolversParentTypes['Adresse'],
> = ResolversObject<{
    gate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    kommune?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    land?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    postboks?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    postnummer?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AktivitetIkkeMuligPeriodeResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['AktivitetIkkeMuligPeriode'] = ResolversParentTypes['AktivitetIkkeMuligPeriode'],
> = ResolversObject<{
    arbeidsrelatertArsak?: Resolver<Maybe<ResolversTypes['ArbeidsrelatertArsak']>, ParentType, ContextType>;
    medisinskArsak?: Resolver<Maybe<ResolversTypes['MedisinskArsak']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AnnenFraversArsakResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['AnnenFraversArsak'] = ResolversParentTypes['AnnenFraversArsak'],
> = ResolversObject<{
    beskrivelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    grunn?: Resolver<Array<ResolversTypes['AnnenFraverGrunn']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArbeidsgiverResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Arbeidsgiver'] = ResolversParentTypes['Arbeidsgiver'],
> = ResolversObject<{
    aktivtArbeidsforhold?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    juridiskOrgnummer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    naermesteLeder?: Resolver<Maybe<ResolversTypes['NaermesteLeder']>, ParentType, ContextType>;
    navn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    orgnummer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    stilling?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    stillingsprosent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArbeidsgiverStatusResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['ArbeidsgiverStatus'] = ResolversParentTypes['ArbeidsgiverStatus'],
> = ResolversObject<{
    juridiskOrgnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    orgNavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    orgnummer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArbeidsgiverSykmeldingResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['ArbeidsgiverSykmelding'] = ResolversParentTypes['ArbeidsgiverSykmelding'],
> = ResolversObject<{
    navn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    stillingsprosent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArbeidsrelatertArsakResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['ArbeidsrelatertArsak'] = ResolversParentTypes['ArbeidsrelatertArsak'],
> = ResolversObject<{
    arsak?: Resolver<Array<ResolversTypes['ArbeidsrelatertArsakType']>, ParentType, ContextType>;
    beskrivelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BehandlerResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Behandler'] = ResolversParentTypes['Behandler'],
> = ResolversObject<{
    adresse?: Resolver<Maybe<ResolversTypes['Adresse']>, ParentType, ContextType>;
    etternavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    fornavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    mellomnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    tlf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BehandlingsutfallResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Behandlingsutfall'] = ResolversParentTypes['Behandlingsutfall'],
> = ResolversObject<{
    ruleHits?: Resolver<Array<ResolversTypes['RegelInfo']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['RegelStatus'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BrukerinformasjonResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Brukerinformasjon'] = ResolversParentTypes['Brukerinformasjon'],
> = ResolversObject<{
    arbeidsgivere?: Resolver<Array<ResolversTypes['Arbeidsgiver']>, ParentType, ContextType>;
    strengtFortroligAdresse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export type DiagnoseResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Diagnose'] = ResolversParentTypes['Diagnose'],
> = ResolversObject<{
    kode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    system?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    tekst?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErIArbeidResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['ErIArbeid'] = ResolversParentTypes['ErIArbeid'],
> = ResolversObject<{
    annetArbeidPaSikt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    arbeidFOM?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    egetArbeidPaSikt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    vurderingsdato?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErIkkeIArbeidResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['ErIkkeIArbeid'] = ResolversParentTypes['ErIkkeIArbeid'],
> = ResolversObject<{
    arbeidsforFOM?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    arbeidsforPaSikt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    vurderingsdato?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GradertPeriodeResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['GradertPeriode'] = ResolversParentTypes['GradertPeriode'],
> = ResolversObject<{
    grad?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    reisetilskudd?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
    name: 'JSON';
}

export type KontaktMedPasientResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['KontaktMedPasient'] = ResolversParentTypes['KontaktMedPasient'],
> = ResolversObject<{
    begrunnelseIkkeKontakt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    kontaktDato?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MedisinskArsakResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['MedisinskArsak'] = ResolversParentTypes['MedisinskArsak'],
> = ResolversObject<{
    arsak?: Resolver<Array<ResolversTypes['MedisinskArsakType']>, ParentType, ContextType>;
    beskrivelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MedisinskVurderingResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['MedisinskVurdering'] = ResolversParentTypes['MedisinskVurdering'],
> = ResolversObject<{
    annenFraversArsak?: Resolver<Maybe<ResolversTypes['AnnenFraversArsak']>, ParentType, ContextType>;
    biDiagnoser?: Resolver<Array<ResolversTypes['Diagnose']>, ParentType, ContextType>;
    hovedDiagnose?: Resolver<Maybe<ResolversTypes['Diagnose']>, ParentType, ContextType>;
    svangerskap?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    yrkesskade?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    yrkesskadeDato?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MeldingTilNavResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['MeldingTilNAV'] = ResolversParentTypes['MeldingTilNAV'],
> = ResolversObject<{
    beskrivBistand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    bistandUmiddelbart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MerknadResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Merknad'] = ResolversParentTypes['Merknad'],
> = ResolversObject<{
    beskrivelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
    changeSykmeldingStatus?: Resolver<
        ResolversTypes['Sykmelding'],
        ParentType,
        ContextType,
        RequireFields<MutationChangeSykmeldingStatusArgs, 'status' | 'sykmeldingId'>
    >;
    submitSykmelding?: Resolver<
        ResolversTypes['Sykmelding'],
        ParentType,
        ContextType,
        RequireFields<MutationSubmitSykmeldingArgs, 'sykmeldingId' | 'values'>
    >;
}>;

export type NaermesteLederResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['NaermesteLeder'] = ResolversParentTypes['NaermesteLeder'],
> = ResolversObject<{
    aktivTom?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    aktoerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    arbeidsgiverForskuttererLoenn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    epost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    mobil?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    navn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    organisasjonsnavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    orgnummer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PasientResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Pasient'] = ResolversParentTypes['Pasient'],
> = ResolversObject<{
    etternavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    fnr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    fornavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    mellomnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PeriodeResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Periode'] = ResolversParentTypes['Periode'],
> = ResolversObject<{
    aktivitetIkkeMulig?: Resolver<Maybe<ResolversTypes['AktivitetIkkeMuligPeriode']>, ParentType, ContextType>;
    behandlingsdager?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    fom?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    gradert?: Resolver<Maybe<ResolversTypes['GradertPeriode']>, ParentType, ContextType>;
    innspillTilArbeidsgiver?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    reisetilskudd?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    tom?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['Periodetype'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PrognoseResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Prognose'] = ResolversParentTypes['Prognose'],
> = ResolversObject<{
    arbeidsforEtterPeriode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    erIArbeid?: Resolver<Maybe<ResolversTypes['ErIArbeid']>, ParentType, ContextType>;
    erIkkeIArbeid?: Resolver<Maybe<ResolversTypes['ErIkkeIArbeid']>, ParentType, ContextType>;
    hensynArbeidsplassen?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
    brukerinformasjon?: Resolver<ResolversTypes['Brukerinformasjon'], ParentType, ContextType>;
    sykmelding?: Resolver<
        ResolversTypes['Sykmelding'],
        ParentType,
        ContextType,
        RequireFields<QuerySykmeldingArgs, 'id'>
    >;
    sykmeldingUtenforVentetid?: Resolver<
        ResolversTypes['UtenforVentetid'],
        ParentType,
        ContextType,
        RequireFields<QuerySykmeldingUtenforVentetidArgs, 'id'>
    >;
    sykmeldinger?: Resolver<Array<ResolversTypes['Sykmelding']>, ParentType, ContextType>;
}>;

export type RegelInfoResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['RegelInfo'] = ResolversParentTypes['RegelInfo'],
> = ResolversObject<{
    messageForSender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    messageForUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    ruleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    ruleStatus?: Resolver<ResolversTypes['RegelStatus'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SporsmalResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Sporsmal'] = ResolversParentTypes['Sporsmal'],
> = ResolversObject<{
    shortName?: Resolver<ResolversTypes['ShortName'], ParentType, ContextType>;
    svar?: Resolver<ResolversTypes['Svar'], ParentType, ContextType>;
    tekst?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SvarResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Svar'] = ResolversParentTypes['Svar'],
> = ResolversObject<{
    svar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    svarType?: Resolver<ResolversTypes['Svartype'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SykmeldingResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['Sykmelding'] = ResolversParentTypes['Sykmelding'],
> = ResolversObject<{
    andreTiltak?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    arbeidsgiver?: Resolver<Maybe<ResolversTypes['ArbeidsgiverSykmelding']>, ParentType, ContextType>;
    behandler?: Resolver<ResolversTypes['Behandler'], ParentType, ContextType>;
    behandletTidspunkt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    behandlingsutfall?: Resolver<ResolversTypes['Behandlingsutfall'], ParentType, ContextType>;
    egenmeldt?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    harRedusertArbeidsgiverperiode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    kontaktMedPasient?: Resolver<ResolversTypes['KontaktMedPasient'], ParentType, ContextType>;
    legekontorOrgnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    medisinskVurdering?: Resolver<Maybe<ResolversTypes['MedisinskVurdering']>, ParentType, ContextType>;
    meldingTilArbeidsgiver?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    meldingTilNAV?: Resolver<Maybe<ResolversTypes['MeldingTilNAV']>, ParentType, ContextType>;
    merknader?: Resolver<Maybe<Array<ResolversTypes['Merknad']>>, ParentType, ContextType>;
    mottattTidspunkt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    navnFastlege?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    papirsykmelding?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    pasient?: Resolver<Maybe<ResolversTypes['Pasient']>, ParentType, ContextType>;
    prognose?: Resolver<Maybe<ResolversTypes['Prognose']>, ParentType, ContextType>;
    skjermesForPasient?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    syketilfelleStartDato?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    sykmeldingStatus?: Resolver<ResolversTypes['SykmeldingStatus'], ParentType, ContextType>;
    sykmeldingsperioder?: Resolver<Array<ResolversTypes['Periode']>, ParentType, ContextType>;
    tiltakArbeidsplassen?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    tiltakNAV?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    utdypendeOpplysninger?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SykmeldingStatusResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['SykmeldingStatus'] = ResolversParentTypes['SykmeldingStatus'],
> = ResolversObject<{
    arbeidsgiver?: Resolver<Maybe<ResolversTypes['ArbeidsgiverStatus']>, ParentType, ContextType>;
    sporsmalOgSvarListe?: Resolver<Array<ResolversTypes['Sporsmal']>, ParentType, ContextType>;
    statusEvent?: Resolver<ResolversTypes['StatusEvent'], ParentType, ContextType>;
    timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UtdypendeOpplysningResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['UtdypendeOpplysning'] = ResolversParentTypes['UtdypendeOpplysning'],
> = ResolversObject<{
    restriksjoner?: Resolver<Array<ResolversTypes['SvarRestriksjon']>, ParentType, ContextType>;
    sporsmal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    svar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UtenforVentetidResolvers<
    ContextType = RequestContext,
    ParentType extends ResolversParentTypes['UtenforVentetid'] = ResolversParentTypes['UtenforVentetid'],
> = ResolversObject<{
    erUtenforVentetid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    oppfolgingsdato?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = RequestContext> = ResolversObject<{
    Adresse?: AdresseResolvers<ContextType>;
    AktivitetIkkeMuligPeriode?: AktivitetIkkeMuligPeriodeResolvers<ContextType>;
    AnnenFraversArsak?: AnnenFraversArsakResolvers<ContextType>;
    Arbeidsgiver?: ArbeidsgiverResolvers<ContextType>;
    ArbeidsgiverStatus?: ArbeidsgiverStatusResolvers<ContextType>;
    ArbeidsgiverSykmelding?: ArbeidsgiverSykmeldingResolvers<ContextType>;
    ArbeidsrelatertArsak?: ArbeidsrelatertArsakResolvers<ContextType>;
    Behandler?: BehandlerResolvers<ContextType>;
    Behandlingsutfall?: BehandlingsutfallResolvers<ContextType>;
    Brukerinformasjon?: BrukerinformasjonResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    Diagnose?: DiagnoseResolvers<ContextType>;
    ErIArbeid?: ErIArbeidResolvers<ContextType>;
    ErIkkeIArbeid?: ErIkkeIArbeidResolvers<ContextType>;
    GradertPeriode?: GradertPeriodeResolvers<ContextType>;
    JSON?: GraphQLScalarType;
    KontaktMedPasient?: KontaktMedPasientResolvers<ContextType>;
    MedisinskArsak?: MedisinskArsakResolvers<ContextType>;
    MedisinskVurdering?: MedisinskVurderingResolvers<ContextType>;
    MeldingTilNAV?: MeldingTilNavResolvers<ContextType>;
    Merknad?: MerknadResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    NaermesteLeder?: NaermesteLederResolvers<ContextType>;
    Pasient?: PasientResolvers<ContextType>;
    Periode?: PeriodeResolvers<ContextType>;
    Prognose?: PrognoseResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    RegelInfo?: RegelInfoResolvers<ContextType>;
    Sporsmal?: SporsmalResolvers<ContextType>;
    Svar?: SvarResolvers<ContextType>;
    Sykmelding?: SykmeldingResolvers<ContextType>;
    SykmeldingStatus?: SykmeldingStatusResolvers<ContextType>;
    UtdypendeOpplysning?: UtdypendeOpplysningResolvers<ContextType>;
    UtenforVentetid?: UtenforVentetidResolvers<ContextType>;
}>;
