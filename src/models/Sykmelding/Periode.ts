import { z } from 'zod';
import dayjs from 'dayjs';

import { LocalDateSchema } from '../date';

export enum Periodetype {
    AKTIVITET_IKKE_MULIG = 'AKTIVITET_IKKE_MULIG',
    AVVENTENDE = 'AVVENTENDE',
    BEHANDLINGSDAGER = 'BEHANDLINGSDAGER',
    GRADERT = 'GRADERT',
    REISETILSKUDD = 'REISETILSKUDD',
}

const GradertPeriodeSchema = z.object({
    grad: z.number(),
    reisetilskudd: z.boolean(),
});

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'TILSTAND_HINDRER_AKTIVITET',
    AKTIVITET_FORVERRER_TILSTAND = 'AKTIVITET_FORVERRER_TILSTAND',
    AKTIVITET_FORHINDRER_BEDRING = 'AKTIVITET_FORHINDRER_BEDRING',
    ANNET = 'ANNET',
}

function medisinskArsakToText(value: MedisinskArsakType): string {
    switch (value) {
        case MedisinskArsakType.TILSTAND_HINDRER_AKTIVITET:
            return 'Helsetilstanden hindrer pasienten i å være i aktivitet';
        case MedisinskArsakType.AKTIVITET_FORVERRER_TILSTAND:
            return 'Aktivitet vil forverre helsetilstanden';
        case MedisinskArsakType.AKTIVITET_FORHINDRER_BEDRING:
            return 'Aktivitet vil hindre/forsinke bedring av helsetilstanden';
        case MedisinskArsakType.ANNET:
            return 'Annet';
    }
}

const MedisinskArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(z.nativeEnum(MedisinskArsakType).transform(medisinskArsakToText)),
});

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'MANGLENDE_TILRETTELEGGING',
    ANNET = 'ANNET',
}

function arbeidsrelatertArsakToText(value: ArbeidsrelatertArsakType): string {
    switch (value) {
        case ArbeidsrelatertArsakType.MANGLENDE_TILRETTELEGGING:
            return 'Manglende tilrettelegging på arbeidsplassen';
        case ArbeidsrelatertArsakType.ANNET:
            return 'Annet';
    }
}

const ArbeidsrelatertArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(z.nativeEnum(ArbeidsrelatertArsakType).transform(arbeidsrelatertArsakToText)),
});

export type AktivitetIkkeMuligPeriode = z.infer<typeof AktivitetIkkeMuligPeriodeSchema>;
export const AktivitetIkkeMuligPeriodeSchema = z.object({
    medisinskArsak: MedisinskArsakSchema.nullable(),
    arbeidsrelatertArsak: ArbeidsrelatertArsakSchema.nullable(),
});

export type Periode = z.infer<typeof PeriodeSchema>;
export const PeriodeSchema = z.object({
    fom: LocalDateSchema,
    tom: LocalDateSchema,
    gradert: GradertPeriodeSchema.nullable(),
    behandlingsdager: z.number().nullable(),
    innspillTilArbeidsgiver: z.string().nullable(),
    type: z.nativeEnum(Periodetype),
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriodeSchema.nullable(),
    reisetilskudd: z.boolean(),
});

/**
 * Get a text representation of the period type
 * @return {string} The period string
 */
export function getPeriodTitle(period: Periode): string {
    switch (period.type) {
        case Periodetype.AVVENTENDE:
            return 'Avventende sykmelding';
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return '100% sykmelding';
        case Periodetype.GRADERT:
            return `${period.gradert?.grad}% sykmelding`;
        case Periodetype.REISETILSKUDD:
            return 'Reisetilskudd';
        case Periodetype.BEHANDLINGSDAGER:
            return 'Behandlingsdager';
    }
}

/**
 * Get a text representation of the period fom to tom
 * @return {string} The period string
 */
export function getReadablePeriod(period: Periode): string {
    const sameMonthAndYear =
        dayjs(period.fom).get('month') === dayjs(period.tom).get('month') &&
        dayjs(period.fom).get('year') === dayjs(period.tom).get('year');
    const sameYearNotMonth =
        dayjs(period.fom).get('month') !== dayjs(period.tom).get('month') &&
        dayjs(period.fom).get('year') === dayjs(period.tom).get('year');

    if (sameMonthAndYear) {
        return `${dayjs(period.fom).format('D.')} til ${dayjs(period.tom).format('D. MMM YYYY')}`;
    } else if (sameYearNotMonth) {
        return `${dayjs(period.fom).format('D. MMM')} til ${dayjs(period.tom).format('D. MMM YYYY')}`;
    }
    return `${dayjs(period.fom).format('D. MMM YYYY')} til ${dayjs(period.tom).format('D. MMM YYYY')}`;
}

/**
 * Get the total length between fom and tom in days
 * @return {number} The period length
 */
export function getLength(period: Periode): number {
    return dayjs(period.tom).diff(dayjs(period.fom), 'day') + 1;
}

/**
 * Get a text representation of the period length
 * @return {string} The period string
 */
export function getReadableLength(period: Periode): string {
    const length = getLength(period);
    if (period.type === Periodetype.BEHANDLINGSDAGER) {
        return `${period.behandlingsdager} behandlingsdag${
            period.behandlingsdager && period.behandlingsdager > 1 ? 'er' : ''
        } i løpet av ${length} dag${length > 1 ? 'er' : ''}`;
    }
    return `${length} dag${length === 1 ? '' : 'er'}`;
}

/**
 * Get a text representation of the period based on the type of the period
 * @return {string} The period discription
 */
export function getDescription(period: Periode, arbeidsgiverNavn?: string): string {
    const periodLength = getLength(period);

    switch (period.type) {
        case Periodetype.AKTIVITET_IKKE_MULIG:
            return `100% sykmeldt${arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''} i ${periodLength} dag${
                periodLength > 1 ? 'er' : ''
            }`;
        case Periodetype.GRADERT:
            return `${period.gradert?.grad}% sykmeldt${
                arbeidsgiverNavn ? ` fra ${arbeidsgiverNavn}` : ''
            } i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        case Periodetype.BEHANDLINGSDAGER:
            return `${period.behandlingsdager} behandlingsdag${
                period.behandlingsdager && period.behandlingsdager > 1 ? 'er' : ''
            } i løpet av ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        case Periodetype.AVVENTENDE:
            return `Avventende sykmelding i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        case Periodetype.REISETILSKUDD:
            return `Reisetilskudd i ${periodLength} dag${periodLength > 1 ? 'er' : ''}`;
        default:
            return '';
    }
}
