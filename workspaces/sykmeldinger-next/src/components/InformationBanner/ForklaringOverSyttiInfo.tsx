import { ReactElement } from 'react'
import { BodyShort, GuidePanel } from '@navikt/ds-react'

function ForklaringOverSyttiInfo(): ReactElement {
    return (
        <GuidePanel poster>
            <BodyShort spacing>Under ser du opplysningene vi har fått fra behandleren din.</BodyShort>
            <BodyShort spacing>Når du har passert 70 år, har du ikke lenger rett til sykepenger.</BodyShort>
            <BodyShort>
                Du kan likevel bekrefte sykmeldingen og sende den til arbeidsgiveren din. Søknad om sykepenger blir
                tilgengelig etter at sykmeldingsperioden er over. Hvis du ikke skal søke om sykepenger, kan du avbryte
                søknaden.
            </BodyShort>
        </GuidePanel>
    )
}

export default ForklaringOverSyttiInfo
