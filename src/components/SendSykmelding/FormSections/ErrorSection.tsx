import { ErrorSummary } from '@navikt/ds-react'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormValues } from '../SendSykmeldingForm'

import { extractAllErrors } from './ErrorSectionUtils'
import { QuestionWrapper } from './shared/FormStructure'

function ErrorSection(): JSX.Element | null {
    const {
        formState: { errors },
    } = useFormContext<FormValues>()

    const errorsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        errorsRef.current?.focus()
    }, [])

    const errorSummary = extractAllErrors(errors, null)
    if (!errorSummary.length) return null

    return (
        <QuestionWrapper>
            <ErrorSummary
                size="medium"
                heading="Du må fylle ut disse feltene før du kan registrere sykmeldingen."
                ref={errorsRef}
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

export default ErrorSection
