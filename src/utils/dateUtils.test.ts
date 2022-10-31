import { parseISO } from 'date-fns'

import { toReadableDate } from './dateUtils'

describe('toReadableDate', () => {
    it('Formatterer dato riktig med årstall', () => {
        const date = parseISO('2021-01-05')
        expect(toReadableDate(date)).toBe('5. januar 2021')
    })
})
