import { ReactElement } from 'react'
import { BodyShort, ReadMore } from '@navikt/ds-react'

export function ArbeidssituasjonInfo(): ReactElement {
    return (
        <div>
            <BodyShort spacing>
                Fortell oss hva som er situasjonen din, så vet vi hvilken informasjon du skal få
            </BodyShort>
            <ReadMore header="Har du flere arbeidsforhold?">
                Du trenger én sykmelding for hvert arbeidsforhold du er sykmeldt fra. Kontakt den som har sykmeldt deg.
            </ReadMore>
        </div>
    )
}
