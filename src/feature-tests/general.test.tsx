import { describe, it, expect, beforeEach } from 'vitest'
import mockRouter from 'next-router-mock'

import { axe, render, screen } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'
import { SykmeldingByIdDocument, SykmeldingerDocument } from '../fetching/graphql.generated'
import { sporsmal } from '../utils/sporsmal'

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

    it('should show details from sykmelding without a11y problems', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [...baseMocks, createExtraFormDataMock()],
        })

        expect(await screen.findByText(sporsmal.erOpplysningeneRiktige)).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })
})
