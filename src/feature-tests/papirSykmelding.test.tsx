import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, screen, waitForElementToBeRemoved, within } from '../utils/test/testUtils'
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
            statusEvent: StatusEvent.Apen,
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

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        expect(screen.getByRole('heading', { name: 'Papirsykmelding' })).toBeInTheDocument()
    })

    it('should show information if papirsykmelding is already passed on', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        expect(screen.getByRole('heading', { name: 'Papirsykmelding' })).toBeInTheDocument()

        expect(
            screen.getByRole('group', { name: 'Har du allerede gitt papirsykmeldingen videre?' }),
        ).toBeInTheDocument()
        const group = screen.getByText('Har du allerede gitt papirsykmeldingen videre?').closest('fieldset')
        userEvent.click(within(group!).getByRole('radio', { name: 'Ja' }))

        expect(
            screen.getByText(
                'Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i stedet. Det er en fordel for begge: Da får dere alt her, både sykepengesøknaden og andre meldinger som handler om sykefraværet. Papirsykmeldingen kan du legge bort. Det du gjør her, erstatter papiret.',
            ),
        ).toBeInTheDocument()
    })

    it('should show information if papirsykmelding is not passed on', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        expect(screen.getByRole('heading', { name: 'Papirsykmelding' })).toBeInTheDocument()

        expect(
            screen.getByRole('group', { name: 'Har du allerede gitt papirsykmeldingen videre?' }),
        ).toBeInTheDocument()
        const group = screen.getByText('Har du allerede gitt papirsykmeldingen videre?').closest('fieldset')
        userEvent.click(within(group!).getByRole('radio', { name: 'Nei' }))

        expect(screen.getByText('Da kan du sende sykmeldingen herfra')).toBeInTheDocument()
    })

    it('should avbryte papirsykmelding', async () => {
        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({
                    sykmeldingId: 'papir-sykmelding',
                }),
                createMock({
                    request: {
                        query: ChangeSykmeldingStatusDocument,
                        variables: {
                            sykmeldingId: 'papir-sykmelding',
                            status: SykmeldingChangeStatus.Avbryt,
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            changeSykmeldingStatus: {
                                ...papirSykmelding,
                                sykmeldingStatus: {
                                    ...papirSykmelding.sykmeldingStatus,
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

        expect(screen.getByRole('heading', { name: 'Papirsykmelding' })).toBeInTheDocument()
        const group = screen.getByText('Har du allerede gitt papirsykmeldingen videre?').closest('fieldset')
        userEvent.click(within(group!).getByRole('radio', { name: 'Ja' }))

        userEvent.click(await screen.findByRole('button', { name: 'Avbryt sykmeldingen' }))

        expect(await screen.findByText('Sykmeldingen ble avbrutt av deg')).toBeInTheDocument()
    })
})
