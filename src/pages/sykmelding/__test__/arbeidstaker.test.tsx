import nock from 'nock';
import { createMemoryHistory } from 'history';
import { sykmeldingApen } from '../../../mock/data/sykmelding-apen';
import { render, within, waitFor, screen, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import SykmeldingPage from '../SykmeldingPage';
import userEvent from '@testing-library/user-event';
import arbeidsgivereMock from '../../../mock/data/arbeidsgivereMock';

describe('Ansatt', () => {
    const apiNock = nock('http://localhost');

    const renderOptions = {
        initialRouterEntries: [`/syk/sykmeldinger/${sykmeldingApen().id}`],
        renderPath: '/syk/sykmeldinger/:sykmeldingId',
    };

    beforeEach(() => {
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(1).reply(200, sykmeldingApen());
        apiNock
            .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
            .reply(200, { erUtenforVentetid: true });
    });

    it('should show details from sykmelding', async () => {
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: arbeidsgivereMock,
            strengtFortroligAdresse: false,
        });
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        expect(screen.getByText('Opplysninger vi har mottatt fra behandleren din' )).toBeInTheDocument();
    });

    it('should be able to submit form with active arbeidsgiver and nærmeste leder', async () => {
        jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
        apiNock
            .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                erOpplysningeneRiktige: {
                    svar: 'JA',
                    sporsmaltekst: 'Stemmer opplysningene?',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                arbeidssituasjon: {
                    svar: 'ARBEIDSTAKER',
                    sporsmaltekst: 'Jeg er sykmeldt som',
                    svartekster:
                        '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                },
                arbeidsgiverOrgnummer: {
                    svar: arbeidsgivereMock[0].orgnummer,
                    sporsmaltekst: 'Velg arbeidsgiver',
                    svartekster: `[{"navn":"${arbeidsgivereMock[0].navn}","orgnummer":"${arbeidsgivereMock[0].orgnummer}"},{"navn":"${arbeidsgivereMock[1].navn}","orgnummer":"${arbeidsgivereMock[1].orgnummer}"}]`,
                },
                riktigNarmesteLeder: {
                    svar: 'JA',
                    sporsmaltekst: `Er det ${arbeidsgivereMock[0].naermesteLeder.navn} som skal følge deg opp på jobben mens du er syk?`,
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
            })
            .reply(200);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, {
            ...sykmeldingApen(),
            sykmeldingStatus: {
                ...sykmeldingApen().sykmeldingStatus,
                statusEvent: 'BEKREFTET',
                timestamp: '2020-01-01',
            },
        });
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: arbeidsgivereMock,
            strengtFortroligAdresse: false,
        });
        const history = createMemoryHistory({
            initialEntries: renderOptions.initialRouterEntries,
        });

        render(<SykmeldingPage />, { ...renderOptions, history });

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }));
        userEvent.click(await screen.findByRole('radio', { name: arbeidsgivereMock[0].navn }));
        const naermesteLederFieldset = screen.getByText(/som skal følge deg opp/i).closest('fieldset');
        userEvent.click(within(naermesteLederFieldset!).getByRole('radio', { name: 'Ja' }));

        expect(screen.queryByText('Dette vises til arbeidsgiveren din')).toBeInTheDocument();

        userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }));

        await waitFor(() =>
            expect(history.location.pathname).toBe(`/syk/sykmeldinger/${sykmeldingApen().id}/kvittering`),
        );
    });

    it('should be able to submit form with inactive arbeidsgiver', async () => {
        jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
        apiNock
            .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                erOpplysningeneRiktige: {
                    svar: 'JA',
                    sporsmaltekst: 'Stemmer opplysningene?',
                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                },
                arbeidssituasjon: {
                    svar: 'ARBEIDSTAKER',
                    sporsmaltekst: 'Jeg er sykmeldt som',
                    svartekster:
                        '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                },
                arbeidsgiverOrgnummer: {
                    svar: arbeidsgivereMock[1].orgnummer,
                    sporsmaltekst: 'Velg arbeidsgiver',
                    svartekster: `[{"navn":"${arbeidsgivereMock[0].navn}","orgnummer":"${arbeidsgivereMock[0].orgnummer}"},{"navn":"${arbeidsgivereMock[1].navn}","orgnummer":"${arbeidsgivereMock[1].orgnummer}"}]`,
                },
            })
            .reply(200);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).reply(200, {
            ...sykmeldingApen(),
            sykmeldingStatus: {
                ...sykmeldingApen().sykmeldingStatus,
                statusEvent: 'BEKREFTET',
                timestamp: '2020-01-01',
            },
        });
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: arbeidsgivereMock,
            strengtFortroligAdresse: false,
        });
        const history = createMemoryHistory({
            initialEntries: renderOptions.initialRouterEntries,
        });

        render(<SykmeldingPage />, { ...renderOptions, history });

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }));
        userEvent.click(await screen.findByRole('radio', { name: arbeidsgivereMock[1].navn }));

        expect(screen.queryByText('Dette vises til arbeidsgiveren din')).toBeInTheDocument();

        userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }));

        await waitFor(() =>
            expect(history.location.pathname).toBe(`/syk/sykmeldinger/${sykmeldingApen().id}/kvittering`),
        );
    });

    it('should show warning if user does not have any arbeidsforhold', async () => {
        jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
        apiNock.post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`).reply(200);
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
        const history = createMemoryHistory({
            initialEntries: renderOptions.initialRouterEntries,
        });

        render(<SykmeldingPage />, { ...renderOptions, history });

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }));

        expect(
            await screen.findByText(/Vi klarer ikke å finne noen arbeidsforhold registrert på deg/),
        ).toBeInTheDocument();
    });

    it('should show information for people with diskresjonskode strengt fortrilig adresse', async () => {
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: true,
        });
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }));
        expect(await screen.findByText(/Du er registrert med adressesperre/)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Bekreft sykmelding' })).not.toBeInTheDocument();
    });
});
