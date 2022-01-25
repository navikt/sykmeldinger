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

        render(<PeriodeView perioder={[periode]} />);

        expect(screen.getByText('Avventende sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
        expect(screen.getByText('Innspill til arbeidsgiver om tilrettelegging')).toBeInTheDocument();
        expect(screen.getByText(plainJson.innspillTilArbeidsgiver)).toBeInTheDocument();
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

        render(<PeriodeView perioder={[periode]} />);

        expect(screen.getByText('20% sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
        expect(screen.getByText('Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?')).toBeInTheDocument();
    });

    it('Renders reisetilskudd periode', () => {
        const plainJson = {
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: 'REISETILSKUDD',
            reisetilskudd: true,
        };
        const periode = new Periode(plainJson);

        render(<PeriodeView perioder={[periode]} />);

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

        render(<PeriodeView perioder={[periode]} />);

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

        render(<PeriodeView perioder={[reisetilskuddPeriode, behandlingsdagerPeriode]} />);

        expect(screen.getByText('Reisetilskudd')).toBeInTheDocument();
        expect(screen.getByText('Behandlingsdager')).toBeInTheDocument();
    });
});
