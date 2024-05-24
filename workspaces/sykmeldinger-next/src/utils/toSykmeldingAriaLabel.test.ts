import { describe, expect, it } from 'vitest'

import { Periodetype } from 'queries'

import { toSykmeldingAriaLabel } from './toSykmeldingAriaLabel'
import { createSykmelding, createSykmeldingPeriode } from './test/dataUtils'
import { getReadableSykmeldingLength } from './sykmeldingUtils'

describe('toSykmeldingAriaLabel', () => {
    describe('Periodetype', () => {
        it('should return text for periodtype AKTIVITET_IKKE_MULIG', () => {
            const sykmelding = createSykmelding({
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2022-07-01',
                        tom: '2022-07-05',
                        type: Periodetype.GRADERT,
                        gradert: {
                            __typename: 'GradertPeriode',
                            grad: 80,
                            reisetilskudd: false,
                        },
                    }),
                    createSykmeldingPeriode({
                        fom: '2022-08-06',
                        tom: '2022-08-18',
                        type: Periodetype.AKTIVITET_IKKE_MULIG,
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                '100% Sykmelding 1. juli - 18. august 2022 (2 sykmeldingsperioder)',
            )
        })

        it('should return text for periodtype GRADERT with the heighest procent', () => {
            const sykmelding = createSykmelding({
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2022-07-20',
                        tom: '2022-07-28',
                        type: Periodetype.GRADERT,
                        gradert: {
                            __typename: 'GradertPeriode',
                            grad: 80,
                            reisetilskudd: false,
                        },
                    }),
                    createSykmeldingPeriode({
                        fom: '2022-08-14',
                        tom: '2022-08-20',
                        type: Periodetype.GRADERT,
                        gradert: {
                            __typename: 'GradertPeriode',
                            grad: 60,
                            reisetilskudd: false,
                        },
                    }),
                    createSykmeldingPeriode({
                        fom: '2022-07-29',
                        tom: '2022-08-15',
                        type: Periodetype.GRADERT,
                        gradert: {
                            __typename: 'GradertPeriode',
                            grad: 70,
                            reisetilskudd: false,
                        },
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                '80% Sykmelding 20. juli - 20. august 2022 (3 sykmeldingsperioder)',
            )
        })

        it('should return text for periodtype BEHANDLINGSDAGER', () => {
            const sykmelding = createSykmelding({
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-04-12',
                        tom: '2023-04-14',
                        type: Periodetype.REISETILSKUDD,
                    }),
                    createSykmeldingPeriode({
                        fom: '2023-04-11',
                        tom: '2023-04-11',
                        type: Periodetype.BEHANDLINGSDAGER,
                        behandlingsdager: 2,
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                'Behandlingsdager, Sykmelding 11. - 14. april 2023 (2 sykmeldingsperioder)',
            )
        })

        it('should return text for periodtype REISETILSKUDD', () => {
            const sykmelding = createSykmelding({
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-01-19',
                        tom: '2023-02-03',
                        type: Periodetype.REISETILSKUDD,
                    }),
                    createSykmeldingPeriode({
                        fom: '2023-02-03',
                        tom: '2023-02-06',
                        type: Periodetype.AVVENTENDE,
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                'Reisetilskudd, Sykmelding 19. januar - 6. februar 2023 (2 sykmeldingsperioder)',
            )
        })

        it('should return text for periodtype AVVENTENDE', () => {
            const sykmelding = createSykmelding({
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-02-03',
                        tom: '2023-02-06',
                        type: Periodetype.AVVENTENDE,
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                'Avventende Sykmelding 3. - 6. februar 2023 ',
            )
        })
    })

    describe('SykmeldingTitle', () => {
        it('should return text for Utenlandsk sykmelding', () => {
            const sykmelding = createSykmelding({
                utenlandskSykmelding: {
                    __typename: 'UtenlandskSykmelding',
                    land: 'Frankrike',
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-01-02',
                        tom: '2024-01-05',
                        type: Periodetype.AKTIVITET_IKKE_MULIG,
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                '100% Utenlandsk sykmelding 2. - 5. januar 2024 ',
            )
        })

        it('should return text for Papirsykmelding', () => {
            const sykmelding = createSykmelding({
                papirsykmelding: true,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-01-01',
                        tom: '2024-02-14',
                        type: Periodetype.AVVENTENDE,
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                'Avventende Papirsykmelding 1. januar - 14. februar 2024 ',
            )
        })

        it('should return text for Egenmelding', () => {
            const sykmelding = createSykmelding({
                egenmeldt: true,
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-02-11',
                        tom: '2024-02-14',
                        type: Periodetype.GRADERT,
                        gradert: {
                            __typename: 'GradertPeriode',
                            grad: 70,
                            reisetilskudd: false,
                        },
                    }),
                ],
            })
            expect(toSykmeldingAriaLabel(sykmelding, getReadableSykmeldingLength(sykmelding))).toEqual(
                '70% Egenmelding 11. - 14. februar 2024 ',
            )
        })
    })
})
