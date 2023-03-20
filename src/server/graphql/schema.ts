import { makeExecutableSchema } from '@graphql-tools/schema'

import { isLocalOrDemo } from '../../utils/env'

import resolvers from './resolvers'
import mockResolvers from './mockResolvers'

const schema = makeExecutableSchema({
    typeDefs: `
        type Query {
            sykmeldinger: [Sykmelding!]!
            sykmelding(id: ID!): Sykmelding!
            brukerinformasjon: Brukerinformasjon!
            sykmeldingUtenforVentetid(id: ID!): UtenforVentetid!
        }
        
        type Mutation {
            changeSykmeldingStatus(sykmeldingId: ID!, status: SykmeldingChangeStatus!): Sykmelding!
            sendSykmelding(sykmeldingId: ID!, values: SendSykmeldingValues!): Sykmelding!
            updateEgenmeldingsdager(sykmeldingId: ID!, egenmeldingsdager: [Date!]!): Sykmelding!
        }

type Sykmelding {
    id: String!
    mottattTidspunkt: Date!
    behandlingsutfall: Behandlingsutfall!
    arbeidsgiver: ArbeidsgiverSykmelding
    sykmeldingsperioder: [Periode!]!
    sykmeldingStatus: SykmeldingStatus!
    medisinskVurdering: MedisinskVurdering
    prognose: Prognose
    utdypendeOpplysninger: JSON!
    tiltakArbeidsplassen: String
    tiltakNAV: String
    andreTiltak: String
    meldingTilNAV: MeldingTilNAV
    meldingTilArbeidsgiver: String
    kontaktMedPasient: KontaktMedPasient!
    behandletTidspunkt: Date!
    behandler: Behandler!
    egenmeldt: Boolean
    papirsykmelding: Boolean
    merknader: [Merknad!]
    pasient: Pasient
    rulesetVersion: Int!
    utenlandskSykmelding: UtenlandskSykmelding
}

type ArbeidsgiverSykmelding {
    navn: String
}

type MeldingTilNAV {
    bistandUmiddelbart: Boolean!
    beskrivBistand: String
}

type KontaktMedPasient {
    kontaktDato: Date
    begrunnelseIkkeKontakt: String
}

type Adresse {
    gate: String
    postnummer: Int
    kommune: String
    postboks: String
    land: String
}

type Behandler {
    fornavn: String!
    mellomnavn: String
    etternavn: String!
    adresse: Adresse
    tlf: String
}

type Merknad {
    type: String!
    beskrivelse: String
}

type Pasient {
    fnr: String
    fornavn: String
    mellomnavn: String
    etternavn: String
}

enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER
    SKJERMET_FOR_NAV
}

type UtdypendeOpplysning {
    sporsmal: String
    svar: String!
    restriksjoner: [SvarRestriksjon!]!
}

type UtenlandskSykmelding {
    land: String!
}

enum ShortName {
    ARBEIDSSITUASJON
    NY_NARMESTE_LEDER
    FRAVAER
    PERIODE
    FORSIKRING
    EGENMELDINGSDAGER
}

enum Svartype {
    ARBEIDSSITUASJON
    PERIODER
    JA_NEI
    DAGER
}

enum StatusEvent {
    SENDT
    APEN
    AVBRUTT
    UTGATT
    BEKREFTET
}

type ArbeidsgiverStatus {
    orgnummer: String!
    orgNavn: String!
}

type JaNeiSvar {
    svarType: Svartype!
    svar: YesOrNo!
}

type ArbeidssituasjonSvar {
    svarType: Svartype!
    svar: ArbeidssituasjonType!
}

type DagerSvar {
    svarType: Svartype!
    svar: [Date!]!
}

type PerioderSvar {
    svarType: Svartype!
    svar: [FomTom!]!
}

union SvarTypeUnion = JaNeiSvar | ArbeidssituasjonSvar | DagerSvar | PerioderSvar

type Sporsmal {
    tekst: String!
    shortName: ShortName!
    svar: SvarTypeUnion!
}

type SykmeldingStatus {
    statusEvent: StatusEvent!
    timestamp: Date!
    arbeidsgiver: ArbeidsgiverStatus
    sporsmalOgSvarListe: [Sporsmal!]!
}

type FomTom {
    fom: Date!
    tom: Date!
}

input SendSykmeldingValues {
    erOpplysningeneRiktige: YesOrNo
    uriktigeOpplysninger: [UriktigeOpplysningerType!]
    arbeidssituasjon: ArbeidssituasjonType
    arbeidsgiverOrgnummer: String
    riktigNarmesteLeder: YesOrNo
    harBruktEgenmelding: YesOrNo
    egenmeldingsperioder: [DateRange!]
    harForsikring: YesOrNo
    egenmeldingsdager: [Date!]
    harEgenmeldingsdager: YesOrNo
}

input DateRange {
    fom: Date
    tom: Date
}

enum YesOrNo {
    YES
    NO
}

enum UriktigeOpplysningerType {
    PERIODE
    SYKMELDINGSGRAD_FOR_LAV
    SYKMELDINGSGRAD_FOR_HOY
    ARBEIDSGIVER
    DIAGNOSE
    ANDRE_OPPLYSNINGER
}

enum ArbeidssituasjonType {
    ARBEIDSTAKER
    FRILANSER
    NAERINGSDRIVENDE
    ARBEIDSLEDIG
    PERMITTERT
    ANNET
}

type ErIArbeid {
    egetArbeidPaSikt: Boolean!
    annetArbeidPaSikt: Boolean!
    arbeidFOM: Date
    vurderingsdato: Date
}

type ErIkkeIArbeid {
    arbeidsforPaSikt: Boolean!
    arbeidsforFOM: Date
    vurderingsdato: Date
}

type Prognose {
    arbeidsforEtterPeriode: Boolean!
    hensynArbeidsplassen: String
    erIArbeid: ErIArbeid
    erIkkeIArbeid: ErIkkeIArbeid
}

enum Periodetype {
    AKTIVITET_IKKE_MULIG
    AVVENTENDE
    BEHANDLINGSDAGER
    GRADERT
    REISETILSKUDD
}

enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET
    AKTIVITET_FORVERRER_TILSTAND
    AKTIVITET_FORHINDRER_BEDRING
    ANNET
}

enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING
    ANNET
}

type GradertPeriode {
    grad: Int!
    reisetilskudd: Boolean!
}

type MedisinskArsak {
    beskrivelse: String
    arsak: [MedisinskArsakType!]!
}

type ArbeidsrelatertArsak {
    beskrivelse: String
    arsak: [ArbeidsrelatertArsakType!]!
}

type AktivitetIkkeMuligPeriode {
    medisinskArsak: MedisinskArsak
    arbeidsrelatertArsak: ArbeidsrelatertArsak
}

type Periode {
    fom: Date!
    tom: Date!
    gradert: GradertPeriode
    behandlingsdager: Int
    innspillTilArbeidsgiver: String
    type: Periodetype!
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriode
    reisetilskudd: Boolean!
}

enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON
    BEHANDLING_FORHINDRER_ARBEID
    ARBEIDSRETTET_TILTAK
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND
    NODVENDIG_KONTROLLUNDENRSOKELSE
    SMITTEFARE
    ABORT
    UFOR_GRUNNET_BARNLOSHET
    DONOR
    BEHANDLING_STERILISERING
}

type Diagnose {
    kode: String!
    system: String!
    tekst: String
}

type AnnenFraversArsak {
    beskrivelse: String
    grunn: [AnnenFraverGrunn!]!
}

type MedisinskVurdering {
    hovedDiagnose: Diagnose
    biDiagnoser: [Diagnose!]!
    annenFraversArsak: AnnenFraversArsak
    svangerskap: Boolean!
    yrkesskade: Boolean!
    yrkesskadeDato: Date
}

scalar Date
scalar DateTime
scalar JSON

type Brukerinformasjon {
    strengtFortroligAdresse: Boolean!
    arbeidsgivere: [Arbeidsgiver!]!
}

type Arbeidsgiver {
    orgnummer: String!
    navn: String!
    aktivtArbeidsforhold: Boolean!
    naermesteLeder: NaermesteLeder
}

type NaermesteLeder {
    navn: String!
}

type UtenforVentetid {
    erUtenforVentetid: Boolean!
    oppfolgingsdato: Date
}

enum RegelStatus {
    OK
    MANUAL_PROCESSING
    INVALID
}

type RegelInfo {
    messageForSender: String!
    messageForUser: String!
    ruleName: String!
    ruleStatus: RegelStatus!
}

type Behandlingsutfall {
    status: RegelStatus!
    ruleHits: [RegelInfo!]!
}


enum SykmeldingChangeStatus {
    AVBRYT
    BEKREFT_AVVIST
}



    `,
    resolvers: isLocalOrDemo ? mockResolvers : resolvers,
})

export default schema
