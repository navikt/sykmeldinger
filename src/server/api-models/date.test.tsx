import { describe, it, expect } from 'vitest'
import { parseISO, isValid } from 'date-fns'

describe('date', () => {
    it('should parse date', () => {
        const date = '2021-12-01'
        expect(isValid(parseISO(date, { additionalDigits: 1 }))).toBe(true)
    })

    it('should parse date with additional number of digit in extended year format', () => {
        const date = '+92020-01-09'
        expect(isValid(parseISO(date, { additionalDigits: 1 }))).toBe(true)
    })
})
