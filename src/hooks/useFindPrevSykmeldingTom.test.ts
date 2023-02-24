import { MockedResponse } from '@apollo/client/testing'

import { StatusEvent, SykmeldingerDocument, SykmeldingFragment } from '../fetching/graphql.generated'
import { toDate } from '../utils/dateUtils'
import { createMock, createSykmelding, createSykmeldingPeriode } from '../utils/test/dataUtils'
import { renderHook, waitFor } from '../utils/test/testUtils'

import { useFindPrevSykmeldingTom } from './useFindPrevSykmeldingTom'

describe('useFindPrevSykmeldingTom', () => {
    it('should find previous sykmelding tom closest and before giver sykmelding tom', async () => {
        const sykmeldinger = [
            createSykmelding({
                id: 'id-1',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2022-08-06',
                        tom: '2022-08-18',
                    }),
                ],
            }),
            createSykmelding({
                id: 'id-2',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2022-10-10',
                        tom: '2022-10-29',
                    }),
                ],
            }),
            createSykmelding({
                id: 'id-3',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-02-11',
                        tom: '2023-02-25',
                    }),
                ],
            }),
            createSykmelding({
                id: 'id-4',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-02-02',
                        tom: '2023-02-10',
                    }),
                ],
            }),
        ]

        const { result } = renderHook(() => useFindPrevSykmeldingTom(sykmeldinger[3]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.previousSykmeldingTom).toEqual(toDate('2022-10-29'))
    })

    it('should return null if there is no previous sykmelding', async () => {
        const sykmeldinger = [
            createSykmelding({
                id: 'id-1',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-01-02',
                        tom: '2023-01-03',
                    }),
                ],
            }),
        ]

        const { result } = renderHook(() => useFindPrevSykmeldingTom(sykmeldinger[0]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.previousSykmeldingTom).toEqual(null)
    })

    it('should return null if other sykmelding tom is after giver sykmelding tom', async () => {
        const sykmeldinger = [
            createSykmelding({
                id: 'id-1',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-01-10',
                        tom: '2023-01-15',
                    }),
                ],
            }),
            createSykmelding({
                id: 'id-2',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-01-16',
                        tom: '2023-01-20',
                    }),
                ],
            }),
        ]

        const { result } = renderHook(() => useFindPrevSykmeldingTom(sykmeldinger[0]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.previousSykmeldingTom).toEqual(null)
    })

    describe('only check sykmeldinger with status SENDT or BEKREFTET', () => {
        it('should return the closest tom for sykmelding with status SENDT', async () => {
            const sykmeldinger = [
                createSykmelding({
                    id: 'id-1',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.AVBRUTT,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-02-11',
                            tom: '2023-02-25',
                        }),
                    ],
                }),
                createSykmelding({
                    id: 'id-2',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-01-10',
                            tom: '2023-01-29',
                        }),
                    ],
                }),
                createSykmelding({
                    id: 'id-3',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.APEN,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-02-11',
                            tom: '2023-02-21',
                        }),
                    ],
                }),
                createSykmelding({
                    id: 'id-4',
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-04-02',
                            tom: '2023-04-10',
                        }),
                    ],
                }),
            ]

            const { result } = renderHook(() => useFindPrevSykmeldingTom(sykmeldinger[3]), {
                mocks: [sykmeldingerMock(sykmeldinger)],
            })

            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.previousSykmeldingTom).toEqual(toDate('2023-01-29'))
        })

        it('should return the closest tom for sykmelding with status BEKREFTET', async () => {
            const sykmeldinger = [
                createSykmelding({
                    id: 'id-1',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2022-12-15',
                            tom: '2022-12-31',
                        }),
                    ],
                }),
                createSykmelding({
                    id: 'id-2',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.BEKREFTET,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-01-10',
                            tom: '2023-01-29',
                        }),
                    ],
                }),
                createSykmelding({
                    id: 'id-3',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.UTGATT,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-03-02',
                            tom: '2023-03-10',
                        }),
                    ],
                }),
                createSykmelding({
                    id: 'id-4',
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-03-18',
                            tom: '2023-03-25',
                        }),
                    ],
                }),
            ]

            const { result } = renderHook(() => useFindPrevSykmeldingTom(sykmeldinger[3]), {
                mocks: [sykmeldingerMock(sykmeldinger)],
            })

            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.previousSykmeldingTom).toEqual(toDate('2023-01-29'))
        })

        it('should only return closest tom for sykmelding with same arbeidsgiver', async () => {
            const sykmeldinger = [
                createSykmelding({
                    id: 'id-1',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgNavn: 'Arby Giver',
                            orgnummer: 'arbeidsgiver-a',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2022-12-15',
                            tom: '2022-12-31',
                        }),
                    ],
                }),
                createSykmelding({
                    id: 'id-2',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.BEKREFTET,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgNavn: 'Arby Taker',
                            orgnummer: 'arbeidsgiver-b',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-01-10',
                            tom: '2023-01-29',
                        }),
                    ],
                }),
            ]

            const { result } = renderHook(() => useFindPrevSykmeldingTom(sykmeldinger[1]), {
                mocks: [sykmeldingerMock(sykmeldinger)],
            })

            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.previousSykmeldingTom).toEqual(null)
        })
    })
})

function sykmeldingerMock(sykmeldinger: SykmeldingFragment[]): MockedResponse {
    return createMock({
        request: { query: SykmeldingerDocument },
        result: {
            data: {
                __typename: 'Query',
                sykmeldinger,
            },
        },
    })
}
