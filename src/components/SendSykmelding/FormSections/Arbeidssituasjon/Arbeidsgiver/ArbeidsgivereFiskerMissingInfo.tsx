import { ReactElement } from 'react'
import { Alert, BodyLong } from '@navikt/ds-react'

function ArbeidsgivereMissingInfo(): ReactElement {
    return (
        <Alert className="mt-4" variant="warning">
            <BodyLong spacing>
                Vi klarer ikke å finne noen arbeidsforhold registrert på deg. Dette vil gjelde en del fiskere på hyre,
                da arbeidsgiver ikke har plikt til å melde inn arbeidsforholdet. Hvis du er usikker på om det er riktig
                i ditt tilfelle, kan du ta kontakt med arbeidsgiveren din.
            </BodyLong>
            <BodyLong>
                Hvis det stemmer at arbeidsforholdet ditt ikke skal registreres, kan du sende inn sykmeldingen til NAV
                som fisker ved å velge lott i stedet for hyre.
            </BodyLong>
        </Alert>
    )
}

export default ArbeidsgivereMissingInfo
