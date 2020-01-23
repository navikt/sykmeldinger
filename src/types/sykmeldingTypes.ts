import dayjs from 'dayjs';

export enum StatusTyper {
    NY = 'ny',
    AVVIST = 'avvist',
    AVBRUTT = 'avbrutt',
    SENDT = 'sendt',
    BEKREFTET = 'bekreftet',
}

export class Status {
    status: StatusTyper;
    dato?: Date;
    datoBekreftet?: Date;
    sykmeldtFra?: string;
    arbeidsgiver?: string;
    organisasjonsnummer?: string;

    constructor(data: any) {
        this.status = data.status;
        this.dato = data.dato;
        this.datoBekreftet = data.datoBekreftet;
        this.sykmeldtFra = data.sykmeldtFra;
        this.arbeidsgiver = data.arbeidsgiver;
        this.organisasjonsnummer = data.organisasjonsnummer;
    }
}

export class MedisinskVurdering {
    hovedDiagnose?: Diagnose;
    biDiagnoser: Diagnose[];
    svangerskap: boolean;
    yrkesskade: boolean;
    yrkesskadeDato?: Date;
    annenFraversArsak?: AnnenFraversArsak;
    constructor(medisinskVurdering: any) {
        this.hovedDiagnose = medisinskVurdering.hovedDiagnose
            ? new Diagnose(medisinskVurdering.hovedDiagnose)
            : undefined;
        this.biDiagnoser = medisinskVurdering.biDiagnoser.map((biDiagnose: any) => new Diagnose(biDiagnose));
        this.svangerskap = medisinskVurdering.svangerskap;
        this.yrkesskade = medisinskVurdering.yrkesskade;
        this.yrkesskadeDato = medisinskVurdering.yrkesskadeDato
            ? dayjs(medisinskVurdering.yrkesskadeDato).toDate()
            : undefined;
        this.annenFraversArsak = medisinskVurdering.annenFraversArsak
            ? new AnnenFraversArsak(medisinskVurdering.annenFraversArsak)
            : undefined;
    }
}

export class Diagnose {
    system: string;
    kode: string;
    tekst: string;
    constructor(diagnose: any) {
        this.system = diagnose.system;
        this.kode = diagnose.kode;
        this.tekst = diagnose.tekst;
    }
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
    grunn: AnnenFraverGrunn[];
    constructor(annenFraversArsak: any) {
        this.beskrivelse = annenFraversArsak.beskrivelse ? annenFraversArsak.beskrivelse : null;
        this.grunn = annenFraversArsak.grunn.map(
            (grunn: any) => AnnenFraverGrunn[grunn as keyof typeof AnnenFraverGrunn],
        );
    }
}

export enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE = 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER = 'Ingen arbeidsgiver',
}

export class Arbeidsgiver {
    harArbeidsgiver: HarArbeidsgiver;
    navn?: string;
    yrkesbetegnelse?: string;
    stillingsprosent?: number;
    constructor(arbeidsgiver: any) {
        const harArbeidsgiver = arbeidsgiver.harArbeidsgiver as keyof typeof HarArbeidsgiver;
        this.harArbeidsgiver = HarArbeidsgiver[harArbeidsgiver];
        this.navn = arbeidsgiver.navn ? arbeidsgiver.navn : null;
        this.yrkesbetegnelse = arbeidsgiver.yrkesbetegnelse ? arbeidsgiver.yrkesbetegnelse : null;
        this.stillingsprosent = arbeidsgiver.stillingsprosent ? arbeidsgiver.stillingsprosent : null;
    }
}

export class Periode {
    fom: Date;
    tom: Date;
    aktivitetIkkeMulig?: AktivitetIkkeMulig;
    avventendeInnspillTilArbeidsgiver?: string;
    behandlingsdager?: number;
    gradert?: Gradert;
    reisetilskudd: boolean;
    constructor(periode: any) {
        this.fom = dayjs(periode.fom).toDate();
        this.tom = dayjs(periode.tom).toDate();
        this.aktivitetIkkeMulig = periode.aktivitetIkkeMulig
            ? new AktivitetIkkeMulig(periode.aktivitetIkkeMulig)
            : undefined;
        this.avventendeInnspillTilArbeidsgiver = periode.avventendeInnspillTilArbeidsgiver
            ? periode.avventendeInnspillTilArbeidsgiver
            : null;
        this.behandlingsdager = periode.behandlingsdager ? periode.behandlingsdager : null;
        this.gradert = periode.gradert ? new Gradert(periode.gradert) : undefined;
        this.reisetilskudd = periode.reisetilskudd;
    }
}

class AktivitetIkkeMulig {
    medisinskArsak?: MedisinskArsak;
    arbeidsrelatertArsak?: ArbeidsrelatertArsak;
    constructor(aktivitetIkkeMulig: any) {
        this.medisinskArsak = aktivitetIkkeMulig.medisinskArsak
            ? new MedisinskArsak(aktivitetIkkeMulig.medisinskArsak)
            : undefined;
        this.arbeidsrelatertArsak = aktivitetIkkeMulig.arbeidsrelatertArsak
            ? aktivitetIkkeMulig.arbeidsrelatertArsak
            : null;
    }
}

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND = 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING = 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET = 'Annet',
}

class MedisinskArsak {
    beskrivelse?: string;
    arsak: MedisinskArsakType[];
    constructor(medisinskArsak: any) {
        this.beskrivelse = medisinskArsak.beskrivelse ? medisinskArsak.beskrivelse : null;
        const arsakTemp = medisinskArsak.arsak.map(
            (arsak: any) => MedisinskArsakType[arsak as keyof typeof MedisinskArsakType],
        );
        this.arsak = arsakTemp;
    }
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'Manglende tilrettelegging på arbeidsplassen',
    ANNET = 'Annet',
}

class ArbeidsrelatertArsak {
    beskrivelse?: string;
    arsak: ArbeidsrelatertArsakType[];
    constructor(arbeidsrelatertArsak: any) {
        this.beskrivelse = arbeidsrelatertArsak.beskrivelse ? arbeidsrelatertArsak.beskrivelse : null;
        const arsakTemp = arbeidsrelatertArsak.arsak.map(
            (arsak: any) => ArbeidsrelatertArsakType[arsak as keyof typeof ArbeidsrelatertArsakType],
        );
        this.arsak = arsakTemp;
    }
}

class Gradert {
    reisetilskudd: boolean;
    grad?: number;
    constructor(gradert: any) {
        this.reisetilskudd = gradert.reisetilskudd;
        this.grad = gradert.grad;
    }
}

export class Prognose {
    arbeidsforEtterPeriode: boolean;
    hensynArbeidsplassen?: string;
    erIArbeid?: ErIArbeid;
    erIkkeIArbeid?: ErIkkeIArbeid;
    constructor(prognose: any) {
        this.arbeidsforEtterPeriode = prognose.arbeidsforEtterPeriode;
        this.hensynArbeidsplassen = prognose.hensynArbeidsplassen ? prognose.hensynArbeidsplassen : null;
        this.erIArbeid = prognose.erIArbeid ? new ErIArbeid(prognose.erIArbeid) : undefined;
        this.erIkkeIArbeid = prognose.erIkkeIArbeid ? new ErIkkeIArbeid(prognose.erIkkeIArbeid) : undefined;
    }
}

export class ErIArbeid {
    egetArbeidPaSikt: boolean;
    annetArbeidPaSikt: boolean;
    arbeidFOM?: Date;
    vurderingsdato?: Date;
    constructor(erIArbeid: any) {
        this.egetArbeidPaSikt = erIArbeid.egetArbeidPaSikt;
        this.annetArbeidPaSikt = erIArbeid.annetArbeidPaSikt;
        this.arbeidFOM = erIArbeid.arbeidFOM ? dayjs(erIArbeid.arbeidFOM).toDate() : undefined;
        this.vurderingsdato = erIArbeid.vurderingsdato ? dayjs(erIArbeid.vurderingsdato).toDate() : undefined;
    }
}

export class ErIkkeIArbeid {
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date;
    vurderingsdato?: Date;
    constructor(erIkkeIArbeid: any) {
        this.arbeidsforPaSikt = erIkkeIArbeid.arbeidsforPaSikt;
        this.arbeidsforFOM = erIkkeIArbeid.arbeidsforFOM ? dayjs(erIkkeIArbeid.arbeidsforFOM).toDate() : undefined;
        this.vurderingsdato = erIkkeIArbeid.vurderingsdato ? dayjs(erIkkeIArbeid.vurderingsdato).toDate() : undefined;
    }
}

export class MeldingTilNAV {
    bistandUmiddelbart: boolean;
    beskrivBistand?: string;
    constructor(meldingTilNAV: any) {
        this.bistandUmiddelbart = meldingTilNAV.bistandUmiddelbart;
        this.beskrivBistand = meldingTilNAV.beskrivBistand ? meldingTilNAV.beskrivBistand : null;
    }
}

class KontaktMedPasient {
    kontaktDato?: Date;
    begrunnelseIkkeKontakt?: string;
    constructor(kontaktMedPasient: any) {
        this.kontaktDato = kontaktMedPasient.kontaktDato ? dayjs(kontaktMedPasient.kontaktDato).toDate() : undefined;
        this.begrunnelseIkkeKontakt = kontaktMedPasient.begrunnelseIkkeKontakt
            ? kontaktMedPasient.begrunnelseIkkeKontakt
            : null;
    }
}

export class Behandler {
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktoerId: string;
    fnr: string;
    hpr?: string;
    her?: string;
    adresse: Adresse;
    tlf?: string;
    constructor(behandler: any) {
        this.fornavn = behandler.fornavn;
        this.mellomnavn = behandler.mellomnavn ? behandler.mellomnavn : null;
        this.etternavn = behandler.etternavn;
        this.aktoerId = behandler.aktoerId;
        this.fnr = behandler.fnr;
        this.hpr = behandler.hpr ? behandler.hpr : null;
        this.her = behandler.her ? behandler.her : null;
        this.adresse = behandler.adresse;
        this.tlf = behandler.tlf ? behandler.tlf : null;
    }
}

class Adresse {
    gate?: string;
    postnummer?: number;
    kommune?: string;
    postboks?: string;
    land?: string;
    constructor(adresse: any) {
        this.gate = adresse.gate ? adresse.gate : null;
        this.postnummer = adresse.postnummer ? adresse.postnummer : null;
        this.kommune = adresse.kommune ? adresse.kommune : null;
        this.postboks = adresse.postboks ? adresse.postboks : null;
        this.land = adresse.land ? adresse.land : null;
    }
}

class AvsenderSystem {
    navn: string;
    versjon: string;
    constructor(avsenderSystem: any) {
        this.navn = avsenderSystem.navn;
        this.versjon = avsenderSystem.versjon;
    }
}

export enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER = 'Informasjonen skal ikke vises arbeidsgiver',
    SKJERMET_FOR_PASIENT = 'Informasjonen skal ikke vises pasient',
    SKJERMET_FOR_NAV = 'Informasjonen skal ikke vises NAV',
}

export class SporsmalSvar {
    sporsmal: string;
    svar: string;
    restriksjoner: SvarRestriksjon[];
    constructor(sporsmalSvar: any) {
        this.sporsmal = sporsmalSvar.sporsmal;
        this.svar = sporsmalSvar.svar;
        const restriksjonerTemp = sporsmalSvar.restriksjoner.map(
            (restriksjon: any) => SvarRestriksjon[restriksjon as keyof typeof SvarRestriksjon],
        );
        this.restriksjoner = restriksjonerTemp;
    }
}

export class Sykmelding {
    id: string;
    msgId: string;
    pasientAktoerId: string;
    medisinskVurdering: MedisinskVurdering;
    skjermesForPasient: boolean;
    arbeidsgiver: Arbeidsgiver;
    perioder: Periode[];
    prognose?: Prognose;
    utdypendeOpplysninger: Map<string, Map<string, SporsmalSvar>>;
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
    andreTiltak?: string;
    meldingTilNAV?: MeldingTilNAV;
    meldingTilArbeidsgiver?: string;
    kontaktMedPasient: KontaktMedPasient;
    behandletTidspunkt: Date;
    behandler: Behandler;
    avsenderSystem: AvsenderSystem;
    syketilfelleStartDato?: Date;
    signaturDato: Date;
    navnFastlege: string;

    constructor(sykmelding: any) {
        this.id = sykmelding.id;
        this.msgId = sykmelding.msgId;
        this.pasientAktoerId = sykmelding.pasientAktoerId;
        this.medisinskVurdering = new MedisinskVurdering(sykmelding.medisinskVurdering);
        this.skjermesForPasient = sykmelding.skjermesForPasient;
        this.arbeidsgiver = new Arbeidsgiver(sykmelding.arbeidsgiver);
        this.perioder = new Array<Periode>();
        sykmelding.perioder.forEach((periode: any) => {
            this.perioder.push(new Periode(periode));
        });
        this.prognose = sykmelding.prognose ? new Prognose(sykmelding.prognose) : undefined;
        this.utdypendeOpplysninger = new Map<string, Map<string, SporsmalSvar>>();
        Object.keys(sykmelding.utdypendeOpplysninger).forEach(key => {
            const opplysning = new Map<string, SporsmalSvar>();
            Object.keys(sykmelding.utdypendeOpplysninger[key]).forEach(key2 => {
                opplysning.set(key2, new SporsmalSvar(sykmelding.utdypendeOpplysninger[key][key2]));
            });
            this.utdypendeOpplysninger.set(key, opplysning);
        });
        this.tiltakArbeidsplassen = sykmelding.tiltakArbeidsplassen ? sykmelding.tiltakArbeidsplassen : null;
        this.tiltakNAV = sykmelding.tiltakNAV ? sykmelding.tiltakNAV : null;
        this.andreTiltak = sykmelding.andreTiltak ? sykmelding.andreTiltak : null;
        this.meldingTilNAV = sykmelding.meldingTilNAV ? new MeldingTilNAV(sykmelding.meldingTilNAV) : undefined;
        this.meldingTilArbeidsgiver = sykmelding.meldingTilArbeidsgiver ? sykmelding.meldingTilArbeidsgiver : null;
        this.kontaktMedPasient = new KontaktMedPasient(sykmelding.kontaktMedPasient);
        this.behandletTidspunkt = dayjs(sykmelding.behandletTidspunkt).toDate();
        this.behandler = new Behandler(sykmelding.behandler);
        this.avsenderSystem = new AvsenderSystem(sykmelding.avsenderSystem);
        this.syketilfelleStartDato = sykmelding.syketilfelleStartDato
            ? dayjs(sykmelding.syketilfelleStartDato).toDate()
            : undefined;
        this.signaturDato = dayjs(sykmelding.signaturDato).toDate();
        this.navnFastlege = sykmelding.navnFastlege;
    }
}

export class SykmeldingDTO {
    id: string;
    mottattTidspunkt: Date;
    bekreftetDato?: Date;
    behandlingsutfall: BehandlingsutfallDTO;
    legekontorOrgnummer?: string;
    legeNavn?: string;
    arbeidsgiver?: ArbeidsgiverDTO;
    sykmeldingsperioder: SykmeldingsperiodeDTO[];
    sykmeldingStatus?: SykmeldingStatusDTO; // todo: opprett statusklasse og gjør obligatorisk

    constructor(sykmeldingDTO: any) {
        this.id = sykmeldingDTO.id;
        this.mottattTidspunkt = sykmeldingDTO.mottattTidspunkt;
        this.bekreftetDato = sykmeldingDTO.bekreftetDato ? dayjs(sykmeldingDTO.bekreftetDato).toDate() : undefined;
        this.behandlingsutfall = new BehandlingsutfallDTO(sykmeldingDTO.behandlingsutfall);
        this.legekontorOrgnummer = sykmeldingDTO.legekontorOrgnummer ? sykmeldingDTO.legekontorOrgnummer : undefined;
        this.legeNavn = sykmeldingDTO.legeNavn ? sykmeldingDTO.legeNavn : undefined;
        this.arbeidsgiver = sykmeldingDTO.arbeidsgiver ? new ArbeidsgiverDTO(sykmeldingDTO.arbeidsgiver) : undefined;
        this.sykmeldingsperioder = sykmeldingDTO.sykmeldingsperioder.map(
            (periode: SykmeldingsperiodeDTO) => new SykmeldingsperiodeDTO(periode),
        );
    }
}

export class SkjermetSykmeldingDTO {
    id: string;
    mottattTidspunkt: Date;
    bekreftetDato?: Date;
    behandlingsutfall: BehandlingsutfallDTO;
    legekontorOrgnummer?: string;
    legeNavn?: string;
    arbeidsgiver?: ArbeidsgiverDTO;
    sykmeldingsperioder: SykmeldingsperiodeDTO[];
    sykmeldingStatus?: SykmeldingStatusDTO; // todo: opprett statusklasse og gjør obligatorisk

    constructor(skjermetSykmeldingDTO: any) {
        this.id = skjermetSykmeldingDTO.id;
        this.mottattTidspunkt = skjermetSykmeldingDTO.mottattTidspunkt;
        this.bekreftetDato = skjermetSykmeldingDTO.bekreftetDato
            ? dayjs(skjermetSykmeldingDTO.bekreftetDato).toDate()
            : undefined;
        this.behandlingsutfall = new BehandlingsutfallDTO(skjermetSykmeldingDTO.behandlingsutfall);
        this.legekontorOrgnummer = skjermetSykmeldingDTO.legekontorOrgnummer
            ? skjermetSykmeldingDTO.legekontorOrgnummer
            : undefined;
        this.legeNavn = skjermetSykmeldingDTO.legeNavn ? skjermetSykmeldingDTO.legeNavn : undefined;
        this.arbeidsgiver = skjermetSykmeldingDTO.arbeidsgiver
            ? new ArbeidsgiverDTO(skjermetSykmeldingDTO.arbeidsgiver)
            : undefined;
        this.sykmeldingsperioder = skjermetSykmeldingDTO.sykmeldingsperioder.map(
            (periode: SykmeldingsperiodeDTO) => new SykmeldingsperiodeDTO(periode),
        );
    }
}

export class FullstendigSykmeldingDTO {
    id: string;
    mottattTidspunkt: Date;
    bekreftetDato?: Date;
    behandlingsutfall: BehandlingsutfallDTO;
    legekontorOrgnummer?: string;
    legeNavn?: string;
    arbeidsgiver?: ArbeidsgiverDTO;
    sykmeldingsperioder: SykmeldingsperiodeDTO[];
    sykmeldingStatus?: SykmeldingStatusDTO; // todo: opprett statusklasse og gjør obligatorisk
    medisinskVurdering: MedisinskVurdering;

    constructor(fullstendigSykmeldingDTO: any) {
        this.id = fullstendigSykmeldingDTO.id;
        this.mottattTidspunkt = fullstendigSykmeldingDTO.mottattTidspunkt;
        this.bekreftetDato = fullstendigSykmeldingDTO.bekreftetDato
            ? dayjs(fullstendigSykmeldingDTO.bekreftetDato).toDate()
            : undefined;
        this.behandlingsutfall = new BehandlingsutfallDTO(fullstendigSykmeldingDTO.behandlingsutfall);
        this.legekontorOrgnummer = fullstendigSykmeldingDTO.legekontorOrgnummer
            ? fullstendigSykmeldingDTO.legekontorOrgnummer
            : undefined;
        this.legeNavn = fullstendigSykmeldingDTO.legeNavn ? fullstendigSykmeldingDTO.legeNavn : undefined;
        this.arbeidsgiver = fullstendigSykmeldingDTO.arbeidsgiver
            ? new ArbeidsgiverDTO(fullstendigSykmeldingDTO.arbeidsgiver)
            : undefined;
        this.sykmeldingsperioder = fullstendigSykmeldingDTO.sykmeldingsperioder.map(
            (periode: SykmeldingsperiodeDTO) => new SykmeldingsperiodeDTO(periode),
        );
        this.medisinskVurdering = new MedisinskVurdering(fullstendigSykmeldingDTO.medisinskVurdering);
    }
}
enum BehandlingsutfallStatusDTO {
    OK = 'OK',
    MANUAL_PROCESSING = 'MANUAL_PROCESSING',
    INVALID = 'INVALID',
}

class BehandlingsutfallDTO {
    ruleHits: RegelinfoDTO[];
    status: BehandlingsutfallStatusDTO;

    constructor(behandlingsutfallDTO: any) {
        this.ruleHits = behandlingsutfallDTO.ruleHits.map((regel: RegelinfoDTO) => new RegelinfoDTO(regel));
        this.status =
            BehandlingsutfallStatusDTO[behandlingsutfallDTO.status as keyof typeof BehandlingsutfallStatusDTO];
    }
}

class SykmeldingStatusDTO {}

class RegelinfoDTO {
    messageForSender: string;
    messageForUser: string;
    ruleName: string;
    ruleStatus?: BehandlingsutfallStatusDTO;

    constructor(regelinfoDTO: any) {
        this.messageForSender = regelinfoDTO.messageForSender;
        this.messageForUser = regelinfoDTO.messageForUser;
        this.ruleName = regelinfoDTO.ruleName;
        this.ruleStatus = regelinfoDTO.ruleStatus
            ? BehandlingsutfallStatusDTO[regelinfoDTO.status as keyof typeof BehandlingsutfallStatusDTO]
            : undefined;
    }
}

class ArbeidsgiverDTO {
    navn: string;
    stillingsprosent?: number;

    constructor(arbeidsgiverDTO: any) {
        this.navn = arbeidsgiverDTO.navn;
        this.stillingsprosent = arbeidsgiverDTO.stillingsprosent ? arbeidsgiverDTO.stillingsprosent : undefined;
    }
}

enum PeriodetypeDTO {
    AKTIVITET_IKKE_MULIG = 'AKTIVITET_IKKE_MULIG',
    AVVENTENDE = 'AVVENTENDE',
    BEHANDLINGSDAGER = 'BEHANDLINGSDAGER',
    GRADERT = 'GRADERT',
    REISETILSKUDD = 'REISETILSKUDD',
}

class SykmeldingsperiodeDTO {
    fom: Date;
    tom: Date;
    gradert?: GradertDTO;
    behandlingsdager?: number;
    innspillTilArbeidsgiver?: string;
    type: PeriodetypeDTO;

    constructor(sykmeldingsperiodeDTO: any) {
        this.fom = dayjs(sykmeldingsperiodeDTO.fom).toDate();
        this.tom = dayjs(sykmeldingsperiodeDTO.tom).toDate();
        this.gradert = sykmeldingsperiodeDTO.gradert ? new GradertDTO(sykmeldingsperiodeDTO.gradert) : undefined;
        this.behandlingsdager = sykmeldingsperiodeDTO.behandlingsdager
            ? sykmeldingsperiodeDTO.behandlingsdager
            : undefined;
        this.innspillTilArbeidsgiver = sykmeldingsperiodeDTO.innspillTilArbeidsgiver
            ? sykmeldingsperiodeDTO.innspillTilArbeidsgiver
            : undefined;
        this.type = PeriodetypeDTO[sykmeldingsperiodeDTO.type as keyof typeof PeriodetypeDTO];
    }
}

class GradertDTO {
    grad: number;
    reisetilskudd: boolean;

    constructor(gradertDTO: any) {
        this.grad = gradertDTO.grad;
        this.reisetilskudd = gradertDTO.reisetilskudd;
    }
}
