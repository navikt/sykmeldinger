import nock from 'nock';
import { createMemoryHistory } from 'history';
import { sykmeldingApen } from '../../../mock/data/sykmelding-apen';
import { render, within, waitFor, screen, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import SykmeldingPage from '../SykmeldingPage';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

describe('Selvstendig næringsdrivende', () => {
    const apiNock = nock('http://localhost');

    const renderOptions = {
        initialRouterEntries: [`/syk/sykmeldinger/${sykmeldingApen().id}`],
        renderPath: '/syk/sykmeldinger/:sykmeldingId',
    };

    beforeEach(() => {
        jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
    });

    describe('Within ventetid', () => {
        it('should show details from sykmelding', async () => {
            apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(1).reply(200, sykmeldingApen());
            apiNock
                .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
                .reply(200, { erUtenforVentetid: false, oppfolgingsdato: '2021-01-01' });
            render(<SykmeldingPage />, renderOptions);

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
            expect(screen.getByText('Opplysninger vi har mottatt fra behandleren din' )).toBeInTheDocument();
        });

        it('should be able to submit form', async () => {
            apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(1).reply(200, sykmeldingApen());
            apiNock
                .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
                .reply(200, { erUtenforVentetid: false, oppfolgingsdato: '2021-01-01' });
            apiNock
                .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                    stemmerOpplysningene: {
                        svar: 'JA',
                        sporsmaltekst: 'Stemmer opplysningene?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    arbeidssituasjon: {
                        svar: 'NAERINGSDRIVENDE',
                        sporsmaltekst: 'Jeg er sykmeldt som',
                        svartekster:
                            '{"ANSATT":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                    },
                    harBruktEgenmelding: {
                        svar: 'JA',
                        sporsmaltekst:
                            'Vi har registrert at du ble syk 1. januar 2021. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    harForsikring: {
                        svar: 'JA',
                        sporsmaltekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    egenmeldingsperioder: {
                        sporsmaltekst: 'Hvilke dager var du borte fra jobb før 1. januar 2021?',
                        svartekster: '"Fom, Tom"',
                        svar: [{ fom: '2020-12-20', tom: '2020-12-27' }],
                    },
                })
                .reply(200);
            const history = createMemoryHistory({
                initialEntries: renderOptions.initialRouterEntries,
            });

            render(<SykmeldingPage />, { ...renderOptions, history });

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
            userEvent.click(await screen.findByRole('radio', { name: 'selvstendig næringsdrivende' }));
            const harBruktEgenmeldingFieldset = screen
                .getByText(/Vi har registrert at du ble syk/i)
                .closest('fieldset');
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }));
            const egenmeldingFomTom = await screen.findAllByPlaceholderText('dd.mm.åååå');
            expect(egenmeldingFomTom).toHaveLength(2);
            userEvent.type(egenmeldingFomTom[0], '20.12.2020');
            userEvent.type(egenmeldingFomTom[1], '27.12.2020');
            const forsikringFieldset = screen.getByText(/Har du forsikring som gjelder/i).closest('fieldset');
            userEvent.click(within(forsikringFieldset!).getByRole('radio', { name: 'Ja' }));
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }));

            await waitFor(() =>
                expect(history.location.pathname).toBe(`/syk/sykmeldinger/${sykmeldingApen().id}/kvittering`),
            );
        });

        it('should use first fom in sykmelding period if oppfolgingsdato is missing', async () => {
            apiNock
                .get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`)
                .times(1)
                .reply(200, sykmeldingApen(dayjs('2020-02-10')));
            apiNock
                .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
                .reply(200, { erUtenforVentetid: false, oppfolgingsdato: null });
            apiNock
                .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                    stemmerOpplysningene: {
                        svar: 'JA',
                        sporsmaltekst: 'Stemmer opplysningene?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    arbeidssituasjon: {
                        svar: 'NAERINGSDRIVENDE',
                        sporsmaltekst: 'Jeg er sykmeldt som',
                        svartekster:
                            '{"ANSATT":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                    },
                    harBruktEgenmelding: {
                        svar: 'JA',
                        sporsmaltekst:
                            'Vi har registrert at du ble syk 10. februar 2020. Brukte du egenmelding eller noen annen sykmelding før denne datoen?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    harForsikring: {
                        svar: 'JA',
                        sporsmaltekst: 'Har du forsikring som gjelder for de første 16 dagene av sykefraværet?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    egenmeldingsperioder: {
                        sporsmaltekst: 'Hvilke dager var du borte fra jobb før 10. februar 2020?',
                        svartekster: '"Fom, Tom"',
                        svar: [{ fom: '2019-12-20', tom: '2019-12-27' }],
                    },
                })
                .reply(200);
            const history = createMemoryHistory({
                initialEntries: renderOptions.initialRouterEntries,
            });

            render(<SykmeldingPage />, { ...renderOptions, history });

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
            userEvent.click(await screen.findByRole('radio', { name: 'selvstendig næringsdrivende' }));
            const harBruktEgenmeldingFieldset = screen
                .getByText(/Vi har registrert at du ble syk/i)
                .closest('fieldset');
            userEvent.click(within(harBruktEgenmeldingFieldset!).getByRole('radio', { name: 'Ja' }));
            const egenmeldingFomTom = await screen.findAllByPlaceholderText('dd.mm.åååå');
            expect(egenmeldingFomTom).toHaveLength(2);
            userEvent.type(egenmeldingFomTom[0], '20.12.2019');
            userEvent.type(egenmeldingFomTom[1], '27.12.2019');
            const forsikringFieldset = screen.getByText(/Har du forsikring som gjelder/i).closest('fieldset');
            userEvent.click(within(forsikringFieldset!).getByRole('radio', { name: 'Ja' }));
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }));

            await waitFor(() =>
                expect(history.location.pathname).toBe(`/syk/sykmeldinger/${sykmeldingApen().id}/kvittering`),
            );
        });
    });

    describe('Outside ventetid', () => {
        beforeEach(() => {
            apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(1).reply(200, sykmeldingApen());
            apiNock
                .get(`/flex-gateway/syfosoknad/api/sykmeldinger/${sykmeldingApen().id}/actions/v2/erUtenforVentetid`)
                .reply(200, { erUtenforVentetid: true });
            apiNock
                .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                    stemmerOpplysningene: {
                        svar: 'JA',
                        sporsmaltekst: 'Stemmer opplysningene?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    arbeidssituasjon: {
                        svar: 'NAERINGSDRIVENDE',
                        sporsmaltekst: 'Jeg er sykmeldt som',
                        svartekster:
                            '{"ANSATT":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                    },
                })
                .reply(200);
        });

        it('should show details from sykmelding', async () => {
            render(<SykmeldingPage />, renderOptions);

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
            expect(screen.getByText('Opplysninger vi har mottatt fra behandleren din' )).toBeInTheDocument();
        });

        it('should be able to submit form', async () => {
            const history = createMemoryHistory({
                initialEntries: renderOptions.initialRouterEntries,
            });

            render(<SykmeldingPage />, { ...renderOptions, history });

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
            userEvent.click(await screen.findByRole('radio', { name: 'selvstendig næringsdrivende' }));
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }));

            await waitFor(() =>
                expect(history.location.pathname).toBe(`/syk/sykmeldinger/${sykmeldingApen().id}/kvittering`),
            );
        });
    });
});
