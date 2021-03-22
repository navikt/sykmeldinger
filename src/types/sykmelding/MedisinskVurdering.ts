import ObjectBase from '../objectBase';

export class Diagnose extends ObjectBase<Diagnose> {
    kode: string;
    system: string;
    tekst?: string;

    constructor(data: any, isBidiagnose: boolean | undefined = false) {
        super(data, isBidiagnose ? 'Bidiagnose' : 'Diagnose');
        this.kode = this.getRequiredString('kode');
        this.system = this.getRequiredString('system');
        if (this.isDefined('tekst')) {
            this.tekst = this.getRequiredString('tekst');
        }
    }
}

enum AnnenFraverGrunn {
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

export class AnnenFraversArsak extends ObjectBase<AnnenFraversArsak> {
    beskrivelse?: string;
    grunn: (keyof typeof AnnenFraverGrunn)[];

    constructor(data: any) {
        super(data, 'AnnenFraversArsak');
        if (this.isDefined('beskrivelse')) {
            this.beskrivelse = this.getRequiredString('beskrivelse');
        }
        this.grunn = this.getRequiredArrayOfEnumKeys(AnnenFraverGrunn, 'grunn');
    }
}

class MedisinskVurdering extends ObjectBase<MedisinskVurdering> {
    hovedDiagnose?: Diagnose;
    biDiagnoser: Diagnose[];
    annenFraversArsak?: AnnenFraversArsak;
    svangerskap: boolean;
    yrkesskade: boolean;
    yrkesskadeDato?: Date;

    constructor(data: any) {
        super(data, 'MedisinskVurdering');
        if (this.isDefined('hovedDiagnose')) {
            this.hovedDiagnose = new Diagnose(data.hovedDiagnose);
        }
        this.biDiagnoser = this.getRequiredArray('biDiagnoser').map((bidiagnose) => new Diagnose(bidiagnose, true));
        if (this.isDefined('annenFraversArsak')) {
            this.annenFraversArsak = new AnnenFraversArsak(data.annenFraversArsak);
        }
        this.svangerskap = this.getRequiredBoolean('svangerskap');
        this.yrkesskade = this.getRequiredBoolean('yrkesskade');
        if (this.isDefined('yrkesskadeDato')) {
            this.yrkesskadeDato = this.getRequiredDate('yrkesskadeDato');
        }
    }
}

export default MedisinskVurdering;
