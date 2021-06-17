import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Pasient from '../../../models/Sykmelding/Pasient';
import PasientView from './PasientView';

describe('MeldingTilNavView', () => {
    it('Does not render if NOT arbeidsgiver', () => {
        const plainJson = {
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        };
        const pasient = new Pasient(plainJson);
        render(<PasientView pasient={pasient} />);
        expect(screen.queryByText('Ola Nordmann')).not.toBeInTheDocument();
        expect(screen.queryByText('12345678901')).not.toBeInTheDocument();
    });

    it('Does not render if name is undefined', () => {
        const plainJson = {
            fnr: '12345678901',
            fornavn: null,
            mellomnavn: null,
            etternavn: null,
        };
        const pasient = new Pasient(plainJson);
        render(<PasientView pasient={pasient} />);
        expect(screen.queryByText('Ola Nordmann')).not.toBeInTheDocument();
        expect(screen.queryByText('12345678901')).not.toBeInTheDocument();
    });

    it('Renders name and fnr if arbeidsgiver', () => {
        const plainJson = {
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        };
        const pasient = new Pasient(plainJson);
        render(<PasientView pasient={pasient} arbeidsgiver />);
        expect(screen.getByText('Ola Nordmann')).toBeInTheDocument();
        expect(screen.getByText('12345678901')).toBeInTheDocument();
    });
});
