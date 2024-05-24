import { ReactElement } from 'react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import * as R from 'remeda'

import { screen, render } from '../../../../../utils/test/testUtils'
import { toDateString } from '../../../../../utils/dateUtils'

import FrilanserEgenmeldingPerioderField from './FrilanserEgenmeldingPerioderField'

describe('FrilanserEgenmeldingPerioderField', () => {
    const EgenmeldingerFieldInForm = ({ oppfolgingsdato }: { oppfolgingsdato: string }): ReactElement => {
        const form = useForm({
            defaultValues: {
                egenmeldingsperioder: [{ fom: null, tom: null }],
            },
        })
        const values = form.watch('egenmeldingsperioder') ?? []

        return (
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(() => void 0)}>
                    <FrilanserEgenmeldingPerioderField oppfolgingsdato={oppfolgingsdato} />
                    <button type="submit">submit for test</button>
                    <div data-testid="value">
                        {JSON.stringify(
                            R.map(
                                values,
                                R.mapValues((it) => it && toDateString(it)),
                            ),
                        )}
                    </div>
                </form>
            </FormProvider>
        )
    }

    it('should always have an initial period and header based on oppfolgingsdato', () => {
        render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-01-01" />)

        expect(
            screen.getByRole('heading', { name: 'Hvilke dager var du borte fra jobb før 1. januar 2021?' }),
        ).toBeInTheDocument()
        expect(screen.getAllByRole('textbox')).toHaveLength(2)
        expect(screen.getByTestId('value')).toHaveTextContent('[{"fom":null,"tom":null}]')
    })

    it('should input multiple periods correctly', async () => {
        render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

        await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '12.02.2021')
        await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '17.02.2021')

        await userEvent.click(screen.getByRole('button', { name: 'Legg til ekstra periode' }))

        await userEvent.type(screen.getAllByRole('textbox', { name: 'Fra og med' })[1], '18.02.2021')
        await userEvent.type(screen.getAllByRole('textbox', { name: 'Til og med' })[1], '22.02.2021')

        expect(screen.getByTestId('value')).toHaveTextContent(
            JSON.stringify([
                { fom: '2021-02-12', tom: '2021-02-17' },
                { fom: '2021-02-18', tom: '2021-02-22' },
            ]),
        )
    }, 10_000)

    it('should remove period', async () => {
        render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

        await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '12.02.2021')
        await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '17.02.2021')

        await userEvent.click(screen.getByRole('button', { name: 'Legg til ekstra periode' }))

        await userEvent.type(screen.getAllByRole('textbox', { name: 'Fra og med' })[1], '18.02.2021')
        await userEvent.type(screen.getAllByRole('textbox', { name: 'Til og med' })[1], '22.02.2021')

        await userEvent.click(screen.getByRole('button', { name: 'Fjern periode' }))

        expect(screen.getByTestId('value')).toHaveTextContent(
            JSON.stringify([{ fom: '2021-02-12', tom: '2021-02-17' }]),
        )
    }, 10_000)

    it('should reset dates', async () => {
        render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

        await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '12.02.2021')
        await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '17.02.2021')

        await userEvent.click(screen.getByRole('button', { name: 'Nullstill dato' }))

        expect(screen.getByTestId('value')).toHaveTextContent(JSON.stringify([{ fom: null, tom: null }]))
    })

    describe('input validation', () => {
        it('should not allow fom on or after oppfolgingsdato', async () => {
            render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '01.03.2021')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '15.03.2021')

            await userEvent.click(screen.getByRole('button', { name: 'submit for test' }))

            expect(await screen.findByText('Fra dato kan ikke være oppfølgingsdato eller senere.')).toBeInTheDocument()
        })

        it('should not allow tom date on or after oppfolgingsdato', async () => {
            render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '12.02.2021')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '01.03.2021')

            await userEvent.click(screen.getByRole('button', { name: 'submit for test' }))

            expect(await screen.findByText('Til dato kan ikke være oppfølgingsdato eller senere.')).toBeInTheDocument()
        })

        it('should not allow fom after tom', async () => {
            render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '13.02.2021')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '12.02.2021')

            await userEvent.click(screen.getByRole('button', { name: 'submit for test' }))

            expect(await screen.findByText('Fra kan ikke være etter til dato.')).toBeInTheDocument()
        })

        it('should enforce date format', async () => {
            render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '13.02.202ø')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '12.02.202ø')

            await userEvent.click(screen.getByRole('button', { name: 'submit for test' }))

            expect(await screen.findByText('Fra dato må være på formatet DD.MM.YYYY.')).toBeInTheDocument()
            expect(await screen.findByText('Til dato må være på formatet DD.MM.YYYY.')).toBeInTheDocument()
        })

        it('should enforce required inputs', async () => {
            render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

            await userEvent.click(screen.getByRole('button', { name: 'submit for test' }))

            expect(await screen.findByText('Du må fylle inn fra dato.')).toBeInTheDocument()
            expect(await screen.findByText('Du må fylle inn til dato.')).toBeInTheDocument()
        })

        it('should not allow overlapping periods', async () => {
            render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '12.02.2021')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '17.02.2021')

            await userEvent.click(screen.getByRole('button', { name: 'Legg til ekstra periode' }))

            await userEvent.type(screen.getAllByRole('textbox', { name: 'Fra og med' })[1], '17.02.2021')
            await userEvent.type(screen.getAllByRole('textbox', { name: 'Til og med' })[1], '22.02.2021')

            await userEvent.click(screen.getByRole('button', { name: 'submit for test' }))

            expect(await screen.findByText('Du kan ikke ha overlappende perioder.')).toBeInTheDocument()
        })

        it('should not allow overlapping periods at beginning', async () => {
            render(<EgenmeldingerFieldInForm oppfolgingsdato="2021-03-01" />)

            await userEvent.type(screen.getByRole('textbox', { name: 'Fra og med' }), '12.02.2021')
            await userEvent.type(screen.getByRole('textbox', { name: 'Til og med' }), '17.02.2021')

            await userEvent.click(screen.getByRole('button', { name: 'Legg til ekstra periode' }))

            await userEvent.type(screen.getAllByRole('textbox', { name: 'Fra og med' })[1], '08.02.2021')
            await userEvent.type(screen.getAllByRole('textbox', { name: 'Til og med' })[1], '12.02.2021')

            await userEvent.click(screen.getByRole('button', { name: 'submit for test' }))

            expect(await screen.findByText('Du kan ikke ha overlappende perioder.')).toBeInTheDocument()
        })
    })
})
