import { fireEvent, render, screen } from '@testing-library/react';

import FlereOpplysninger from './FlereOpplysninger';

describe('Flere opplysninger', () => {
    it('Does not render content when button is not clicked', () => {
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
});
