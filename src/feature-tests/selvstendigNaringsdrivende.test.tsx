import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, within, waitFor, screen, waitForElementToBeRemoved } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'
import {
    StatusEvent,
    SubmitSykmeldingDocument,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
} from '../fetching/graphql.generated'

import { createExtraFormDataMock } from './mockUtils'

describe('Selvstendig næringsdrivende', () => {
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
                            query: SubmitSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: {
                                        svar: 'JA',
                                        sporsmaltekst: 'Stemmer opplysningene?',
                                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                    },
                                    arbeidssituasjon: {
                                        svar: 'NAERINGSDRIVENDE',
                                        sporsmaltekst: 'Jeg er sykmeldt som',
                                        svartekster:
                                            '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                                    },
                                    harBruktEgenmelding: {
                                        svar: 'JA',
                                        sporsmaltekst:
                                            'Vi har registrert at du ble syk 1. januar 2021. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                    },
                                    harForsikring: {
                                        svar: 'JA',
                                        sporsmaltekst:
                                            'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                    },
                                    egenmeldingsperioder: {
                                        sporsmaltekst: 'Hvilke dager var du borte fra jobb før 1. januar 2021?',
                                        svartekster: '"Fom, Tom"',
                                        svar: [{ fom: '2020-12-20', tom: '2020-12-27' }],
                                    },
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                submitSykmelding: createSykmelding({
                                    sykmeldingStatus: {
                                        ...createSykmelding().sykmeldingStatus,
                                        statusEvent: StatusEvent.Sendt,
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
            userEvent.click(await screen.findByRole('radio', { name: 'selvstendig næringsdrivende' }))
            const harBruktEgenmeldingFieldset = screen.getByText(/Vi har registrert at du ble syk/i).closest('fieldset')
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }))
            const egenmeldingFomTom = await screen.findAllByPlaceholderText('DD.MM.ÅÅÅÅ')
            expect(egenmeldingFomTom).toHaveLength(2)
            userEvent.type(egenmeldingFomTom[0], '20.12.2020')
            userEvent.type(egenmeldingFomTom[1], '27.12.2020')
            const forsikringFieldset = screen.getByText(/Har du forsikring som gjelder/i).closest('fieldset')
            userEvent.click(within(forsikringFieldset!).getByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        }, 15000)

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

                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: null },
                    }),
                    createMock({
                        request: {
                            query: SubmitSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: {
                                        svar: 'JA',
                                        sporsmaltekst: 'Stemmer opplysningene?',
                                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                    },
                                    arbeidssituasjon: {
                                        svar: 'NAERINGSDRIVENDE',
                                        sporsmaltekst: 'Jeg er sykmeldt som',
                                        svartekster:
                                            '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                                    },
                                    harBruktEgenmelding: {
                                        svar: 'JA',
                                        sporsmaltekst:
                                            'Vi har registrert at du ble syk 10. februar 2020. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                    },
                                    harForsikring: {
                                        svar: 'JA',
                                        sporsmaltekst:
                                            'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                    },
                                    egenmeldingsperioder: {
                                        sporsmaltekst: 'Hvilke dager var du borte fra jobb før 10. februar 2020?',
                                        svartekster: '"Fom, Tom"',
                                        svar: [{ fom: '2019-12-20', tom: '2019-12-27' }],
                                    },
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                submitSykmelding: {
                                    ...sykmelding,
                                    sykmeldingStatus: {
                                        ...sykmelding.sykmeldingStatus,
                                        statusEvent: StatusEvent.Sendt,
                                        timestamp: '2020-01-01',
                                    },
                                },
                            },
                        },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
            userEvent.click(await screen.findByRole('radio', { name: 'selvstendig næringsdrivende' }))

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
            render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
            expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
        })

        it('should be able to submit form', async () => {
            render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock(),
                    createMock({
                        request: {
                            query: SubmitSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: {
                                        svar: 'JA',
                                        sporsmaltekst: 'Stemmer opplysningene?',
                                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                    },
                                    arbeidssituasjon: {
                                        svar: 'NAERINGSDRIVENDE',
                                        sporsmaltekst: 'Jeg er sykmeldt som',
                                        svartekster:
                                            '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                                    },
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                submitSykmelding: createSykmelding({
                                    sykmeldingStatus: {
                                        ...createSykmelding().sykmeldingStatus,
                                        statusEvent: StatusEvent.Sendt,
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
            userEvent.click(await screen.findByRole('radio', { name: 'selvstendig næringsdrivende' }))
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toEqual('sykmelding-id')
        })
    })
})
