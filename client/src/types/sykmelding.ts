// Class for objects that need parsing (e.g. dates and enums)
// Interface for all other objects.
// Type for string literals.
// Enum for string literals with corresponding value.

// ------ BEHANDLIGGSUTFALL

type RegelStatus = 'OK' | 'MANUAL_PROCESSING' | 'INVALID';

interface RegelInfo {
    messageForSender: string;
    messageForUser: string;
    ruleName: string;
    ruleStatus?: RegelStatus;
}

interface Behandlingsutfall {
    status: RegelStatus;
    ruleHits: RegelInfo[];
}

// ------

interface Arbeidsgiver {
    navn: string;
    stillingsprosent: number;
}

// ------ PERIODER

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND = 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING = 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET = 'Annet',
}

class MedisinskArsak {
    beskrivelse: string;
    arsak: MedisinskArsakType[];

    constructor(medisinskArsak: any) {
        this.beskrivelse = medisinskArsak.beskrivelse;
        this.arsak = medisinskArsak.arsak.map(
            (arsak: string) => MedisinskArsakType[arsak as keyof typeof MedisinskArsakType],
        );
    }
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'Manglende tilrettelegging på arbeidsplassen',
    ANNET = 'Annet',
}

class ArbeidsrelatertArsak {
    beskrivelse: string;
    arsak: ArbeidsrelatertArsakType[];

    constructor(arbeidsrelatertArsak: any) {
        this.beskrivelse = arbeidsrelatertArsak.beskrivelse;
        this.arsak = arbeidsrelatertArsak.arsak.map(
            (arsak: string) => ArbeidsrelatertArsakType[arsak as keyof typeof ArbeidsrelatertArsakType],
        );
    }
}

class AktivitetIkkeMulig {
    medisinskArsak: MedisinskArsak;
    arbeidsrelatertArsak: ArbeidsrelatertArsak;

    constructor(aktivitetIkkeMulig: any) {
        this.medisinskArsak = new MedisinskArsak(aktivitetIkkeMulig.medisinskArsak);
        this.arbeidsrelatertArsak = new ArbeidsrelatertArsak(aktivitetIkkeMulig.arbeidsrelatertArsak);
    }
}

interface Gradert {
    grad: number;
    reisetilskudd: boolean;
}

type Periodetype = 'AKTIVITET_IKKE_MULIG' | 'AVVENTENDE' | 'BEHANDLINGSDAGER' | 'GRADERT' | 'REISETILSKUDD';

class Periode {
    fom: Date;
    tom: Date;
    aktivitetIkkeMulig?: AktivitetIkkeMulig;
    gradert?: Gradert;
    behandlingsdager?: number;
    innspillTilArbeidsgiver?: string;
    type: Periodetype;

    constructor(periode: any) {
        this.fom = periode.fom;
        this.tom = periode.tom;
        this.aktivitetIkkeMulig = periode.aktivitetIkkeMulig
            ? new AktivitetIkkeMulig(periode.aktivitetIkkeMulig)
            : undefined;
        this.gradert = periode.gradert;
        this.innspillTilArbeidsgiver = periode.innspillTilArbeidsgiver;
        this.type = periode.type;
    }
}

// ------ STATUS

type StatusEvent = 'SENDT' | 'APEN' | 'AVBRUTT' | 'UTGATT' | 'BEKREFTET ';

interface ArbeidsgiverStatus {
    orgnummer: string;
    juridiskOrgnummer?: string;
    orgNavn: string;
}

type SvarType = 'ARBEIDSSITUASJON' | 'PERIODER' | 'JA_NEI ';

interface Svar {
    svar: string;
    svarType: SvarType;
}

type SporsmalShortName = 'ARBEIDSSITUASJON' | 'NY_NARMESTE_LEDER' | 'FRAVAER' | 'PERIODE' | 'FORSIKRING';

interface SporsmalOgSvar {
    tekst?: string;
    svar?: Svar;
    shortName?: SporsmalShortName;
}

class SykmeldingStatus {
    timestamp: Date;
    statusEvent: StatusEvent;
    arbeidsgiver?: ArbeidsgiverStatus;
    sporsmalOgSvarListe?: SporsmalOgSvar[];

    constructor(sykmeldingStatus: any) {
        this.timestamp = new Date(sykmeldingStatus.timestamp);
        this.statusEvent = sykmeldingStatus.statusEvent;
        this.arbeidsgiver = sykmeldingStatus.arbeidsgiver;
        this.sporsmalOgSvarListe = sykmeldingStatus.sporsmalOgSvarListe;
    }
}

// ------ MEDISINSK_VURDERING

interface Diagnose {
    kode: string;
    system: string;
    tekst: string;
}

export enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON = 'Når vedkommende er innlagt i en godkjent helseinstitusjon',
    BEHANDLING_FORHINDRER_ARBEID = 'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
    ARBEIDSRETTET_TILTAK = 'Når vedkommende deltar på et arbeidsrettet tiltak',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = 'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott',
    NODVENDIG_KONTROLLUNDENRSOKELSE = 'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
    SMITTEFARE = 'Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
    ABORT = 'Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd',
    UFOR_GRUNNET_BARNLOSHET = 'Når vedkommende er arbeidsufør som følge av behandling for barnløshet',
    DONOR = 'Når vedkommende er donor eller er under vurdering som donor',
    BEHANDLING_STERILISERING = 'Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering',
}

export class AnnenFraversArsak {
    beskrivelse?: string;
    grunn?: AnnenFraverGrunn[];

    constructor(annenFraversArsak: any) {
        this.beskrivelse = annenFraversArsak.beskrivelse;
        this.grunn = annenFraversArsak.grunn.map(
            (grunn: string) => AnnenFraverGrunn[grunn as keyof typeof AnnenFraverGrunn],
        );
    }
}

class MedisinskVurdering {
    hovedDiagnose?: Diagnose;
    biDiagnoser: Diagnose[];
    svangerskap?: boolean;
    yrkesskade?: boolean;
    yrkesskadeDato?: Date;
    annenFraversArsak?: AnnenFraversArsak;

    constructor(medisinskVurdering: any) {
        this.hovedDiagnose = medisinskVurdering.hovedDiagnose;
        this.biDiagnoser = medisinskVurdering.biDiagnoser;
        this.svangerskap = medisinskVurdering.svangerskap;
        this.yrkesskade = medisinskVurdering.yrkesskade;
        this.yrkesskadeDato = new Date(medisinskVurdering.yrkesskadeDato);
        this.annenFraversArsak = medisinskVurdering.annenFraversArsak;
    }
}

// ------ PROGNOSE

class ErIArbeid {
    egetArbeidPaSikt: boolean;
    annetArbeidPaSikt: boolean;
    arbeidFOM?: Date;
    vurderingsdato?: Date;

    constructor(erIArbeid: any) {
        this.egetArbeidPaSikt = erIArbeid.egetArbeidPaSikt;
        this.annetArbeidPaSikt = erIArbeid.annetArbeidPaSikt;
        this.arbeidFOM = erIArbeid.arbeidFOM ? new Date(erIArbeid.arbeidFOM) : undefined;
        this.vurderingsdato = erIArbeid.vurderingsdato ? new Date(erIArbeid.vurderingsdato) : undefined;
    }
}

class ErIkkeIArbeid {
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date;
    vurderingsdato?: Date;

    constructor(erIkkeIArbeid: any) {
        this.arbeidsforPaSikt = erIkkeIArbeid.arbeidsforPaSikt;
        this.arbeidsforFOM = erIkkeIArbeid.arbeidsforFOM ? new Date(erIkkeIArbeid.arbeidsforFOM) : undefined;
        this.vurderingsdato = erIkkeIArbeid.vurderingsdato ? new Date(erIkkeIArbeid.vurderingsdato) : undefined;
    }
}

class Prognose {
    arbeidsforEtterPeriode: boolean;
    hensynArbeidsplassen?: string;
    erIArbeid?: ErIArbeid;
    erIkkeIArbeid?: ErIkkeIArbeid;

    constructor(prognose: any) {
        this.arbeidsforEtterPeriode = prognose.arbeidsforEtterPeriode;
        this.hensynArbeidsplassen = prognose.hensynArbeidsplassen;
        this.erIArbeid = prognose.erIArbeid ? new ErIArbeid(prognose.erIArbeid) : undefined;
        this.erIkkeIArbeid = prognose.erIkkeIArbeid ? new ErIkkeIArbeid(prognose.erIkkeIArbeid) : undefined;
    }
}

// ------ UTDYPENDE_OPPLYSNINGER

type Restriksjoner = 'SKJERMET_FOR_ARBEIDSGIVER' | 'SKJERMET_FOR_NAV';

interface UtdypendeOpplysning {
    sporsmal: string;
    svar: string;
    restriksjoner: Restriksjoner[];
}

// ------ MELDING_TIL_NAV

interface MeldingTilNAV {
    bistandUmiddelbart: boolean;
    beskrivBistand?: string;
}

// ------ KONTAKT_MED_PASIENT

export class KontaktMedPasient {
    kontaktDato?: Date;
    begrunnelseIkkeKontakt?: string;

    constructor(kontaktMedPasient: any) {
        this.kontaktDato = kontaktMedPasient.kontaktDato ? new Date(kontaktMedPasient.kontaktDato) : undefined;
        this.begrunnelseIkkeKontakt = kontaktMedPasient.begrunnelseIkkeKontakt;
    }
}

// ------- BEHANDLER

interface Adresse {
    gate?: string;
    postnummer?: number;
    kommune?: string;
    postboks?: string;
    land?: string;
}

interface Behandler {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    aktoerId: string;
    fnr: string;
    hpr?: string;
    her?: string;
    adresse: Adresse;
    tlf?: string;
}

export class Sykmelding {
    id: string;
    mottattTidspunkt: Date;
    behandlingsutfall: Behandlingsutfall;
    legekontorOrgnummer?: string;
    arbeidsgiver?: Arbeidsgiver;
    sykmeldingsperioder: Periode[];
    sykmeldingStatus: SykmeldingStatus;
    medisinskVurdering?: MedisinskVurdering;
    skjermesForPasient: boolean;
    prognose?: Prognose;
    utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>>;
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
    andreTiltak?: string;
    meldingTilNAV?: MeldingTilNAV;
    meldingTilArbeidsgiver?: string;
    kontaktMedPasient: KontaktMedPasient;
    behandletTidspunkt: Date;
    behandler: Behandler;
    syketilfelleStartDato: Date;
    navnFastlege: string;
    egenmeldt: boolean;
    papirsykmelding: boolean;
    harRedusertArbeidsgiverperiode: boolean;

    private setUtdypendeOpplysninger(utdypendeOpplysninger: any) {
        Object.keys(utdypendeOpplysninger).forEach((outerKey) => {
            const opplysning = new Map<string, UtdypendeOpplysning>();
            Object.keys(utdypendeOpplysninger[outerKey]).forEach((innerKey) => {
                opplysning.set(innerKey, utdypendeOpplysninger[outerKey][innerKey]);
            });
            this.utdypendeOpplysninger.set(outerKey, opplysning);
        });
    }

    constructor(sykmelding: any) {
        this.id = sykmelding.id;
        this.mottattTidspunkt = new Date(sykmelding.mottattTidspunkt);
        this.behandlingsutfall = sykmelding.behandlingsutfall;
        this.legekontorOrgnummer = sykmelding.legekontorOrgnummer;
        this.arbeidsgiver = sykmelding.arbeidsgiver;
        this.sykmeldingsperioder = sykmelding.sykmeldingsperioder.map((periode: any) => new Periode(periode));
        this.sykmeldingStatus = sykmelding.sykmeldingStatus;
        this.medisinskVurdering = sykmelding.medisinskVurdering
            ? new MedisinskVurdering(sykmelding.medisinskVurdering)
            : undefined;
        this.skjermesForPasient = sykmelding.skjermesForPasient;
        this.prognose = sykmelding.prognose ? new Prognose(sykmelding.prognose) : undefined;
        this.utdypendeOpplysninger = new Map<string, Map<string, UtdypendeOpplysning>>();
        this.setUtdypendeOpplysninger(sykmelding.utdypendeOpplysninger);
        this.tiltakArbeidsplassen = sykmelding.tiltakArbeidsplassen;
        this.tiltakNAV = sykmelding.tiltakNAV;
        this.andreTiltak = sykmelding.andreTiltak;
        this.meldingTilNAV = sykmelding.meldingTilNAV;
        this.meldingTilArbeidsgiver = sykmelding.meldingTilArbeidsgiver;
        this.kontaktMedPasient = new KontaktMedPasient(sykmelding.kontaktMedPasient);
        this.behandletTidspunkt = new Date(sykmelding.behandletTidspunkt);
        this.behandler = sykmelding.behandler;
        this.syketilfelleStartDato = new Date(sykmelding.syketilfelleStartDato);
        this.navnFastlege = sykmelding.navnFastlege;
        this.egenmeldt = sykmelding.egenmeldt;
        this.papirsykmelding = sykmelding.papirsykmelding;
        this.harRedusertArbeidsgiverperiode = sykmelding.harRedusertArbeidsgiverperiode;
    }
}
