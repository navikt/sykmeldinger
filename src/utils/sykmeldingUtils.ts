import { differenceInDays, parseISO } from 'date-fns';
import dayjs from 'dayjs';

import { StatusEvent, Sykmelding, Periode, SykmeldingFragment } from '../fetching/graphql.generated';

export function isActiveSykmelding(sykmelding: SykmeldingFragment): boolean {
    // Under behandling skal alltids vises, uansett hvor gammel
    if (isUnderbehandling(sykmelding)) return true;
    // Alt som ikke er APEN status, er inaktive
    if (sykmelding.sykmeldingStatus.statusEvent !== 'APEN') return false;
    // APEN sykmeldinger blir inaktive etter 12 måneder
    return differenceInDays(new Date(), parseISO(sykmelding.mottattTidspunkt)) < 365;
}

export function isUnderbehandling(sykmelding: SykmeldingFragment): boolean {
    return (
        sykmelding.sykmeldingStatus.statusEvent === StatusEvent.Sendt &&
        sykmelding.merknader?.find((it) => it.type === 'UNDER_BEHANDLING') != null
    );
}

export function getBirthday(fnr: string): string {
    return fnr.substring(0, 6) + '*****';
}

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
    return [...sykmelding.sykmeldingsperioder].sort(({ fom }, { tom }) => {
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
