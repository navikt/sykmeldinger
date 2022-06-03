import { render, screen } from '@testing-library/react';

import { PasientSchema, Pasient } from '../../../../models/Sykmelding/Pasient';

import PasientView from './PasientView';

describe('PasientView', () => {
    it('Does not render if NOT arbeidsgiver', () => {
        const pasient: Pasient = PasientSchema.parse({
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        });
        render(<PasientView pasient={pasient} arbeidsgiver={false} />);
        expect(screen.queryByText('Sykmeldingen gjelder')).not.toBeInTheDocument();
        expect(screen.queryByText('Ola Nordmann')).not.toBeInTheDocument();
        expect(screen.queryByText('12345678901')).not.toBeInTheDocument();
    });

    it('Does not render if name is undefined', () => {
        const pasient: Pasient = PasientSchema.parse({
            fnr: '12345678901',
            fornavn: null,
            mellomnavn: null,
            etternavn: null,
        });
        render(<PasientView pasient={pasient} arbeidsgiver />);
        expect(screen.queryByText('Sykmeldingen gjelder')).not.toBeInTheDocument();
        expect(screen.queryByText('Ola Nordmann')).not.toBeInTheDocument();
        expect(screen.queryByText('12345678901')).not.toBeInTheDocument();
    });

    it('Renders name and fnr if arbeidsgiver', () => {
        const pasient: Pasient = PasientSchema.parse({
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        });
        render(<PasientView pasient={pasient} arbeidsgiver />);
        expect(screen.getByText('Sykmeldingen gjelder')).toBeInTheDocument();
        expect(screen.getByText('Ola Nordmann')).toBeInTheDocument();
        expect(screen.getByText('12345678901')).toBeInTheDocument();
    });
});
