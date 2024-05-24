import React, { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'

import { useLogAmplitudeEvent } from '../../../../../amplitude/amplitude'

function FlereArbeidsgivereInfo(): ReactElement {
    const text =
        'Dersom du er syk fra flere arbeidsforhold, må du be legen din om å skrive en sykmelding for hvert arbeidsforhold.'
    useLogAmplitudeEvent({ eventName: 'alert vist', data: { variant: 'flere-arbeidsgivere-info', tekst: text } })

    return (
        <Alert className="mt-4" variant="warning">
            {text}
        </Alert>
    )
}

export default FlereArbeidsgivereInfo
