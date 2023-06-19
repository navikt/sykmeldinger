import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { axe, render, screen, waitFor, waitForElementToBeRemoved } from '../utils/test/testUtils'
import {
    ChangeSykmeldingStatusDocument,
    StatusEvent,
    SykmeldingChangeStatus,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
} from '../fetching/graphql.generated'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

import { createExtraFormDataMock } from './mockUtils'

describe('Avbryt sykmelding', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/avbrutt-sykmelding`)
    })

    const avbruttSykmelding = createSykmelding({
        id: 'avbrutt-sykmelding',
        sykmeldingStatus: {
            __typename: 'SykmeldingStatus',
            timestamp: '2022-02-01',
            statusEvent: StatusEvent.AVBRUTT,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        egenmeldt: false,
    })

    const baseMocks = [
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'avbrutt-sykmelding' } },
            result: { data: { __typename: 'Query', sykmelding: avbruttSykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [avbruttSykmelding] } },
        }),
    ]

    it('should show sykmelding as avbrutt', async () => {
        const { container } = render(<SykmeldingPage />, { mocks: [...baseMocks] })

        expect(screen.queryByText(/Jeg vil avbryte sykmeldingen/)).not.toBeInTheDocument()

        expect(await screen.findByText(/Sykmeldingen ble avbrutt av deg/)).toBeInTheDocument()
        expect(screen.getByText(/GJØR UTFYLLINGEN PÅ NYTT/)).toBeInTheDocument()
        expect(
            await axe(container, {
                // This is a false positive on the print button
                rules: {
                    'svg-img-alt': { enabled: false },
                },
            }),
        ).toHaveNoViolations()
    })

    it('should reopen avbrutt sykmelding', async () => {
        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({
                    sykmeldingId: 'avbrutt-sykmelding',
                }),
            ],
        })

        expect(await screen.findByText(/Sykmeldingen ble avbrutt av deg/)).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'GJØR UTFYLLINGEN PÅ NYTT' }))

        await waitFor(() => expect(screen.queryByText(/Sykmeldingen ble avbrutt av deg/)).not.toBeInTheDocument())
        expect(await screen.findByText(/Jeg vil avbryte sykmeldingen/)).toBeInTheDocument()
    })

    it('should avbrytte open sykmelding', async () => {
        const apenSykmelding = createSykmelding({
            id: 'avbrutt-sykmelding',
            sykmeldingStatus: {
                __typename: 'SykmeldingStatus',
                timestamp: '2022-02-01',
                statusEvent: StatusEvent.APEN,
                sporsmalOgSvarListe: [],
                arbeidsgiver: null,
            },
            egenmeldt: false,
        })

        const baseMocks = [
            createMock({
                request: { query: SykmeldingByIdDocument, variables: { id: 'avbrutt-sykmelding' } },
                result: { data: { __typename: 'Query', sykmelding: apenSykmelding } },
            }),
            createMock({
                request: { query: SykmeldingerDocument },
                result: { data: { __typename: 'Query', sykmeldinger: [apenSykmelding] } },
            }),
        ]

        const { container } = render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({
                    sykmeldingId: 'avbrutt-sykmelding',
                }),
                createMock({
                    request: {
                        query: ChangeSykmeldingStatusDocument,
                        variables: {
                            sykmeldingId: 'avbrutt-sykmelding',
                            status: SykmeldingChangeStatus.AVBRYT,
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            changeSykmeldingStatus: {
                                ...apenSykmelding,
                                sykmeldingStatus: {
                                    ...apenSykmelding.sykmeldingStatus,
                                    statusEvent: StatusEvent.AVBRUTT,
                                    timestamp: '2022-03-01',
                                },
                            },
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmeldingen'))

        await userEvent.click(await screen.findByRole('button', { name: 'Jeg vil avbryte sykmeldingen' }))
        expect(screen.getByText(/Er du sikker på at du vil avbryte sykmeldingen?/)).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Ja, jeg er sikker' }))

        expect(await screen.findByText('Sykmeldingen ble avbrutt av deg')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Ferdig' })).toBeInTheDocument()
        expect(
            await axe(container, {
                // This is a false positive on the print button
                rules: {
                    'svg-img-alt': { enabled: false },
                },
            }),
        ).toHaveNoViolations()
    })

    it('should show details for avbrutt egenmelding sykmelding', async () => {
        const apenSykmelding = createSykmelding({
            id: 'avbrutt-sykmelding',
            sykmeldingStatus: {
                __typename: 'SykmeldingStatus',
                timestamp: '2022-02-01',
                statusEvent: StatusEvent.AVBRUTT,
                sporsmalOgSvarListe: [],
                arbeidsgiver: null,
            },
            egenmeldt: true,
        })

        const baseMocks = [
            createMock({
                request: { query: SykmeldingByIdDocument, variables: { id: 'avbrutt-sykmelding' } },
                result: { data: { __typename: 'Query', sykmelding: apenSykmelding } },
            }),
            createMock({
                request: { query: SykmeldingerDocument },
                result: { data: { __typename: 'Query', sykmeldinger: [apenSykmelding] } },
            }),
        ]

        const { container } = render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({
                    sykmeldingId: 'avbrutt-sykmelding',
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmeldingen'))
        expect(screen.getByRole('heading', { name: 'Egenmeldingen ble avbrutt av deg' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })
})
