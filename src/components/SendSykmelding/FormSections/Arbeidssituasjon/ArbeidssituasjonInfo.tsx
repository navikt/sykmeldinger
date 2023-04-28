import React from 'react'
import { Alert, BodyLong, BodyShort, Label, Link, ReadMore } from '@navikt/ds-react'

export function ArbeidssituasjonInfo(): JSX.Element {
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

export function ArbeidssituasjonStatusInfo(): JSX.Element {
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

export function StrengtFortroligInfo(): JSX.Element {
    return (
        <Alert variant="warning">
            <BodyLong>
                Du er registrert med adressesperre strengt fortrolig. Du kan derfor ikke sende sykmeldingen til
                arbeidsgiveren din fra nav.no. Det betyr at du må levere sykmeldingen personlig til arbeidsgiveren din.
            </BodyLong>
            <Label>
                For å levere sykmeldingen til arbeidsgiveren din kan du ta kontakt med den som har sykmeldt deg for å få
                en utskrift.
            </Label>
        </Alert>
    )
}
