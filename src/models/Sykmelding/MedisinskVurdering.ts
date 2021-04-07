import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';

export class Diagnose {
    @IsString()
    kode: string;

    @IsString()
    system: string;

    @IsOptional()
    @IsString()
    tekst?: string;
}

enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON = 'Når vedkommende er innlagt i en godkjent helseinstitusjon',
    BEHANDLING_FORHINDRER_ARBEID = 'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
    ARBEIDSRETTET_TILTAK = 'Når vedkommende deltar på et arbeidsrettet tiltak',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = 'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott',
    NODVENDIG_KONTROLLUNDERSOKELSE = 'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
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

    @IsIn(Object.keys(AnnenFraverGrunn), { each: true })
    grunn: (keyof typeof AnnenFraverGrunn)[];
}

class MedisinskVurdering {
    @IsOptional()
    @ValidateNested()
    @Type(() => Diagnose)
    hovedDiagnose?: Diagnose;

    @ValidateNested({ each: true })
    @Type(() => Diagnose)
    biDiagnoser: Diagnose[];

    @IsOptional()
    @ValidateNested()
    @Type(() => AnnenFraversArsak)
    annenFraversArsak?: AnnenFraversArsak;

    @IsBoolean()
    svangerskap: boolean;

    @IsBoolean()
    yrkesskade: boolean;

    @IsOptional()
    @Type(() => Date)
    yrkesskadeDato?: Date;
}

export default MedisinskVurdering;
