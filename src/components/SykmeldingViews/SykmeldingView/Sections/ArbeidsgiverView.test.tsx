import { render, screen } from '@testing-library/react';

import { ArbeidsgiverSykmeldingSchema } from '../../../../models/Sykmelding/ArbeidsgiverSykmelding';

import ArbeidsgiverView from './ArbeidsgiverView';

describe('ArbeidsgiverView', () => {
    it('Renders arbeidsgiver navn if it exists', () => {
        const arbeidsgiver = ArbeidsgiverSykmeldingSchema.parse({
            navn: 'Arbeidsgiveren AS',
            stillingsprosent: null,
        });

        render(<ArbeidsgiverView arbeidsgiver={arbeidsgiver} />);
        expect(screen.getByText('Arbeidsgiver')).toBeInTheDocument();
        expect(screen.getByText('Arbeidsgiveren AS')).toBeInTheDocument();
    });

    it('Does not render arbeidsgiver navn if it does not exist', () => {
        render(<ArbeidsgiverView arbeidsgiver={null} />);
        expect(screen.queryByText('Arbeidsgiver')).not.toBeInTheDocument();
    });
});
