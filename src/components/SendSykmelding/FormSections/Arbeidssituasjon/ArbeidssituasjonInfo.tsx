import { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

export function ArbeidssituasjonInfo(): ReactElement {
    return (
        <BodyShort className="mt-4 -mb-4">
            Hvis du er sykmeldt fra flere jobber, må du be legen din om én sykmelding for hver av dem. Dette gjelder
            også hvis du har flere stillinger hos samme arbeidsgiver.
        </BodyShort>
    )
}
