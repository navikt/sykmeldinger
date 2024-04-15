import { describe, expect, it } from 'vitest'
import { MockedResponse } from '@apollo/client/testing'

import { Arbeidsgiver, StatusEvent, SykmeldingerDocument, SykmeldingFragment } from 'queries'

import { createMock, createSykmelding, createSykmeldingPeriode } from '../utils/test/dataUtils'
import { renderHook, waitFor } from '../utils/test/testUtils'

import { useFindRelevantArbeidsgivere } from './useFindRelevantArbeidsgivere'

describe('useFindRelevantArbeidsgivere', () => {
    it('should find arbeidsgivere in previous SENDT sykmeldinger where period is within relevant sykmelding', async () => {
        // contains 1 APEN sykmelding in the future, 1 SENDT sykmelding with arbeidsgiver = null, 1 AVBRUTT sykmelding and 0 brukerinfoArbeidsgivere
        const sykmeldinger: SykmeldingFragment[] = [
            createSykmelding({
                id: 'id-1',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '1111111',
                        orgNavn: 'Bedrift 1',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-03-01',
                        tom: '2024-03-10',
                    }),
                ],
            }),
            createSykmelding({
                id: 'id-2',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: null,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-02-01',
                        tom: '2024-02-16',
                    }),
                ],
            }),
            // relevant sykmelding
            createSykmelding({
                id: 'id-3',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                    arbeidsgiver: null,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-02-07',
                        tom: '2024-02-16',
                    }),
                ],
            }),
            createSykmelding({
                id: 'id-4',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.AVBRUTT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '00000000',
                        orgNavn: 'tull',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-02-07',
                        tom: '2024-02-16',
                    }),
                ],
            }),
            // sykmeldingsperiod within
            createSykmelding({
                id: 'id-5',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '5555555',
                        orgNavn: 'Bedrift 5',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-02-01',
                        tom: '2024-02-14',
                    }),
                ],
            }),
            // sykmeldingsperiod within
            createSykmelding({
                id: 'id-6',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '6666666',
                        orgNavn: 'Bedrift 6',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-02-01',
                        tom: '2024-02-16',
                    }),
                ],
            }),
        ]

        const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[2], []), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.arbeidsgivere).toEqual([
            {
                orgnummer: '5555555',
                navn: 'Bedrift 5',
            },
            {
                orgnummer: '6666666',
                navn: 'Bedrift 6',
            },
        ])
    })

    it('should find arbeidsgivere in previous SENDT sykmeldinger when relevant sykmelding is kant i kant i kant', async () => {
        const sykmeldinger: SykmeldingFragment[] = [
            // sykmeldingsperiod kant i kant
            createSykmelding({
                id: 'id-1',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '12345678',
                        orgNavn: 'Bedrift 1',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-03-01',
                        tom: '2024-03-05',
                    }),
                ],
            }),
            // sykmeldingsperiod kant i kant
            createSykmelding({
                id: 'id-2',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '2222222',
                        orgNavn: 'Bedrift 2',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-03-06',
                        tom: '2024-03-10',
                    }),
                ],
            }),
            // relevant sykmelding
            createSykmelding({
                id: 'id-3',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                    arbeidsgiver: null,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-03-11',
                        tom: '2024-03-15',
                    }),
                ],
            }),
        ]

        const brukerinfoArbeidsgiver: Arbeidsgiver[] = [
            {
                __typename: 'Arbeidsgiver',
                orgnummer: '222',
                navn: 'Bedrift 22',
                aktivtArbeidsforhold: false,
                naermesteLeder: null,
            },
        ]

        const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[2], brukerinfoArbeidsgiver), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.arbeidsgivere).toEqual([
            {
                orgnummer: '12345678',
                navn: 'Bedrift 1',
            },
            {
                orgnummer: '2222222',
                navn: 'Bedrift 2',
            },
            {
                orgnummer: '222',
                navn: 'Bedrift 22',
            },
        ])
    })

    it('should ignore previous SENDT sykmeldinger when fom is same day as relevant sykmelding fom', async () => {
        const sykmeldinger: SykmeldingFragment[] = [
            createSykmelding({
                id: 'id-1',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '12345678',
                        orgNavn: 'Bedrift 1',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-04-04',
                        tom: '2024-04-14',
                    }),
                ],
            }),
            // relevant sykmelding
            createSykmelding({
                id: 'id-2',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                    arbeidsgiver: null,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-04-04',
                        tom: '2024-04-20',
                    }),
                ],
            }),
        ]

        const brukerinfoArbeidsgiver: Arbeidsgiver[] = [
            {
                __typename: 'Arbeidsgiver',
                orgnummer: '222',
                navn: 'Bedrift 22',
                aktivtArbeidsforhold: false,
                naermesteLeder: null,
            },
        ]

        const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[1], brukerinfoArbeidsgiver), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.arbeidsgivere).toEqual(null)
    })

    it('should return null and ignore previous SENDT sykmelding when days between relevant sykmelding fom', async () => {
        const sykmeldinger: SykmeldingFragment[] = [
            createSykmelding({
                id: 'id-1',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '12345678',
                        orgNavn: 'Bedrift 1',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-01-28',
                        tom: '2024-01-30',
                    }),
                ],
            }),
            // relevant sykmelding
            createSykmelding({
                id: 'id-2',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                    arbeidsgiver: null,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-04-04',
                        tom: '2024-04-20',
                    }),
                ],
            }),
        ]

        const brukerinfoArbeidsgiver: Arbeidsgiver[] = [
            {
                __typename: 'Arbeidsgiver',
                orgnummer: '222',
                navn: 'Bedrift 22',
                aktivtArbeidsforhold: false,
                naermesteLeder: null,
            },
        ]

        const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[1], brukerinfoArbeidsgiver), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.arbeidsgivere).toEqual(null)
    })

    describe('filter duplicate arbeidsgivere', () => {
        it('should find unique arbeidsgivere in previous SENDT sykmeldinger where period in within relevant sykmelding and include brukerinformasjon with duplicate', async () => {
            // contains 1 SENDT sykmelding with gap and with duplicate arbeidsgiver from brukerinfoArbeidsgivere
            const sykmeldinger: SykmeldingFragment[] = [
                // sykmeldingsperiod within
                createSykmelding({
                    id: 'id-1',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '3333333',
                            orgNavn: 'Bedrift 3',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-02-09',
                            tom: '2024-02-10',
                        }),
                    ],
                }),
                // sykmeldingsperiod outside
                createSykmelding({
                    id: 'id-2',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '12345678',
                            orgNavn: 'Bedrift 1',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-02-01',
                            tom: '2024-02-03',
                        }),
                    ],
                }),
                // relevant sykmelding
                createSykmelding({
                    id: 'id-3',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.APEN,
                        arbeidsgiver: null,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-02-07',
                            tom: '2024-02-16',
                        }),
                    ],
                }),
            ]

            const brukerinfoArbeidsgiver: Arbeidsgiver[] = [
                {
                    __typename: 'Arbeidsgiver',
                    orgnummer: '3333333',
                    navn: 'Bedrift 3',
                    aktivtArbeidsforhold: false,
                    naermesteLeder: null,
                },
                {
                    __typename: 'Arbeidsgiver',
                    orgnummer: '99999999',
                    navn: 'Firma AS',
                    aktivtArbeidsforhold: false,
                    naermesteLeder: null,
                },
            ]

            const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[2], brukerinfoArbeidsgiver), {
                mocks: [sykmeldingerMock(sykmeldinger)],
            })

            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.arbeidsgivere).toEqual([
                {
                    orgnummer: '3333333',
                    navn: 'Bedrift 3',
                },
                {
                    orgnummer: '99999999',
                    navn: 'Firma AS',
                },
            ])
        })
    })

    describe('previous SENDT sykmelding with fom after relevant sykmelding fom', () => {
        it('should find arbeidsgiver in previous SENDT sykmelding and ignore SENDT sykmelding when fom is after and outside of relevant sykmelding', async () => {
            const sykmeldinger: SykmeldingFragment[] = [
                createSykmelding({
                    id: 'id-1',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '1111111',
                            orgNavn: 'Bedrift 1',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-03-01',
                            tom: '2024-03-10',
                        }),
                    ],
                }),
                // relevant sykmelding
                createSykmelding({
                    id: 'id-2',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.APEN,
                        arbeidsgiver: null,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-02-07',
                            tom: '2024-02-16',
                        }),
                    ],
                }),
                // sykmeldingsperiod within
                createSykmelding({
                    id: 'id-3',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '3333333',
                            orgNavn: 'Bedrift 3',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-02-01',
                            tom: '2024-02-14',
                        }),
                    ],
                }),
            ]

            const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[1], []), {
                mocks: [sykmeldingerMock(sykmeldinger)],
            })

            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.arbeidsgivere).toEqual([
                {
                    orgnummer: '3333333',
                    navn: 'Bedrift 3',
                },
            ])
        })

        it('should find arbeidsgiver in previous SENDT sykmelding and ignore SENDT sykmelding when fom is after and inside of relevant sykmelding', async () => {
            const sykmeldinger: SykmeldingFragment[] = [
                createSykmelding({
                    id: 'id-1',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '1111111',
                            orgNavn: 'Bedrift 1',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-03-01',
                            tom: '2024-03-10',
                        }),
                    ],
                }),
                // relevant sykmelding
                createSykmelding({
                    id: 'id-2',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.APEN,
                        arbeidsgiver: null,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-02-07',
                            tom: '2024-02-16',
                        }),
                    ],
                }),
                // sykmeldingsperiod within
                createSykmelding({
                    id: 'id-3',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: 'firma-id',
                            orgNavn: 'Firma',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-02-01',
                            tom: '2024-02-14',
                        }),
                    ],
                }),
            ]

            const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[1], []), {
                mocks: [sykmeldingerMock(sykmeldinger)],
            })

            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.arbeidsgivere).toEqual([
                {
                    orgnummer: 'firma-id',
                    navn: 'Firma',
                },
            ])
        })
    })

    it('should return null if earlier sykmelding is not kan i kant or inside relevant sykmelding', async () => {
        const sykmeldinger: SykmeldingFragment[] = [
            createSykmelding({
                id: 'id-1',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.SENDT,
                    arbeidsgiver: {
                        __typename: 'ArbeidsgiverStatus',
                        orgnummer: '1111111',
                        orgNavn: 'Bedrift 1',
                    },
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-01-01',
                        tom: '2024-01-10',
                    }),
                ],
            }),
            // relevant sykmelding
            createSykmelding({
                id: 'id-2',
                sykmeldingStatus: {
                    ...createSykmelding().sykmeldingStatus,
                    statusEvent: StatusEvent.APEN,
                    arbeidsgiver: null,
                },
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2024-02-07',
                        tom: '2024-02-16',
                    }),
                ],
            }),
        ]

        const brukerinfoArbeidsgiver: Arbeidsgiver[] = [
            {
                __typename: 'Arbeidsgiver',
                orgnummer: '12345678',
                navn: 'Bedrift 1',
                aktivtArbeidsforhold: false,
                naermesteLeder: null,
            },
            {
                __typename: 'Arbeidsgiver',
                orgnummer: '2222222',
                navn: 'Bedrift 2',
                aktivtArbeidsforhold: false,
                naermesteLeder: null,
            },
        ]

        const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[1], brukerinfoArbeidsgiver), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.arbeidsgivere).toEqual(null)
    })

    describe('ignore sykmelding with same fom ', () => {
        it('should ignore sykmeldingsperiode when fom is the same and find arbeidsgivere in previous SENDT sykmeldinger when kant i kant', async () => {
            const sykmeldinger: SykmeldingFragment[] = [
                // sykmeldingsperiod kant i kant
                createSykmelding({
                    id: 'id-1',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '12345678',
                            orgNavn: 'Bedrift 1',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-03-01',
                            tom: '2024-03-05',
                        }),
                    ],
                }),
                // same fom as relevant sykmelding
                createSykmelding({
                    id: 'id-2',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '4444444',
                            orgNavn: 'Bedrift 4',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-03-06',
                            tom: '2024-03-13',
                        }),
                    ],
                }),
                // sykmeldingsperiod outside
                createSykmelding({
                    id: 'id-3',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.SENDT,
                        arbeidsgiver: {
                            __typename: 'ArbeidsgiverStatus',
                            orgnummer: '2222222',
                            orgNavn: 'Bedrift 2',
                        },
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-03-14',
                            tom: '2024-03-22',
                        }),
                    ],
                }),
                // relevant sykmelding
                createSykmelding({
                    id: 'id-4',
                    sykmeldingStatus: {
                        ...createSykmelding().sykmeldingStatus,
                        statusEvent: StatusEvent.APEN,
                        arbeidsgiver: null,
                    },
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2024-03-06',
                            tom: '2024-03-20',
                        }),
                    ],
                }),
            ]

            const brukerinfoArbeidsgiver: Arbeidsgiver[] = [
                {
                    __typename: 'Arbeidsgiver',
                    orgnummer: '3333333',
                    navn: 'Bedrift 3',
                    aktivtArbeidsforhold: false,
                    naermesteLeder: null,
                },
                {
                    __typename: 'Arbeidsgiver',
                    orgnummer: '2222222',
                    navn: 'Bedrift 2',
                    aktivtArbeidsforhold: false,
                    naermesteLeder: null,
                },
            ]

            const { result } = renderHook(() => useFindRelevantArbeidsgivere(sykmeldinger[3], brukerinfoArbeidsgiver), {
                mocks: [sykmeldingerMock(sykmeldinger)],
            })

            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.arbeidsgivere).toEqual([
                {
                    orgnummer: '12345678',
                    navn: 'Bedrift 1',
                },
                {
                    orgnummer: '2222222',
                    navn: 'Bedrift 2',
                },
                {
                    orgnummer: '3333333',
                    navn: 'Bedrift 3',
                },
            ])
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
