import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { render, screen, waitFor } from '../utils/test/testUtils';
import SykmeldingPage from '../pages/[sykmeldingId]/index.page';
import {
    StatusEvent,
    SubmitSykmeldingDocument,
    SykmeldingDocument,
    SykmeldingerDocument,
} from '../fetching/graphql.generated';
import { createMock, createSykmelding } from '../utils/test/dataUtils';

import { createExtraFormDataMock } from './mockUtils';

describe('Permittert', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/sykmelding-id`);
    });

    const baseMocks = [
        createMock({
            request: { query: SykmeldingDocument, variables: { id: 'sykmelding-id' } },
            result: { data: { __typename: 'Query', sykmelding: createSykmelding({ id: 'sykmelding-id' }) } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [createSykmelding()] } },
        }),
    ];

    it('should submit ARBEIDSLEDIG when user choose radio button permittert', async () => {
        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock(),
                createMock({
                    request: {
                        query: SubmitSykmeldingDocument,
                        variables: {
                            sykmeldingId: 'sykmelding-id',
                            values: {
                                erOpplysningeneRiktige: {
                                    svar: 'JA',
                                    sporsmaltekst: 'Stemmer opplysningene?',
                                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
                                },
                                arbeidssituasjon: {
                                    svar: 'ARBEIDSLEDIG',
                                    sporsmaltekst: 'Jeg er sykmeldt som',
                                    svartekster:
                                        '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                                },
                            },
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            submitSykmelding: createSykmelding({
                                sykmeldingStatus: {
                                    ...createSykmelding().sykmeldingStatus,
                                    statusEvent: StatusEvent.Bekreftet,
                                    timestamp: '2020-01-01',
                                },
                            }),
                        },
                    },
                }),
            ],
        });

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }));
        userEvent.click(await screen.findByRole('radio', { name: 'permittert' }));
        userEvent.click(await screen.findByRole('button', { name: 'Bekreft sykmelding' }));

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`));
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id');
    });
});
