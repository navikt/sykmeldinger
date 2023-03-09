import { ErrorSummary } from '@navikt/ds-react'
import { ForwardedRef, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormValues } from '../SendSykmeldingForm'
import { QuestionWrapper } from '../../FormComponents/FormStructure'

import { extractAllErrors } from './ErrorSectionUtils'

function ErrorSection(_: unknown, ref: ForwardedRef<HTMLDivElement>): JSX.Element | null {
    const {
        formState: { errors },
    } = useFormContext<FormValues>()

    const errorSummary = extractAllErrors(errors, null)
    if (!errorSummary.length) return null

    return (
        <QuestionWrapper>
            <ErrorSummary
                size="medium"
                heading="Du må fylle ut disse feltene før du kan registrere sykmeldingen."
                ref={ref}
            >
                {errorSummary.map(({ name, message }) => (
                    <ErrorSummary.Item key={name} href={`#${name}`}>
                        {message}
                    </ErrorSummary.Item>
                ))}
            </ErrorSummary>
        </QuestionWrapper>
    )
}

export default forwardRef<HTMLDivElement>(ErrorSection)
