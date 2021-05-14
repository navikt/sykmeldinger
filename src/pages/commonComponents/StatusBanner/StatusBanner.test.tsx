import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Behandlingsutfall from '../../../models/Sykmelding/Behandlingsutfall';
import SykmeldingStatus from '../../../models/Sykmelding/SykmeldingStatus';
import StatusBanner from './StatusBanner';

describe('StatusBanner', () => {
    it('Renders Sendt banner with arbeidsgiver', () => {
        const plainSykmeldingStatus = {
            statusEvent: 'SENDT',
            timestamp: '2021-05-01',
            arbeidsgiver: {
                orgnummer: '123456',
                orgNavn: 'Politiet',
            },
            sporsmalOgSvarListe: [],
        };
        const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
        const plainBehandlingsutfall = {
            status: 'OK',
            ruleHits: [],
        };
        const behandlingsutfall = new Behandlingsutfall(plainBehandlingsutfall);
        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText('Sykmeldingen er sendt til Politiet')).toBeInTheDocument();
    });

    it('Renders Bekreftet banner', () => {
        const plainSykmeldingStatus = {
            statusEvent: 'BEKREFTET',
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        };
        const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
        const plainBehandlingsutfall = {
            status: 'OK',
            ruleHits: [],
        };
        const behandlingsutfall = new Behandlingsutfall(plainBehandlingsutfall);
        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText('Sykmeldingen er sendt til NAV')).toBeInTheDocument();
    });

    it('Renders Bekreftet egenmelding banner', () => {
        const plainSykmeldingStatus = {
            statusEvent: 'BEKREFTET',
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        };
        const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
        const plainBehandlingsutfall = {
            status: 'OK',
            ruleHits: [],
        };
        const behandlingsutfall = new Behandlingsutfall(plainBehandlingsutfall);
        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} egenmeldt />);
        expect(screen.getByText('Egenmeldingen er sendt til NAV')).toBeInTheDocument();
    });

    it('Renders bekreftet avvist banner', () => {
        const plainSykmeldingStatus = {
            statusEvent: 'BEKREFTET',
            timestamp: '2021-05-01',
            arbeidsgiver: null,
            sporsmalOgSvarListe: [],
        };
        const sykmeldingStatus = new SykmeldingStatus(plainSykmeldingStatus);
        const plainBehandlingsutfall = {
            status: 'INVALID',
            ruleHits: [],
        };
        const behandlingsutfall = new Behandlingsutfall(plainBehandlingsutfall);
        render(<StatusBanner sykmeldingStatus={sykmeldingStatus} behandlingsutfall={behandlingsutfall} />);
        expect(screen.getByText(/Du bekreftet at du har lest at sykmeldingen er avvist/)).toBeInTheDocument();
    });
});
