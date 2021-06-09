import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KontaktMedPasient from '../../../models/Sykmelding/KontaktMedPasient';
import TilbakedateringView from './TilbakedateringView';

describe('TilbakedateringView', () => {
    it('Renders kontaktdato', () => {
        const plainJson = {
            kontaktDato: '2021-04-01',
        };
        const kontaktMedPasient = new KontaktMedPasient(plainJson);
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} />);

        expect(screen.getByText('Tilbakedatering')).toBeInTheDocument();
        expect(screen.getByText('Dato for dokumenterbar kontakt med pasienten')).toBeInTheDocument();
        expect(screen.getByText('1. april 2021')).toBeInTheDocument();
    });

    it('Renders begrunnelse', () => {
        const plainJson = {
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: 'han var kjempesyk',
        };
        const kontaktMedPasient = new KontaktMedPasient(plainJson);
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} />);

        expect(screen.getByText('Begrunnelse for tilbakedatering')).toBeInTheDocument();
        expect(screen.getByText(plainJson.begrunnelseIkkeKontakt)).toBeInTheDocument();
    });

    it('Does not render begrunnelse for arbeidsgiver', () => {
        const plainJson = {
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: 'han var kjempesyk',
        };
        const kontaktMedPasient = new KontaktMedPasient(plainJson);
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} arbeidsgiver />);

        expect(screen.queryByText('Begrunnelse for tilbakedatering')).not.toBeInTheDocument();
        expect(screen.queryByText(plainJson.begrunnelseIkkeKontakt)).not.toBeInTheDocument();
    });
});
