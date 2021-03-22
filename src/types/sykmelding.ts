import ObjectBase from './objectBase';
import ArbeidsgiverSykmelding from './sykmelding/ArbeidsgiverSykmelding';
import Behandler from './sykmelding/Behandler';
import Behandlingsutfall from './sykmelding/Behandlingsutfall';
import KontaktMedPasient from './sykmelding/KontaktMedPasient';
import MedisinskVurdering from './sykmelding/MedisinskVurdering';
import MeldingTilNAV from './sykmelding/MeldingTilNav';
import Merknad from './sykmelding/Merknad';
import Periode from './sykmelding/Periode';
import Prognose from './sykmelding/Prognose';
import SykmeldingStatus from './sykmelding/SykmeldingStatus';
import UtdypendeOpplysning from './sykmelding/UtdypendeOpplysninger';

export enum DiagnosekodeSystem {
    '2.16.578.1.12.4.1.1.7110' = 'ICD-10',
    '2.16.578.1.12.4.1.1.7170' = 'ICPC-2',
}

export class Sykmelding extends ObjectBase<Sykmelding> {
    id: string;
    mottattTidspunkt: Date;
    behandlingsutfall: Behandlingsutfall;
    legekontorOrgnummer?: string;
    arbeidsgiver?: ArbeidsgiverSykmelding;
    sykmeldingsperioder: Periode[];
    sykmeldingStatus: SykmeldingStatus;
    medisinskVurdering?: MedisinskVurdering;
    skjermesForPasient: boolean;
    prognose?: Prognose;
    utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>> = new Map();
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
    andreTiltak?: string;
    meldingTilNAV?: MeldingTilNAV;
    meldingTilArbeidsgiver?: string;
    kontaktMedPasient: KontaktMedPasient;
    behandletTidspunkt: Date;
    behandler: Behandler;
    syketilfelleStartDato?: Date;
    navnFastlege?: string;
    egenmeldt?: boolean;
    papirsykmelding?: boolean;
    harRedusertArbeidsgiverperiode?: boolean;
    merknader?: Merknad[];

    constructor(data: any) {
        super(data, 'Sykmelding');

        this.id = this.getRequiredString('id');
        this.mottattTidspunkt = this.getRequiredDate('mottattTidspunkt');
        this.behandlingsutfall = new Behandlingsutfall(data.behandlingsutfall);
        if (this.isDefined('legekontorOrgnummer')) {
            this.legekontorOrgnummer = this.getRequiredString('legekontorOrgnummer');
        }
        if (this.isDefined('arbeidsgiver')) {
            this.arbeidsgiver = new ArbeidsgiverSykmelding(data.arbeidsgiver);
        }
        this.sykmeldingsperioder = this.getRequiredArray('sykmeldingsperioder').map((periode) => new Periode(periode));
        this.sykmeldingStatus = new SykmeldingStatus(data.sykmeldingStatus);
        if (this.isDefined('medisinskVurdering')) {
            this.medisinskVurdering = new MedisinskVurdering(data.medisinskVurdering);
        }
        this.skjermesForPasient = this.getRequiredBoolean('skjermesForPasient');
        if (this.isDefined('prognose')) {
            this.prognose = new Prognose(data.prognose);
        }
        this.setUtdypendeOpplysninger();
        if (this.isDefined('tiltakArbeidsplassen')) {
            this.tiltakArbeidsplassen = this.getRequiredString('tiltakArbeidsplassen');
        }
        if (this.isDefined('tiltakNAV')) {
            this.tiltakNAV = this.getRequiredString('tiltakNAV');
        }
        if (this.isDefined('andreTiltak')) {
            this.andreTiltak = this.getRequiredString('andreTiltak');
        }
        if (this.isDefined('meldingTilNAV')) {
            this.meldingTilNAV = new MeldingTilNAV(data.meldingTilNAV);
        }
        if (this.isDefined('meldingTilArbeidsgiver')) {
            this.meldingTilArbeidsgiver = this.getRequiredString('meldingTilArbeidsgiver');
        }
        this.kontaktMedPasient = new KontaktMedPasient(data.kontaktMedPasient);
        this.behandletTidspunkt = this.getRequiredDate('behandletTidspunkt');
        this.behandler = new Behandler(data.behandler);
        if (this.isDefined('syketilfelleStartDato')) {
            this.syketilfelleStartDato = this.getRequiredDate('syketilfelleStartDato');
        }
        if (this.isDefined('navnFastlege')) {
            this.navnFastlege = this.getRequiredString('navnFastlege');
        }
        if (this.isDefined('egenmeldt')) {
            this.egenmeldt = this.getRequiredBoolean('egenmeldt');
        }
        if (this.isDefined('papirsykmelding')) {
            this.egenmeldt = this.getRequiredBoolean('papirsykmelding');
        }
        if (this.isDefined('harRedusertArbeidsgiverperiode')) {
            this.egenmeldt = this.getRequiredBoolean('harRedusertArbeidsgiverperiode');
        }
        if (this.isDefined('merknader')) {
            this.merknader = this.getRequiredArray('merknader').map((merknad) => new Merknad(merknad));
        }
    }

    private setUtdypendeOpplysninger() {
        if (this.isDefined('utdypendeOpplysninger')) {
            Object.keys(this.data.utdypendeOpplysninger).forEach((outerKey) => {
                const opplysning = new Map<string, UtdypendeOpplysning>();
                if (this.isDefined(this.data.utdypendeOpplysninger[outerKey])) {
                    Object.keys(this.data.utdypendeOpplysninger[outerKey]).forEach((innerKey) => {
                        opplysning.set(innerKey, this.data.utdypendeOpplysninger[outerKey][innerKey]);
                    });
                    this.utdypendeOpplysninger.set(outerKey, opplysning);
                }
            });
        }
    }
}
