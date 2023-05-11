import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'
import { within } from '@testing-library/react'

import { axe, render, screen, waitFor } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import {
    createEgenmeldingsdagerSporsmal,
    createMock,
    createSykmelding,
    createSykmeldingPeriode,
    createSykmeldingStatus,
} from '../utils/test/dataUtils'
import {
    Arbeidsgiver,
    ArbeidssituasjonType,
    Periodetype,
    SendSykmeldingDocument,
    StatusEvent,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    YesOrNo,
} from '../fetching/graphql.generated'
import { clickDays } from '../pages/[sykmeldingId]/endre-egenmeldingsdager.test'

import { createExtraFormDataMock } from './mockUtils'

describe('Egenmeldingsdager', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/sykmelding-id`)
        vi.stubGlobal('innerWidth', 768)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    const baseMocks = [
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
            result: {
                data: {
                    __typename: 'Query',
                    sykmelding: createSykmelding({
                        id: 'sykmelding-id',
                        sykmeldingsperioder: [
                            createSykmeldingPeriode({
                                fom: '2023-02-20',
                                tom: '2023-03-06',
                                type: Periodetype.AKTIVITET_IKKE_MULIG,
                            }),
                        ],
                    }),
                },
            },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [createSykmelding()] } },
        }),
    ]

    it('should be able to submit form with one period of egenmeldingsdager', async () => {
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
                                harEgenmeldingsdager: YesOrNo.YES,
                                egenmeldingsdager: ['2023-02-05', '2023-02-06'],
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
                                    timestamp: '2023-03-01',
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
                { name: /Er det Ola Vaskeri som skal følge deg opp på jobben mens du er syk/i },
                { name: 'Ja' },
            ),
        )
        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 4. - 19. februar 2023/i },
                { name: 'Ja' },
            ),
        )

        const section = within(
            screen.getByRole('region', {
                name: /Brukte du egenmelding hos Vaskeriet AS i perioden 4. - 19. februar 2023/,
            }),
        )
        await clickDays(section, /^5\. februar/, /^6\. februar/)
        await userEvent.click(section.getByRole('button', { name: 'Videre' }))

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 20. januar - 3. februar/i },
                { name: 'Nei' },
            ),
        )

        expect(await screen.findByRole('button', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
        await userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })

    it('should be able to submit form with two periods of egenmeldingsdager', async () => {
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
                                harEgenmeldingsdager: YesOrNo.YES,
                                egenmeldingsdager: [
                                    '2023-02-05',
                                    '2023-02-06',
                                    '2023-01-25',
                                    '2023-01-26',
                                    '2023-01-27',
                                ],
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
                                    timestamp: '2023-03-01',
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
                { name: /Er det Ola Vaskeri som skal følge deg opp på jobben mens du er syk/i },
                { name: 'Ja' },
            ),
        )

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 4. - 19. februar 2023/i },
                { name: 'Ja' },
            ),
        )
        const sectionOne = within(
            screen.getByRole('region', {
                name: /Brukte du egenmelding hos Vaskeriet AS i perioden 4. - 19. februar 2023/,
            }),
        )
        await clickDays(sectionOne, /^5\. februar/, /^6\. februar/)
        await userEvent.click(sectionOne.getByRole('button', { name: 'Videre' }))

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 20. januar - 3. februar 2023/i },
                { name: 'Ja' },
            ),
        )
        const sectionTwo = within(
            screen.getByRole('region', {
                name: /Brukte du egenmelding hos Vaskeriet AS i perioden 20. januar - 3. februar 2023/,
            }),
        )
        await clickDays(sectionTwo, /25\. januar/, /26\. januar/, /27\. januar/)
        await userEvent.click(sectionTwo.getByRole('button', { name: 'Videre' }))

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 9. - 19. januar/i },
                { name: 'Nei' },
            ),
        )

        expect(await screen.findByRole('button', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
        await userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })

    it('should be able to submit form after editing previous period with egenmeldingsdager', async () => {
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
                                harEgenmeldingsdager: YesOrNo.YES,
                                egenmeldingsdager: ['2023-02-08', '2023-02-09'],
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
                                    timestamp: '2023-03-01',
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
                { name: /Er det Ola Vaskeri som skal følge deg opp på jobben mens du er syk/i },
                { name: 'Ja' },
            ),
        )
        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 4. - 19. februar 2023/i },
                { name: 'Ja' },
            ),
        )

        const sectionOne = within(
            screen.getByRole('region', {
                name: /Brukte du egenmelding hos Vaskeriet AS i perioden 4. - 19. februar 2023/,
            }),
        )
        await clickDays(sectionOne, /^5\. februar/, /^6\. februar/)
        await userEvent.click(sectionOne.getByRole('button', { name: 'Videre' }))

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 20. januar - 3. februar 2023/i },
                { name: 'Ja' },
            ),
        )
        const sectionTwo = within(
            screen.getByRole('region', {
                name: /Brukte du egenmelding hos Vaskeriet AS i perioden 20. januar - 3. februar 2023/,
            }),
        )
        await clickDays(sectionTwo, /25\. januar/, /26\. januar/, /27\. januar/)
        await userEvent.click(sectionTwo.getByRole('button', { name: 'Videre' }))

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 9. - 19. januar/i },
                { name: 'Nei' },
            ),
        )
        expect(await screen.findByRole('button', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()

        await userEvent.click(sectionOne.getByRole('button', { name: 'Endre' }))
        await clickDays(sectionOne, /^8\. februar/, /^9\. februar/, /^5\. februar/, /^6\. februar/)
        await userEvent.click(sectionOne.getByRole('button', { name: 'Videre' }))

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos Vaskeriet AS i perioden 23. januar - 3. februar 2023/i },
                { name: 'Nei' },
            ),
        )

        expect(await screen.findByRole('button', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
        await userEvent.click(await screen.findByRole('button', { name: 'Send sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    }, 10_000)

    it(`should NOT be asked about egenmeldingsdager when sykmelding is right against
        previous sykmelding tom AND should inform about what will be sent to arbeidsgiver`, async () => {
        mockRouter.setCurrentUrl(`/current-sykmelding-id`)

        const previousSendtSykmelding = createSykmelding(
            {
                id: 'previous-sykmelding-id',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-02-01',
                        tom: '2023-02-15',
                        type: Periodetype.AKTIVITET_IKKE_MULIG,
                    }),
                ],
            },
            StatusEvent.SENDT,
        )
        const sykmeldingToBeFilledOut = createSykmelding(
            {
                id: 'current-sykmelding-id',
                sykmeldingsperioder: [
                    createSykmeldingPeriode({
                        fom: '2023-02-16',
                        tom: '2023-02-28',
                        type: Periodetype.AKTIVITET_IKKE_MULIG,
                    }),
                ],
            },
            StatusEvent.APEN,
        )
        render(<SykmeldingPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'current-sykmelding-id' } },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmelding: sykmeldingToBeFilledOut,
                        },
                    },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: {
                            __typename: 'Query',
                            sykmeldinger: [previousSendtSykmelding, sykmeldingToBeFilledOut],
                        },
                    },
                }),
                createExtraFormDataMock({
                    sykmeldingId: 'current-sykmelding-id',
                    brukerinformasjon: { arbeidsgivere: arbeidsgivereMock },
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
                { name: /Er det Ola Vaskeri som skal følge deg opp på jobben mens du er syk/i },
                { name: 'Ja' },
            ),
        )

        expect(await screen.findByRole('button', { name: 'Se hva som sendes til jobben din' })).toBeInTheDocument()
    })

    it('should not show egenmeldingsdager info on SENDT sykmelding when there is an empty svar object', async () => {
        const sykmeldingWithEmptyDays = createSykmelding({
            id: 'sykmelding-id',
            sykmeldingStatus: createSykmeldingStatus({
                statusEvent: StatusEvent.SENDT,
                sporsmalOgSvarListe: [createEgenmeldingsdagerSporsmal([])],
            }),
            sykmeldingsperioder: [
                createSykmeldingPeriode({
                    fom: '2023-02-20',
                    tom: '2023-03-06',
                    type: Periodetype.AKTIVITET_IKKE_MULIG,
                }),
            ],
        })

        render(<SykmeldingPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
                    result: {
                        data: { __typename: 'Query', sykmelding: sykmeldingWithEmptyDays },
                    },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: { data: { __typename: 'Query', sykmeldinger: [createSykmelding()] } },
                }),
                createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
            ],
        })

        expect(
            await screen.findByRole('heading', { name: /Sykmeldingen ble sendt til Default Arbeidsgiverssen AS/ }),
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('heading', { name: /egenmeldingsdager \(lagt til av deg\)/i }),
        ).not.toBeInTheDocument()
    })
})

const arbeidsgivereMock: Arbeidsgiver[] = [
    {
        __typename: 'Arbeidsgiver',
        naermesteLeder: {
            __typename: 'NaermesteLeder',
            navn: 'Ola Vaskeri',
        },
        navn: 'Vaskeriet AS',
        orgnummer: 'default-arbeidsgiver',
        aktivtArbeidsforhold: true,
    },
]
