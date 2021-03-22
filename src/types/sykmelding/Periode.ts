import ObjectBase from '../objectBase';

enum Periodetype {
    AKTIVITET_IKKE_MULIG,
    AVVENTENDE,
    BEHANDLINGSDAGER,
    GRADERT,
    REISETILSKUDD,
}

class GradertPeriode extends ObjectBase<GradertPeriode> {
    grad: number;
    reisetilskudd: boolean;

    constructor(data: any) {
        super(data, 'GradertPeriode');
        this.grad = this.getRequiredNumber('grad');
        this.reisetilskudd = this.getRequiredBoolean('reisetilskudd');
    }
}

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND = 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING = 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET = 'Annet',
}

class MedisinskArsak extends ObjectBase<MedisinskArsak> {
    beskrivelse?: string;
    arsak: (keyof typeof MedisinskArsakType)[];

    constructor(data: any) {
        super(data, 'MedisinskArsak');
        if (this.isDefined('beskrivelse')) {
            this.beskrivelse = this.getRequiredString('beskrivelse');
        }
        this.arsak = this.getRequiredArrayOfEnumKeys(MedisinskArsakType, 'arsak');
    }
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'Manglende tilrettelegging på arbeidsplassen',
    ANNET = 'Annet',
}

class ArbeidsrelatertArsak extends ObjectBase<MedisinskArsak> {
    beskrivelse?: string;
    arsak: (keyof typeof ArbeidsrelatertArsakType)[];

    constructor(data: any) {
        super(data, 'ArbeidsrelatertArsak');
        if (this.isDefined('beskrivelse')) {
            this.beskrivelse = this.getRequiredString('beskrivelse');
        }
        this.arsak = this.getRequiredArrayOfEnumKeys(ArbeidsrelatertArsakType, 'arsak');
    }
}

class AktivitetIkkeMuligPeriode extends ObjectBase<AktivitetIkkeMuligPeriode> {
    medisinskArsak?: MedisinskArsak;
    arbeidsrelatertArsak?: ArbeidsrelatertArsak;

    constructor(data: any) {
        super(data, 'AktivitetIkkeMuligPeriode');

        if (this.isDefined('medisinskArsak')) {
            this.medisinskArsak = new MedisinskArsak(data.medisinskArsak);
        }
        if (this.isDefined('arbeidsrelatertArsak')) {
            this.arbeidsrelatertArsak = new ArbeidsrelatertArsak(data.arbeidsrelatertArsak);
        }
    }
}

class Periode extends ObjectBase<Periode> {
    fom: Date;
    tom: Date;
    gradert?: GradertPeriode;
    behandlingsdager?: number;
    innspillTilArbeidsgiver?: string;
    type: keyof typeof Periodetype;
    aktivitetIkkeMulig?: AktivitetIkkeMuligPeriode;
    reisetilskudd: boolean;

    constructor(data: any) {
        super(data, 'Periode');

        this.fom = this.getRequiredDate('fom');
        this.tom = this.getRequiredDate('tom');
        if (this.isDefined('gradert')) {
            this.gradert = new GradertPeriode(data.gradert);
        }
        if (this.isDefined('behandlingsdager')) {
            this.behandlingsdager = this.getRequiredNumber('behandlingsdager');
        }
        if (this.isDefined('innspillTilArbeidsgiver')) {
            this.innspillTilArbeidsgiver = this.getRequiredString('innspillTilArbeidsgiver');
        }
        this.type = this.getRequiredStringAsEnumKey(Periodetype, 'type');
        if (this.isDefined('aktivitetIkkeMulig')) {
            this.aktivitetIkkeMulig = new AktivitetIkkeMuligPeriode(data.aktivitetIkkeMulig);
        }
        this.reisetilskudd = this.getRequiredBoolean('reisetilskudd');
    }
}

export default Periode;
