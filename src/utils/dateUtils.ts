import { add, format, formatISO, getDate, isSameMonth, isSameYear, parseISO, sub } from 'date-fns'
import nbLocale from 'date-fns/locale/nb'

export function dateAdd(date: string | Date, duration: Duration): string {
    return toDateString(add(toDate(date), duration))
}

export function dateSub(date: string | Date, duration: Duration): string {
    return toDateString(sub(toDate(date), duration))
}

export const subMonths = (date: string, months: number): string => formatISO(sub(parseISO(date), { months }))

export function toDate(date: string | Date): Date {
    return typeof date === 'string' ? parseISO(date) : date
}

export function toDateString(date: Date): string {
    return formatISO(date, { representation: 'date' })
}

export function toReadableDate(date: string | Date): string {
    return format(toDate(date), `d. MMMM yyyy`, { locale: nbLocale })
}

export function formatDateNoYear(date: string | Date): string {
    return format(toDate(date), 'd. MMMM', { locale: nbLocale })
}

export function formatDatePeriod(fom: string | Date, tom: string | Date): string {
    const fomDate = toDate(fom)
    const tomDate = toDate(tom)

    if (isSameMonth(fomDate, tomDate)) {
        return `${getDate(fomDate)}. - ${toReadableDate(tomDate)}`
    } else if (isSameYear(fomDate, tomDate)) {
        return `${formatDateNoYear(fomDate)} - ${toReadableDate(tomDate)}`
    } else {
        return `${toReadableDate(fomDate)} - ${toReadableDate(tomDate)}`
    }
}
