import nock from 'nock';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { sykmeldingApen } from '../../../utils/test/mockData/sykmelding-apen';
import { render, within, waitFor, screen, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import SykmeldingPage from '../index.page';

describe('Selvstendig næringsdrivende', () => {
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockRouter.setCurrentUrl(`/${sykmeldingApen().id}`);
        apiNock.get('/api/v1/sykmeldinger').reply(200, [sykmeldingApen()]);
        apiNock.get('/api/v1/brukerinformasjon').reply(200, {
            arbeidsgivere: [],
            strengtFortroligAdresse: false,
        });
    });

    describe('Within ventetid', () => {
        it('should show details from sykmelding', async () => {
            apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(1).reply(200, sykmeldingApen());
            apiNock
                .get(
                    `/api/flex-proxy/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`,
                )
                .reply(200, { erUtenforVentetid: false, oppfolgingsdato: '2021-01-01' });
            render(<SykmeldingPage />);

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
            expect(screen.getByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
        });

        it('should be able to submit form', async () => {
            apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(2).reply(200, sykmeldingApen());
            apiNock
                .get(
                    `/api/flex-proxy/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`,
                )
                .reply(200, { erUtenforVentetid: false, oppfolgingsdato: '2021-01-01' });
            apiNock
                .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                    erOpplysningeneRiktige: {
                        svar: 'JA',
                        sporsmaltekst: 'Stemmer opplysningene?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    arbeidssituasjon: {
                        svar: 'NAERINGSDRIVENDE',
                        sporsmaltekst: 'Jeg er sykmeldt som',
                        svartekster:
                            '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
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
            apiNock.get('/api/v1/sykmeldinger').reply(200, [sykmeldingApen()]);

            render(<SykmeldingPage />);

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

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`));
            expect(mockRouter.query.sykmeldingId).toBe(sykmeldingApen().id);
        });

        it('should use first fom in sykmelding period if oppfolgingsdato is missing', async () => {
            apiNock
                .get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`)
                .times(2)
                .reply(200, sykmeldingApen('2020-02-10'));
            apiNock
                .get(
                    `/api/flex-proxy/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`,
                )
                .reply(200, { erUtenforVentetid: false, oppfolgingsdato: null });
            apiNock
                .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                    erOpplysningeneRiktige: {
                        svar: 'JA',
                        sporsmaltekst: 'Stemmer opplysningene?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    arbeidssituasjon: {
                        svar: 'NAERINGSDRIVENDE',
                        sporsmaltekst: 'Jeg er sykmeldt som',
                        svartekster:
                            '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
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
            apiNock.get('/api/v1/sykmeldinger').reply(200, [sykmeldingApen()]);

            render(<SykmeldingPage />);

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

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`));
            expect(mockRouter.query.sykmeldingId).toBe(sykmeldingApen().id);
        });
    });

    describe('Outside ventetid', () => {
        beforeEach(() => {
            apiNock.get(`/api/v1/sykmeldinger/${sykmeldingApen().id}`).times(2).reply(200, sykmeldingApen());
            apiNock
                .get(
                    `/api/flex-proxy/flex-syketilfelle/api/bruker/v1/ventetid/${sykmeldingApen().id}/erUtenforVentetid`,
                )
                .reply(200, { erUtenforVentetid: true, oppfolgingsdato: null });
            apiNock
                .post(`/api/v2/sykmeldinger/${sykmeldingApen().id}/send`, {
                    erOpplysningeneRiktige: {
                        svar: 'JA',
                        sporsmaltekst: 'Stemmer opplysningene?',
                        svartekster: '{"JA":"Ja","NEI":"Nei"}',
                    },
                    arbeidssituasjon: {
                        svar: 'NAERINGSDRIVENDE',
                        sporsmaltekst: 'Jeg er sykmeldt som',
                        svartekster:
                            '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig eller permittert","ANNET":"annet"}',
                    },
                })
                .reply(200);
        });

        it('should show details from sykmelding', async () => {
            render(<SykmeldingPage />);

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
            expect(screen.getByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
        });

        it('should be able to submit form', async () => {
            render(<SykmeldingPage />);

            apiNock.get('/api/v1/sykmeldinger').reply(200, [sykmeldingApen()]);

            await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

            userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
            userEvent.click(await screen.findByRole('radio', { name: 'selvstendig næringsdrivende' }));
            userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }));

            await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`));
            expect(mockRouter.query.sykmeldingId).toEqual(sykmeldingApen().id);
        });
    });
});
