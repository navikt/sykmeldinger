import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, screen, waitFor, waitForElementToBeRemoved } from '../utils/test/testUtils'
import {
    ChangeSykmeldingStatusDocument,
    RegelStatus,
    StatusEvent,
    SykmeldingChangeStatus,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
} from '../fetching/graphql.generated'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

describe('Bekreft avvist sykmelding som lest', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/avvist-sykmelding`)
    })

    const avvistSykmelding = createSykmelding({
        id: 'avvist-sykmelding',
        behandlingsutfall: {
            __typename: 'Behandlingsutfall',
            status: RegelStatus.Invalid,
            ruleHits: [
                {
                    __typename: 'RegelInfo',
                    messageForSender: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    messageForUser: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    ruleName: 'tilbakedatering',
                    ruleStatus: RegelStatus.Invalid,
                },
            ],
        },
    })

    const baseMocks = [
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
            result: { data: { __typename: 'Query', sykmelding: avvistSykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [avvistSykmelding] } },
        }),
    ]

    it('should display reason for rejection', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        expect(await screen.findByText(/Du trenger en ny sykmelding/)).toBeInTheDocument()
    })

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
    })

    it('should get error message when trying to submit without checking checkbox', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }))

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
            ).toHaveAccessibleDescription('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        )
    })

    it('should remove error message after clicking checkbox', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }))

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
            ).toHaveAccessibleDescription('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        )

        userEvent.click(
            screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
        )

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
            ).not.toHaveAccessibleDescription('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        )
    })

    it('should show confirmation after submitting', async () => {
        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createMock({
                    request: {
                        query: ChangeSykmeldingStatusDocument,
                        variables: {
                            sykmeldingId: 'avvist-sykmelding',
                            status: SykmeldingChangeStatus.BekreftAvvist,
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            changeSykmeldingStatus: {
                                ...avvistSykmelding,
                                sykmeldingStatus: {
                                    ...avvistSykmelding.sykmeldingStatus,
                                    statusEvent: StatusEvent.Bekreftet,
                                    timestamp: '2020-01-01',
                                },
                            },
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        userEvent.click(
            screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
        )
        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }))

        expect(
            await screen.findByText('Du bekreftet at du har lest at sykmeldingen er avvist den 1. januar 2020'),
        ).toBeInTheDocument()

        // There are no more unsent sykmeldinger, should show Ferdig link to ditt sykefravær
        expect(screen.getByRole('link', { name: 'Ferdig' })).toBeInTheDocument()
    })
})
