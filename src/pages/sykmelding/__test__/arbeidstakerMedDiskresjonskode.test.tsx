import nock from 'nock';
import { sykmeldingApen } from '../../../mock/data/sykmelding-apen';
import { render, screen, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import SykmeldingPage from '../SykmeldingPage';
import userEvent from '@testing-library/user-event';

describe('Arbeidstaker med diskresjonskode', () => {
    const apiNock = nock('http://localhost');

    const renderOptions = {
        initialRouterEntries: [`/syk/sykmeldinger/${sykmeldingApen.id}`],
        renderPath: '/syk/sykmeldinger/:sykmeldingId',
    };

    beforeEach(() => {
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen.id}`).times(1).reply(200, sykmeldingApen);
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: true,
        });
        apiNock
            .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen.id}/actions/v2/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });
    });

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        expect(screen.getByRole('article', { name: 'Din sykmelding' }));
    });

    it('should show information for people with diskresjonskode strengt fortrilig adresse', async () => {
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'arbeidstaker' }));
        expect(await screen.findByText(/Du er registrert med adressesperre/)).toBeInTheDocument();
    });

    it('does not render submitbutton', async () => {
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'arbeidstaker' }));

        expect(screen.queryByRole('button', { name: 'Bekreft sykmelding' })).not.toBeInTheDocument();
    });
});
