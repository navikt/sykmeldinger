import { ReactElement } from 'react'
import { Alert, Heading } from '@navikt/ds-react'

import { useLogAmplitudeEvent } from '../../../../../amplitude/amplitude'

function ArbeidsgivereMissingInfo(): ReactElement {
    useLogAmplitudeEvent({
        eventName: 'komponent vist',
        data: { komponent: 'Ansatt Missing Arbeidsgiver' },
    })
    return (
        <Alert className="mt-4" variant="warning">
            <Heading spacing size="small" level="2">
                Vi finner ingen arbeidsforhold registrert på deg
            </Heading>
            Før du går videre, må du be arbeidsgiveren din om å registrere deg i A-meldingen. Når det er gjort blir det
            oppdatert her, og du kan sende inn sykmeldingen.
        </Alert>
    )
}

export default ArbeidsgivereMissingInfo
