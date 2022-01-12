import nock from 'nock';
import { sykmeldingAvvist } from '../../../mock/data/sykmelding-avvist';
import { render, screen, waitFor, waitForElementToBeRemoved } from '../../../utils/test/testUtils';
import SykmeldingPage from '../SykmeldingPage';
import userEvent from '@testing-library/user-event';

describe('Bekreft avvist sykmelding som lest', () => {
    const apiNock = nock('http://localhost');

    const renderOptions = {
        initialRouterEntries: [`/syk/sykmeldinger/${sykmeldingAvvist.id}`],
        renderPath: '/syk/sykmeldinger/:sykmeldingId',
    };

    beforeEach(() => {
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingAvvist.id}`).times(1).reply(200, sykmeldingAvvist);
    });

    it('should display reason for rejection', async () => {
        render(<SykmeldingPage />, renderOptions);

        expect(await screen.findByText(/Du trenger en ny sykmelding/)).toBeInTheDocument();
    });

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));
        expect(screen.getByRole('heading', { name: 'Opplysninger fra behandleren din' })).toBeInTheDocument();
    });

    it('should get error message when trying to submit without checking checkbox', async () => {
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }));

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
                // @ts-expect-error - Wrong typing in testing-library/jest-dom
            ).toHaveErrorMessage('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        );
    });

    it('should remove error message after clicking checkbox', async () => {
        render(<SykmeldingPage />, renderOptions);

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'));

        userEvent.click(screen.getByRole('button', { name: 'Bekreft' }));

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
                // @ts-expect-error - Wrong typing in testing-library/jest-dom
            ).toHaveErrorMessage('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        );

        userEvent.click(
            screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
        );

        await waitFor(() =>
            expect(
                screen.getByRole('checkbox', { name: 'Jeg bekrefter at jeg har lest at sykmeldingen er avvist' }),
                // @ts-expect-error - Wrong typing in testing-library/jest-dom
            ).not.toHaveErrorMessage('Du må bekrefte at du har lest at sykmeldingen er avvist'),
        );
    });

    it('should show confirmation after submitting', async () => {
        jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
        apiNock.post(`/api/v1/sykmeldinger/${sykmeldingAvvist.id}/bekreftAvvist`).reply(203);
        apiNock.get(`/api/v1/sykmeldinger/${sykmeldingAvvist.id}`).reply(200, {
            ...sykmeldingAvvist,
            sykmeldingStatus: {
                ...sykmeldingAvvist.sykmeldingStatus,
                statusEvent: 'BEKREFTET',
                timestamp: '2020-01-01',
            },
        });

        render(<SykmeldingPage />, renderOptions);

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
