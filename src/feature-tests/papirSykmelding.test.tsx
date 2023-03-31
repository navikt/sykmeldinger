import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { axe, render, screen, waitFor } from '../utils/test/testUtils'
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

describe('Papir sykmelding', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/papir-sykmelding`)
    })

    const papirSykmelding = createSykmelding({
        id: 'papir-sykmelding',
        sykmeldingStatus: {
            __typename: 'SykmeldingStatus',
            timestamp: '2022-02-01',
            statusEvent: StatusEvent.APEN,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        papirsykmelding: true,
    })

    const baseMocks = [
        createExtraFormDataMock({
            sykmeldingId: 'papir-sykmelding',
        }),
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'papir-sykmelding' } },
            result: { data: { __typename: 'Query', sykmelding: papirSykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [papirSykmelding] } },
        }),
    ]

    it('should show information if papirsykmelding is already passed on', async () => {
        const { container } = render(<SykmeldingPage />, { mocks: [...baseMocks] })

        expect(await screen.findByRole('heading', { name: 'Papirsykmelding' })).toBeInTheDocument()

        await userEvent.click(
            screen.getRadioInGroup({ name: /Har du allerede gitt papirsykmeldingen videre?/i }, { name: 'Ja' }),
        )

        expect(
            screen.getByText(
                'Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i stedet. Det er en fordel for begge: Da får dere alt her, både sykepengesøknaden og andre meldinger som handler om sykefraværet. Papirsykmeldingen kan du legge bort. Det du gjør her, erstatter papiret.',
            ),
        ).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })

    it('should show information if papirsykmelding is not passed on', async () => {
        const { container } = render(<SykmeldingPage />, { mocks: [...baseMocks] })

        expect(await screen.findByRole('heading', { name: 'Papirsykmelding' })).toBeInTheDocument()

        await userEvent.click(
            screen.getRadioInGroup({ name: /Har du allerede gitt papirsykmeldingen videre?/i }, { name: 'Nei' }),
        )

        expect(screen.getByText('Da kan du sende sykmeldingen herfra')).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })

    it('should avbryte papirsykmelding', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock(),
                createMock({
                    request: {
                        query: ChangeSykmeldingStatusDocument,
                        variables: {
                            sykmeldingId: 'papir-sykmelding',
                            status: SykmeldingChangeStatus.AVBRYT,
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            changeSykmeldingStatus: {
                                ...papirSykmelding,
                                sykmeldingStatus: {
                                    ...papirSykmelding.sykmeldingStatus,
                                    statusEvent: StatusEvent.AVBRUTT,
                                    timestamp: '2022-03-01',
                                },
                            },
                        },
                    },
                }),
            ],
        })

        expect(await screen.findByRole('heading', { name: 'Papirsykmelding' })).toBeInTheDocument()
        await userEvent.click(
            screen.getRadioInGroup({ name: /Har du allerede gitt papirsykmeldingen videre?/i }, { name: 'Ja' }),
        )
        expect(await axe(container)).toHaveNoViolations()
        await userEvent.click(await screen.findByRole('button', { name: 'Avbryt sykmeldingen' }))

        expect(await screen.findByText('Sykmeldingen ble avbrutt av deg')).toBeInTheDocument()
    })

    describe('Utenlandsk sykmelding', () => {
        it('Should show country for utenlandsk sykmelding', async () => {
            const mock = [
                createExtraFormDataMock({
                    sykmeldingId: 'papir-sykmelding',
                }),
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'papir-sykmelding' } },
                    result: { data: { __typename: 'Query', sykmelding: papirSykmelding } },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [
                                {
                                    ...papirSykmelding,
                                    utenlandskSykmelding: {
                                        __typename: 'UtenlandskSykmelding',
                                        land: 'Island',
                                    },
                                },
                            ],
                        },
                    },
                }),
            ]

            render(<SykmeldingPage />, { mocks: mock })

            expect(await screen.findByRole('heading', { name: 'Landet sykmeldingen ble skrevet' })).toBeInTheDocument()
            await waitFor(() => {
                expect(screen.getByText('Island')).toBeInTheDocument()
            })
        })
    })
})
