import nock from 'nock';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { sykmeldingApen } from '../../../utils/test/mockData/sykmelding-apen';
import { render, screen, waitFor, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import { StatusEvent } from '../../../models/Sykmelding/SykmeldingStatus';
import SykmeldingPage from '../index.page';

describe('Annet', () => {
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockRouter.setCurrentUrl(`/${sykmeldingApen().id}`);

        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmeldingApen()]);
        apiNock.get(`/api/proxy/v1/sykmeldinger/${sykmeldingApen().id}`).times(1).reply(200, sykmeldingApen());
        apiNock.get('/api/proxy/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        apiNock
            .get(`/api/flex-proxy/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true, oppfolgingsdato: null });
    });

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        expect(screen.getByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
    });

    it('should be able to submit form with work situation annet', async () => {
        apiNock
            .post(`/api/proxy/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                erOpplysningeneRiktige: {
                    svar: 'JA',
                    sporsmaltekst: 'Stemmer opplysningene?',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                arbeidssituasjon: {
                    svar: 'ANNET',
                    sporsmaltekst: 'Jeg er sykmeldt som',
                    svartekster:
                        '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                },
            })
            .reply(200);
        apiNock.get(`/api/proxy/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, {
            ...sykmeldingApen(),
            sykmeldingStatus: {
                ...sykmeldingApen().sykmeldingStatus,
                statusEvent: StatusEvent.BEKREFTET,
                timestamp: '2020-01-01',
            },
        });
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmeldingApen()]);

        render(<SykmeldingPage />);

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'annet' }));
        userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }));

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`));
        expect(mockRouter.query.sykmeldingId).toBe(sykmeldingApen().id);
    });
});
