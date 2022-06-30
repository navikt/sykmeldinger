import { render, screen } from '@testing-library/react';

import { KontaktMedPasient } from '../../../../../fetching/graphql.generated';

import Tilbakedatering from './Tilbakedatering';

describe('Tilbakedatering', () => {
    it('Renders kontaktdato', () => {
        const kontaktMedPasient: KontaktMedPasient = {
            __typename: 'KontaktMedPasient',
            kontaktDato: '2021-04-01',
            begrunnelseIkkeKontakt: null,
        };
        render(<Tilbakedatering kontaktMedPasient={kontaktMedPasient} />);

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
        render(<Tilbakedatering kontaktMedPasient={kontaktMedPasient} />);

        expect(screen.getByText('Begrunnelse for tilbakedatering')).toBeInTheDocument();
        expect(screen.getByText('han var kjempesyk')).toBeInTheDocument();
    });
});
