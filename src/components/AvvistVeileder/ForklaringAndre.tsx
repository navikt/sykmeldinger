import { ReactElement } from 'react'
import { BodyLong, Label } from '@navikt/ds-react'

import { Behandlingsutfall } from 'queries'

interface ForklaringAndreProps {
    behandlerNavn: string
    ruleHits: Behandlingsutfall['ruleHits']
}

const avvistGrunnId = 'avvist-grunn'

function ForklaringAndre({ behandlerNavn, ruleHits }: ForklaringAndreProps): ReactElement {
    return (
        <>
            <BodyLong className="mb-6">
                Du trenger en ny sykmelding fordi det er gjort en feil i utfyllingen. Vi har gitt beskjed til{' '}
                {behandlerNavn} om hva som er feil, og at du må få en ny sykmelding.
            </BodyLong>
            <Label id={avvistGrunnId}>Grunnen til at sykmeldingen er avvist:</Label>
            <ul className="mb-4 list-disc pl-6" aria-labelledby={avvistGrunnId}>
                {ruleHits.map((ruleHit, index) => (
                    <li key={index} className="mb-2">
                        {ruleHit.messageForUser}
                    </li>
                ))}
            </ul>
            <BodyLong>
                Når du har fått ny sykmelding fra {behandlerNavn}, får du en ny beskjed fra oss om å logge deg inn på
                nav.no slik at du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte {behandlerNavn} som
                skal skrive den nye sykmeldingen.
            </BodyLong>
        </>
    )
}

export default ForklaringAndre
