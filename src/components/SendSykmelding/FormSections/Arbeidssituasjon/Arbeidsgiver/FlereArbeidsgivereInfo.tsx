import React, { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'

function FlereArbeidsgivereInfo(): ReactElement {
    return (
        <Alert className="mt-4" variant="warning" role="status">
            Dersom du er syk fra flere arbeidsforhold, må du be legen din om å skrive en sykmelding for hvert
            arbeidsforhold.
        </Alert>
    )
}

export default FlereArbeidsgivereInfo
