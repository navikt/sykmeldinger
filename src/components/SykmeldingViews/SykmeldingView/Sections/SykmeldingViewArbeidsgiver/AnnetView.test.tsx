import { render, screen } from '@testing-library/react';

import { Behandler } from '../../../../../fetching/graphql.generated';

import AnnetView from './AnnetView';

describe('AnnetView', () => {
    it('Renders behandler phone if it exist', () => {
        const behandler: Behandler = {
            __typename: 'Behandler',
            fornavn: 'Lege',
            mellomnavn: null,
            etternavn: 'Legesen',
            tlf: '12345678',
            adresse: {
                __typename: 'Adresse',
                gate: null,
                postnummer: null,
                kommune: null,
                postboks: null,
                land: null,
            },
        };

        render(<AnnetView behandler={behandler} />);
        expect(screen.getByText('Telefon til behandler')).toBeInTheDocument();
        expect(screen.getByText('12345678')).toBeInTheDocument();
    });

    it('Render hyphen if behandler phone does noe exist', () => {
        const behandler: Behandler = {
            __typename: 'Behandler',
            fornavn: 'Lege',
            mellomnavn: null,
            etternavn: 'Legesen',
            tlf: null,
            adresse: {
                __typename: 'Adresse',
                gate: null,
                postnummer: null,
                kommune: null,
                postboks: null,
                land: null,
            },
        };

        render(<AnnetView behandler={behandler} />);
        expect(screen.getByText('Telefon til behandler')).toBeInTheDocument();
        expect(screen.getByText('—')).toBeInTheDocument();
    });
});
