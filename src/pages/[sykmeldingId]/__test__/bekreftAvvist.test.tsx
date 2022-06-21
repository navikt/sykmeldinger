import nock from 'nock';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { sykmeldingAvvist } from '../../../utils/test/mockData/sykmelding-avvist';
import { render, screen, waitFor, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import { StatusEvent } from '../../../models/Sykmelding/SykmeldingStatus';
import SykmeldingPage from '../index.page';

describe('Bekreft avvist sykmelding som lest', () => {
    const apiNock = nock('http://localhost');

    beforeEach(() => {
        mockRouter.setCurrentUrl(`/${sykmeldingAvvist().id}`);

        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmeldingAvvist()]);
        apiNock.get(`/api/proxy/v1/sykmeldinger/${sykmeldingAvvist().id}`).times(1).reply(200, sykmeldingAvvist());
    });

    it('should display reason for rejection', async () => {
        render(<SykmeldingPage />);

        expect(await screen.findByText(/Du trenger en ny sykmelding/)).toBeInTheDocument();
    });

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        expect(screen.getByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
    });

    it('should get error message when trying to submit without checking checkbox', async () => {
        render(<SykmeldingPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }));

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
            ).toHaveErrorMessage('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        );
    });

    it('should remove error message after clicking checkbox', async () => {
        render(<SykmeldingPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }));

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
            ).toHaveErrorMessage('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        );

        userEvent.click(
            screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
        );

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
            ).not.toHaveErrorMessage('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        );
    });

    it('should show confirmation after submitting', async () => {
        const sykmelding = sykmeldingAvvist();
        apiNock.get('/api/proxy/v1/sykmeldinger').reply(200, [sykmelding]);
        apiNock.post(`/api/proxy/v1/sykmeldinger/${sykmelding.id}/bekreftAvvist`).reply(203);
        apiNock.get(`/api/proxy/v1/sykmeldinger/${sykmelding.id}`).reply(200, {
            ...sykmelding,
            sykmeldingStatus: {
                ...sykmelding.sykmeldingStatus,
                statusEvent: StatusEvent.BEKREFTET,
                timestamp: '2020-01-01',
            },
        });

        render(<SykmeldingPage />);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

        userEvent.click(
            screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
        );
        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }));

        expect(
            await screen.findByText('Du bekreftet at du har lest at sykmeldingen er avvist den 1. januar 2020'),
        ).toBeInTheDocument();
    });
});
