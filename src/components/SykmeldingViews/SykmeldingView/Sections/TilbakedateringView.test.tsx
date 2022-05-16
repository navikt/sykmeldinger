import { render, screen } from '@testing-library/react';

import { KontaktMedPasient, KontaktMedPasientSchema } from '../../../../models/Sykmelding/KontaktMedPasient';

import TilbakedateringView from './TilbakedateringView';

describe('TilbakedateringView', () => {
    it('Renders kontaktdato', () => {
        const kontaktMedPasient: KontaktMedPasient = KontaktMedPasientSchema.parse({
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: null,
        });
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} arbeidsgiver={false} />);

        expect(screen.getByText('Tilbakedatering')).toBeInTheDocument();
        expect(screen.getByText('Dato for dokumenterbar kontakt med pasienten')).toBeInTheDocument();
        expect(screen.getByText('1. april 2021')).toBeInTheDocument();
    });

    it('Renders begrunnelse', () => {
        const kontaktMedPasient: KontaktMedPasient = KontaktMedPasientSchema.parse({
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: 'han var kjempesyk',
        });
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} arbeidsgiver={false} />);

        expect(screen.getByText('Begrunnelse for tilbakedatering')).toBeInTheDocument();
        expect(screen.getByText('han var kjempesyk')).toBeInTheDocument();
    });

    it('Does not render begrunnelse for arbeidsgiver', () => {
        const kontaktMedPasient: KontaktMedPasient = KontaktMedPasientSchema.parse({
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: 'han var kjempesyk',
        });
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} arbeidsgiver />);

        expect(screen.queryByText('Begrunnelse for tilbakedatering')).not.toBeInTheDocument();
        expect(screen.queryByText('han var kjempesyk')).not.toBeInTheDocument();
    });
});
