import { FormProvider, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'
import { parseISO } from 'date-fns'
import { Button } from '@navikt/ds-react'

import { render, waitFor, screen } from '../../../../../../utils/test/testUtils'

import PeriodePicker, { PeriodePickerProps } from './PeriodePicker'

describe('PeriodePicker', () => {
    const PeriodeSelectComp = (props: Partial<PeriodePickerProps>): JSX.Element => {
        const form = useForm()
        return (
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(() => void 0)}>
                    <PeriodePicker
                        name="egenmeldingsperioder.svar.0.range"
                        otherPeriods={[]}
                        maxDate={new Date()}
                        removeButton={undefined}
                        {...props}
                    />
                    <Button type="submit">Submit test</Button>
                    {form.formState.isSubmitSuccessful && <div data-testid="submit-ok">test submit OK 👍</div>}
                </form>
            </FormProvider>
        )
    }

    it('should type in fom date', async () => {
        render(<PeriodeSelectComp />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        await userEvent.type(inputFom, '12.10.2022')

        await waitFor(() => expect(inputFom).toHaveAttribute('value', '12.10.2022'))
    })

    it('should type in tom date', async () => {
        render(<PeriodeSelectComp />)

        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })
        await userEvent.type(inputTom, '20.10.2022')

        await waitFor(() => expect(inputTom).toHaveAttribute('value', '20.10.2022'))
    })

    it('should warn about missing fom date', async () => {
        render(<PeriodeSelectComp />)

        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })
        await userEvent.type(inputTom, '20.10.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText('Du må fylle inn fra dato.')).toBeInTheDocument()
    })

    it('should warn about missing tom date', async () => {
        render(<PeriodeSelectComp />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        await userEvent.type(inputFom, '12.10.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText('Du må fylle inn til dato.')).toBeInTheDocument()
    })

    it('should warn user when to date is invalid date', async () => {
        render(<PeriodeSelectComp maxDate={parseISO('2022-03-15')} />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '15.03.2022')
        await userEvent.type(inputTom, '20.03.202ø')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText(/til dato må være på formatet dd\.mm\.yyyy/i)).toBeInTheDocument()
    })

    it('should warn user when from date is invalid date', async () => {
        render(<PeriodeSelectComp maxDate={parseISO('2022-03-15')} />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '15.03.202ø')
        await userEvent.type(inputTom, '20.03.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText(/fra dato må være på formatet dd\.mm\.yyyy/i)).toBeInTheDocument()
    })

    it('should warn user when from date is same or after maxDate', async () => {
        render(<PeriodeSelectComp maxDate={parseISO('2022-03-15')} />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '16.03.2022')
        await userEvent.type(inputTom, '20.03.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText('Fra dato kan ikke være oppfølgingsdato eller senere.')).toBeInTheDocument()
    })

    it('should warn user when to date is same or after maxDate', async () => {
        render(<PeriodeSelectComp maxDate={parseISO('2022-03-15')} />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '10.03.2022')
        await userEvent.type(inputTom, '16.03.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText('Til dato kan ikke være oppfølgingsdato eller senere.')).toBeInTheDocument()
    })

    it('should warn user when period overlaps with a different period when input fom overlaps with other period tom', async () => {
        render(
            <PeriodeSelectComp
                otherPeriods={[{ id: '1', range: { fom: parseISO('2022-03-02'), tom: parseISO('2022-03-10') } }]}
            />,
        )

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '10.03.2022')
        await userEvent.type(inputTom, '20.03.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText('Du kan ikke ha overlappende perioder.')).toBeInTheDocument()
    })

    it('should warn user when period overlaps with a different period when input tom overlaps with other period fom', async () => {
        render(
            <PeriodeSelectComp
                otherPeriods={[{ id: '1', range: { fom: parseISO('2022-03-02'), tom: parseISO('2022-03-10') } }]}
            />,
        )

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '28.02.2022')
        await userEvent.type(inputTom, '02.03.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText('Du kan ikke ha overlappende perioder.')).toBeInTheDocument()
    })

    it('should warn user when fom is after tom', async () => {
        render(<PeriodeSelectComp />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '15.03.2022')
        await userEvent.type(inputTom, '14.03.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByText('Fra kan ikke være etter til dato.')).toBeInTheDocument()
    })

    it('should empty fom and tom input fields when Nullstill dato is clicked', async () => {
        render(<PeriodeSelectComp />)

        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })
        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const resetButton = screen.getByRole('button', { name: 'Nullstill dato' })

        await userEvent.type(inputFom, '03.08.2022')
        await userEvent.type(inputTom, '03.08.2022')

        await waitFor(() => expect(inputFom).toHaveAttribute('value', '03.08.2022'))
        await waitFor(() => expect(inputTom).toHaveAttribute('value', '03.08.2022'))

        await userEvent.click(resetButton)

        await waitFor(() => expect(inputFom).toHaveAttribute('value', ''))
        await waitFor(() => expect(inputTom).toHaveAttribute('value', ''))
    })

    it('should be happy when everything is good', async () => {
        render(
            <PeriodeSelectComp
                maxDate={parseISO('2022-03-15')}
                otherPeriods={[{ id: '1', range: { fom: parseISO('2022-03-02'), tom: parseISO('2022-03-10') } }]}
            />,
        )

        const inputFom = screen.getByRole('textbox', { name: 'Fra og med:' })
        const inputTom = screen.getByRole('textbox', { name: 'Til og med:' })

        await userEvent.type(inputFom, '11.03.2022')
        await userEvent.type(inputTom, '15.03.2022')
        await userEvent.click(screen.getByRole('button', { name: 'Submit test' }))

        expect(await screen.findByTestId('submit-ok')).toBeInTheDocument()
    })
})
