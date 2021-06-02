import 'reflect-metadata';
import { ArrayMaxSize, IsArray, IsBoolean, IsDate, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';

export class Diagnose {
    @IsString()
    kode: string;

    @IsString()
    system: string;

    @IsOptional()
    @IsString()
    tekst?: string;

    constructor(data: any) {
        this.kode = data.kode;
        this.system = data.system;
        this.tekst = data.tekst ?? undefined;
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
    @IsOptional()
    @IsString()
    beskrivelse?: string;

    // Can only have one entry
    @IsArray()
    @ArrayMaxSize(1)
    @IsIn(Object.keys(AnnenFraverGrunn), { each: true })
    grunn: (keyof typeof AnnenFraverGrunn)[];

    constructor(data: any) {
        this.beskrivelse = data.beskrivelse ?? undefined;
        this.grunn = data.grunn;
    }
}

class MedisinskVurdering {
    @IsOptional()
    @ValidateNested()
    hovedDiagnose?: Diagnose;

    @ValidateNested({ each: true })
    @IsArray()
    biDiagnoser: Diagnose[];

    @IsOptional()
    @ValidateNested()
    annenFraversArsak?: AnnenFraversArsak;

    @IsBoolean()
    svangerskap: boolean;

    @IsBoolean()
    yrkesskade: boolean;

    @IsOptional()
    @IsDate()
    yrkesskadeDato?: Date;

    constructor(data: any) {
        this.hovedDiagnose = data.hovedDiagnose ? new Diagnose(data.hovedDiagnose) : undefined;
        this.biDiagnoser = data.biDiagnoser.map((bidiagnose: any) => new Diagnose(bidiagnose));
        this.annenFraversArsak = data.annenFraversArsak ? new AnnenFraversArsak(data.annenFraversArsak) : undefined;
        this.svangerskap = data.svangerskap;
        this.yrkesskade = data.yrkesskade;
        this.yrkesskadeDato = data.yrkesskadeDato ? new Date(data.yrkesskadeDato) : undefined;
    }
}

export default MedisinskVurdering;
