import { IsArray, IsDate, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { parseISO } from 'date-fns';

class ArbeidsgiverStatus {
    @IsString()
    orgnummer: string;

    @IsOptional()
    @IsString()
    juridiskOrgnummer?: string;

    @IsString()
    orgNavn: string;

    constructor(data: any) {
        this.orgnummer = data.orgnummer;
        this.juridiskOrgnummer = data.juridiskOrgnummer ?? undefined;
        this.orgNavn = data.orgNavn;
    }
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

    constructor(data: any) {
        this.svarType = data.svarType;
        this.svar = data.svar;
    }
}

class Sporsmal {
    @IsString()
    tekst: string;

    @IsIn(Object.keys(ShortName))
    shortName: keyof typeof ShortName;

    @ValidateNested()
    svar: Svar;

    constructor(data: any) {
        this.tekst = data.tekst;
        this.shortName = data.shortName;
        this.svar = new Svar(data.svar);
    }
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

    @IsDate()
    timestamp: Date;

    @IsOptional()
    @ValidateNested()
    arbeidsgiver?: ArbeidsgiverStatus;

    @ValidateNested({ each: true })
    @IsArray()
    sporsmalOgSvarListe: Sporsmal[];

    constructor(data: any) {
        this.statusEvent = data.statusEvent;
        this.timestamp = parseISO(data.timestamp);
        this.arbeidsgiver = data.arbeidsgiver ? new ArbeidsgiverStatus(data.arbeidsgiver) : undefined;
        this.sporsmalOgSvarListe = data.sporsmalOgSvarListe.map((sporsmalSvar: any) => new Sporsmal(sporsmalSvar));
    }
}

export default SykmeldingStatus;
