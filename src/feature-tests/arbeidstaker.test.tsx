import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, within, waitFor, screen, waitForElementToBeRemoved } from '../utils/test/testUtils'
import {
    Arbeidsgiver,
    StatusEvent,
    SubmitSykmeldingDocument,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
} from '../fetching/graphql.generated'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

import { createExtraFormDataMock } from './mockUtils'

describe('Arbeidstaker', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/sykmelding-id`)
    })

    const baseMocks = [
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
            result: { data: { __typename: 'Query', sykmelding: createSykmelding({ id: 'sykmelding-id' }) } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [createSykmelding()] } },
        }),
    ]

    it('should show details from sykmelding', async () => {
        render(<SykmeldingPage />, {
            mocks: [...baseMocks, createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } })],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        expect(screen.getByRole('heading', { name: 'Opplysninger fra sykmeldingen' })).toBeInTheDocument()
    })

    it('should be able to submit form with active arbeidsgiver and nærmeste leder', async () => {
        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
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
                                    svar: 'ARBEIDSTAKER',
                                    sporsmaltekst: 'Jeg er sykmeldt som',
                                    svartekster:
                                        '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                                },
                                arbeidsgiverOrgnummer: {
                                    svar: arbeidsgivereMock[0].orgnummer,
                                    sporsmaltekst: 'Velg arbeidsgiver',
                                    svartekster: `[{"navn":"${arbeidsgivereMock[0].navn}","orgnummer":"${arbeidsgivereMock[0].orgnummer}"},{"navn":"${arbeidsgivereMock[1].navn}","orgnummer":"${arbeidsgivereMock[1].orgnummer}"}]`,
                                },
                                riktigNarmesteLeder: {
                                    svar: 'JA',
                                    sporsmaltekst: `Er det ${arbeidsgivereMock[0]?.naermesteLeder?.navn} som skal følge deg opp på jobben mens du er syk?`,
                                    svartekster: '{"JA":"Ja","NEI":"Nei"}',
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
        })

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }))
        userEvent.click(
            await screen.findByRole('radio', {
                name: `${arbeidsgivereMock[0].navn} (org.nr: ${arbeidsgivereMock[0].orgnummer})`,
            }),
        )
        const naermesteLederFieldset = screen.getByText(/som skal følge deg opp/i).closest('fieldset')
        userEvent.click(within(naermesteLederFieldset!).getByRole('radio', { name: 'Ja' }))

        const egenmeldingsDagerFieldSet = screen.getByText(/Brukte du egenmeldingsdager hos/i).closest('fieldset')
        userEvent.click(within(egenmeldingsDagerFieldSet!).getByRole('radio', { name: 'Nei' }))

        expect(await screen.findByRole('heading', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()

        userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })

    it('should be able to submit form with inactive arbeidsgiver', async () => {
        render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
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
                                    svar: 'ARBEIDSTAKER',
                                    sporsmaltekst: 'Jeg er sykmeldt som',
                                    svartekster:
                                        '{"ARBEIDSTAKER":"ansatt","FRILANSER":"frilanser","NAERINGSDRIVENDE":"selvstendig næringsdrivende","ARBEIDSLEDIG":"arbeidsledig","PERMITTERT":"permittert","ANNET":"annet"}',
                                },
                                arbeidsgiverOrgnummer: {
                                    svar: arbeidsgivereMock[1].orgnummer,
                                    sporsmaltekst: 'Velg arbeidsgiver',
                                    svartekster: `[{"navn":"${arbeidsgivereMock[0].navn}","orgnummer":"${arbeidsgivereMock[0].orgnummer}"},{"navn":"${arbeidsgivereMock[1].navn}","orgnummer":"${arbeidsgivereMock[1].orgnummer}"}]`,
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
        })

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }))
        userEvent.click(
            await screen.findByRole('radio', {
                name: `${arbeidsgivereMock[1].navn} (org.nr: ${arbeidsgivereMock[1].orgnummer})`,
            }),
        )
        const egenmeldingsDagerFieldSet = (await screen.findByText(/Brukte du egenmeldingsdager hos/i)).closest(
            'fieldset',
        )
        userEvent.click(within(egenmeldingsDagerFieldSet!).getByRole('radio', { name: 'Nei' }))

        expect(await screen.findByRole('heading', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()

        userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })

    it('should show warning if user does not have any arbeidsforhold', async () => {
        render(<SykmeldingPage />, {
            mocks: [...baseMocks, createExtraFormDataMock()],
        })

        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }))

        expect(
            await screen.findByText(/Vi klarer ikke å finne noen arbeidsforhold registrert på deg/),
        ).toBeInTheDocument()
    })

    it('should show information for people with diskresjonskode strengt fortrilig adresse', async () => {
        render(<SykmeldingPage />, {
            mocks: [...baseMocks, createExtraFormDataMock({ brukerinformasjon: { strengtFortroligAdresse: true } })],
        })

        await waitForElementToBeRemoved(() => screen.queryByText('Henter sykmelding'))
        userEvent.click(await screen.findByRole('radio', { name: 'Ja' }))
        userEvent.click(await screen.findByRole('radio', { name: 'ansatt' }))
        expect(await screen.findByText(/Du er registrert med adressesperre/)).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Bekreft sykmelding' })).not.toBeInTheDocument()
    })
})

const arbeidsgivereMock: Arbeidsgiver[] = [
    {
        __typename: 'Arbeidsgiver',
        naermesteLeder: {
            __typename: 'NaermesteLeder',
            aktoerId: '1101101101102',
            navn: 'Station Officer Steele',
            epost: 'steele@pontypandyfire.gov.uk',
            mobil: '110',
            orgnummer: '110110110',
            organisasjonsnavn: 'Brannstasjon',
            aktivTom: null,
            arbeidsgiverForskuttererLoenn: true,
        },
        navn: 'PONTYPANDY FIRE SERVICE',
        orgnummer: '110110110',
        juridiskOrgnummer: '132456789',
        stilling: 'Brannmann',
        stillingsprosent: '100',
        aktivtArbeidsforhold: true,
    },
    {
        __typename: 'Arbeidsgiver',
        naermesteLeder: {
            __typename: 'NaermesteLeder',
            aktoerId: '1101101101102',
            navn: 'Brannmann Sam',
            epost: 'steele@pontypandyfire.gov.uk',
            mobil: '110',
            orgnummer: '110110110',
            organisasjonsnavn: 'Brannstasjon',
            aktivTom: null,
            arbeidsgiverForskuttererLoenn: true,
        },
        navn: 'ANDEBY BRANNSTATION',
        orgnummer: '110110112',
        juridiskOrgnummer: '132456789',
        stilling: 'Brannmann',
        stillingsprosent: '80',
        aktivtArbeidsforhold: false,
    },
]
