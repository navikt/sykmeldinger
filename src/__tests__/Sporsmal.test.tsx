import { render, fireEvent, getByLabelText, act, findByText, waitForElement, queryByAttribute, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sporsmal from '../components/sporsmal/Sporsmal';
import React from 'react';

// TODO: finn en bedre løsning på dette
global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

describe('Sporsmal', () => {
    it('Skal inneholde opplysningeneErRiktige og sykmledtFra radiogrupper', () => {
        const { queryByLabelText } = render(<Sporsmal />);
        expect(queryByLabelText('Ja')).toBeInTheDocument();
        expect(queryByLabelText('Nei')).toBeInTheDocument();
        expect(queryByLabelText('Liste med arbeidsgivere')).toBeInTheDocument();
    });
    it('Skal vise checkboxgruppe når "Nei" trykkes', () => {
        const { queryByLabelText, getByLabelText } = render(<Sporsmal />);
        fireEvent.click(getByLabelText(/Nei/i));
        expect(queryByLabelText('Diagnose')).toBeInTheDocument();
    });
    it('Skal ikke vise checkboxgruppe når "Ja" trykkes', () => {
        const { queryByLabelText, getByLabelText } = render(<Sporsmal />);
        fireEvent.click(getByLabelText(/Ja/i));
        expect(queryByLabelText('Diagnose')).not.toBeInTheDocument();
    });
    it('Skal vise feiltext dersom SEND SYKMELDING trykkes og ikke alle valg er gjort', async () => {
        const { getByText } = render(<Sporsmal />);
        act(() => {
            fireEvent.click(getByText(/SEND SYKMELDING/i));
        });
        await wait(() => getByText('Vennligst velg Ja eller Nei'));
        expect(getByText('Vennligst velg Ja eller Nei')).toBeInTheDocument();
    });
    it('Skal vise avbrytdialog dersom det trykkes på "Jeg ønsker ikke å bruke denne sykmeldingen"', () => {
        const { queryByText, getByText } = render(<Sporsmal />);
        expect(queryByText('JA, JEG ER SIKKER')).toBeNull();
        fireEvent.click(getByText(/Jeg ønsker ikke å bruke denne sykmeldingen/i));
        expect(getByText('Er du sikker på at du vil avbryte denne sykmeldingen?')).toBeInTheDocument();
        expect(getByText('JA, JEG ER SIKKER')).toBeInTheDocument()
    });
});
