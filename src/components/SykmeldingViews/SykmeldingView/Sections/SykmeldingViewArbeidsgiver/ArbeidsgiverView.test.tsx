import { render, screen } from '@testing-library/react';

import { ArbeidsgiverSykmelding } from '../../../../../fetching/graphql.generated';

import ArbeidsgiverView from './ArbeidsgiverView';

describe('ArbeidsgiverView', () => {
    it('Renders arbeidsgiver navn if it exists', () => {
        const arbeidsgiver: ArbeidsgiverSykmelding = {
            __typename: 'ArbeidsgiverSykmelding',
            navn: 'Arbeidsgiveren AS',
            stillingsprosent: null,
        };

        render(<ArbeidsgiverView arbeidsgiver={arbeidsgiver} />);
        expect(screen.getByText('Arbeidsgiver')).toBeInTheDocument();
        expect(screen.getByText('Arbeidsgiveren AS')).toBeInTheDocument();
    });

    it('Does not render arbeidsgiver navn if it does not exist', () => {
        render(<ArbeidsgiverView arbeidsgiver={null} />);
        expect(screen.queryByText('Arbeidsgiver')).not.toBeInTheDocument();
    });
});
