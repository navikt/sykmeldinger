import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MeldingTilNAV from '../../../../../models/Sykmelding/MeldingTilNav';
import MeldingTilNavView from './MeldingTilNavView';

describe('MeldingTilNavView', () => {
    it('Renders ønsker bistand if bistandUmiddelbart is true', () => {
        const plainJson = {
            bistandUmiddelbart: true,
        };
        const meldingTilNav = new MeldingTilNAV(plainJson);
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} />);
        expect(screen.getByText('Melding til NAV')).toBeInTheDocument();
        expect(screen.getByText('Ønskes bistand fra NAV nå')).toBeInTheDocument();
    });

    it('Does not render ønsker bistand if bistandUmiddelbart is false', () => {
        const plainJson = {
            bistandUmiddelbart: false,
        };
        const meldingTilNav = new MeldingTilNAV(plainJson);
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} />);
        expect(() => {
            expect(screen.getByText('Melding til NAV'));
        }).toThrow();
        expect(() => {
            screen.getByText('Ønskes bistand fra NAV nå');
        }).toThrow();
    });

    it('Renders beskrivelse', () => {
        const plainJson = {
            bistandUmiddelbart: true,
            beskrivBistand: 'beskrivelse av bistanden',
        };
        const meldingTilNav = new MeldingTilNAV(plainJson);
        render(<MeldingTilNavView meldingTilNav={meldingTilNav} />);
        expect(screen.getByText('Nærmere beskrivelse')).toBeInTheDocument();
        expect(screen.getByText(plainJson.beskrivBistand)).toBeInTheDocument();
    });

    it('Does not render section if object does not exist', () => {
        render(<MeldingTilNavView />);
        expect(() => {
            expect(screen.getByText('Melding til NAV'));
        }).toThrow();
        expect(() => {
            screen.getByText('Ønskes bistand fra NAV nå');
        }).toThrow();
        expect(() => {
            screen.getByText('Nærmere beskrivelse');
        }).toThrow();
    });
});
