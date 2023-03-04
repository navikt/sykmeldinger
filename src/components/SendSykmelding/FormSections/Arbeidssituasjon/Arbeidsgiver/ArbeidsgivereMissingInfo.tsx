import { Alert } from '@navikt/ds-react'
import React from 'react'

function ArbeidsgivereMissingInfo(): JSX.Element {
    return (
        <Alert className="mt-4" variant="warning">
            Vi klarer ikke å finne noen arbeidsforhold registrert på deg. Be arbeidsgiveren din om å registrere deg i
            A-meldingen. Da blir det oppdatert her slik at du kan få sendt den til arbeidsgiveren.
        </Alert>
    )
}

export default ArbeidsgivereMissingInfo
