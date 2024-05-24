import { describe, it, expect } from 'vitest'
import { parseISO } from 'date-fns'

import { diffInDays, toReadableDate, toReadableDatePeriod } from './dateUtils'

describe('toReadableDate', () => {
    it('Formatterer dato riktig med årstall', () => {
        const date = parseISO('2021-01-05')
        expect(toReadableDate(date)).toBe('5. januar 2021')
    })
})

describe('toReadableDatePeriod', () => {
    it('Returns month and year only once if fom and tom have the same month and year', () => {
        expect(toReadableDatePeriod('2021-04-01', '2021-04-03')).toBe('1. - 3. april 2021')
    })
    it('Returns both months if month is different and year is equal for fom and tom', () => {
        expect(toReadableDatePeriod('2021-01-01', '2021-04-03')).toBe('1. januar - 3. april 2021')
    })
    it('Returns both months and years if the month and year are different', () => {
        expect(toReadableDatePeriod('2020-12-01', '2021-02-03')).toBe('1. desember 2020 - 3. februar 2021')
    })
})

describe('diffInDays', () => {
    it('fom/tom same day', () => {
        expect(diffInDays('2021-04-29', '2021-04-29')).toBe(1)
    })

    it('fom/tom within same month', () => {
        expect(diffInDays('2021-04-01', '2021-04-03')).toBe(3)
    })

    it('fom/tom across months', () => {
        expect(diffInDays('2021-04-29', '2021-05-01')).toBe(3)
    })

    it('fom/tom across year', () => {
        expect(diffInDays('2021-12-31', '2022-01-01')).toBe(2)
    })
})
