import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Periode from '../../../models/Sykmelding/Periode';
import PeriodeView from './PeriodeView';

describe('PeriodeView', () => {
    it('Renders avventende periode', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            innspillTilArbeidsgiver: 'innspill til arbeidsgiver',
            type: 'AVVENTENDE',
            reisetilskudd: false,
        };
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} arbeidsgiver={false} />);

        expect(screen.getByText('Avventende sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
        expect(screen.getByText('Innspill til arbeidsgver om tilrettelegging')).toBeInTheDocument();
        expect(screen.getByText(plainJson.innspillTilArbeidsgiver)).toBeInTheDocument();
    });

    it('Renders aktivitet ikke mulig periode', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {},
                arbeidsrelatertArsak: {},
            },
            reisetilskudd: false,
        };
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} arbeidsgiver={false} />);

        expect(screen.getByText('100% sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();

        expect(screen.getByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).toBeInTheDocument();
        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument();
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
            reisetilskudd: false,
        };
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} arbeidsgiver={false} />);

        expect(screen.getByText('100% sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();

        expect(screen.getByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).toBeInTheDocument();
        expect(screen.getByText('Helsetilstanden hindrer pasienten i å være i aktivitet')).toBeInTheDocument();
        expect(screen.getByText('Begrunnelse for vurdering av aktivitetskravet')).toBeInTheDocument();
        expect(screen.getByText(plainJson.aktivitetIkkeMulig.medisinskArsak.beskrivelse)).toBeInTheDocument();

        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument();
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText('Nærmere beskrivelse')).toBeInTheDocument();
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
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} arbeidsgiver />);

        expect(screen.getByText('100% sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();

        expect(screen.queryByText('Medisinske årsaker hindrer arbeidsrelatert aktivitet')).not.toBeInTheDocument();
        expect(screen.queryByText('Helsetilstanden hindrer pasienten i å være i aktivitet')).not.toBeInTheDocument();
        expect(screen.queryByText('Begrunnelse for vurdering av aktivitetskravet')).not.toBeInTheDocument();
        expect(screen.queryByText(plainJson.aktivitetIkkeMulig.medisinskArsak.beskrivelse)).not.toBeInTheDocument();

        expect(
            screen.getByText('Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet'),
        ).toBeInTheDocument();
        expect(screen.getByText('Manglende tilrettelegging på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText('Nærmere beskrivelse')).toBeInTheDocument();
        expect(screen.getByText(plainJson.aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse)).toBeInTheDocument();
    });

    it('Renders gradert periode', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'GRADERT',
            gradert: {
                grad: 20,
                reisetilskudd: true,
            },
            reisetilskudd: false,
        };
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} arbeidsgiver={false} />);

        expect(screen.getByText('20% sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
        expect(screen.getByText('Pasienten kan være i delvis arbeid ved bruk av reisetilskudd')).toBeInTheDocument();
    });

    it('Renders reisetilskudd periode', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'REISETILSKUDD',
            reisetilskudd: true,
        };
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} arbeidsgiver={false} />);

        expect(screen.getByText('Reisetilskudd')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
    });

    it('Renders behandlingsdager periode', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'BEHANDLINGSDAGER',
            behandlingsdager: 3,
            reisetilskudd: false,
        };
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} arbeidsgiver={false} />);

        expect(screen.getByText('Behandlingsdager')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('3 behandlingsdager i løpet av 5 dager')).toBeInTheDocument();
    });

    it('Renders more than one period', () => {
        const reisetilskuddJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'REISETILSKUDD',
            reisetilskudd: true,
        };
        const behandlingsdagerJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'BEHANDLINGSDAGER',
            behandlingsdager: 3,
            reisetilskudd: false,
        };
        const reisetilskuddPeriode = new Periode(reisetilskuddJson);
        const behandlingsdagerPeriode = new Periode(behandlingsdagerJson);

        render(<PeriodeView perioder={[reisetilskuddPeriode, behandlingsdagerPeriode]} arbeidsgiver={false} />);

        expect(screen.getByText('Reisetilskudd')).toBeInTheDocument();
        expect(screen.getByText('Behandlingsdager')).toBeInTheDocument();
    });
});
