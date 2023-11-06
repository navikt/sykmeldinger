import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import {
    ArbeidssituasjonType,
    StatusEvent,
    SendSykmeldingDocument,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    YesOrNo,
} from 'queries'

import { render, waitFor, screen, axe } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

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
                                    arbeidssituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
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
                                        statusEvent: StatusEvent.SENDT,
                                        timestamp: '2020-01-01',
                                    },
                                }),
                            },
                        },
                    }),
                ],
            })

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(
                screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'selvstendig næringsdrivende' }),
            )
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '20.12.2020')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '27.12.2020')
            await userEvent.click(screen.getRadioInGroup({ name: /Har du forsikring som gjelder/i }, { name: 'Ja' }))

            expect(await axe(container)).toHaveNoViolations()

            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        }, 15000)

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

                    createExtraFormDataMock({
                        utenforVentetid: { erUtenforVentetid: false, oppfolgingsdato: null },
                    }),
                    createMock({
                        request: {
                            query: SendSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: YesOrNo.YES,
                                    arbeidssituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
                                    harBruktEgenmelding: YesOrNo.YES,
                                    harForsikring: YesOrNo.YES,
                                    egenmeldingsperioder: [{ fom: '2019-12-20', tom: '2019-12-27' }],
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                sendSykmelding: {
                                    ...sykmelding,
                                    sykmeldingStatus: {
                                        ...sykmelding.sykmeldingStatus,
                                        statusEvent: StatusEvent.SENDT,
                                        timestamp: '2020-01-01',
                                    },
                                },
                            },
                        },
                    }),
                ],
            })

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            await userEvent.click(
                screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'selvstendig næringsdrivende' }),
            )
            await userEvent.click(screen.getRadioInGroup({ name: /Vi har registrert at du ble syk/i }, { name: 'Ja' }))
            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '20.12.2019')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '27.12.2019')
            await userEvent.click(screen.getRadioInGroup({ name: /Har du forsikring som gjelder/i }, { name: 'Ja' }))

            expect(await axe(container)).toHaveNoViolations()

            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
        }, 10_000)
    })

    describe('Outside ventetid', () => {
        it('should be able to submit form', async () => {
            const { container } = render(<SykmeldingPage />, {
                mocks: [
                    ...baseMocks,
                    createExtraFormDataMock(),
                    createMock({
                        request: {
                            query: SendSykmeldingDocument,
                            variables: {
                                sykmeldingId: 'sykmelding-id',
                                values: {
                                    erOpplysningeneRiktige: YesOrNo.YES,
                                    arbeidssituasjon: ArbeidssituasjonType.NAERINGSDRIVENDE,
                                },
                            },
                        },
                        result: {
                            data: {
                                __typename: 'Mutation',
                                sendSykmelding: createSykmelding({
                                    sykmeldingStatus: {
                                        ...createSykmelding().sykmeldingStatus,
                                        statusEvent: StatusEvent.SENDT,
                                        timestamp: '2020-01-01',
                                    },
                                }),
                            },
                        },
                    }),
                ],
            })

            await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
            return
            await userEvent.click(
                screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'selvstendig næringsdrivende' }),
            )

            expect(await axe(container)).toHaveNoViolations()

            await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
            expect(mockRouter.query.sykmeldingId).toEqual('sykmelding-id')
        })
    })
})
