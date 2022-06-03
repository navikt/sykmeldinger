import { parseISO } from 'date-fns';

import { toReadableDate } from './dateUtils';

describe('toReadableDate', () => {
    it('Formatterer dato riktig uten årstall', () => {
        const date = parseISO('2021-01-05');
        expect(toReadableDate(date)).toBe('5. januar 2021');
    });

    it('Formatterer dato riktig med årstall', () => {
        const date = parseISO('2021-01-05');
        expect(toReadableDate(date, { withYear: false })).toBe('5. januar');
    });
});
