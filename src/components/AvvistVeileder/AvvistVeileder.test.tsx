import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Behandlingsutfall from '../../models/Sykmelding/Behandlingsutfall';
import AvvistVeileder from './AvvistVeileder';

describe('AvvistVeileder', () => {
    it('Renders custom message for people over 70', () => {
        const plainBehandlingsutfall = {
            status: 'INVALID',
            ruleHits: [
                {
                    messageForSender: '',
                    messageForUser: '',
                    ruleName: 'PASIENT_ELDRE_ENN_70',
                    ruleStatus: 'INVALID',
                },
            ],
        };
        const behandlingsutfall = new Behandlingsutfall(plainBehandlingsutfall);
        render(<AvvistVeileder behandlerNavn={'Doktor Legesen'} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText('Sykmeldingen kan dessverre ikke brukes')).toBeInTheDocument();
        expect(screen.getByText(/Du har ikke rett til sykepenger fordi du er over 70 år/)).toBeInTheDocument();
    });

    it('Renders normal message for other rulehits than PASIENT_ELDRE_ENN_70', () => {
        const plainBehandlingsutfall = {
            status: 'INVALID',
            ruleHits: [
                {
                    messageForSender: '',
                    messageForUser: 'Dessverre avvist',
                    ruleName: 'SOMETHING_ELSE',
                    ruleStatus: 'INVALID',
                },
            ],
        };
        const behandlingsutfall = new Behandlingsutfall(plainBehandlingsutfall);
        render(<AvvistVeileder behandlerNavn={'Doktor Legesen'} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText('Sykmeldingen kan dessverre ikke brukes')).toBeInTheDocument();
        expect(screen.getByText(/Du trenger en ny sykmelding/)).toBeInTheDocument();
    });
});
