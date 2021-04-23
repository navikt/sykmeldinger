/// <reference types="jest" />
import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import Behandler from './Behandler';

describe('Behandler', () => {
    describe('getName', () => {
        it('Gets full name if mellomnavn is defined', () => {
            const behandlerJson = {
                fornavn: 'Ola',
                mellomnavn: 'Robert',
                etternavn: 'Normann',
                aktoerId: '123',
                fnr: '12345678910',
                hpr: null,
                her: null,
                adresse: {
                    gate: null,
                    postnummer: null,
                    kommune: null,
                    postboks: null,
                    land: null,
                },
                tlf: null,
            };
            const behandler = plainToClass(Behandler, behandlerJson);
            expect(behandler.getName()).toBe('Ola Robert Normann');
        });

        it('Gets partial name if mellomnavn is null', () => {
            const behandlerJson = {
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Normann',
                aktoerId: '123',
                fnr: '12345678910',
                hpr: null,
                her: null,
                adresse: {
                    gate: null,
                    postnummer: null,
                    kommune: null,
                    postboks: null,
                    land: null,
                },
                tlf: null,
            };
            const behandler = plainToClass(Behandler, behandlerJson);
            expect(behandler.getName()).toBe('Ola Normann');
        });
    });
});
