import mockRouter from 'next-router-mock'

import { render, screen, waitForElementToBeRemoved } from '../utils/test/testUtils'
import { StatusEvent, SykmeldingDocument, SykmeldingerDocument } from '../fetching/graphql.generated'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

describe('Ugyldig tilbakedatert sykmelding', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/ugyldig-tilbakedatering-sykmelding`)
    })

    const ugyldigTilbakedatertSykmelding = createSykmelding({
        id: 'ugyldig-tilbakedatering-sykmelding',
        sykmeldingStatus: {
            __typename: 'SykmeldingStatus',
            timestamp: '2022-02-01',
            statusEvent: StatusEvent.Apen,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        merknader: [
            {
                __typename: 'Merknad',
                type: 'UGYLDIG_TILBAKEDATERING',
                beskrivelse: null,
            },
        ],
    })

    const baseMocks = [
        createMock({
            request: { query: SykmeldingDocument, variables: { id: 'ugyldig-tilbakedatering-sykmelding' } },
            result: { data: { __typename: 'Query', sykmelding: ugyldigTilbakedatertSykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [ugyldigTilbakedatertSykmelding] } },
        }),
    ]

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
    })

    it('should show information about tilbakedatering', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks] })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        expect(screen.getByRole('heading', { name: 'Tilbakedateringen kan ikke godkjennes' })).toBeInTheDocument()
    })
})
