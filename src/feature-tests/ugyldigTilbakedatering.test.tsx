import { beforeEach, describe, expect, it } from 'vitest'
import mockRouter from 'next-router-mock'

import { axe, render, screen } from '../utils/test/testUtils'
import { Merknadtype, StatusEvent, SykmeldingByIdDocument, SykmeldingerDocument } from '../fetching/graphql.generated'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'
import { sporsmal } from '../utils/sporsmal'

import { createExtraFormDataMock } from './mockUtils'

describe('Ugyldig tilbakedatert sykmelding', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/ugyldig-tilbakedatering-sykmelding`)
    })

    const ugyldigTilbakedatertSykmelding = createSykmelding({
        id: 'ugyldig-tilbakedatering-sykmelding',
        sykmeldingStatus: {
            __typename: 'SykmeldingStatus',
            timestamp: '2022-02-01',
            statusEvent: StatusEvent.APEN,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        merknader: [
            {
                __typename: 'Merknad',
                type: Merknadtype.UGYLDIG_TILBAKEDATERING,
                beskrivelse: null,
            },
        ],
    })

    const baseMocks = [
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'ugyldig-tilbakedatering-sykmelding' } },
            result: { data: { __typename: 'Query', sykmelding: ugyldigTilbakedatertSykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [ugyldigTilbakedatertSykmelding] } },
        }),
        createExtraFormDataMock({ sykmeldingId: 'ugyldig-tilbakedatering-sykmelding' }),
    ]

    it('should show information about tilbakedatering without a11y issues', async () => {
        const { container } = render(<SykmeldingPage />, { mocks: [...baseMocks] })

        expect(await screen.findByText(sporsmal.erOpplysningeneRiktige)).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Tilbakedateringen kan ikke godkjennes' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })
})
