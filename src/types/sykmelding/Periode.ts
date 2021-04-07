import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

enum Periodetype {
    AKTIVITET_IKKE_MULIG,
    AVVENTENDE,
    BEHANDLINGSDAGER,
    GRADERT,
    REISETILSKUDD,
}

class GradertPeriode {
    @IsInt()
    @Min(0)
    @Max(100)
    grad: number;

    @IsBoolean()
    reisetilskudd: boolean;
}

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND = 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING = 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET = 'Annet',
}

class MedisinskArsak {
    @IsOptional()
    @IsString()
    beskrivelse?: string;

    @IsIn(Object.keys(MedisinskArsakType), { each: true })
    arsak: (keyof typeof MedisinskArsakType)[];
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'Manglende tilrettelegging på arbeidsplassen',
    ANNET = 'Annet',
}

class ArbeidsrelatertArsak {
    @IsOptional()
    @IsString()
    beskrivelse?: string;

    @IsIn(Object.keys(ArbeidsrelatertArsakType), { each: true })
    arsak: (keyof typeof ArbeidsrelatertArsakType)[];
}

class AktivitetIkkeMuligPeriode {
    @IsOptional()
    @ValidateNested()
    @Type(() => MedisinskArsak)
    medisinskArsak?: MedisinskArsak;

    @IsOptional()
    @ValidateNested()
    @Type(() => ArbeidsrelatertArsak)
    arbeidsrelatertArsak?: ArbeidsrelatertArsak;
}

class Periode {
    @Type(() => Date)
    fom: Date;

    @Type(() => Date)
    tom: Date;

    @IsOptional()
    @ValidateNested()
    @Type(() => GradertPeriode)
    gradert?: GradertPeriode;

    @IsOptional()
    @IsInt()
    behandlingsdager?: number;

    @IsOptional()
    @IsString()
    innspillTilArbeidsgiver?: string;

    @IsIn(Object.keys(Periodetype))
    type: keyof typeof Periodetype;

    @IsOptional()
    @ValidateNested()
    @Type(() => AktivitetIkkeMuligPeriode)
    aktivitetIkkeMulig?: AktivitetIkkeMuligPeriode;

    @IsBoolean()
    reisetilskudd: boolean;
}

export default Periode;
