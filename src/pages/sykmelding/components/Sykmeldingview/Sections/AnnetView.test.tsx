import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AnnetView from './AnnetView';

describe('AnnetView', () => {
    it('Renders behandler phone if it exist', () => {
        render(<AnnetView behandlerTlf="99887766" />);
        expect(screen.getByText('Telefon til lege/sykmelder')).toBeInTheDocument();
        expect(screen.getByText('99887766')).toBeInTheDocument();
    });

    it('Does not render behandler phone if it does noe exist', () => {
        render(<AnnetView />);
        expect(() => {
            screen.getByText('Telefon til lege/sykmelder');
        }).toThrow();
    });
});
