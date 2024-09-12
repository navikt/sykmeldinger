import { BodyShort, ErrorSummary } from '@navikt/ds-react'
import React, { ForwardedRef, ReactElement, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormValues } from '../SendSykmeldingForm'
import { QuestionWrapper } from '../../FormComponents/FormStructure'

import { extractAllErrors } from './ErrorSectionUtils'
import { missingAgError } from './Arbeidssituasjon/Arbeidsgiver/ArbeidsgiverField'

function ErrorSection(_: unknown, ref: ForwardedRef<HTMLDivElement>): ReactElement | null {
    const {
        formState: { errors },
    } = useFormContext<FormValues>()

    const errorSummary = extractAllErrors(errors, null)
    if (!errorSummary.length) return null

    return (
        <QuestionWrapper>
            {errors.arbeidsgiverOrgnummer?.message === missingAgError ? (
                <ErrorSummary
                    heading="Sykmeldingen ble ikke sendt"
                    className="[&_li]:text-gray-900"
                    size="medium"
                    ref={ref}
                >
                    <BodyShort as="li">{errors.arbeidsgiverOrgnummer.message}</BodyShort>
                </ErrorSummary>
            ) : (
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
            )}
        </QuestionWrapper>
    )
}

export default forwardRef<HTMLDivElement>(ErrorSection)
