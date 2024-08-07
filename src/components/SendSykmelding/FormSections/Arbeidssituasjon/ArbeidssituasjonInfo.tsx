import { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

export function ArbeidssituasjonInfo(): ReactElement {
    return (
        <BodyShort className="mt-4 -mb-4">
            Du trenger én sykmelding for hver arbeidssituasjon du er sykmeldt fra. Har du flere jobber, må du be legen
            din om én sykmelding for hver av dem.
        </BodyShort>
    )
}
