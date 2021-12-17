import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AktivitetIkkeMuligPeriode } from '../../../models/Sykmelding/Periode';
import AktivitetIkkeMuligView from './AktivitetIkkeMuligView';

describe('AktivitetIkkeMuligView', () => {
    it('Renders aktivitet ikke mulig periode', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {},
                arbeidsrelatertArsak: {}
            },
            reisetilskudd: false
        };
        const periode = new AktivitetIkkeMuligPeriode(plainJson.aktivitetIkkeMulig);

        render(<AktivitetIkkeMuligView aktivitetIkkeMulig={periode} arbeidsgiver={false} />);

        expect(screen.getByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).toBeInTheDocument();
        expect(screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet')).toBeInTheDocument();
    });

    it('Renders aktivitet ikke mulig periode with specified medisinsk- and arbeidsrelatert arsak', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    beskrivelse: 'medisinsk beskrivelse',
                    arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                },
                arbeidsrelatertArsak: {
                    beskrivelse: 'arbeidsrelatert beskrivelse',
                    arsak: ['MANGLENDE_TILRETTELEGGING'],
                },
            },
            reisetilskudd: false
        };
        const periode = new AktivitetIkkeMuligPeriode(plainJson.aktivitetIkkeMulig);

        render(<AktivitetIkkeMuligView aktivitetIkkeMulig={periode} arbeidsgiver={false} />);

        expect(screen.getByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).toBeInTheDocument();
        expect(screen.getByText('Helsetilstanden hindrer pasienten i å være i aktivitet')).toBeInTheDocument();
        expect(screen.getByText(plainJson.aktivitetIkkeMulig.medisinskArsak.beskrivelse)).toBeInTheDocument();

        expect(screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet')).toBeInTheDocument();
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText(plainJson.aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse)).toBeInTheDocument();
    });

    it('Does not render medisinsk arsak for arbeidsgiver view', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    beskrivelse: 'medisinsk beskrivelse',
                    arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                },
                arbeidsrelatertArsak: {
                    beskrivelse: 'arbeidsrelatert beskrivelse',
                    arsak: ['MANGLENDE_TILRETTELEGGING'],
                },
            },
            reisetilskudd: false,
        };
        const periode = new AktivitetIkkeMuligPeriode(plainJson.aktivitetIkkeMulig);

        render(<AktivitetIkkeMuligView aktivitetIkkeMulig={periode} arbeidsgiver />);

        expect(screen.queryByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).not.toBeInTheDocument();
        expect(screen.queryByText('Helsetilstanden hindrer pasienten i å være i aktivitet')).not.toBeInTheDocument();
        expect(screen.queryByText(plainJson.aktivitetIkkeMulig.medisinskArsak.beskrivelse)).not.toBeInTheDocument();

        expect(screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet')).toBeInTheDocument();
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText(plainJson.aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse)).toBeInTheDocument();
    });
});
