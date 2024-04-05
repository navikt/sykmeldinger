import {
    add,
    differenceInDays,
    format,
    formatISO,
    getDate,
    isSameDay,
    isSameMonth,
    isSameYear,
    parseISO,
    sub,
    Duration,
} from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import { sortBy } from 'remeda'

export function dateAdd(date: string | Date, duration: Duration): string {
    return toDateString(add(date, duration))
}

export function dateSub(date: string | Date, duration: Duration): string {
    return toDateString(sub(date, duration))
}

export function toDate(date: string): Date {
    return parseISO(date)
}

export function toDateString(date: Date): string {
    return formatISO(date, { representation: 'date' })
}

export function toReadableDate(date: string | Date): string {
    return format(date, `d. MMMM yyyy`, { locale: nb })
}

export function toReadableDateNoYear(date: string | Date): string {
    return format(date, 'd. MMMM', { locale: nb })
}

/**
 * Get a text representation of the period fom to tom
 * @return {string} The period string
 */
export function toReadableDatePeriod(fom: string | Date, tom: string | Date): string {
    if (isSameDay(fom, tom)) {
        return toReadableDate(fom)
    } else if (isSameMonth(fom, tom)) {
        return `${getDate(fom)}. - ${toReadableDate(tom)}`
    } else if (isSameYear(fom, tom)) {
        return `${toReadableDateNoYear(fom)} - ${toReadableDate(tom)}`
    } else {
        return `${toReadableDate(fom)} - ${toReadableDate(tom)}`
    }
}

export function diffInDays(fom: string, tom: string): number {
    return differenceInDays(parseISO(tom), parseISO(fom)) + 1
}

export function sortDatesASC(dates: Date[]): Date[] {
    return sortBy(dates, [(date) => date, 'asc'])
}
