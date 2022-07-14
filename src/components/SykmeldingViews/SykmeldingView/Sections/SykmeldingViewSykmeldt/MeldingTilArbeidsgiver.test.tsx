import { render, screen } from '@testing-library/react';

import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver';

describe('MeldingTilArbeidsgiver', () => {
    it('should render meldingTilArbeidsgiver', () => {
        render(<MeldingTilArbeidsgiver meldingTilArbeidsgiver="Lang melding" />);
        expect(screen.getByText('Melding til arbeidsgiver')).toBeInTheDocument();
        expect(screen.getByText('Lang melding')).toBeInTheDocument();
    });

    it('should not render title if meldingTilArbeidsgiver is missing', () => {
        render(<MeldingTilArbeidsgiver meldingTilArbeidsgiver={null} />);
        expect(screen.queryByText('Melding til arbeidsgiver')).not.toBeInTheDocument();
    });
});
