import { render, screen } from '@testing-library/react';

import { Prognose, PrognoseSchema } from '../../../../../models/Sykmelding/Prognose';

import PrognoseView from './PrognoseView';

describe('PrognoseView', () => {
    it('Renders section title ', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseView prognose={prognose} />);
        expect(screen.getByText('Friskmelding/Prognose')).toBeInTheDocument();
    });

    it('Renders arbeidsforEtterPeriode if true', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseView prognose={prognose} />);
        expect(screen.getByText('Er pasienten 100% arbeidsfør etter denne perioden?')).toBeInTheDocument();
    });

    it('Does not renders arbeidsforEtterPeriode if false', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseView prognose={prognose} />);
        expect(screen.queryByText('Er pasienten 100% arbeidsfør etter denne perioden?')).not.toBeInTheDocument();
    });

    it('Renders hensynArbeidsplassen', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseView prognose={prognose} />);
        expect(screen.getByText('Hensyn som må tas på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText('hensyn på arbeidsplassen')).toBeInTheDocument();
    });
});
