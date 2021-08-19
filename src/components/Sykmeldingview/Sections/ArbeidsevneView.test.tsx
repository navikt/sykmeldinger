import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ArbeidsevneView from './ArbeidsevneView';

describe('ArbeidsevneView', () => {
    it('Renders tiltak if they exist', () => {
        render(
            <ArbeidsevneView
                tiltakArbeidsplassen="tiltak på arbeidsplassen"
                tiltakNAV="tiltak nav"
                andreTiltak="andre tiltak"
                arbeidsgiver={false}
            />,
        );
        expect(screen.getByText('tiltak på arbeidsplassen')).toBeInTheDocument();
        expect(screen.getByText('tiltak nav')).toBeInTheDocument();
        expect(screen.getByText('andre tiltak')).toBeInTheDocument();
    });

    it('Renders tiltakArbeidsplassen even if other tiltaks are null', () => {
        render(
            <ArbeidsevneView
                tiltakArbeidsplassen="tiltak på arbeidsplassen"
                arbeidsgiver={false}
            />,
        );
        expect(screen.getByText('tiltak på arbeidsplassen')).toBeInTheDocument();
    });


    it('Does not render tiltak if then dont exist', () => {
        render(<ArbeidsevneView arbeidsgiver={false} />);
        expect(screen.queryByText('tiltak på arbeidsplassen')).not.toBeInTheDocument();
        expect(screen.queryByText('tiltak nav')).not.toBeInTheDocument();
        expect(screen.queryByText('andre tiltak')).not.toBeInTheDocument();
    });

    it('Does not render tiltak nav and andre tiltak if arbeidsgiver', () => {
        render(
            <ArbeidsevneView
                tiltakArbeidsplassen="tiltak på arbeidsplassen"
                tiltakNAV="tiltak nav"
                andreTiltak="andre tiltak"
                arbeidsgiver
            />,
        );
        expect(screen.getByText('tiltak på arbeidsplassen')).toBeInTheDocument();
        expect(screen.queryByText('tiltak nav')).not.toBeInTheDocument();
        expect(screen.queryByText('andre tiltak')).not.toBeInTheDocument();
    });
});
