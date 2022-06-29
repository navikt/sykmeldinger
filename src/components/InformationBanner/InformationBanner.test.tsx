import { render, screen } from '@testing-library/react';

import { MerknadSchema, Merknad } from '../../models/Sykmelding/Merknad';

import InformationBanner, { Merknadtype } from './InformationBanner';

describe('InformationBanner', () => {
    it('Renders view for merknad UGYLDIG_TILBAKEDATERING', async () => {
        const merknad: Merknad = MerknadSchema.parse({
            type: Merknadtype.UGYLDIG_TILBAKEDATERING,
            beskrivelse: null,
        });

        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.getByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(screen.getByText('Tilbakedateringen kan ikke godkjennes')).toBeInTheDocument();
    });

    it('Renders view for merknad TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER', () => {
        const merknad: Merknad = MerknadSchema.parse({
            type: Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER,
            beskrivelse: null,
        });

        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.getByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(screen.getByText('Behov for mer opplysninger')).toBeInTheDocument();
    });

    it('Renders view for merknad TILBAKEDATERING_UNDER_BEHANDLING', () => {
        const merknad = MerknadSchema.parse({
            type: Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING,
            beskrivelse: null,
        });

        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.getByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(screen.getByRole('heading')).toHaveTextContent('Viktig informasjon');
    });

    it('Renders papirsinfo view if papirsykmelding is true', () => {
        render(<InformationBanner papirsykmelding />);
        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument();
        expect(screen.getByTestId('papir-banner')).toBeInTheDocument();
        expect(screen.getByText('Før du bruker sykmeldingen')).toBeInTheDocument();
    });

    it('Renders Normal view if merknader and papirsykmelding is undefined', () => {
        render(<InformationBanner />);
        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(screen.getByText('Vi har mottatt sykmeldingen din')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Under ser du opplysningene vi har fått fra behandleren din. Stemmer dette med det dere ble enige om?',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Når du er ferdig sender du sykmeldingen, nederst på siden.')).toBeInTheDocument();
    });
});
