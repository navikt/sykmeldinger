import { describe, it, expect } from 'vitest'

import { Periode, PeriodeFragment, Periodetype } from 'queries'

import { getDescription, getPeriodTitle, getReadableLength, getSykmeldingperioderSorted } from './periodeUtils'
import { createSykmeldingPeriode } from './test/dataUtils'

describe('periodeUtils', () => {
    describe('getPeriodTitle', () => {
        it('Avventende periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }

            expect(getPeriodTitle(periode)).toBe('Avventende sykmelding')
        })

        it('100% periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    __typename: 'AktivitetIkkeMuligPeriode',
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            }
            expect(getPeriodTitle(periode)).toBe('100% sykmelding')
        })

        it('Gradert periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    __typename: 'GradertPeriode',
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getPeriodTitle(periode)).toBe('80% sykmelding')
        })

        it('Reisetilskudd periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.REISETILSKUDD,
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            }
            expect(getPeriodTitle(periode)).toBe('Reisetilskudd')
        })

        it('Behandlingsdager periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 2,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getPeriodTitle(periode)).toBe('Behandlingsdager')
        })
    })

    describe('getReadableLength', () => {
        it('1 dag returnerer', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-01',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getReadableLength(periode)).toBe('(1 dag)')
        })

        it('Avventende periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getReadableLength(periode)).toBe('(3 dager)')
        })

        it('100% periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    __typename: 'AktivitetIkkeMuligPeriode',
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            }
            expect(getReadableLength(periode)).toBe('(3 dager)')
        })

        it('Gradert periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    __typename: 'GradertPeriode',
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getReadableLength(periode)).toBe('(3 dager)')
        })

        it('Reisetilskudd periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.REISETILSKUDD,
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            }
            expect(getReadableLength(periode)).toBe('(3 dager)')
        })

        it('1 behandlingsdag periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getReadableLength(periode)).toBe('1 behandlingsdag i løpet av 3 dager')
        })

        it('Flere behandlingsdager periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 3,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getReadableLength(periode)).toBe('3 behandlingsdager i løpet av 3 dager')
        })
    })

    describe('getDescription', () => {
        it('Avventende periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: 'Dette er et innspill',
                type: Periodetype.AVVENTENDE,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getDescription(periode)).toBe('Avventende sykmelding i 3 dager')
        })

        it('100% periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    __typename: 'AktivitetIkkeMuligPeriode',
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            }
            expect(getDescription(periode)).toBe('100% sykmeldt i 3 dager')
        })

        it('100% periode med arbeidsgiver', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.AKTIVITET_IKKE_MULIG,
                aktivitetIkkeMulig: {
                    __typename: 'AktivitetIkkeMuligPeriode',
                    medisinskArsak: null,
                    arbeidsrelatertArsak: null,
                },
                reisetilskudd: false,
            }
            expect(getDescription(periode, 'NAV')).toBe('100% sykmeldt fra NAV i 3 dager')
        })

        it('Gradert periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    __typename: 'GradertPeriode',
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getDescription(periode)).toBe('80% sykmeldt i 3 dager')
        })

        it('Gradert periode med arbeidsgiver', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: {
                    __typename: 'GradertPeriode',
                    grad: 80,
                    reisetilskudd: false,
                },
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.GRADERT,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getDescription(periode, 'NAV')).toBe('80% sykmeldt fra NAV i 3 dager')
        })

        it('Reisetilskudd periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                type: Periodetype.REISETILSKUDD,
                aktivitetIkkeMulig: null,
                reisetilskudd: true,
            }
            expect(getDescription(periode)).toBe('Reisetilskudd i 3 dager')
        })

        it('1 behandlingsdag periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getDescription(periode)).toBe('1 behandlingsdag i løpet av 3 dager')
        })

        it('Flere behandlingsdager periode', () => {
            const periode: Periode = {
                __typename: 'Periode',
                fom: '2021-04-01',
                tom: '2021-04-03',
                gradert: null,
                behandlingsdager: 2,
                innspillTilArbeidsgiver: null,
                type: Periodetype.BEHANDLINGSDAGER,
                aktivitetIkkeMulig: null,
                reisetilskudd: false,
            }
            expect(getDescription(periode)).toBe('2 behandlingsdager i løpet av 3 dager')
        })
    })

    describe('getSykmeldingperioderSorted', () => {
        it('sorts by fom and tom', () => {
            const perioder: PeriodeFragment[] = [
                createSykmeldingPeriode({ fom: '2021-06-01', tom: '2021-06-03' }),
                createSykmeldingPeriode({ fom: '2021-05-01', tom: '2021-05-03' }),
                createSykmeldingPeriode({ fom: '2021-04-01', tom: '2021-04-03' }),
            ]

            expect(getSykmeldingperioderSorted(perioder).map((it) => ({ fom: it.fom, tom: it.tom }))).toEqual([
                { fom: '2021-04-01', tom: '2021-04-03' },
                { fom: '2021-05-01', tom: '2021-05-03' },
                { fom: '2021-06-01', tom: '2021-06-03' },
            ])
        })
    })
})
