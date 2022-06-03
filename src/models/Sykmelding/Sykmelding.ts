import { z } from 'zod';
import dayjs from 'dayjs';

import { LocalDateSchema } from '../date';

import { ArbeidsgiverSykmeldingSchema } from './ArbeidsgiverSykmelding';
import { BehandlerSchema } from './Behandler';
import { BehandlingsutfallSchema } from './Behandlingsutfall';
import { KontaktMedPasientSchema } from './KontaktMedPasient';
import { MedisinskVurderingSchema } from './MedisinskVurdering';
import { MeldingTilNAVSchema } from './MeldingTilNav';
import { MerknadSchema } from './Merknad';
import { Periode, PeriodeSchema } from './Periode';
import { PrognoseSchema } from './Prognose';
import { SykmeldingStatusSchema } from './SykmeldingStatus';
import { UtdypendeOpplysningSchema } from './UtdypendeOpplysninger';
import { PasientSchema } from './Pasient';

export type Sykmelding = z.infer<typeof SykmeldingSchema>;
export const SykmeldingSchema = z.object({
    id: z.string(),
    mottattTidspunkt: LocalDateSchema,
    behandlingsutfall: BehandlingsutfallSchema,
    legekontorOrgnummer: z.string().nullable(),
    arbeidsgiver: ArbeidsgiverSykmeldingSchema.nullable(),
    sykmeldingsperioder: z.array(PeriodeSchema),
    sykmeldingStatus: SykmeldingStatusSchema,
    medisinskVurdering: MedisinskVurderingSchema.nullable(),
    skjermesForPasient: z.boolean(),
    prognose: PrognoseSchema.nullable(),
    utdypendeOpplysninger: z.record(z.string(), z.record(z.string(), UtdypendeOpplysningSchema)),
    tiltakArbeidsplassen: z.string().nullable(),
    tiltakNAV: z.string().nullable(),
    andreTiltak: z.string().nullable(),
    meldingTilNAV: MeldingTilNAVSchema.nullable(),
    meldingTilArbeidsgiver: z.string().nullable(),
    kontaktMedPasient: KontaktMedPasientSchema,
    behandletTidspunkt: LocalDateSchema,
    behandler: BehandlerSchema,
    syketilfelleStartDato: LocalDateSchema.nullable(),
    navnFastlege: z.string().nullable(),
    egenmeldt: z.boolean().nullable(),
    papirsykmelding: z.boolean().nullable(),
    harRedusertArbeidsgiverperiode: z.boolean().nullable(),
    merknader: z.array(MerknadSchema).nullable(),
    pasient: PasientSchema.nullable(),
});

/*
function getUtdypendeOpplysninger(value: unknown): Map<string, Map<string, UtdypendeOpplysning>> {
    const outerMap = new Map<string, Map<string, UtdypendeOpplysning>>();
    if (value && value instanceof Object) {
        for (const [outerKey, outerValue] of Object.entries(value)) {
            if (outerValue && outerValue instanceof Object) {
                const innerMap = new Map<string, UtdypendeOpplysning>();
                for (const [innerKey, innerValue] of Object.entries(outerValue)) {
                    innerMap.set(innerKey, new UtdypendeOpplysning(innerValue));
                }
                outerMap.set(outerKey, innerMap);
            }
        }
    }
    return outerMap;
}*/

/**
 * Get the type of sykmelding
 * Used for displaying the title.
 * @return {string}
 */
export function getSykmeldingTitle(sykmelding: Sykmelding): 'Sykmelding' | 'Papirsykmelding' | 'Egenmelding' {
    if (sykmelding.papirsykmelding) {
        return 'Papirsykmelding';
    }
    if (sykmelding.egenmeldt) {
        return 'Egenmelding';
    }
    return 'Sykmelding';
}

/**
 * Get the first fom date of the earliest sykmelding period
 * @return {Date} The start date
 */
export function getSykmeldingStartDate(sykmelding: Sykmelding): string {
    return sykmelding.sykmeldingsperioder.reduce((acc, value) => {
        if (dayjs(value.fom).isBefore(dayjs(acc.fom))) {
            return value;
        }

        return acc;
    }).fom;
}

/**
 * Get the last tom date of the last sykmelding period
 * @return {Date} The end date
 */
export function getSykmeldingEndDate(sykmelding: Sykmelding): string {
    return sykmelding.sykmeldingsperioder.reduce((acc, value) => {
        if (dayjs(value.fom).isAfter(dayjs(acc.fom))) {
            return value;
        }

        return acc;
    }).tom;
}

/**
 * Get the periods of the sykmelding sorted by newest first
 * @return {Periode[]} The sorted sykmelding periods
 */
export function getSykmeldingperioderSorted(sykmelding: Sykmelding): Periode[] {
    return sykmelding.sykmeldingsperioder.sort(({ fom }, { tom }) => {
        if (dayjs(fom).isBefore(tom)) {
            return -1;
        } else if (dayjs(fom).isSame(tom)) {
            return 0;
        }
        return 1;
    });
}

/**
 * Get the text representation of the sykmelding length from start date to end date
 * @return {string} The sykmelding length
 */
export function getReadableSykmeldingLength(sykmelding: Sykmelding): string {
    const startDate = getSykmeldingStartDate(sykmelding);
    const endDate = getSykmeldingEndDate(sykmelding);

    if (dayjs(startDate).isSame(endDate)) {
        return dayjs(startDate).format('D. MMMM YYYY');
    }

    if (dayjs(startDate).isSame(endDate, 'year')) {
        if (dayjs(startDate).isSame(endDate, 'month')) {
            return `${dayjs(startDate).format('D.')} - ${dayjs(endDate).format('D. MMMM YYYY')}`;
        }
        return `${dayjs(startDate).format('D. MMMM')} - ${dayjs(endDate).format('D. MMMM YYYY')}`;
    }

    return `${dayjs(startDate).format('D. MMMM YYYY')} - ${dayjs(endDate).format('D. MMMM YYYY')}`;
}
