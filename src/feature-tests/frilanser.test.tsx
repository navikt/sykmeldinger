import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, within, waitFor, screen, waitForElementToBeRemoved } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'
import {
    ArbeidssituasjonType,
    StatusEvent,
    SendSykmeldingDocument,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    YesOrNo,
} from '../fetching/graphql.generated'

import { createExtraFormDataMock } from './mockUtils'

describe('Frilanser', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/sykmelding-id`)
    })

    const baseMocks = [
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
            result: { data: { __typename: 'Query', sykmelding: createSykmelding({ id: 'sykmelding-id' }) } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [createSykmelding()] } },
        }),
    ]

    describe('Within ventetid', () => {
        it('should show details from sykmelding', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2021-01-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
            expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
        })

        it('should be able to submit form', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2021-01-01' },
                    }),
                    createMock({
                        request: {
                            query: SendSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: YesOrNo.YES,
                                    arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                                    harBruktEgenmelding: YesOrNo.YES,
                                    harForsikring: YesOrNo.YES,
                                    egenmeldingsperioder: [{ fom: '2020-12-20', tom: '2020-12-27' }],
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                sendSykmelding: createSykmelding({
                                    sykmeldingStatus: {
                                        ...createSykmelding().sykmeldingStatus,
                                        statusEvent: StatusEvent.BEKREFTET,
                                        timestamp: '2020-01-01',
                                    },
                                }),
                            },
                        },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            const inputTom = screen.getByRole('textbox', { name: 'Til og med' })
            const inputFom = screen.getByRole('textbox', { name: 'Fra og med' })
            userEvent.type(inputFom, '20.12.2020')
            userEvent.type(inputTom, '27.12.2020')
            const forsikringFieldset = screen.getByText(/Har du forsikring som gjelder/i).closest('fieldset')
            userEvent.click(within(forsikringFieldset!).getByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toEqual(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        })

        it('should use first fom in sykmelding period if oppfolgingsdato is missing', async () => {
            const sykmelding = createSykmelding({ id: 'sykmelding-id', mottattTidspunkt: '2020-02-10' })

            render(<SykmeldingPage />, {
                mocks: [
                    createMock({
                        request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
                        result: {
                            data: { __typename: 'Query', sykmelding: sykmelding },
                        },
                    }),
                    createMock({
                        request: { query: SykmeldingerDocument },
                        result: { data: { __typename: 'Query', sykmeldinger: [sykmelding] } },
                    }),
                    createExtraFormDataMock({ utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: null } }),
                    createMock({
                        request: {
                            query: SendSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: YesOrNo.YES,
                                    arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                                    harBruktEgenmelding: YesOrNo.YES,
                                    harForsikring: YesOrNo.YES,
                                    egenmeldingsperioder: [{ fom: '2019-12-20', tom: '2019-12-27' }],
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                sendSykmelding: createSykmelding({
                                    sykmeldingStatus: {
                                        ...createSykmelding().sykmeldingStatus,
                                        statusEvent: StatusEvent.BEKREFTET,
                                        timestamp: '2020-01-01',
                                    },
                                }),
                            },
                        },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            const egenmeldingFomTom = await screen.findAllByPlaceholderText('DD.MM.ÅÅÅÅ')
            expect(egenmeldingFomTom).toHaveLength(2)
            userEvent.type(egenmeldingFomTom[0], '20.12.2019')
            userEvent.type(egenmeldingFomTom[1], '27.12.2019')
            const forsikringFieldset = screen.getByText(/Har du forsikring som gjelder/i).closest('fieldset')
            userEvent.click(within(forsikringFieldset!).getByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        })
    })

    describe('Outside ventetid', () => {
        it('should show details from sykmelding', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({ utenforVentetid: { erUtenforVentetid: true, oppfolgingsdato: null } }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
            expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
        })

        it('should be able to submit form', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({ utenforVentetid: { erUtenforVentetid: true, oppfolgingsdato: null } }),
                    createMock({
                        request: {
                            query: SendSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: YesOrNo.YES,
                                    arbeidssituasjon: ArbeidssituasjonType.FRILANSER,
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                sendSykmelding: createSykmelding({
                                    sykmeldingStatus: {
                                        ...createSykmelding().sykmeldingStatus,
                                        statusEvent: StatusEvent.BEKREFTET,
                                        timestamp: '2020-01-01',
                                    },
                                }),
                            },
                        },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        })
    })

    describe('Egenmeldingsperioder', () => {
        it('should show error message with link if date is missing', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(await screen.findByRole('link', { name: 'Du må fylle inn fra dato.' })).toBeInTheDocument()
        })

        it('should show error message with link if date is invalid format', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            const egenmeldingFomTom = await screen.findAllByPlaceholderText('DD.MM.ÅÅÅÅ')
            expect(egenmeldingFomTom).toHaveLength(2)
            userEvent.type(egenmeldingFomTom[0], '11.20.2020')
            userEvent.type(egenmeldingFomTom[1], '11.25.2020')
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(
                await screen.findByRole('link', { name: 'Fra dato må være på formatet DD.MM.YYYY.' }),
            ).toBeInTheDocument()
        })

        it('should show error message with link if fom is after oppfølgingsdato', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            const inputTom = screen.getByRole('textbox', { name: 'Til og med' })
            const inputFom = screen.getByRole('textbox', { name: 'Fra og med' })
            userEvent.type(inputFom, '02.04.2020')
            userEvent.type(inputTom, '04.04.2020')
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(
                await screen.findByRole('link', { name: 'Fra dato kan ikke være oppfølgingsdato eller senere.' }),
            ).toBeInTheDocument()
        })

        it('should show error message with link if tom is after oppfølgingsdato', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            const inputTom = screen.getByRole('textbox', { name: 'Til og med' })
            const inputFom = screen.getByRole('textbox', { name: 'Fra og med' })
            userEvent.type(inputFom, '01.01.2020')
            userEvent.type(inputTom, '02.05.2020')
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(
                await screen.findByRole('link', { name: 'Til dato kan ikke være oppfølgingsdato eller senere.' }),
            ).toBeInTheDocument()
        })

        it('should show error message with link if fom is after tom', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            const egenmeldingFomTom = await screen.findAllByPlaceholderText('DD.MM.ÅÅÅÅ')
            expect(egenmeldingFomTom).toHaveLength(2)
            userEvent.type(egenmeldingFomTom[0], '10.01.2020')
            userEvent.type(egenmeldingFomTom[1], '02.01.2020')
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(await screen.findByRole('link', { name: 'Fra kan ikke være etter til dato.' })).toBeInTheDocument()
        })

        it('should be able to remove period', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'frilanser' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            userEvent.click(screen.getByRole('button', { name: 'Legg til ekstra periode' }))
            const egenmeldingFomTomTwo = await screen.findAllByPlaceholderText('DD.MM.ÅÅÅÅ')
            expect(egenmeldingFomTomTwo).toHaveLength(4)
            userEvent.click(screen.getByRole('button', { name: 'Fjern periode' }))

            const egenmeldingFomTomOne = await screen.findAllByPlaceholderText('DD.MM.ÅÅÅÅ')
            await waitFor(() => expect(egenmeldingFomTomOne).toHaveLength(2))
        })

        it('should show guid panel about egenmeldt', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    createMock({
                        request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
                        result: {
                            data: {
                                __typename: 'Query',
                                sykmelding: createSykmelding({ id: 'sykmelding-id', egenmeldt: true }),
                            },
                        },
                    }),
                    createMock({
                        request: { query: SykmeldingerDocument },
                        result: { data: { __typename: 'Query', sykmeldinger: [createSykmelding()] } },
                    }),
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            expect(
                await screen.findByText(
                    'Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger fra egenmeldingen under.',
                ),
            ).toBeInTheDocument()
        })
    })
})
