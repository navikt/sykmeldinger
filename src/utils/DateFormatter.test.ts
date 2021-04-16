import DateFormatter from './DateFormatter';

describe('DateFormatter', () => {
    describe('toReadableDate', () => {
        it('Formatterer dato riktig uten årstall', () => {
            const date = new Date('2021-01-05');
            expect(DateFormatter.toReadableDate(date)).toBe('5. januar');
        });

        it('Formatterer dato riktig med årstall', () => {
            const date = new Date('2021-01-05');
            expect(DateFormatter.toReadableDate(date, { withYear: true })).toBe('5. januar 2021');
        });
    });
});
