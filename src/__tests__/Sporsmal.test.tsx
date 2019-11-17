import React from 'react';
import Sporsmal from '../components/sporsmal/Sporsmal';
import tekster from '../components/sporsmal/sporsmal-tekster';
import { render, fireEvent, wait, getByLabelText, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// TODO: finn en bedre løsning på dette
global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

describe('Sporsmal', () => {
    describe('Er opplysningene i sykmeldingen riktige', () => {
        it('Skal inneholde radiogruppe med "Ja" og "Nei"', () => {
            const { queryByLabelText } = render(<Sporsmal />);
            expect(queryByLabelText(tekster['ja'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['nei'])).toBeInTheDocument();
        });
        it('Skal vise feilmelding dersom ingenting er valgt', async () => {
            const { queryByText, getByText } = render(<Sporsmal />);
            expect(queryByText(tekster['jaEllerNei.feilmelding'])).toBeNull();
            fireEvent.click(getByText(tekster['knapp.submit']));
            await wait(() => queryByText(tekster['jaEllerNei.feilmelding']));
            expect(queryByText(tekster['jaEllerNei.feilmelding'])).toBeInTheDocument();
        });
        it('Skal ikke rendre sjekkbokserer med opplysningen som ikke stemmer dersom "Ja" er valgt', () => {
            const { queryByLabelText, getByLabelText } = render(<Sporsmal />);
            fireEvent.click(getByLabelText(tekster['ja']));
            expect(queryByLabelText(tekster['opplysningeneErFeil.periode'])).toBeNull();
            expect(queryByLabelText(tekster['opplysningeneErFeil.sykmeldingsgrad'])).toBeNull();
            expect(queryByLabelText(tekster['opplysningeneErFeil.diagnose'])).toBeNull();
            expect(queryByLabelText(tekster['opplysningeneErFeil.andreOpplysninger'])).toBeNull();
        });
        it('Skal rendre sjekkbokserer med opplysningen som ikke stemmer dersom "Nei" er valgt', () => {
            const { queryByLabelText, getByLabelText } = render(<Sporsmal />);
            fireEvent.click(getByLabelText(tekster['nei']));
            expect(queryByLabelText(tekster['opplysningeneErFeil.periode'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['opplysningeneErFeil.sykmeldingsgrad'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['opplysningeneErFeil.diagnose'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['opplysningeneErFeil.andreOpplysninger'])).toBeInTheDocument();
        });
    });

    describe('Hvilke opplysninger er ikke riktige?', () => {
        it('Skal rendre alertstripe "Du trenger ny sykmelding." dersom "periode" eller "symeldingsgrad" er valgt', async () => {
            const { queryByLabelText, getByLabelText, queryByText } = render(<Sporsmal />);
            fireEvent.click(getByLabelText(tekster['nei']));
            await wait(() => queryByLabelText(tekster['opplysningeneErFeil.periode']));

            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.periode']));
            await wait(() => queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel']));
            expect(queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel'])).toBeInTheDocument();

            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.sykmeldingsgrad']));
            await wait(() => queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel']));
            expect(queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel'])).toBeInTheDocument();

            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.arbeidsgiver']));
            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.diagnose']));
            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.andreOpplysninger']));
            await wait(() => queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel']));
            expect(queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel'])).toBeInTheDocument();
        });
        it('Skal rendre varselstripe "Du kan bruke sykmeldingen din." dersom "arbeidsgiver", "diagnose" eller "andre opplysninger" er valgt, men ikke "periode" eller "sykmeldingsgrad"', async () => {
            const { queryByLabelText, getByLabelText, queryByText } = render(<Sporsmal />);
            fireEvent.click(getByLabelText(tekster['nei']));
            await wait(() => queryByLabelText(tekster['opplysningeneErFeil.diagnose']));
    
            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.arbeidsgiver']));
            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.diagnose']));
            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.andreOpplysninger']));
            await wait(() => queryByText(tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel']));
            expect(queryByText(tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel'])).toBeInTheDocument();
            
            fireEvent.click(getByLabelText(tekster['opplysningeneErFeil.sykmeldingsgrad']));
            await wait(() => queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel']));
            expect(queryByText(tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel'])).toBeNull();
            expect(queryByText(tekster['alertstripe.du-trenger-ny-sykmelding.tittel'])).toBeInTheDocument();
        });
    });

    describe('Jeg er sykmeldt fra', () => {
        it('Skal rendre radiogruppe', () => {
            const { queryByLabelText } = render(<Sporsmal />);
            // TODO: utvid test for å sjekke om arbeidsgiver vises riktig
            expect(queryByLabelText(tekster['sykmeldtFra.selvstending-naringsdrivende'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['sykmeldtFra.frilanser'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['sykmeldtFra.annen-arbeidsgiver'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['sykmeldtFra.arbeidsledig'])).toBeInTheDocument();
            expect(queryByLabelText(tekster['sykmeldtFra.ingenting-passer'])).toBeInTheDocument();
        });
        it('Skal vise feilmelding dersom ingenting er valgt', async () => {
            const { queryByText, getByText } = render(<Sporsmal />);
            expect(queryByText(tekster['sykmeldtFra.feilmelding'])).toBeNull();
            fireEvent.click(getByText(tekster['knapp.submit']));
            await wait(() => queryByText(tekster['sykmeldtFra.feilmelding']));
            expect(queryByText(tekster['sykmeldtFra.feilmelding'])).toBeInTheDocument();
        });
        it('Skal rendre arbeidsgiver-bekreftelse radioknapper dersom arbeidsgiver er valgt', () => {
            const { queryByText } = render(<Sporsmal />);
            expect(queryByText(tekster['sykmeldtFra.arbeidsgiver.bekreft.tittel'])).toBeNull();
            // TODO: utvid test slik at riktig arbeidsgiver trykkes på
        });
    });

    describe('Avbrytdialog', () => {
        it('Skal vise avbrytdialog dersom man ønsker å avbryte sykmeldingen', () => {
            const { queryByText, getByText } = render(<Sporsmal />);
            expect(queryByText(tekster['avbrytdialog.avbryt-knapp'])).toBeNull();
            fireEvent.click(getByText(tekster['knapp.onsker-ikke-bruke-sykmelding']));
            expect(getByText(tekster['avbrytdialog.avbryt-knapp'])).toBeInTheDocument();
            expect(getByText(tekster['avbrytdialog.er-du-sikker'])).toBeInTheDocument();
            expect(getByText(tekster['avbrytdialog.kan-sende-papir'])).toBeInTheDocument();
        });
    });

    describe('Alertbanner', () => {
        it('Skal vise alertbanner dersom det finnes feil i valideringen', async () => {
            const { queryByText, getByText } = render(<Sporsmal />);
            expect(queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst'])).toBeNull();
            fireEvent.click(getByText(tekster['knapp.submit']));
            await wait(() => queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst']));
            expect(queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst'])).toBeInTheDocument();
        });
        it('Skal vise alertbanner helt til alle feil er vekke', async () => {
            const { queryByText, getByText, getByLabelText } = render(<Sporsmal />);
            expect(queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst'])).toBeNull();
            act(() => {
                fireEvent.click(getByText(tekster['knapp.submit']));
            });
            await wait(() => queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst']));
            expect(queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst'])).toBeInTheDocument();
            act(() => {
                fireEvent.click(getByLabelText(tekster['ja']));
            });
            await wait(() => queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst']));
            expect(queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst'])).toBeInTheDocument();
            act(() => {
                fireEvent.click(getByLabelText(tekster['sykmeldtFra.frilanser']));
            });
            await wait(() => queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst']));
            expect(queryByText(tekster['alertstripe.feil-i-utfyllingen.tekst'])).toBeNull();
        });
    });

    describe('Send inn sykmeldingen', () => {
        // TODO: utvid med fetch mock og sjekk at dataen som blir submittet er riktig
    });
});
