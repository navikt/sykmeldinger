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

    it('Render hyphen if behandler phone does noe exist', () => {
        const rawBehandler = {
            fornavn: 'Lege',
            etternavn: 'Legesen',
            adresse: {},
        };
        const behandler = new Behandler(rawBehandler);
        render(<AnnetView behandler={behandler} />);
        expect(screen.queryByText('Telefon til behandler')).toBeInTheDocument();
        expect(screen.queryByText('—')).toBeInTheDocument();
    });
});
