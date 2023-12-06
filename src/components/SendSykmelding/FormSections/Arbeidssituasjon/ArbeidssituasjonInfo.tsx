import { ReactElement } from 'react'
import { BodyLong, BodyShort, Link, ReadMore } from '@navikt/ds-react'

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

export function ArbeidssituasjonStatusInfo(): ReactElement {
    //TODO: fix broken url or remove link
    return (
        <div className="mb-1 mt-4">
            <BodyLong>
                Sjekk om du er{' '}
                <Link
                    href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/er-jeg-selvstendig-naeringsdrivende-frilanser-eller-arbeidstaker"
                    target="_blank"
                >
                    selvstendig næringsdrivende, frilanser eller ansatt
                </Link>
            </BodyLong>
        </div>
    )
}
