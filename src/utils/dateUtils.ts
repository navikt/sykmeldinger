import { add, format, formatISO, parseISO, sub } from 'date-fns';
import nbLocale from 'date-fns/locale/nb';

export function dateAdd(date: string | Date, duration: Duration): string {
    return toDateString(add(toDate(date), duration));
}

export function dateSub(date: string | Date, duration: Duration): string {
    return toDateString(sub(toDate(date), duration));
}

export const subMonths = (date: string, months: number): string => formatISO(sub(parseISO(date), { months }));

export function toDate(date: string | Date): Date {
    return typeof date === 'string' ? parseISO(date) : date;
}

export function toDateString(date: Date): string {
    return formatISO(date, { representation: 'date' });
}

export function toReadableDate(date: string | Date, options?: { withYear?: boolean }): string {
    return format(toDate(date), `d. MMMM${options?.withYear === false ? '' : ' yyyy'}`, { locale: nbLocale });
}
