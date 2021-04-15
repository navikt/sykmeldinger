import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Arbeidsgiver } from './Arbeidsgiver';

describe('Arbeidsgiver', () => {
    describe('getName', () => {
        it('Appends "(aktiv)" when aktivArbeidsforhold is true', () => {
            const arbeidsgiverJson = {
                orgnummer: '123456789',
                juridiskOrgnummer: '123456789',
                navn: 'NAV',
                stillingsprosent: '100',
                stilling: 'Utvikler',
                aktivtArbeidsforhold: true,
                naermesteLeder: null,
            };
            const arbeidsgiver = plainToClass(Arbeidsgiver, arbeidsgiverJson);

            expect(arbeidsgiver.getName()).toBe('NAV (aktiv)');
        });

        it('Does not append "(aktiv)" when aktivArbeidsforhold is false', () => {
            const arbeidsgiverJson = {
                orgnummer: '123456789',
                juridiskOrgnummer: '123456789',
                navn: 'NAV',
                stillingsprosent: '100',
                stilling: 'Utvikler',
                aktivtArbeidsforhold: false,
                naermesteLeder: null,
            };
            const arbeidsgiver = plainToClass(Arbeidsgiver, arbeidsgiverJson);

            expect(arbeidsgiver.getName()).toBe('NAV');
        });
    });
});
