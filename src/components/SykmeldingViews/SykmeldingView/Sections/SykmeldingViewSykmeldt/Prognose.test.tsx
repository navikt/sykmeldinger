import { render, screen } from '@testing-library/react';

import { PrognoseSchema, Prognose } from '../../../../../models/Sykmelding/Prognose';

import PrognoseSykmeldt from './Prognose';

describe('Prognose', () => {
    it('Renders section title ', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseSykmeldt prognose={prognose} />);
        expect(screen.getByText('Prognose')).toBeInTheDocument();
    });

    it('Does not render section if arbeidsforEtterPeriode is false and all other properties are undefined', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen: null,
            erIkkeIArbeid: null,
            erIArbeid: null,
        });
        render(<PrognoseSykmeldt prognose={prognose} />);

        expect(screen.queryByText('Friskmelding/Prognose')).not.toBeInTheDocument();
    });

    it('Renders arbeidsforEtterPeriode if true', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseSykmeldt prognose={prognose} />);
        expect(screen.getByText('Er pasienten 100% arbeidsfør etter denne perioden?')).toBeInTheDocument();
    });

    it('Does not renders arbeidsforEtterPeriode if false', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: false,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseSykmeldt prognose={prognose} />);
        expect(screen.queryByText('Er pasienten 100% arbeidsfør etter denne perioden?')).not.toBeInTheDocument();
    });

    it('Renders hensynArbeidsplassen', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: null,
            erIkkeIArbeid: null,
        });
        render(<PrognoseSykmeldt prognose={prognose} />);
        expect(screen.getByText('Hensyn som må tas på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText('hensyn på arbeidsplassen')).toBeInTheDocument();
    });

    it('Renders erIArbeid egetArbeidPaSikt true', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: {
                egetArbeidPaSikt: true,
                annetArbeidPaSikt: false,
                arbeidFOM: '2021-04-10',
                vurderingsdato: '2021-04-15',
            },
            erIkkeIArbeid: null,
        });
        render(<PrognoseSykmeldt prognose={prognose} />);
        expect(
            screen.getByText('Antas pasienten å kunne komme tilbake til samme arbeidsgiver på sikt?'),
        ).toBeInTheDocument();
        expect(
            screen.queryByText('Antas pasienten å kunne komme tilbake til annen arbeidsgiver på sikt?'),
        ).not.toBeInTheDocument();

        expect(screen.getByText('Pasienten anslås å være tilbake')).toBeInTheDocument();
        expect(screen.getByText('10. april 2021')).toBeInTheDocument();

        expect(screen.getByText('Behandler kan gi tilbakemelding på dette')).toBeInTheDocument();
        expect(screen.getByText('15. april 2021')).toBeInTheDocument();
    });

    it('Renders erIArbeid annetArbeidPaSikt true', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIArbeid: {
                egetArbeidPaSikt: false,
                annetArbeidPaSikt: true,
                arbeidFOM: '2021-04-10',
                vurderingsdato: '2021-04-15',
            },
            erIkkeIArbeid: null,
        });

        render(<PrognoseSykmeldt prognose={prognose} />);

        expect(
            screen.getByText('Antas pasienten å kunne komme tilbake til annen arbeidsgiver på sikt?'),
        ).toBeInTheDocument();
        expect(
            screen.queryByText('Antas pasienten å kunne komme tilbake til samme arbeidsgiver på sikt?'),
        ).not.toBeInTheDocument();

        expect(screen.getByText('Pasienten anslås å være tilbake')).toBeInTheDocument();
        expect(screen.getByText('10. april 2021')).toBeInTheDocument();

        expect(screen.getByText('Behandler kan gi tilbakemelding på dette')).toBeInTheDocument();
        expect(screen.getByText('15. april 2021')).toBeInTheDocument();
    });

    it('Renders erIkkeIArbeid arbeidsforPaSikt true', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIkkeIArbeid: {
                arbeidsforPaSikt: true,
                arbeidsforFOM: '2021-04-10',
                vurderingsdato: '2021-04-15',
            },
            erIArbeid: null,
        });
        render(<PrognoseSykmeldt prognose={prognose} />);
        expect(screen.getByText('Antas pasienten å kunne komme i arbeid på sikt?')).toBeInTheDocument();

        expect(screen.getByText('Pasienten anslås å vær være arbeidsfør')).toBeInTheDocument();
        expect(screen.getByText('10. april 2021')).toBeInTheDocument();

        expect(screen.getByText('Behandler kan gi tilbakemelding på dette')).toBeInTheDocument();
        expect(screen.getByText('15. april 2021')).toBeInTheDocument();
    });

    it('Renders erIkkeIArbeid when arbeidsforPaSikt is false', () => {
        const prognose: Prognose = PrognoseSchema.parse({
            arbeidsforEtterPeriode: true,
            hensynArbeidsplassen: 'hensyn på arbeidsplassen',
            erIkkeIArbeid: {
                arbeidsforPaSikt: false,
                vurderingsdato: '2021-04-15',
                arbeidsforFOM: null,
            },
            erIArbeid: null,
        });

        render(<PrognoseSykmeldt prognose={prognose} />);

        expect(screen.queryByText('Antas pasienten å kunne komme i arbeid på sikt?')).not.toBeInTheDocument();
        expect(screen.getByText('Behandler kan gi tilbakemelding på dette')).toBeInTheDocument();
        expect(screen.getByText('15. april 2021')).toBeInTheDocument();
    });
});
