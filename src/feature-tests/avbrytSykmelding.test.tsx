import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, screen, waitFor, waitForElementToBeRemoved } from '../utils/test/testUtils'
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
            statusEvent: StatusEvent.Avbrutt,
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

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
    })

    it('should show sykmelding as avbrutt', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        expect(screen.queryByText(/Jeg vil avbryte sykmeldingen/)).not.toBeInTheDocument()

        expect(await screen.findByText(/Sykmeldingen ble avbrutt av deg/)).toBeInTheDocument()
        expect(await screen.findByText(/GJØR UTFYLLINGEN PÅ NYTT/)).toBeInTheDocument()
    })

    it('should reopen avbrutt sykmelding', async () => {
        render(<SykmeldingPage />, {
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
                            status: SykmeldingChangeStatus.Gjenapne,
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            changeSykmeldingStatus: {
                                ...avbruttSykmelding,
                                sykmeldingStatus: {
                                    ...avbruttSykmelding.sykmeldingStatus,
                                    statusEvent: StatusEvent.Apen,
                                    timestamp: '2022-03-01',
                                },
                            },
                        },
                    },
                }),
            ],
        })

        expect(await screen.findByText(/Sykmeldingen ble avbrutt av deg/)).toBeInTheDocument()
        userEvent.click(screen.getByRole('button', { name: 'GJØR UTFYLLINGEN PÅ NYTT' }))

        await waitFor(() => expect(screen.queryByText(/Sykmeldingen ble avbrutt av deg/)).not.toBeInTheDocument())
        expect(await screen.findByText(/Jeg vil avbryte sykmeldingen/)).toBeInTheDocument()
    })

    it('should avbrytte open sykmelding', async () => {
        const apenSykmelding = createSykmelding({
            id: 'avbrutt-sykmelding',
            sykmeldingStatus: {
                __typename: 'SykmeldingStatus',
                timestamp: '2022-02-01',
                statusEvent: StatusEvent.Apen,
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

        render(<SykmeldingPage />, {
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
                            status: SykmeldingChangeStatus.Avbryt,
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            changeSykmeldingStatus: {
                                ...apenSykmelding,
                                sykmeldingStatus: {
                                    ...apenSykmelding.sykmeldingStatus,
                                    statusEvent: StatusEvent.Avbrutt,
                                    timestamp: '2022-03-01',
                                },
                            },
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        userEvent.click(screen.getByRole('button', { name: 'Jeg vil avbryte sykmeldingen' }))
        expect(await screen.findByText(/Er du sikker på at du vil avbryte sykmeldingen?/)).toBeInTheDocument()

        userEvent.click(screen.getByRole('button', { name: 'Ja, jeg er sikker' }))

        expect(await screen.findByText('Sykmeldingen ble avbrutt av deg')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Ferdig' })).toBeInTheDocument()
    })

    it('should show details for avbrutt egenmelding sykmelding', async () => {
        const apenSykmelding = createSykmelding({
            id: 'avbrutt-sykmelding',
            sykmeldingStatus: {
                __typename: 'SykmeldingStatus',
                timestamp: '2022-02-01',
                statusEvent: StatusEvent.Avbrutt,
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

        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({
                    sykmeldingId: 'avbrutt-sykmelding',
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        expect(screen.getByRole('heading', { name: 'Egenmeldingen ble avbrutt av deg' })).toBeInTheDocument()
    })
})
