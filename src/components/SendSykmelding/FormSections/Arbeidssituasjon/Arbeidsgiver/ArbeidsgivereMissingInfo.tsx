import { ReactElement } from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import { useLogAmplitudeEvent } from '../../../../../amplitude/amplitude'

function ArbeidsgivereMissingInfo(): ReactElement {
    useLogAmplitudeEvent({
        eventName: 'komponent vist',
        data: { komponent: 'Ansatt Missing Arbeidsgiver' },
    })
    return (
        <Alert className="mt-4" variant="warning" role="status">
            <Heading spacing size="small" level="2">
                Viser vi ingen arbeidsforhold her?
            </Heading>
            <BodyShort className="mb-4">
                Er du ansatt hos en arbeidsgiver, må du be arbeidsgiveren din om å registrere deg i A-meldingen, slik at
                du kan sende inn sykmeldingen.
            </BodyShort>
            <BodyShort>
                Jobber du frilans for en oppdragsgiver, vil ikke arbeidsforholdet vises her. Da må du velge frilanser i
                stedet for ansatt.
            </BodyShort>
        </Alert>
    )
}

export default ArbeidsgivereMissingInfo
