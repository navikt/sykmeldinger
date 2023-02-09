import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, waitFor, screen, waitForElementToBeRemoved, within, axe } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createInitialQuery, createMock, createSykmelding } from '../utils/test/dataUtils'
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
        it('should be able to submit form', async () => {
            const { container } = render(<SykmeldingPage />, {
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

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '20.12.2020')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '27.12.2020')
            await userEvent.click(screen.getRadioInGroup({ name: /Har du forsikring som gjelder/i }, { name: 'Ja' }))

            expect(await axe(container)).toHaveNoViolations()

            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toEqual(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        }, 15_000)

        it('should use first fom in sykmelding period if oppfolgingsdato is missing', async () => {
            const sykmelding = createSykmelding({ id: 'sykmelding-id', mottattTidspunkt: '2020-02-10' })

            const { container } = render(<SykmeldingPage />, {
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

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '20.12.2019')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '27.12.2019')
            await userEvent.click(screen.getRadioInGroup({ name: /Har du forsikring som gjelder/i }, { name: 'Ja' }))

            expect(await axe(container)).toHaveNoViolations()

            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        }, 15_000)
    })

    describe('Outside ventetid', () => {
        it('should be able to submit form', async () => {
            const { container } = render(<SykmeldingPage />, {
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

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))

            expect(await axe(container)).toHaveNoViolations()

            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        })
    })

    describe('Egenmeldingsperioder', () => {
        it('should show error message with link if date is missing', async () => {
            const { container } = render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(await screen.findByRole('link', { name: 'Du må fylle inn fra dato.' })).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('should show error message with link if date is invalid format', async () => {
            const { container } = render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '11.20.2020')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '11.25.2020')
            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(
                await screen.findByRole('link', { name: 'Fra dato må være på formatet DD.MM.YYYY.' }),
            ).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('should show error message with link if fom is after oppfølgingsdato', async () => {
            const { container } = render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '02.04.2020')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '04.04.2020')
            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(
                await screen.findByRole('link', { name: 'Fra dato kan ikke være oppfølgingsdato eller senere.' }),
            ).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('should show error message with link if tom is after oppfølgingsdato', async () => {
            const { container } = render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '01.01.2020')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '02.05.2020')
            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(
                await screen.findByRole('link', { name: 'Til dato kan ikke være oppfølgingsdato eller senere.' }),
            ).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('should show error message with link if fom is after tom', async () => {
            const { container } = render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '10.01.2020')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '02.01.2020')
            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            expect(await screen.findByRole('link', { name: 'Fra kan ikke være etter til dato.' })).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })

        it('should be able to remove period', async () => {
            const { container } = render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: '2020-04-01' },
                    }),
                ],
            })

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'frilanser' }))
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.click(screen.getByRole('button', { name: 'Legg til ekstra periode' }))
            const periodeSection = within(
                screen.getByRole('region', { name: /Hvilke dager var du borte fra jobb før/i }),
            )

            expect(periodeSection.getAllByRole('textbox', { name: /(Fra|Til) og med/ })).toHaveLength(4)
            await userEvent.click(screen.getByRole('button', { name: 'Fjern periode' }))
            expect(periodeSection.getAllByRole('textbox', { name: /(Fra|Til) og med/ })).toHaveLength(2)
            expect(await axe(container)).toHaveNoViolations()
        })

        it('should show guid panel about egenmeldt', async () => {
            const { container } = render(<SykmeldingPage />, {
                initialState: [
                    createInitialQuery(
                        SykmeldingByIdDocument,
                        {
                            __typename: 'Query',
                            sykmelding: createSykmelding({ id: 'sykmelding-id', egenmeldt: true }),
                        },
                        { id: 'sykmelding-id' },
                    ),
                    createInitialQuery(SykmeldingerDocument, {
                        __typename: 'Query',
                        sykmeldinger: [createSykmelding()],
                    }),
                ],
            })

            expect(
                await screen.findByText(
                    'Hei, denne egenmeldingen er utløpt og kan derfor ikke benyttes. Du kan fortsatt se opplysninger fra egenmeldingen under.',
                ),
            ).toBeInTheDocument()
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
