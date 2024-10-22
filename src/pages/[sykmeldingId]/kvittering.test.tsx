import { describe, expect, it } from 'vitest'
import mockRouter from 'next-router-mock'

import {
    Arbeidsgiver,
    BrukerinformasjonDocument,
    Periodetype,
    StatusEvent,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    SykmeldingFragment,
} from 'queries'

import { createInitialQuery, createMock, createSykmelding, createSykmeldingPeriode } from '../../utils/test/dataUtils'
import { render, screen } from '../../utils/test/testUtils'
import { brukerinformasjonData } from '../../utils/test/mockUtils'

import KvitteringPage from './kvittering.page'

describe('kvittering page', () => {
    mockRouter.setCurrentUrl(`/current-sykmelding-id/kvittering`)

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
            ],
            initialState: [
                createInitialQuery(
                    BrukerinformasjonDocument,
                    brukerinformasjonData({ arbeidsgivere: arbeidsgivereMock }),
                ),
            ],
        })
    }

    it('should NOT show egenmeldingsdager info when status is bekreftet', async () => {
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

        const confirmedSykmelding = createSykmelding(
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
            StatusEvent.BEKREFTET,
        )

        setup([previousSendtSykmelding, confirmedSykmelding])

        expect(await screen.findByText(/Sykmeldingen ble sendt til NAV./)).toBeInTheDocument()
        expect(await screen.findByRole('heading', { name: 'Sykmeldingen gjelder' })).toBeInTheDocument()

        expect(
            screen.queryByRole('alert', {
                name: /Hvis du ønsker å endre egenmeldingsdager etter at du har sendt sykmeldingen, må du ta kontakt med arbeidsgiver./,
            }),
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
