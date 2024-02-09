import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Merknad, Merknadtype } from 'queries'

import InformationBanner from './InformationBanner'

describe('InformationBanner', () => {
    it('Renders view for merknad UGYLDIG_TILBAKEDATERING', async () => {
        const merknad: Merknad = {
            __typename: 'Merknad',
            type: Merknadtype.UGYLDIG_TILBAKEDATERING,
            beskrivelse: null,
        }

        render(<InformationBanner merknader={[merknad]} />)
        expect(screen.getByTestId('merknad-banner')).toBeInTheDocument()
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument()
        expect(screen.getByText('Tilbakedateringen kan ikke godkjennes')).toBeInTheDocument()
    })

    it('Renders view for merknad TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER', () => {
        const merknad: Merknad = {
            __typename: 'Merknad',
            type: Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER,
            beskrivelse: null,
        }

        render(<InformationBanner merknader={[merknad]} />)
        expect(screen.getByTestId('merknad-banner')).toBeInTheDocument()
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument()
        expect(screen.getByText('Behov for mer opplysninger')).toBeInTheDocument()
    })

    it('Renders view for merknad TILBAKEDATERING_UNDER_BEHANDLING', () => {
        const merknad: Merknad = {
            __typename: 'Merknad',
            type: Merknadtype.UNDER_BEHANDLING,
            beskrivelse: null,
        }

        render(<InformationBanner merknader={[merknad]} />)
        expect(screen.getByTestId('merknad-banner')).toBeInTheDocument()
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Viktig informasjon' })).toBeInTheDocument()
    })

    it('Renders papirsinfo view if papirsykmelding is true', () => {
        render(<InformationBanner papirsykmelding />)
        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument()
        expect(screen.getByTestId('papir-banner')).toBeInTheDocument()
        expect(screen.getByText('Før du bruker sykmeldingen')).toBeInTheDocument()
    })

    it('Renders over 70 view if over 70 is true', () => {
        render(<InformationBanner overSyttiAar />)

        expect(
            screen.getByText('Når du har passert 70 år, har du ikke lenger rett til sykepenger.'),
        ).toBeInTheDocument()
    })

    it('Renders Normal view if merknader and papirsykmelding is undefined', () => {
        render(<InformationBanner merknader={null} papirsykmelding={null} />)
        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument()
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument()
        expect(screen.getByText('Vi har mottatt sykmeldingen din')).toBeInTheDocument()
        expect(
            screen.getByText(
                'Under ser du opplysningene vi har fått fra behandleren din. Stemmer dette med det dere ble enige om?',
            ),
        ).toBeInTheDocument()
        expect(screen.getByText('Når du er ferdig sender du sykmeldingen, nederst på siden.')).toBeInTheDocument()
    })

    it('Renders info about sykmelding below 20% if sykmelding is below 20%', () => {
        render(<InformationBanner isUnder20Percent={19} />)

        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument()
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument()
        expect(screen.getByText(/Denne sykmeldingen viser at du er 19 prosent sykmeldt/i)).toBeInTheDocument()
    })
})
