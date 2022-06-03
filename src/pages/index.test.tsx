import nock from 'nock';

import { render, screen, waitForElementToBeRemoved, within } from '../utils/test/testUtils';
import { sykmeldingBekreftet } from '../utils/test/mockData/sykmelding-bekreftet';
import { sykmeldingSendt } from '../utils/test/mockData/sykmelding-sendt';
import { sykmeldingAvbrutt } from '../utils/test/mockData/sykmelding-avbrutt';
import { sykmeldingAvvistBekreftet } from '../utils/test/mockData/sykmelding-avvist-bekreftet';
import { sykmeldingUtgatt } from '../utils/test/mockData/sykmelding-utgatt';
import { sykmeldingApen } from '../utils/test/mockData/sykmelding-apen';
import { sykmeldingApenPapir } from '../utils/test/mockData/sykmelding-apen-papir';
import { sykmeldingAvvist } from '../utils/test/mockData/sykmelding-avvist';
import { sykmeldingAvvistUgyldigData } from '../utils/test/mockData/sykmelding-avvist-ugyldig-data';
import { sykmeldingUnderbehandlingTilbakedatering } from '../utils/test/mockData/sykmelding-under-behandling-tilbakedatering';

import SykmeldingerPage from './index.page';

describe('SykmeldingerPage: /syk/sykmeldinger', () => {
    const apiNock = nock('http://localhost');

    it('should fail with error message on API error', async () => {
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(500, 'Fake body');

        render(<SykmeldingerPage />);

        expect(await screen.findByText(/Vi har problemer med baksystemene for øyeblikket./));
    });

    it('should not display any sykmeldinger', async () => {
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, []);

        render(<SykmeldingerPage />);

        expect(await screen.findByText('Du har ingen nye sykmeldinger'));
    });

    it('should only display new sykmeldinger', async () => {
        apiNock
            .get('/api/proxy/v1/sykmeldinger')
            .reply(200, [
                sykmeldingBekreftet,
                sykmeldingSendt(),
                sykmeldingAvbrutt(),
                sykmeldingAvvistBekreftet,
                sykmeldingUtgatt,
            ]);

        render(<SykmeldingerPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'));
        expect(await screen.findByText('Du har ingen nye sykmeldinger'));
        expect(await screen.findByText('Tidligere sykmeldinger'));
        expect(await screen.findByText('Sendt til NAV'));
        expect(await screen.findByText('Sendt til arbeidsgiver'));
        expect(await screen.findByText('Avbrutt av deg'));
        expect(await screen.findByText('Avvist av NAV'));
        expect(await screen.findByText('Utgått'));
    });

    it('should display only new sykmeldinger, sorted by ascending date ', async () => {
        apiNock
            .get('/api/proxy/v1/sykmeldinger')
            .reply(200, [sykmeldingApen(), sykmeldingApenPapir(), sykmeldingAvvist()]);

        render(<SykmeldingerPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'));
        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument();
        const lenkepanelContainer = screen.getByRole('region', { name: 'Nye sykmeldinger' });
        const sykmeldinger = within(lenkepanelContainer).getAllByRole('link');
        expect(sykmeldinger).toHaveLength(3);
        expect(sykmeldinger[0]).toHaveTextContent(/Papirsykmelding/);
        expect(sykmeldinger[1]).toHaveTextContent(/Avvist av NAV/);
        expect(sykmeldinger[2]).toHaveTextContent(/Sykmelding/);
    });

    it('should display under behandling in Nye sykmeldinger section ', async () => {
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmeldingUnderbehandlingTilbakedatering()]);

        render(<SykmeldingerPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'));
        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument();
        const lenkepanelContainer = screen.getByRole('region', { name: 'Nye sykmeldinger' });
        const sykmeldinger = within(lenkepanelContainer).getAllByRole('link');
        expect(sykmeldinger).toHaveLength(1);
        expect(sykmeldinger[0]).toHaveTextContent(/Sendt til arbeidsgiver/);
    });

    it('should display new and earlier sykmeldinger', async () => {
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmeldingApen(), sykmeldingBekreftet]);

        render(<SykmeldingerPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'));
        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument();
        expect(await screen.findByText('Nye sykmeldinger'));
        expect(await screen.findByText('Tidligere sykmeldinger'));
    });

    it('should display APEN but older than 3 months sykemelding in tidligere section', async () => {
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmeldingApen(), sykmeldingBekreftet]);

        render(<SykmeldingerPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'));
        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument();
        expect(await screen.findByText('Nye sykmeldinger'));
        expect(await screen.findByText('Tidligere sykmeldinger'));
    });

    it('should not throw error when receiving a AVVIST sykmelding with invalid data', async () => {
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmeldingAvvistUgyldigData]);

        render(<SykmeldingerPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter dine sykmeldinger'));

        expect(screen.queryByText('Du har ingen nye sykmeldinger')).not.toBeInTheDocument();
        expect(await screen.findByText('Nye sykmeldinger'));
        expect(await screen.findByText('Avvist av NAV'));
    });
});
