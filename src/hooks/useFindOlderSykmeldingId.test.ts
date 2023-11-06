import { describe, it, expect } from 'vitest'
import { formatISO, sub } from 'date-fns'
import { MockedResponse } from '@apollo/client/testing'

import { Periodetype, StatusEvent, SykmeldingerDocument, SykmeldingFragment } from 'queries'

import { renderHook, waitFor } from '../utils/test/testUtils'
import { dateAdd, dateSub } from '../utils/dateUtils'
import { createMock, createSykmelding, createUnderBehandlingMerknad } from '../utils/test/dataUtils'

import useFindOlderSykmeldingId from './useFindOlderSykmeldingId'

describe('useFindOlderSykmeldingId', () => {
    it('should find the earlier sykmelding when there is one APEN before', async () => {
        const sykmeldinger = [
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'SYKME-1' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 2 }), id: 'SYKME-2' }),
            createSykmelding({ mottattTidspunkt: dateAdd(new Date(), { days: 15 }), id: 'SYKME-3' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[1]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1')
    })

    it('should find the earlier sykmelding but disregard the sykmelding that is older than 12 months', async () => {
        const sykmeldinger = [
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { months: 12, days: 16 }), id: 'SYKME-0' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'SYKME-1' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 2 }), id: 'SYKME-2' }),
            createSykmelding({ mottattTidspunkt: dateAdd(new Date(), { days: 15 }), id: 'SYKME-3' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[2]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1')
    })

    it('should find the earlier sykmelding but disregard the sykmelding that does not have APEN status', async () => {
        const sykmeldinger = [
            createSykmelding(
                { mottattTidspunkt: dateSub(new Date(), { days: 40 }), id: 'SYKME-0' },
                StatusEvent.AVBRUTT,
            ),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'SYKME-1' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 2 }), id: 'SYKME-2' }),
            createSykmelding({ mottattTidspunkt: dateAdd(new Date(), { days: 15 }), id: 'SYKME-3' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[2]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1')
    })

    it('should find the earliest sykmelding', async () => {
        const sykmeldinger = [
            // 2 dager siden
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 2 }), id: 'this-sykmelding' }),
            // 30 dager siden
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'previous-sykmelding' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[0]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toEqual('previous-sykmelding')
    })

    it('should find the earlier sykmelding but disregard the sykmelding that is APEN but UNDER_BEHANDLING', async () => {
        const sykmeldinger = [
            createSykmelding({
                mottattTidspunkt: formatISO(sub(new Date(), { days: 366 })),
                id: 'SYKME-0',
                ...createUnderBehandlingMerknad(),
            }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'SYKME-1' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 2 }), id: 'SYKME-2' }),
            createSykmelding({ mottattTidspunkt: dateAdd(new Date(), { days: 15 }), id: 'SYKME-3' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[2]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1')
    })

    it('should handle being the first sykmelding', async () => {
        const sykmeldinger = [
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'SYKME-1' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 15 }), id: 'SYKME-2' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 2 }), id: 'SYKME-3' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[0]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toBeNull()
    })

    it('should allow two sykmeldinger with the exact same period', async () => {
        const sykmeldinger = [
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 7 }), id: 'SYKME-1' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 7 }), id: 'SYKME-2' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[1]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toBeNull()
    })

    it('should still work when the two first sykmeldinger has same date but the provided sykmelding is later', async () => {
        const sykmeldinger = [
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'SYKME-1' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 30 }), id: 'SYKME-2' }),
            createSykmelding({ mottattTidspunkt: dateSub(new Date(), { days: 7 }), id: 'SYKME-3' }),
        ]

        const { result } = renderHook(() => useFindOlderSykmeldingId(sykmeldinger[2]), {
            mocks: [sykmeldingerMock(sykmeldinger)],
        })
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.earliestSykmeldingId).toEqual('SYKME-1')
    })

    describe('should work when there is overlap between sykmeldinger', () => {
        const createSingle10PeriodApen = (date: string, id: string): SykmeldingFragment => ({
            ...createSykmelding({ mottattTidspunkt: date, id }),
            sykmeldingsperioder: [
                {
                    __typename: 'Periode',
                    fom: date,
                    tom: dateAdd(date, { days: 10 }),
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                    aktivitetIkkeMulig: null,
                    reisetilskudd: false,
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                },
            ],
        })

        const newest = createSingle10PeriodApen(dateSub(new Date(), { days: 1 }), 'SYKME-1')
        const oldest = createSingle10PeriodApen(dateSub(new Date(), { days: 7 }), 'SYKME-2')

        it('newest should point to oldest', async () => {
            const { result } = renderHook(() => useFindOlderSykmeldingId(newest), {
                mocks: [sykmeldingerMock([newest, oldest])],
            })
            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.earliestSykmeldingId).toEqual('SYKME-2')
        })

        it('oldest should NOT point to newest', async () => {
            const { result } = renderHook(() => useFindOlderSykmeldingId(oldest), {
                mocks: [sykmeldingerMock([newest, oldest])],
            })
            await waitFor(() => expect(result.current.isLoading).toBe(false))

            expect(result.current.earliestSykmeldingId).toBeNull()
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
