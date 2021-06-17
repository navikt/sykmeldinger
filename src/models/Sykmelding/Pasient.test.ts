import 'reflect-metadata';
import Pasient from './Pasient';

describe('Pasient', () => {
    describe('getName', () => {
        it('Returns full name', () => {
            const plainJson = {
                fnr: '12345678901',
                fornavn: 'Ola',
                mellomnavn: 'Halvor',
                etternavn: 'Nordmann',
            };
            const pasient = new Pasient(plainJson);
            expect(pasient.getName()).toEqual('Ola Halvor Nordmann');
        });

        it('Returns name without middle name', () => {
            const plainJson = {
                fnr: '12345678901',
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
            };
            const pasient = new Pasient(plainJson);
            expect(pasient.getName()).toEqual('Ola Nordmann');
        });

        it('Returns undefined for missing fornavn', () => {
            const plainJson = {
                fnr: '12345678901',
                fornavn: null,
                mellomnavn: null,
                etternavn: 'Nordmann',
            };
            const pasient = new Pasient(plainJson);
            expect(pasient.getName()).toBeUndefined();
        });
    });
});
