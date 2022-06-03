import nock from 'nock';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { sykmeldingApen } from '../../../utils/test/mockData/sykmelding-apen';
import { render, screen, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import SykmeldingPage from '../index.page';

describe('Uriktige opplysninger', () => {
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

    it('should show error message when periode is wrong', async () => {
        render(<SykmeldingPage />);

        userEvent.click(await screen.findByRole('radio', { name: 'Nei' }));
        userEvent.click(await screen.findByRole('checkbox', { name: 'Periode' }));
        // TODO: look into aria announcements
        expect(await screen.findByText('Du kan ikke bruke denne sykmeldingen')).toBeInTheDocument();
        expect(screen.queryByText('Din arbeidssituasjon')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).not.toBeInTheDocument();
    });

    it('should show error message when sykmeldingsgrad is to low', async () => {
        render(<SykmeldingPage />);

        userEvent.click(await screen.findByRole('radio', { name: 'Nei' }));
        userEvent.click(await screen.findByRole('checkbox', { name: 'Sykmeldingsgraden er for lav' }));
        // TODO: look into aria announcements
        expect(await screen.findByText('Du kan ikke bruke denne sykmeldingen')).toBeInTheDocument();
        expect(screen.queryByText('Din arbeidssituasjon')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).not.toBeInTheDocument();
    });

    it('should be able to continue when sykmeldingsgrad is too high', async () => {
        render(<SykmeldingPage />);

        userEvent.click(await screen.findByRole('radio', { name: 'Nei' }));
        userEvent.click(await screen.findByRole('checkbox', { name: 'Sykmeldingsgraden er for høy' }));
        expect(
            await screen.findByText(
                'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument();
    });

    it('should be able to continue when arbeidsgiver is wrong', async () => {
        render(<SykmeldingPage />);

        userEvent.click(await screen.findByRole('radio', { name: 'Nei' }));
        userEvent.click(await screen.findByRole('checkbox', { name: 'Arbeidsgiver' }));
        expect(
            await screen.findByText(
                'I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument();
    });

    it('should be able to continue when diagnose is wrong', async () => {
        render(<SykmeldingPage />);

        userEvent.click(await screen.findByRole('radio', { name: 'Nei' }));
        userEvent.click(await screen.findByRole('checkbox', { name: 'Diagnose' }));
        expect(
            await screen.findByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument();
    });

    it('should be able to continue when andre opplysninger is wrong', async () => {
        render(<SykmeldingPage />);

        userEvent.click(await screen.findByRole('radio', { name: 'Nei' }));
        userEvent.click(await screen.findByRole('checkbox', { name: 'Andre opplysninger' }));
        expect(
            await screen.findByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument();
    });
});