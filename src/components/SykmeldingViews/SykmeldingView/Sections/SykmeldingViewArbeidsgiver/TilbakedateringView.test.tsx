import { render, screen } from '@testing-library/react';

import { KontaktMedPasient } from '../../../../../fetching/graphql.generated';

import TilbakedateringView from './TilbakedateringView';

describe('TilbakedateringView', () => {
    it('Renders kontaktdato', () => {
        const kontaktMedPasient: KontaktMedPasient = {
            __typename: 'KontaktMedPasient',
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: null,
        };
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} />);

        expect(screen.getByText('Tilbakedatering')).toBeInTheDocument();
        expect(screen.getByText('Dato for dokumenterbar kontakt med pasienten')).toBeInTheDocument();
        expect(screen.getByText('1. april 2021')).toBeInTheDocument();
    });

    it('Renders begrunnelse', () => {
        const kontaktMedPasient: KontaktMedPasient = {
            __typename: 'KontaktMedPasient',
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: 'han var kjempesyk',
        };
        render(<TilbakedateringView kontaktMedPasient={kontaktMedPasient} />);

        expect(screen.queryByText('Begrunnelse for tilbakedatering')).not.toBeInTheDocument();
        expect(screen.queryByText('han var kjempesyk')).not.toBeInTheDocument();
    });
});
