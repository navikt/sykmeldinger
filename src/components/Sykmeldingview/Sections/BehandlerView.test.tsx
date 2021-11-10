import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BehandlerView from './BehandlerView';

describe('BehandlerView', () => {
    it('Render behandlers navn', () => {
        render(<BehandlerView navnFastlege="Dr. Navn" />);
        expect(screen.getByText('Behandler')).toBeInTheDocument();
        expect(screen.getByText('Dr. Navn')).toBeInTheDocument();
    });

    it('Dose not render behandlers navn if it does not exist', () => {
        render(<BehandlerView navnFastlege="" />);
        expect(screen.queryByText('Behandler')).not.toBeInTheDocument();
        expect(screen.queryByText('Dr. Navn')).not.toBeInTheDocument();
    });
});
