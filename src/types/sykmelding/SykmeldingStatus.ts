import ObjectBase from '../objectBase';

class ArbeidsgiverStatus extends ObjectBase<ArbeidsgiverStatus> {
    orgnummer: string;
    juridiskOrgnummer?: string;
    orgNavn: string;

    constructor(data: any) {
        super(data, 'ArbeidsgiverStatus');

        this.orgnummer = this.getRequiredString('orgnummer');
        if (this.isDefined('juridiskOrgnummer')) {
            this.juridiskOrgnummer = this.getRequiredString('juridiskOrgnummer');
        }
        this.orgNavn = this.getRequiredString('orgNavn');
    }
}

enum ShortName {
    ARBEIDSSITUASJON,
    NY_NARMESTE_LEDER,
    FRAVAER,
    PERIODE,
    FORSIKRING,
}

enum Svartype {
    ARBEIDSSITUASJON,
    PERIODER,
    JA_NEI,
}

class Svar extends ObjectBase<Svar> {
    svarType: keyof typeof Svartype;
    svar: string;

    constructor(data: any) {
        super(data, 'Svar');
        this.svarType = this.getRequiredStringAsEnumKey(Svartype, 'svarType');
        this.svar = this.getRequiredString('svar');
    }
}

class Sporsmal extends ObjectBase<Sporsmal> {
    tekst: string;
    shortName: keyof typeof ShortName;
    svar: Svar;

    constructor(data: any) {
        super(data, 'Sporsmal');
        this.tekst = this.getRequiredString('tekst');
        this.shortName = this.getRequiredStringAsEnumKey(ShortName, 'shortName');
        this.svar = new Svar(data.svar);
    }
}

export enum StatusEvent {
    SENDT,
    APEN,
    AVBRUTT,
    UTGATT,
    BEKREFTET,
}

class SykmeldingStatus extends ObjectBase<SykmeldingStatus> {
    statusEvent: keyof typeof StatusEvent;
    timestamp: Date;
    arbeidsgiver?: ArbeidsgiverStatus;
    sporsmalOgSvarListe: Sporsmal[];

    constructor(data: any) {
        super(data, 'SykmeldingStatus');

        this.statusEvent = this.getRequiredStringAsEnumKey(StatusEvent, 'statusEvent');
        this.timestamp = this.getRequiredDate('timestamp');
        if (this.isDefined('arbeidsgiver')) {
            this.arbeidsgiver = new ArbeidsgiverStatus(data.arbeidsgiver);
        }
        this.sporsmalOgSvarListe = this.getRequiredArray('sporsmalOgSvarListe').map(
            (sporsmalOgSvar) => new Sporsmal(sporsmalOgSvar),
        );
    }
}

export default SykmeldingStatus;
