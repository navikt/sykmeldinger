import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { plainToClass } from 'class-transformer';
import Merknad from '../../../../models/Sykmelding/Merknad';
import InformationBanner, { Merknadtype } from './InformationBanner';

describe('InformationBanner', () => {
    it('Renders view for merknad UGYLDIG_TILBAKEDATERING', () => {
        const plainJson = {
            type: Merknadtype.UGYLDIG_TILBAKEDATERING,
        };
        const merknad = plainToClass(Merknad, plainJson);
        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.queryByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.getByText('Tilbakedateringen kan ikke godkjennes')).toBeInTheDocument();
    });

    it('Renders view for merknad TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER', () => {
        const plainJson = {
            type: Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER,
        };
        const merknad = plainToClass(Merknad, plainJson);
        render(<InformationBanner merknader={[merknad]} />);
        expect(screen.queryByTestId('merknad-banner')).toBeInTheDocument();
        expect(screen.getByText('Behov for mer opplysninger')).toBeInTheDocument();
    });

    it('Renders Normal view if merknader is undefined', () => {
        render(<InformationBanner />);
        expect(screen.queryByTestId('merknad-banner')).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Hei, her sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om? Du velger selv om du vil bruke sykmeldingen.',
            ),
        ).toBeInTheDocument();
    });
});
