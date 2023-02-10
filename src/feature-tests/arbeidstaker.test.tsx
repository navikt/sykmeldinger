import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, waitFor, screen, axe } from '../utils/test/testUtils'
import {
    Arbeidsgiver,
    StatusEvent,
    SendSykmeldingDocument,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    YesOrNo,
    ArbeidssituasjonType,
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

    it('should be able to submit form with active arbeidsgiver and nærmeste leder', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
                createMock({
                    request: {
                        query: SendSykmeldingDocument,
                        variables: {
                            sykmeldingId: 'sykmelding-id',
                            values: {
                                erOpplysningeneRiktige: YesOrNo.YES,
                                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                                arbeidsgiverOrgnummer: arbeidsgivereMock[0].orgnummer,
                                riktigNarmesteLeder: YesOrNo.YES,
                            },
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            sendSykmelding: createSykmelding({
                                sykmeldingStatus: {
                                    ...createSykmelding().sykmeldingStatus,
                                    statusEvent: StatusEvent.BEKREFTET,
                                    timestamp: '2020-01-01',
                                },
                            }),
                        },
                    },
                }),
            ],
        })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }))
        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Velg arbeidsgiver/i },
                { name: `${arbeidsgivereMock[0].navn} (org.nr: ${arbeidsgivereMock[0].orgnummer})` },
            ),
        )
        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Er det station officer steele som skal følge deg opp på jobben mens du er syk/i },
                { name: 'Ja' },
            ),
        )

        expect(await screen.findByRole('heading', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
        await userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    }, 10_000)

    it('should be able to submit form with inactive arbeidsgiver', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [
                ...baseMocks,
                createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
                createMock({
                    request: {
                        query: SendSykmeldingDocument,
                        variables: {
                            sykmeldingId: 'sykmelding-id',
                            values: {
                                erOpplysningeneRiktige: YesOrNo.YES,
                                arbeidssituasjon: ArbeidssituasjonType.ARBEIDSTAKER,
                                arbeidsgiverOrgnummer: arbeidsgivereMock[1].orgnummer,
                            },
                        },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            sendSykmelding: createSykmelding({
                                sykmeldingStatus: {
                                    ...createSykmelding().sykmeldingStatus,
                                    statusEvent: StatusEvent.BEKREFTET,
                                    timestamp: '2020-01-01',
                                },
                            }),
                        },
                    },
                }),
            ],
        })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }))
        await userEvent.click(
            await screen.findByRole('radio', {
                name: `${arbeidsgivereMock[1].navn} (org.nr: ${arbeidsgivereMock[1].orgnummer})`,
            }),
        )

        expect(await screen.findByRole('heading', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
        await userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })

    it('should show warning if user does not have any arbeidsforhold', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [...baseMocks, createExtraFormDataMock()],
        })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }))

        expect(
            await screen.findByText(/Vi klarer ikke å finne noen arbeidsforhold registrert på deg/),
        ).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })

    it('should show information for people with diskresjonskode strengt fortrilig adresse', async () => {
        const { container } = render(<SykmeldingPage />, {
            mocks: [...baseMocks, createExtraFormDataMock({ brukerinformasjon: { strengtFortroligAdresse: true } })],
        })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'ansatt' }))

        expect(await screen.findByText(/Du er registrert med adressesperre/)).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
        expect(screen.queryByRole('button', { name: 'Bekreft sykmelding' })).not.toBeInTheDocument()
    })
})

const arbeidsgivereMock: Arbeidsgiver[] = [
    {
        __typename: 'Arbeidsgiver',
        naermesteLeder: {
            __typename: 'NaermesteLeder',
            navn: 'Station Officer Steele',
        },
        navn: 'PONTYPANDY FIRE SERVICE',
        orgnummer: '110110110',
        aktivtArbeidsforhold: true,
    },
    {
        __typename: 'Arbeidsgiver',
        naermesteLeder: {
            __typename: 'NaermesteLeder',
            navn: 'Brannmann Sam',
        },
        navn: 'ANDEBY BRANNSTATION',
        orgnummer: '110110112',
        aktivtArbeidsforhold: false,
    },
]
