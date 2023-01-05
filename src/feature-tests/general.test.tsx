import mockRouter from 'next-router-mock'

import { axe, render, screen, waitForElementToBeRemoved } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'
import { SykmeldingByIdDocument, SykmeldingerDocument } from '../fetching/graphql.generated'

import { createExtraFormDataMock } from './mockUtils'

describe('sykmelding page tests that are not specific to a user', () => {
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

    it('should show details from sykmelding', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [...baseMocks, createExtraFormDataMock()],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
        expect(
            await axe(container, {
                // This is a false positive on the print button
                rules: {
                    'svg-img-alt': { enabled: false },
                },
            }),
        ).toHaveNoViolations()
    })
})
