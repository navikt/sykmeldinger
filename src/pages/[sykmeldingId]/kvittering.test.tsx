import { describe, expect, it } from 'vitest'
import mockRouter from 'next-router-mock'

import { createMock, createSykmelding, createSykmeldingPeriode } from '../../utils/test/dataUtils'
import {
    Arbeidsgiver,
    Periodetype,
    StatusEvent,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    SykmeldingFragment,
} from '../../fetching/graphql.generated'
import { render, screen } from '../../utils/test/testUtils'
import { createExtraFormDataMock } from '../../feature-tests/mockUtils'

import KvitteringPage from './kvittering.page'

describe('kvittering page', () => {
    describe('given space between previous sykmelding or not', () => {
        mockRouter.setCurrentUrl(`/current-sykmelding-id/kvittering`)

        const newestSykmelding = createSykmelding(
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
            StatusEvent.SENDT,
        )

        function setup(sykmeldinger: SykmeldingFragment[]): void {
            const currentSykmelding = sykmeldinger[sykmeldinger.length - 1]

            render(<KvitteringPage />, {
                mocks: [
                    createMock({
                        request: { query: SykmeldingByIdDocument, variables: { id: currentSykmelding.id } },
                        result: {
                            data: { __typename: 'Query', sykmelding: currentSykmelding },
                        },
                    }),
                    createMock({
                        request: { query: SykmeldingerDocument },
                        result: {
                            data: { __typename: 'Query', sykmeldinger: sykmeldinger },
                        },
                    }),
                    createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
                ],
            })
        }

        async function waitForQueriesLoaded(): Promise<void> {
            expect(
                await screen.findByRole('heading', { name: /Sykmeldingen ble sendt til Default Arbeidsgiverssen AS/ }),
            ).toBeInTheDocument()
            expect(await screen.findByRole('heading', { name: 'Sykmeldingen gjelder' })).toBeInTheDocument()
        }

        it('should not show "Legg til egenmeldingsdager"-button when sykmelding is right against previous sykmelding', async () => {
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

            setup([previousSendtSykmelding, newestSykmelding])

            await waitForQueriesLoaded()

            // Should not have the link
            expect(screen.queryByRole('link', { name: /Legg til egenmeldingsdager/ })).not.toBeInTheDocument()
        })

        it('should show "Legg til egenmeldingsdager"-button when there is "space" behind the sykmelding', async () => {
            const previousSendtSykmelding = createSykmelding(
                {
                    id: 'previous-sykmelding-id',
                    sykmeldingsperioder: [
                        createSykmeldingPeriode({
                            fom: '2023-02-01',
                            tom: '2023-02-14',
                            type: Periodetype.AKTIVITET_IKKE_MULIG,
                        }),
                    ],
                },
                StatusEvent.SENDT,
            )

            setup([previousSendtSykmelding, newestSykmelding])

            await waitForQueriesLoaded()

            // Should have the link
            expect(screen.getByRole('link', { name: /Legg til egenmeldingsdager/ })).toBeInTheDocument()
        })
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
