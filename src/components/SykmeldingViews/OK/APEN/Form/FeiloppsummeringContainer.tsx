import { ErrorSummary } from '@navikt/ds-react'
import React, { useEffect, useRef } from 'react'
import { FieldErrors } from 'react-hook-form'

import { FormShape } from './Form'

interface FeiloppsummeringContainerProps {
    errors: FieldErrors<FormShape>
}

type CustomErrors = Record<keyof FormShape, string | undefined>

function FeiloppsummeringContainer({ errors }: FeiloppsummeringContainerProps): JSX.Element | null {
    const summaryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        summaryRef.current?.focus()
    }, [errors, summaryRef])

    const customErrors: CustomErrors = {
        erOpplysningeneRiktige: errors.erOpplysningeneRiktige?.svar?.message,
        uriktigeOpplysninger: errors.uriktigeOpplysninger?.svar?.message,
        arbeidssituasjon: errors.arbeidssituasjon?.svar?.message,
        arbeidsgiverOrgnummer: errors.arbeidsgiverOrgnummer?.svar?.message,
        riktigNarmesteLeder: errors.riktigNarmesteLeder?.svar?.message,
        harBruktEgenmelding: errors.harBruktEgenmelding?.svar?.message,
        egenmeldingsperioder: errors.egenmeldingsperioder?.svar?.find?.((ep) => ep?.range)?.range?.message,
        harForsikring: errors.harForsikring?.svar?.message,
    }

    const errorSummary = Object.entries(customErrors).filter((tuple): tuple is [string, string] => tuple[1] != null)

    if (errorSummary.length === 0) {
        return null
    }

    return (
        <ErrorSummary ref={summaryRef} title="For å gå videre må du rette opp følgende">
            {errorSummary.map(([key, value]) => (
                <ErrorSummary.Item key={key} href={`#${key}`}>
                    {value}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    )
}

export default FeiloppsummeringContainer
