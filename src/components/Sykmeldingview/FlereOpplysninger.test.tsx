import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import FlereOpplysninger from './FlereOpplysninger';

describe('Flere opplysninger', () => {
    it('Does not render content when button is not clicked in Ekspanderbar', () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
        expect(screen.queryByText('Vis flere opplysninger')).toBeInTheDocument();
    });

    it('Renders content and change button text when button is clicked in Ekspanderbar', async () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Vis flere opplysninger'));
        await screen.findByText('Hello world');
        expect(screen.queryByText('Skjul flere opplysninger')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Skjul flere opplysninger'));
        expect(screen.queryByText('Vis flere opplysninger')).toBeInTheDocument();
    });

    it('Render content and not Ekspanderbar if disableExpand is true', () => {
        render(
            <FlereOpplysninger disableExpand={true}>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).toBeInTheDocument();
        expect(screen.queryByText('Vis flere opplysninger')).not.toBeInTheDocument();
        expect(screen.queryByText('Skjul flere opplysninger')).not.toBeInTheDocument();
    });
});
