import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { render, screen } from '../utils/test/testUtils'
import SykmeldingPage from '../pages/[sykmeldingId]/index.page'
import { createMock, createSykmelding } from '../utils/test/dataUtils'
import { SykmeldingByIdDocument, SykmeldingerDocument } from '../fetching/graphql.generated'

import { createExtraFormDataMock } from './mockUtils'

describe('Uriktige opplysninger', () => {
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

    it('should show error message when periode is wrong', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }))
        await userEvent.click(
            screen.getCheckboxInGroup({ name: /Hvilke opplysninger stemmer ikke?/i }, { name: 'Periode' }),
        )

        expect(await screen.findByText('Du kan ikke bruke denne sykmeldingen')).toBeInTheDocument()
        expect(screen.queryByText('Din arbeidssituasjon')).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).not.toBeInTheDocument()
    })

    it('should show error message when sykmeldingsgrad is to low', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }))
        await userEvent.click(
            screen.getCheckboxInGroup(
                { name: /Hvilke opplysninger stemmer ikke?/i },
                { name: 'Sykmeldingsgraden er for lav' },
            ),
        )

        expect(await screen.findByText('Du kan ikke bruke denne sykmeldingen')).toBeInTheDocument()
        expect(screen.queryByText('Din arbeidssituasjon')).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).not.toBeInTheDocument()
    })

    it('should be able to continue when sykmeldingsgrad is too high', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }))
        await userEvent.click(
            screen.getCheckboxInGroup(
                { name: /Hvilke opplysninger stemmer ikke?/i },
                { name: 'Sykmeldingsgraden er for høy' },
            ),
        )

        expect(
            await screen.findByText(
                'Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.',
            ),
        ).toBeInTheDocument()
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument()
    })

    it('should be able to continue when arbeidsgiver is wrong', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }))
        await userEvent.click(
            screen.getCheckboxInGroup({ name: /Hvilke opplysninger stemmer ikke?/i }, { name: 'Arbeidsgiver' }),
        )

        expect(
            await screen.findByText(
                'I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.',
            ),
        ).toBeInTheDocument()
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument()
    })

    it('should be able to continue when diagnose is wrong', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }))
        await userEvent.click(
            screen.getCheckboxInGroup({ name: /Hvilke opplysninger stemmer ikke?/i }, { name: 'Diagnose' }),
        )

        expect(
            await screen.findByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.',
            ),
        ).toBeInTheDocument()
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument()
    })

    it('should be able to continue when andre opplysninger is wrong', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }))
        await userEvent.click(
            screen.getCheckboxInGroup({ name: /Hvilke opplysninger stemmer ikke?/i }, { name: 'Andre opplysninger' }),
        )

        expect(
            await screen.findByText(
                'Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.',
            ),
        ).toBeInTheDocument()
        expect(screen.getByText('Din arbeidssituasjon')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument()
    })

    it('should not show Din arbeidssituasjon if reason for uriktigeOpplysninger is not checked', async () => {
        render(<SykmeldingPage />, { mocks: [...baseMocks, createExtraFormDataMock()] })

        await userEvent.click(await screen.findRadioInGroup({ name: 'Stemmer opplysningene?' }, { name: 'Nei' }))

        expect(screen.queryByText('Din arbeidssituasjon')).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: /^(Send|Bekreft) sykmelding/ })).toBeInTheDocument()
    })
})
