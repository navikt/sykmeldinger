import {
    getDescription,
    getLength,
    getPeriodTitle,
    getReadableLength,
    getReadablePeriod,
    Periode,
    Periodetype,
} from './Periode';

describe('Periode', () => {
    describe('getPeriodTitle', () => {
        it('Avventende periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };

            expect(getPeriodTitle(periodeJson)).toBe('Avventende sykmelding');
        });

        it('100% periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            expect(getPeriodTitle(periodeJson)).toBe('100% sykmelding');
        });

        it('Gradert periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getPeriodTitle(periodeJson)).toBe('80% sykmelding');
        });

        it('Reisetilskudd periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.REISETILSKUDD,
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            };
            expect(getPeriodTitle(periodeJson)).toBe('Reisetilskudd');
        });

        it('Behandlingsdager periode', () => {
            const periodeJson = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 2,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getPeriodTitle(periodeJson)).toBe('Behandlingsdager');
        });
    });

    describe('getReadablePeriod', () => {
        it('Returns month and year only once if fom and tom have the same month and year', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadablePeriod(periodeJson)).toBe('1. - 3. april 2021');
        });

        it('Returns both months if month is different and year is equal for fom and tom', () => {
            const periodeJson: Periode = {
                fom: '2021-01-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadablePeriod(periodeJson)).toBe('1. jan. - 3. april 2021');
        });
        it('Returns both months and years if the month and year are different', () => {
            const periodeJson: Periode = {
                fom: '2020-12-01',
                tom: '2021-02-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadablePeriod(periodeJson)).toBe('1. des. 2020 - 3. feb. 2021');
        });
    });

    describe('getLength', () => {
        it('Handles fom/tom same day', () => {
            const periodeJson: Periode = {
                fom: '2021-04-29',
                tom: '2021-04-29',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getLength(periodeJson)).toBe(1);
        });

        it('Handles fom/tom within same month', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getLength(periodeJson)).toBe(3);
        });

        it('Handles fom/tom cross same month', () => {
            const periodeJson: Periode = {
                fom: '2021-04-29',
                tom: '2021-05-01',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getLength(periodeJson)).toBe(3);
        });

        it('Handles fom/tom cross year', () => {
            const periodeJson: Periode = {
                fom: '2021-12-31',
                tom: '2022-01-01',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getLength(periodeJson)).toBe(2);
        });
    });

    describe('getReadableLength', () => {
        it('1 dag returnerer', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-01',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadableLength(periodeJson)).toBe('(1 dag)');
        });

        it('Avventende periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadableLength(periodeJson)).toBe('(3 dager)');
        });

        it('100% periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            expect(getReadableLength(periodeJson)).toBe('(3 dager)');
        });

        it('Gradert periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadableLength(periodeJson)).toBe('(3 dager)');
        });

        it('Reisetilskudd periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.REISETILSKUDD,
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            };
            expect(getReadableLength(periodeJson)).toBe('(3 dager)');
        });

        it('1 behandlingsdag periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadableLength(periodeJson)).toBe('1 behandlingsdag i løpet av 3 dager');
        });

        it('Flere behandlingsdager periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 3,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getReadableLength(periodeJson)).toBe('3 behandlingsdager i løpet av 3 dager');
        });
    });

    describe('getDescription', () => {
        it('Avventende periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getDescription(periodeJson)).toBe('Avventende sykmelding i 3 dager');
        });

        it('100% periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            expect(getDescription(periodeJson)).toBe('100% sykmeldt i 3 dager');
        });

        it('100% periode med arbeidsgiver', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            };
            expect(getDescription(periodeJson, 'NAV')).toBe('100% sykmeldt fra NAV i 3 dager');
        });

        it('Gradert periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getDescription(periodeJson)).toBe('80% sykmeldt i 3 dager');
        });

        it('Gradert periode med arbeidsgiver', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getDescription(periodeJson, 'NAV')).toBe('80% sykmeldt fra NAV i 3 dager');
        });

        it('Reisetilskudd periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.REISETILSKUDD,
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            };
            expect(getDescription(periodeJson)).toBe('Reisetilskudd i 3 dager');
        });

        it('1 behandlingsdag periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getDescription(periodeJson)).toBe('1 behandlingsdag i løpet av 3 dager');
        });

        it('Flere behandlingsdager periode', () => {
            const periodeJson: Periode = {
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 2,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            };
            expect(getDescription(periodeJson)).toBe('2 behandlingsdager i løpet av 3 dager');
        });
    });
});
