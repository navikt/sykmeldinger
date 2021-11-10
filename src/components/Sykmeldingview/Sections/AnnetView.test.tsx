import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Behandler from '../../../models/Sykmelding/Behandler';
import AnnetView from './AnnetView';

describe('AnnetView', () => {
    it('Renders behandler phone if it exist', () => {
        const rawBehandler = {
            fornavn: 'Lege',
            etternavn: 'Legesen',
            tlf: '12345678',
            adresse: {},
        };
        const behandler = new Behandler(rawBehandler);
        render(<AnnetView behandler={behandler} />);
        expect(screen.getByText('Telefon til behandler')).toBeInTheDocument();
        expect(screen.getByText('12345678')).toBeInTheDocument();
    });

    it('Does not render behandler phone if it does noe exist', () => {
        const rawBehandler = {
            fornavn: 'Lege',
            etternavn: 'Legesen',
            adresse: {},
        };
        const behandler = new Behandler(rawBehandler);
        render(<AnnetView behandler={behandler} />);
        expect(screen.queryByText('Telefon til behandler')).not.toBeInTheDocument();
        expect(screen.queryByText('12345678')).not.toBeInTheDocument();
    });
});
