import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import FlereOpplysninger from './FlereOpplysninger';

describe('Flere opplysninger', () => {
    it('Does not render content when button is not clicked in EkspanderbartpanelBase', () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
        expect(screen.getByText('Vis flere opplysninger')).toBeInTheDocument();
    });

    it('Renders content and change button text when button is clicked in EkspanderbartpanelBase', async () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Vis flere opplysninger'));
        await screen.findByText('Hello world');
        expect(screen.getByText('Skjul flere opplysninger')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Skjul flere opplysninger'));
        expect(screen.getByText('Vis flere opplysninger')).toBeInTheDocument();
    });

    it('Render content and not EkspanderbartpanelBase if disableExpand is true', () => {
        render(
            <FlereOpplysninger disableExpand={true}>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.getByText('Hello world')).toBeInTheDocument();
        expect(screen.queryByText('Vis flere opplysninger')).not.toBeInTheDocument();
        expect(screen.queryByText('Skjul flere opplysninger')).not.toBeInTheDocument();
    });
});

it('Close panel if Lukk button is clicked', async () => {
    render(
        <FlereOpplysninger>
            <p>Information</p>
        </FlereOpplysninger>,
    );
    expect(screen.queryByText('Information')).not.toBeInTheDocument();
    expect(screen.queryByText('Lukk')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Vis flere opplysninger'));
    await screen.findByText('Information');
    expect(screen.getByText('Skjul flere opplysninger')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Lukk'));
    expect(screen.getByText('Vis flere opplysninger')).toBeInTheDocument();
    expect(screen.getByText('Information')).toBeInTheDocument();
});
