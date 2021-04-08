import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';

class ArbeidsgiverStatus {
    @IsString()
    orgnummer: string;

    @IsOptional()
    @IsString()
    juridiskOrgnummer?: string;

    @IsString()
    orgNavn: string;
}

enum ShortName {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    NY_NARMESTE_LEDER = 'NY_NARMESTE_LEDER',
    FRAVAER = 'FRAVAER',
    PERIODE = 'PERIODE',
    FORSIKRING = 'FORSIKRING',
}

enum Svartype {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    PERIODER = 'PERIODER',
    JA_NEI = 'JA_NEI',
}

class Svar {
    @IsIn(Object.keys(Svartype))
    svarType: keyof typeof Svartype;
    @IsString()
    svar: string;
}

class Sporsmal {
    @IsString()
    tekst: string;

    @IsIn(Object.keys(ShortName))
    shortName: keyof typeof ShortName;

    @ValidateNested()
    @Type(() => Svar)
    svar: Svar;
}

export enum StatusEvent {
    SENDT = 'SENDT',
    APEN = 'APEN',
    AVBRUTT = 'AVBRUTT',
    UTGATT = 'UTGATT',
    BEKREFTET = 'BEKREFTET',
}

class SykmeldingStatus {
    @IsIn(Object.keys(StatusEvent))
    statusEvent: keyof typeof StatusEvent;

    @Type(() => Date)
    timestamp: Date;

    @IsOptional()
    @ValidateNested()
    @Type(() => ArbeidsgiverStatus)
    arbeidsgiver?: ArbeidsgiverStatus;

    @ValidateNested({ each: true })
    @Type(() => Sporsmal)
    sporsmalOgSvarListe: Sporsmal[];
}

export default SykmeldingStatus;
