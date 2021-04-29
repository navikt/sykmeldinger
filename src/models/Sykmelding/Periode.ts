import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import 'dayjs/locale/nb';
import dayjs from 'dayjs';
dayjs.locale('nb');

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

    // TODO: not optional if beskrivelse exists
    @IsOptional()
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

    // TODO: not optional if beskrivelse exists
    @IsOptional()
    @IsIn(Object.keys(ArbeidsrelatertArsakType), { each: true })
    arsak: (keyof typeof ArbeidsrelatertArsakType)[];
}

export class AktivitetIkkeMuligPeriode {
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

    /**
     * Get a text representation of the period type
     * @return {string} The period string
     */
    getPeriodTitle(): string {
        switch (this.type) {
            case 'AVVENTENDE':
                return 'Avventende sykmelding';
            case 'AKTIVITET_IKKE_MULIG':
                return '100% sykmelding';
            case 'GRADERT':
                return `${this.gradert?.grad}% sykmelding`;
            case 'REISETILSKUDD':
                return 'Reisetilskudd';
            case 'BEHANDLINGSDAGER':
                return 'Behandlingsdager';
        }
    }

    /**
     * Get a text representation of the period fom to tom
     * @return {string} The period string
     */
    getReadablePeriod(): string {
        return `${dayjs(this.fom).format('D. MMM YYYY')} - ${dayjs(this.tom).format('D. MMM YYYY')}`;
    }

    /**
     * Get the total length between fom and tom in days
     * @return {number} The period length
     */
    getLength(): number {
        return dayjs(this.tom).diff(dayjs(this.fom), 'day') + 1;
    }

    /**
     * Get a text representation of the period length
     * @return {string} The period string
     */
    getReadableLength(): string {
        const length = this.getLength();
        if (this.type === 'BEHANDLINGSDAGER') {
            return `${this.behandlingsdager} behandlingsdag${
                this.behandlingsdager && this.behandlingsdager > 1 ? 'er' : ''
            } i løpet av ${length} dag${length > 1 ? 'er' : ''}`;
        }
        return `${length} dag${length === 1 ? '' : 'er'}`;
    }

    /**
     * Get a text representation of the period based on the type of the period
     * @return {string} The period discription
     */
    getDescription(arbeidsgiverNavn?: string): string {
        const periodLength = this.getLength();

        switch (this.type) {
            case 'AKTIVITET_IKKE_MULIG':
                return `100% sykmeldt${arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''} i ${periodLength} dag${
                    periodLength > 1 ? 'er' : ''
                }`;
            case 'GRADERT':
                return `${this.gradert?.grad}% sykmeldt${
                    arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''
                } i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
            case 'BEHANDLINGSDAGER':
                return `${this.behandlingsdager} behandlingsdag${
                    this.behandlingsdager && this.behandlingsdager > 1 ? 'er' : ''
                } i løpet av ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
            case 'AVVENTENDE':
                return `Avventende sykmelding i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
            case 'REISETILSKUDD':
                return `Reisetilskudd i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
            default:
                return '';
        }
    }
}

export default Periode;
