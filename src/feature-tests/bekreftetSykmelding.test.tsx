import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { axe, render, screen } from '../utils/test/testUtils'
import { StatusEvent, SykmeldingByIdDocument, SykmeldingerDocument } from '../fetching/graphql.generated'
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
            statusEvent: StatusEvent.BEKREFTET,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
    })

    const baseMocks = [
        createExtraFormDataMock({
            sykmeldingId: 'bekreftet-sykmelding',
        }),
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'bekreftet-sykmelding' } },
            result: { data: { __typename: 'Query', sykmelding: bekreftetSykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [bekreftetSykmelding] } },
        }),
    ]

    it('should reopen brekreftet sykmelding', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({
                    sykmeldingId: 'bekreftet-sykmelding',
                }),
            ],
        })

        await userEvent.click(await screen.findByRole('button', { name: 'GJØR UTFYLLINGEN PÅ NYTT' }))
        expect(await screen.findByRole('button', { name: 'Bekreft sykmelding' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })
})
