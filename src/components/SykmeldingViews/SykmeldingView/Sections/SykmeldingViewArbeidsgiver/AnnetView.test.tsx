import { render, screen } from '@testing-library/react';

import { Behandler, BehandlerSchema } from '../../../../../models/Sykmelding/Behandler';

import AnnetView from './AnnetView';

describe('AnnetView', () => {
    it('Renders behandler phone if it exist', () => {
        const behandler: Behandler = BehandlerSchema.parse({
            fornavn: 'Lege',
            mellomnavn: null,
            etternavn: 'Legesen',
            tlf: '12345678',
            adresse: {
                gate: null,
                postnummer: null,
                kommune: null,
                postboks: null,
                land: null,
            },
        });

        render(<AnnetView behandler={behandler} />);
        expect(screen.getByText('Telefon til behandler')).toBeInTheDocument();
        expect(screen.getByText('12345678')).toBeInTheDocument();
    });

    it('Render hyphen if behandler phone does noe exist', () => {
        const behandler: Behandler = BehandlerSchema.parse({
            fornavn: 'Lege',
            mellomnavn: null,
            etternavn: 'Legesen',
            tlf: null,
            adresse: {
                gate: null,
                postnummer: null,
                kommune: null,
                postboks: null,
                land: null,
            },
        });

        render(<AnnetView behandler={behandler} />);
        expect(screen.getByText('Telefon til behandler')).toBeInTheDocument();
        expect(screen.getByText('—')).toBeInTheDocument();
    });
});
