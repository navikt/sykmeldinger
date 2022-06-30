import mockRouter from 'next-router-mock';
import { GraphQLError } from 'graphql';

import { render, screen } from '../../utils/test/testUtils';
import { dateSub } from '../../utils/dateUtils';
import { createMock, createSykmelding } from '../../utils/test/dataUtils';
import { ExtraFormDataDocument, SykmeldingDocument, SykmeldingerDocument } from '../../fetching/graphql.generated';

import SykmeldingPage from './index.page';
import { createExtraFormDataMock } from './__test__/mockUtils';

describe('SykmeldingPage: /syk/sykmeldinger/{sykmeldingId}', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/sykmelding-id`);
    });

    it('should display sykmelding and form when all requests are successful', async () => {
        const sykmelding = createSykmelding({ id: 'sykmelding-id' });

        render(<SykmeldingPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingDocument, variables: { id: 'sykmelding-id' } },
                    result: { data: { __typename: 'Query', sykmelding: sykmelding } },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: [sykmelding] } },
                }),
                createExtraFormDataMock(),
            ],
        });

        expect(await screen.findByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument();
        expect(
            screen.queryByRole('heading', { name: 'Du har en tidligere sykmelding du ikke har sendt inn enda.' }),
        ).not.toBeInTheDocument();
    });

    it('should display warning and disable form when there is a unsent sykmelding on a previous date', async () => {
        const thisSykmelding = createSykmelding({
            mottattTidspunkt: dateSub(new Date(), { days: 2 }),
            id: 'this-sykmelding',
        });
        const previousSykmelding = createSykmelding({
            mottattTidspunkt: dateSub(new Date(), { days: 30 }),
            id: 'previous-sykmelding',
        });

        mockRouter.setCurrentUrl(`/${thisSykmelding.id}`);

        render(<SykmeldingPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingDocument, variables: { id: 'this-sykmelding' } },
                    result: { data: { __typename: 'Query', sykmelding: thisSykmelding } },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: [thisSykmelding, previousSykmelding] } },
                }),
                createExtraFormDataMock({ sykmeldingId: 'this-sykmelding' }),
            ],
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
        render(<SykmeldingPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingDocument, variables: { id: 'sykmelding-id' } },
                    result: { data: null, errors: [new GraphQLError('Some backend error')] },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: null, errors: [new GraphQLError('Some backend error')] },
                }),
                createExtraFormDataMock(),
            ],
        });

        expect(await screen.findByText(/Vi har problemer med baksystemene for øyeblikket./));
    });

    it('should show sykmelding, but not form, when brukerinformasjon cant be fetched', async () => {
        const sykmelding = createSykmelding({ id: 'sykmelding-id' });

        render(<SykmeldingPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingDocument, variables: { id: 'sykmelding-id' } },
                    result: { data: { __typename: 'Query', sykmelding: sykmelding } },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: [sykmelding] } },
                }),
                createMock({
                    request: { query: ExtraFormDataDocument, variables: { sykmeldingId: 'sykmelding-id' } },
                    result: { data: null, errors: [new GraphQLError('Some backend error')] },
                }),
            ],
        });

        expect(await screen.findByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument();
        expect(await screen.findByText(/Vi klarte dessverre ikke å hente opp informasjonen/)).toBeInTheDocument();
    });
});
