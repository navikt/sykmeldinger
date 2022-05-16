import { getPasientName } from './Pasient';

describe('Pasient', () => {
    describe('getName', () => {
        it('Returns full name', () => {
            const plainJson = {
                fnr: '12345678901',
                fornavn: 'Ola',
                mellomnavn: 'Halvor',
                etternavn: 'Nordmann',
            };
            expect(getPasientName(plainJson)).toEqual('Ola Halvor Nordmann');
        });

        it('Returns name without middle name', () => {
            const plainJson = {
                fnr: '12345678901',
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
            };
            expect(getPasientName(plainJson)).toEqual('Ola Nordmann');
        });

        it('Returns undefined for missing fornavn', () => {
            const plainJson = {
                fnr: '12345678901',
                fornavn: null,
                mellomnavn: null,
                etternavn: 'Nordmann',
            };
            expect(getPasientName(plainJson)).toBeUndefined();
        });
    });
});
