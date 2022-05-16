import { BehandlerSchema, Behandler, getBehandlerName } from './Behandler';

describe('Behandler', () => {
    describe('getName', () => {
        it('Gets full name if mellomnavn is defined', () => {
            const behandler: Behandler = BehandlerSchema.parse({
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
            });

            expect(getBehandlerName(behandler)).toBe('Ola Robert Normann');
        });

        it('Gets partial name if mellomnavn is null', () => {
            const behandler: Behandler = BehandlerSchema.parse({
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
            });

            expect(getBehandlerName(behandler)).toBe('Ola Normann');
        });
    });
});
