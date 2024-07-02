import { Alert } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

function ArbeidsgivereMissingForFiskereInfo(): ReactElement {
    return (
        <Alert className="mt-4" variant="warning">
            Vi klarer ikke å finne noen arbeidsforhold registrert på deg. Hvis du er usikker på om dette er riktig, må
            du ta kontakt med arbeidsgiveren din. Du kan ikke sende inn sykmeldingen til arbeidsgiver når
            arbeidsforholdet ikke er registrert, men du kan likevel ta sykmeldingen i bruk ved å bekrefte den.
        </Alert>
    )
}

export default ArbeidsgivereMissingForFiskereInfo
