import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { axe, render, screen, waitFor } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import {
    StatusEvent,
    SendSykmeldingDocument,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    YesOrNo,
    ArbeidssituasjonType,
} from '../fetching/graphql.generated'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

import { createExtraFormDataMock } from './mockUtils'

describe('Arbeidsledig', () => {
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

    it('should be able to submit form with work situation arbeidsledig', async () => {
        const mocks = [
            ...baseMocks,
            createExtraFormDataMock(),
            createMock({
                request: {
                    query: SendSykmeldingDocument,
                    variables: {
                        sykmeldingId: 'sykmelding-id',
                        values: {
                            erOpplysningeneRiktige: YesOrNo.YES,
                            arbeidssituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
                            egenmeldingsdager: null,
                            harEgenmeldingsdager: null,
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
        ]

        const { container } = render(<SykmeldingPage />, { mocks })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'arbeidsledig' }))

        expect(await axe(container)).toHaveNoViolations()

        await userEvent.click(screen.getByRole('button', { name: 'Bekreft sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })
})
