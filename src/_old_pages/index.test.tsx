import { describe, it, expect } from 'vitest'
import { GraphQLError } from 'graphql'

import { render, screen, waitForElementToBeRemoved, within } from '../utils/test/testUtils'
import { StatusEvent, SykmeldingerDocument } from '../fetching/graphql.generated'
import {
    createAvvistBehandlingsutfall,
    createMock,
    createSykmelding,
    createUnderBehandlingMerknad,
} from '../utils/test/dataUtils'
import { dateSub } from '../utils/dateUtils'

import SykmeldingerPage from './index.page'

describe('SykmeldingerPage: /syk/sykmeldinger', () => {
    it('should fail with error message on API error', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: null,
                        errors: [new GraphQLError('Some backend error')],
                        extensions: { dontLog: true },
                    },
                }),
            ],
        })

        expect(await screen.findByText(/Vi har problemer med baksystemene for øyeblikket./))
    })

    it('should not display any sykmeldinger', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: [] } },
                }),
            ],
        })

        expect(await screen.findByText('Du har ingen nye sykmeldinger'))
    })

    it('should only display new sykmeldinger', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [
                                createSykmelding({ id: 'sykme-1' }, StatusEvent.BEKREFTET),
                                createSykmelding({ id: 'sykme-2' }, StatusEvent.SENDT),
                                createSykmelding({ id: 'sykme-3' }, StatusEvent.AVBRUTT),
                                createSykmelding(
                                    { id: 'sykme-4', ...createAvvistBehandlingsutfall() },
                                    StatusEvent.BEKREFTET,
                                ),
                                createSykmelding({ id: 'sykme-5' }, StatusEvent.UTGATT),
                            ],
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'))

        expect(await screen.findByText('Du har ingen nye sykmeldinger'))
        expect(await screen.findByText('Tidligere sykmeldinger'))

        expect(screen.getByRole('link', { name: /Sendt til NAV/ }))
        expect(screen.getByRole('link', { name: /Sendt til arbeidsgiver/ }))
        expect(screen.getByRole('link', { name: /Avbrutt av deg/ }))
        expect(screen.getByRole('link', { name: /Avvist av NAV/ }))
        expect(screen.getByRole('link', { name: /Utgått/ }))
    })

    it('should display only new sykmeldinger, sorted by ascending date ', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [
                                createSykmelding(
                                    { id: 'sykme-1', mottattTidspunkt: dateSub(new Date(), { days: 2 }) },
                                    StatusEvent.APEN,
                                ),
                                createSykmelding(
                                    {
                                        id: 'sykme-2',
                                        mottattTidspunkt: dateSub(new Date(), { days: 6 }),
                                        papirsykmelding: true,
                                    },
                                    StatusEvent.APEN,
                                ),
                                createSykmelding(
                                    {
                                        id: 'sykme-3',
                                        mottattTidspunkt: dateSub(new Date(), { days: 4 }),
                                        ...createAvvistBehandlingsutfall(),
                                    },
                                    StatusEvent.APEN,
                                ),
                            ],
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'))
        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument()
        const lenkepanelContainer = screen.getByRole('region', { name: 'Nye sykmeldinger' })
        const sykmeldinger = within(lenkepanelContainer).getAllByRole('link')
        expect(sykmeldinger).toHaveLength(3)
        expect(sykmeldinger[0]).toHaveTextContent(/Papirsykmelding/)
        expect(sykmeldinger[1]).toHaveTextContent(/Avvist av NAV/)
        expect(sykmeldinger[2]).toHaveTextContent(/Sykmelding/)
    })

    it('should display under behandling in seperate section ', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [
                                createSykmelding(
                                    { id: 'sykme-1', ...createUnderBehandlingMerknad() },
                                    StatusEvent.SENDT,
                                ),
                            ],
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'))
        const lenkepanelContainer = screen.getByRole('region', { name: 'Under behandling' })
        const sykmeldinger = within(lenkepanelContainer).getAllByRole('link')
        expect(sykmeldinger).toHaveLength(1)
        expect(sykmeldinger[0]).toHaveTextContent(/Sendt til arbeidsgiver/)
    })

    it('should display new and earlier sykmeldinger', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [
                                createSykmelding({ id: 'sykme-1' }, StatusEvent.APEN),
                                createSykmelding({ id: 'sykme-2' }, StatusEvent.BEKREFTET),
                            ],
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'))
        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument()

        const newSection = screen.getByRole('region', { name: 'Nye sykmeldinger' })
        const previousSection = screen.getByRole('region', { name: 'Tidligere sykmeldinger' })

        expect(within(newSection).getAllByRole('link')).toHaveLength(1)
        expect(within(previousSection).getAllByRole('link')).toHaveLength(1)
    })

    it('should display APEN but older than 12 months sykemelding in tidligere section', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [
                                createSykmelding(
                                    { id: 'sykme-1', mottattTidspunkt: dateSub(new Date(), { months: 12 }) },
                                    StatusEvent.APEN,
                                ),
                                createSykmelding({ id: 'sykme-2' }, StatusEvent.BEKREFTET),
                            ],
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'))
        expect(screen.getByText('Du har ingen nye sykmeldinger')).toBeInTheDocument()

        const previousSection = screen.getByRole('region', { name: 'Tidligere sykmeldinger' })
        expect(within(previousSection).getAllByRole('link')).toHaveLength(2)
    })

    it('should not throw error when receiving a AVVIST sykmelding with invalid data', async () => {
        render(<SykmeldingerPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [
                                createSykmelding({ id: 'sykme-1', ...createAvvistBehandlingsutfall('Dårlig data') }),
                            ],
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'))

        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument()

        const newSection = screen.getByRole('region', { name: 'Nye sykmeldinger' })
        expect(within(newSection).getByRole('link', { name: /Avvist av NAV/ })).toBeInTheDocument()
    })
})
