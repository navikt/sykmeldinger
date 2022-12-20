import { differenceInDays, isAfter, parseISO } from 'date-fns'
import dayjs from 'dayjs'
import { sortBy } from 'remeda'

import { StatusEvent, Periode, SykmeldingFragment } from '../fetching/graphql.generated'

import { toDate } from './dateUtils'
import { isUtenlandsk } from './utenlanskUtils'

export function isActiveSykmelding(sykmelding: SykmeldingFragment): boolean {
    // Alt som ikke er APEN status, er inaktive
    if (sykmelding.sykmeldingStatus.statusEvent !== 'APEN') return false
    // APEN sykmeldinger blir inaktive etter 12 måneder
    return differenceInDays(new Date(), parseISO(sykmelding.mottattTidspunkt)) < 365
}

export function isUnderbehandling(sykmelding: SykmeldingFragment): boolean {
    return (
        sykmelding.sykmeldingStatus.statusEvent === StatusEvent.SENDT &&
        sykmelding.merknader?.find((it) => it.type === 'UNDER_BEHANDLING') != null
    )
}

/**
 * Get the type of sykmelding
 * Used for displaying the title.
 * @return {string}
 */
export function getSykmeldingTitle(
    sykmelding: SykmeldingFragment | undefined,
): 'Sykmelding' | 'Papirsykmelding' | 'Egenmelding' | 'Utenlandsk sykmelding' {
    if (sykmelding && isUtenlandsk(sykmelding)) {
        return 'Utenlandsk sykmelding'
    }
    if (sykmelding?.papirsykmelding) {
        return 'Papirsykmelding'
    }
    if (sykmelding?.egenmeldt) {
        return 'Egenmelding'
    }
    return 'Sykmelding'
}

/**
 * Get the first fom date of the earliest sykmelding period
 * @return {Date} The start date
 */
export function getSykmeldingStartDate(sykmelding: {
    sykmeldingsperioder: readonly { readonly fom: string }[]
}): string {
    return sykmelding.sykmeldingsperioder.reduce((acc, value) => {
        if (dayjs(value.fom).isBefore(dayjs(acc.fom))) {
            return value
        }

        return acc
    }).fom
}

/**
 * Used by reduce to get the latest tom date
 */
export const toLatestTom = (previousValue: Periode, currentValue: Periode): Periode =>
    isAfter(toDate(previousValue.tom), toDate(currentValue.tom)) ? previousValue : currentValue

/**
 * Get the last tom date of the last sykmelding period
 * @return {Date} The end date
 */
export function getSykmeldingEndDate(sykmelding: SykmeldingFragment): string {
    return sykmelding.sykmeldingsperioder.reduce((acc, value) => {
        if (dayjs(value.fom).isAfter(dayjs(acc.fom))) {
            return value
        }

        return acc
    }).tom
}

/**
 * Get the periods of the sykmelding sorted by newest first
 * @return {Periode[]} The sorted sykmelding periods
 */
export const getSykmeldingperioderSorted = <Periode extends { fom: string; tom: string }>(
    perioder: readonly Periode[],
): Periode[] => sortBy(perioder, [(periode) => periode.fom, 'asc'], [(periode) => periode.tom, 'asc'])

/**
 * Get the text representation of the sykmelding length from start date to end date
 * @return {string} The sykmelding length
 */
export function getReadableSykmeldingLength(sykmelding: SykmeldingFragment): string {
    const startDate = getSykmeldingStartDate(sykmelding)
    const endDate = getSykmeldingEndDate(sykmelding)

    if (dayjs(startDate).isSame(endDate)) {
        return dayjs(startDate).format('D. MMMM YYYY')
    }

    if (dayjs(startDate).isSame(endDate, 'year')) {
        if (dayjs(startDate).isSame(endDate, 'month')) {
            return `${dayjs(startDate).format('D.')} - ${dayjs(endDate).format('D. MMMM YYYY')}`
        }
        return `${dayjs(startDate).format('D. MMMM')} - ${dayjs(endDate).format('D. MMMM YYYY')}`
    }

    return `${dayjs(startDate).format('D. MMMM YYYY')} - ${dayjs(endDate).format('D. MMMM YYYY')}`
}
