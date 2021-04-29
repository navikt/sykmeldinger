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
        expect(screen.getByText('Hello world')).not.toBeVisible();
    });

    it('Renders content when button is not cliked', () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.getByText('Hello world')).not.toBeVisible();
        fireEvent(
            screen.getByText('Flere opplysninger'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );
        expect(screen.getByText('Hello world')).toBeVisible();
    });

    it('Does not render content when flere opplysninger gets closed', () => {
        render(
            <FlereOpplysninger>
                <p>Hello world</p>
            </FlereOpplysninger>,
        );
        expect(screen.getByText('Hello world')).not.toBeVisible();
        fireEvent(
            screen.getByText('Flere opplysninger'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );
        expect(screen.getByText('Hello world')).toBeVisible();
        fireEvent(
            screen.getByText('Lukk'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );
        expect(screen.getByText('Hello world')).not.toBeVisible();
    });
});
