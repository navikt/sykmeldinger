import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { ReactElement } from 'react'

import { render, screen } from '../../../../utils/test/testUtils'

import ArbeidssituasjonField from './ArbeidssituasjonField'

describe('ArbeidssituasjonField', () => {
    const ArbeidssituasjonFieldInForm = ({ harAvventendePeriode }: { harAvventendePeriode: boolean }): ReactElement => {
        const form = useForm({
            defaultValues: {
                arbeidssituasjon: null,
            },
        })

        return (
            <FormProvider {...form}>
                <ArbeidssituasjonField harAvventendePeriode={harAvventendePeriode} />
                <div data-testid="value">{form.watch('arbeidssituasjon')}</div>
            </FormProvider>
        )
    }

    it('should not disable fields when harAvventendePeriode is false', async () => {
        render(<ArbeidssituasjonFieldInForm harAvventendePeriode={false} />)

        await userEvent.click(screen.getByRole('radio', { name: 'permittert' }))

        expect(screen.getByRole('radio', { name: 'permittert' })).not.toBeDisabled()
        expect(screen.getByRole('radio', { name: 'permittert' })).toBeChecked()
        expect(screen.getByTestId('value')).toHaveTextContent('PERMITTERT')
    })

    it('should disable everything except ansatt when harAvventendePeriode is true', () => {
        render(<ArbeidssituasjonFieldInForm harAvventendePeriode />)

        expect(screen.getByRole('radio', { name: 'ansatt' })).not.toBeDisabled()
        expect(screen.getByRole('radio', { name: 'permittert' })).toBeDisabled()
        expect(screen.getByRole('radio', { name: 'frilanser' })).toBeDisabled()
        expect(screen.getByRole('radio', { name: 'selvstendig næringsdrivende' })).toBeDisabled()
        expect(screen.getByRole('radio', { name: 'arbeidsledig' })).toBeDisabled()
        expect(screen.getByRole('radio', { name: 'annet' })).toBeDisabled()
    })
})
