import nock from 'nock';
import dayjs from 'dayjs';

import { render, screen } from '../../utils/test/testUtils';
import { sykmeldingApen } from '../../mock/data/sykmelding-apen';

import SykmeldingPage from './SykmeldingPage';


describe('SykmeldingPage: /syk/sykmeldinger/{sykmeldingId}', () => {
    const apiNock = nock('http://localhost');

    const renderOptions = {
        initialRouterEntries: [`/syk/sykmeldinger/${sykmeldingApen().id}`],
        renderPath: '/syk/sykmeldinger/:sykmeldingId',
    };

    afterEach(() => {
        nock.cleanAll();
    });

    it('should display sykmelding and form when all requests are successful', async () => {
        apiNock.get('/api/v1/sykmeldinger').reply(200, [sykmeldingApen()]);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, sykmeldingApen());
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/flex-gateway/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument();
        expect(
            screen.queryByRole('heading', { name: 'Du har en tidligere sykmelding du ikke har sendt inn enda.' }),
        ).not.toBeInTheDocument();
    });

    it('should display warning and disable form when there is a unsent sykmelding on a previous date', async () => {
        const thisSykmelding = sykmeldingApen(dayjs().subtract(2, 'days').format(), 'this-sykmelding');
        const previousSykmelding = sykmeldingApen(dayjs().subtract(30, 'days').format(), 'previous-sykmelding');

        apiNock.get('/api/v1/sykmeldinger').reply(200, [thisSykmelding, previousSykmelding]);
        apiNock.get(`/api/v1/sykmeldinger/${thisSykmelding.id}`).reply(200, thisSykmelding);
        apiNock.get('/api/v1/brukerinformasjon').reply(200, { arbeidsgivere: [], strengtFortroligAdresse: false });
        apiNock
            .get(`/flex-gateway/flex-syketilfelle/api/bruker/v1/ventetid/${thisSykmelding.id}/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });

        render(<SykmeldingPage />, {
            ...renderOptions,
            initialRouterEntries: [`/syk/sykmeldinger/${thisSykmelding.id}`],
        });

        expect(await screen.findByText('Stemmer opplysningene?')).toBeInTheDocument();
        expect(
            await screen.findByRole('heading', { name: 'Du har en tidligere sykmelding du ikke har sendt inn enda.' }),
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bekreft sykmelding' })).toBeDisabled();
        expect(screen.getByRole('radio', { name: 'Ja' })).toBeDisabled();
        expect(screen.getByRole('radio', { name: 'Nei' })).toBeDisabled();
    });

    it('should fail with error message when sykmelding cant be fetched', async () => {
        apiNock.get('/api/v1/sykmeldinger').reply(500);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(500);
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/flex-gateway/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByText(/Vi har problemer med baksystemene for øyeblikket./));
    });

    it('should show sykmelding, but not form, when brukerinformasjon cant be fetched', async () => {
        apiNock.get('/api/v1/sykmeldinger').reply(200, [sykmeldingApen()]);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, sykmeldingApen());
        apiNock.get('/api/v1/brukerinformasjon').reply(500);
        apiNock
            .get(`/flex-gateway/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
        expect(await screen.findByText(/Vi klarte dessverre ikke å hente opp informasjonen/)).toBeInTheDocument();
    });

    it('should show sykmelding, but not form, when erUtenforVentetid cant be fetched', async () => {
        apiNock.get('/api/v1/sykmeldinger').reply(200, [sykmeldingApen()]);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, sykmeldingApen());
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/flex-gateway/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`)
            .reply(500);

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
        expect(await screen.findByText(/Vi klarte dessverre ikke å hente opp informasjonen/)).toBeInTheDocument();
    });
});
