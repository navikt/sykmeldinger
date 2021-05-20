import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import FlereOpplysninger from './FlereOpplysninger';

describe('Flere opplysninger', () => {
    it('Does not render content when button is not cliked', () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
    });

    it('Renders content when button is clicked', async () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Flere opplysninger'));
        await screen.findByText('Hello world');
    });

    it('Does not render content when flere opplysninger gets closed', async () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Flere opplysninger'));
        await screen.findByText('Hello world');
        fireEvent.click(screen.getByRole('button', { name: 'Lukk' }));
        expect(screen.queryByRole('button', { name: 'Lukk' })).not.toBeInTheDocument();
    });
});
