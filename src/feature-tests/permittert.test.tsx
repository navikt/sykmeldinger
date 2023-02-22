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

describe('Permittert', () => {
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

    /**
     * This fallback from PERMITTERT to ARBEIDSLEDIG used to happen in the frontend, it has been moved
     * to the mapping in the API layer
     */
    it('should submit PERMITTERT when user choose radio button permittert', async () => {
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
                                arbeidssituasjon: ArbeidssituasjonType.PERMITTERT,
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
            ],
        })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'permittert' }))
        expect(await axe(container)).toHaveNoViolations()
        await userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })
})
