import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { axe, render, screen, waitFor } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import {
    StatusEvent,
    SendSykmeldingDocument,
    SykmeldingByIdDocument,
    SykmeldingerDocument,
    YesOrNo,
    ArbeidssituasjonType,
} from '../fetching/graphql.generated'
import { createMock, createSykmelding } from '../utils/test/dataUtils'

import { createExtraFormDataMock } from './mockUtils'
import { arbeidsgivereMock } from './arbeidstaker.test'

describe('Arbeidsledig', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl(`/sykmelding-id`)
    })

    const sykmelding = createSykmelding({ id: 'sykmelding-id' })
    const baseMocks = [
        createMock({
            request: { query: SykmeldingByIdDocument, variables: { id: 'sykmelding-id' } },
            result: { data: { __typename: 'Query', sykmelding: sykmelding } },
        }),
        createMock({
            request: { query: SykmeldingerDocument },
            result: { data: { __typename: 'Query', sykmeldinger: [sykmelding] } },
        }),
    ]

    it('should be able to submit form with work situation arbeidsledig', async () => {
        const mocks = [
            ...baseMocks,
            createExtraFormDataMock(),
            createMock({
                request: {
                    query: SendSykmeldingDocument,
                    variables: {
                        sykmeldingId: 'sykmelding-id',
                        values: {
                            erOpplysningeneRiktige: YesOrNo.YES,
                            arbeidssituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
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
        ]

        const { container } = render(<SykmeldingPage />, { mocks })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Ja' }))
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'arbeidsledig' }))

        expect(await axe(container)).toHaveNoViolations()

        await userEvent.click(screen.getByRole('button', { name: 'Bekreft sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })

    it('should not send egenmeldingsdager and stuff when first filled out as arbeidsgiver, then changes back to arbeidsledig', async () => {
        const mocks = [
            ...baseMocks,
            createExtraFormDataMock({ brukerinformasjon: { arbeidsgivere: arbeidsgivereMock } }),
            createMock({
                request: {
                    query: SendSykmeldingDocument,
                    variables: {
                        sykmeldingId: 'sykmelding-id',
                        values: {
                            erOpplysningeneRiktige: YesOrNo.YES,
                            arbeidssituasjon: ArbeidssituasjonType.ARBEIDSLEDIG,
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
        ]

        render(<SykmeldingPage />, { mocks })

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
                { name: 'Nei' },
            ),
        )
        expect(
            screen.getByText('Siden du sier det er feil, ber vi arbeidsgiveren din om å gi oss riktig navn.'),
        ).toBeInTheDocument()

        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos PONTYPANDY FIRE SERVICE i perioden/ },
                { name: 'Ja' },
            ),
        )

        await userEvent.click(screen.getByRole('button', { name: /29\. april/ }))
        await userEvent.click(screen.getByRole('button', { name: 'Videre' }))
        await userEvent.click(
            screen.getRadioInGroup(
                { name: /Brukte du egenmelding hos PONTYPANDY FIRE SERVICE i perioden 13. - 21. april 2023/i },
                { name: 'Nei' },
            ),
        )

        // change arbeidstaker to arbeidsledig, this should nuke the egenmeldingsdager state
        await userEvent.click(screen.getRadioInGroup({ name: /Jeg er sykmeldt som/i }, { name: 'arbeidsledig' }))

        await userEvent.click(screen.getByRole('button', { name: 'Bekreft sykmelding' }))

        await waitFor(() => expect(mockRouter.pathname).toBe(`/[sykmeldingId]/kvittering`))
        expect(mockRouter.query.sykmeldingId).toBe('sykmelding-id')
    })
})
