import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Merknad from '../../models/Sykmelding/Merknad';
import InformationBanner, { Merknadtype } from './InformationBanner';

describe('InformationBanner', () => {
    it('Renders view for merknad UGYLDIG_TILBAKEDATERING', () => {
        const plainJson = {
            type: Merknadtype.UGYLDIG_TILBAKEDATERING,
        };
        const merknad = new Merknad(plainJson);
        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.queryByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(screen.getByText('Tilbakedateringen kan ikke godkjennes')).toBeInTheDocument();
    });

    it('Renders view for merknad TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER', () => {
        const plainJson = {
            type: Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER,
        };
        const merknad = new Merknad(plainJson);
        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.queryByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(screen.getByText('Behov for mer opplysninger')).toBeInTheDocument();
    });

    it('Renders view for merknad TILBAKEDATERING_UNDER_BEHANDLING', () => {
        const merknad = new Merknad({
            type: Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING,
        });
        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.queryByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(screen.getByRole('heading')).toHaveTextContent('Viktig informasjon');
    });

    it('Renders papirsinfo view if papirsykmelding is true', () => {
        render(<InformationBanner papirsykmelding />);
        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).toBeInTheDocument();
        expect(screen.getByText('Før du bruker sykmeldingen')).toBeInTheDocument();
    });

    it('Renders Normal view if merknader and papirsykmelding is undefined', () => {
        render(<InformationBanner />);
        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument();
        expect(screen.queryByTestId('papir-banner')).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Hei, her ser du sykmeldingen din. Før du begynner å bruke den, sjekker du om alt er riktig. Stemmer det med det dere ble enige om? Nederst på siden sender du den inn.',
            ),
        ).toBeInTheDocument();
    });
});
