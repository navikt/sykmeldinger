import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, screen, waitForElementToBeRemoved } from '../utils/test/testUtils'
import {
    ChangeSykmeldingStatusDocument,
    StatusEvent,
    SykmeldingChangeStatus,
    SykmeldingDocument,
    SykmeldingerDocument,
} from '../fetching/graphql.generated'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

import { createExtraFormDataMock } from './mockUtils'

describe('Bekreftet sykmelding', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/bekreftet-sykmelding`)
    })

    const bekreftetSykmelding = createSykmelding({
        id: 'bekreftet-sykmelding',
        sykmeldingStatus: {
            __typename: 'SykmeldingStatus',
            timestamp: '2022-02-01',
            statusEvent: StatusEvent.Bekreftet,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
    })

    const baseMocks = [
        createExtraFormDataMock({
            sykmeldingId: 'bekreftet-sykmelding',
        }),
        createMock({
            request: { query: SykmeldingDocument, variables: { id: 'bekreftet-sykmelding' } },
            result: { data: { __typename: 'Query', sykmelding: bekreftetSykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [bekreftetSykmelding] } },
        }),
    ]

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
    })

    it('should reopen brekreftet sykmelding', async () => {
        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({
                    sykmeldingId: 'bekreftet-sykmelding',
                }),
                createMock({
                    request: {
                        query: ChangeSykmeldingStatusDocument,
                        variables: {
                            sykmeldingId: 'bekreftet-sykmelding',
                            status: SykmeldingChangeStatus.Gjenapne,
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            changeSykmeldingStatus: {
                                ...bekreftetSykmelding,
                                sykmeldingStatus: {
                                    ...bekreftetSykmelding.sykmeldingStatus,
                                    statusEvent: StatusEvent.Apen,
                                    timestamp: '2022-03-01',
                                },
                            },
                        },
                    },
                }),
            ],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))

        userEvent.click(await screen.findByRole('button', { name: 'GJØR UTFYLLINGEN PÅ NYTT' }))
        expect(await screen.findByRole('button', { name: 'Bekreft sykmelding' })).toBeInTheDocument()
    })
})
