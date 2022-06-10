import { render, screen } from '@testing-library/react';

import { PeriodeSchema, Periode, Periodetype } from '../../../../models/Sykmelding/Periode';

import PeriodeView from './PeriodeView';

describe('PeriodeView', () => {
    it('Renders avventende periode', () => {
        const periode: Periode = PeriodeSchema.parse({
            fom: '2021-04-01',
            tom: '2021-04-05',
            innspillTilArbeidsgiver: 'innspill til arbeidsgiver',
            type: 'AVVENTENDE',
            reisetilskudd: false,
            gradert: null,
            behandlingsdager: null,
            aktivitetIkkeMulig: null,
        });

        render(<PeriodeView perioder={[periode]} />);

        expect(screen.getByText('Avventende sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
        expect(screen.getByText('Innspill til arbeidsgiver om tilrettelegging')).toBeInTheDocument();
        expect(screen.getByText('innspill til arbeidsgiver')).toBeInTheDocument();
    });

    it('Renders gradert periode', () => {
        const periode: Periode = PeriodeSchema.parse({
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: Periodetype.GRADERT,
            gradert: {
                grad: 20,
                reisetilskudd: true,
            },
            reisetilskudd: false,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            aktivitetIkkeMulig: null,
        });

        render(<PeriodeView perioder={[periode]} />);

        expect(screen.getByText('20% sykmelding')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
        expect(screen.getByText('Kan pasienten være i delvis arbeid ved bruk av reisetilskudd?')).toBeInTheDocument();
    });

    it('Renders reisetilskudd periode', () => {
        const periode: Periode = PeriodeSchema.parse({
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: Periodetype.REISETILSKUDD,
            reisetilskudd: true,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            gradert: null,
            aktivitetIkkeMulig: null,
        });

        render(<PeriodeView perioder={[periode]} />);

        expect(screen.getByText('Reisetilskudd')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('5 dager')).toBeInTheDocument();
    });

    it('Renders behandlingsdager periode', () => {
        const periode: Periode = PeriodeSchema.parse({
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: Periodetype.BEHANDLINGSDAGER,
            behandlingsdager: 3,
            reisetilskudd: false,
            gradert: null,
            innspillTilArbeidsgiver: null,
            aktivitetIkkeMulig: null,
        });

        render(<PeriodeView perioder={[periode]} />);

        expect(screen.getByText('Behandlingsdager')).toBeInTheDocument();
        expect(screen.getByText('1. til 5. april 2021')).toBeInTheDocument();
        expect(screen.getByText('3 behandlingsdager i løpet av 5 dager')).toBeInTheDocument();
    });

    it('Renders more than one period', () => {
        const reisetilskudd: Periode = PeriodeSchema.parse({
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: Periodetype.REISETILSKUDD,
            reisetilskudd: true,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            gradert: null,
            aktivitetIkkeMulig: null,
        });
        const behandlingsdager: Periode = PeriodeSchema.parse({
            fom: '2021-04-01',
            tom: '2021-04-05',
            type: Periodetype.BEHANDLINGSDAGER,
            behandlingsdager: 3,
            reisetilskudd: false,
            gradert: null,
            innspillTilArbeidsgiver: null,
            aktivitetIkkeMulig: null,
        });

        render(<PeriodeView perioder={[reisetilskudd, behandlingsdager]} />);

        expect(screen.getByText('Reisetilskudd')).toBeInTheDocument();
        expect(screen.getByText('Behandlingsdager')).toBeInTheDocument();
    });
});
