import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import Periode from './Periode';

describe('Periode', () => {
    describe('getPeriodTitle', () => {
        it('Avventende periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getPeriodTitle()).toBe('Avventende sykmelding');
        });

        it('100% periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'AKTIVITET_IKKE_MULIG',
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getPeriodTitle()).toBe('100% sykmelding');
        });

        it('Gradert periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'GRADERT',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getPeriodTitle()).toBe('80% sykmelding');
        });

        it('Reisetilskudd periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'REISETILSKUDD',
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getPeriodTitle()).toBe('Reisetilskudd');
        });

        it('Behandlingsdager periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 2,
                innspillTilArbeidsgiver: null,
                type: 'BEHANDLINGSDAGER',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getPeriodTitle()).toBe('Behandlingsdager');
        });
    });

    describe('getReadablePeriod', () => {
        it('Returns correct format', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadablePeriod()).toBe('1. april 2021 - 3. april 2021');
        });
    });

    describe('getLength', () => {
        it('Handles fom/tom same day', () => {
            const periodeJson = {
                fom: '2021-04-29',
                tom: '2021-04-29',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getLength()).toBe(1);
        });

        it('Handles fom/tom within same month', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getLength()).toBe(3);
        });

        it('Handles fom/tom cross same month', () => {
            const periodeJson = {
                fom: '2021-04-29',
                tom: '2021-05-01',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getLength()).toBe(3);
        });

        it('Handles fom/tom cross year', () => {
            const periodeJson = {
                fom: '2021-12-31',
                tom: '2022-01-01',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getLength()).toBe(2);
        });
    });

    describe('getReadableLength', () => {
        it('1 dag returnerer', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-01',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadableLength()).toBe('1 dag');
        });

        it('Avventende periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadableLength()).toBe('3 dager');
        });

        it('100% periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'AKTIVITET_IKKE_MULIG',
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadableLength()).toBe('3 dager');
        });

        it('Gradert periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'GRADERT',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadableLength()).toBe('3 dager');
        });

        it('Reisetilskudd periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'REISETILSKUDD',
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadableLength()).toBe('3 dager');
        });

        it('1 behandlingsdag periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: 'BEHANDLINGSDAGER',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadableLength()).toBe('1 behandlingsdag i løpet av 3 dager');
        });

        it('Flere behandlingsdager periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 3,
                innspillTilArbeidsgiver: null,
                type: 'BEHANDLINGSDAGER',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getReadableLength()).toBe('3 behandlingsdager i løpet av 3 dager');
        });
    });

    describe('getDescription', () => {
        it('Avventende periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: 'AVVENTENDE',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription()).toBe('Avventende sykmelding i 3 dager');
        });

        it('100% periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'AKTIVITET_IKKE_MULIG',
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription()).toBe('100% sykmeldt i 3 dager');
        });

        it('100% periode med arbeidsgiver', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'AKTIVITET_IKKE_MULIG',
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription('NAV')).toBe('100% sykmeldt fra NAV i 3 dager');
        });

        it('Gradert periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'GRADERT',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription()).toBe('80% sykmeldt i 3 dager');
        });

        it('Gradert periode med arbeidsgiver', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'GRADERT',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription('NAV')).toBe('80% sykmeldt fra NAV i 3 dager');
        });

        it('Reisetilskudd periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: 'REISETILSKUDD',
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription()).toBe('Reisetilskudd i 3 dager');
        });

        it('1 behandlingsdag periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: 'BEHANDLINGSDAGER',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription()).toBe('1 behandlingsdag i løpet av 3 dager');
        });

        it('Flere behandlingsdager periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 2,
                innspillTilArbeidsgiver: null,
                type: 'BEHANDLINGSDAGER',
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            const periode = plainToClass(Periode, periodeJson);
            expect(periode.getDescription()).toBe('2 behandlingsdager i løpet av 3 dager');
        });
    });
});
