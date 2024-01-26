import { ReactElement } from 'react'
import { BodyShort, GuidePanel } from '@navikt/ds-react'

type Props = {
    grad: number
}

function ForklaringUnder20Prosent({ grad }: Props): ReactElement {
    return (
        <GuidePanel poster>
            <BodyShort className="pb-5">
                Behandleren din har oppgitt at du er <strong>{grad}% sykmeldt</strong>. Du må være minst{' '}
                <strong>20% sykmeldt</strong> for å ha krav på sykepenger. Hvis du mener det er feil, kan du kontakte
                legen din.
            </BodyShort>

            <BodyShort className="pb-5">Du kan fortsatt bruke sykmeldingen til å søke om sykepenger.</BodyShort>
        </GuidePanel>
    )
}

export default ForklaringUnder20Prosent
