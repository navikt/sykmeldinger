import { describe, expect, it } from 'vitest'
import mockRouter from 'next-router-mock'

import { createMock, createSykmelding, createSykmeldingPeriode } from '../../utils/test/dataUtils'
import {
    Arbeidsgiver,
    Periodetype,
    StatusEvent,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
} from '../../fetching/graphql.generated'
import { render, screen } from '../../utils/test/testUtils'
import { createExtraFormDataMock } from '../../feature-tests/mockUtils'

import KvitteringPage from './kvittering.page'

describe('kvittering page', () => {
    it('should not show "Legg til egenmeldingsdager"-button when sykmelding is right against previous sykmelding', async () => {
        mockRouter.setCurrentUrl(`/current-sykmelding-id/kvittering`)

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

        render(<KvitteringPage />, {
            mocks: [
                createMock({
                    request: { query: SykmeldingByIdDocument, variables: { id: 'current-sykmelding-id' } },
                    result: {
                        data: { __typename: 'Query', sykmelding: newestSykmelding },
                    },
                }),
                createMock({
                    request: { query: SykmeldingerDocument },
                    result: {
                        data: { __typename: 'Query', sykmeldinger: [previousSendtSykmelding, newestSykmelding] },
                    },
                }),
                createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
            ],
        })

        expect(
            await screen.findByRole('heading', { name: /Sykmeldingen ble sendt til Default Arbeidsgiverssen AS/ }),
        ).toBeInTheDocument()
        expect(await screen.findByRole('heading', { name: 'Sykmeldingen gjelder' })).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: /Legg til egenmeldingsdager/ })).not.toBeInTheDocument()
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
