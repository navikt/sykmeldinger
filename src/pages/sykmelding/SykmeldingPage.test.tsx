import { render, screen } from '../../utils/test/testUtils';
import nock from 'nock';
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
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, sykmeldingApen());
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByText('Opplysninger vi har mottatt fra behandleren din')).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument();
    });

    it('should fail with error message when sykmelding cant be fetched', async () => {
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(500);
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByText(/Vi har problemer med baksystemene for øyeblikket./));
    });

    it('should show sykmelding, but not form, when brukerinformasjon cant be fetched', async () => {
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, sykmeldingApen());
        apiNock.get('/api/v1/brukerinformasjon').reply(500);
        apiNock
            .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByText('Opplysninger vi har mottatt fra behandleren din')).toBeInTheDocument();
        expect(await screen.findByText(/Vi klarte dessverre ikke å hente opp informasjonen/)).toBeInTheDocument();
    });

    it('should show sykmelding, but not form, when erUtenforVentetid cant be fetched', async () => {
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, sykmeldingApen());
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
            .reply(500);

        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByText('Opplysninger vi har mottatt fra behandleren din' )).toBeInTheDocument();
        expect(await screen.findByText(/Vi klarte dessverre ikke å hente opp informasjonen/)).toBeInTheDocument();
    });
});
