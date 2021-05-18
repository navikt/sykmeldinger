import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ArbeidsgiverSykmelding from '../../../models/Sykmelding/ArbeidsgiverSykmelding';
import ArbeidsgiverView from './ArbeidsgiverView';

describe('ArbeidsgiverView', () => {
    it('Renders arbeidsgiver navn if it exists', () => {
        const plainJson = {
            navn: 'Arbeidsgiveren AS',
        };
        const arbeidsgiver = new ArbeidsgiverSykmelding(plainJson);
        render(<ArbeidsgiverView arbeidsgiver={arbeidsgiver} />);
        expect(screen.getByText('Arbeidsgiver som legen har skrevet inn')).toBeInTheDocument();
        expect(screen.getByText(plainJson.navn)).toBeInTheDocument();
    });

    it('Does not render arbeidsgiver navn if it does not exist', () => {
        const plainJson = {};
        const arbeidsgiver = new ArbeidsgiverSykmelding(plainJson);
        render(<ArbeidsgiverView arbeidsgiver={arbeidsgiver} />);
        expect(() => {
            screen.getByText('Arbeidsgiver som legen har skrevet inn');
        }).toThrow();
    });
});
