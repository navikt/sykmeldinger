import React, { ReactElement } from 'react'
import { BodyShort, BodyLong, GuidePanel } from '@navikt/ds-react'

type Props = {
    grad: number
}

function ForklaringUnder20Prosent({ grad }: Props): ReactElement {
    return (
        <GuidePanel poster>
            <BodyShort spacing>Under ser du opplysningene vi har fått fra behandleren din.</BodyShort>
            <BodyLong spacing>
                Denne sykmeldingen viser at du er {grad} prosent sykmeldt. Hvis du er under 20 prosent sykmeldt, har du
                ikke rett til sykepenger. Om du sykmeldt fra flere arbeidsforhold, kan du i noen tilfeller ha rett til
                sykepenger likevel.
            </BodyLong>
            <BodyLong>
                NAV kan ikke hindre deg i å sende inn søknad om sykepenger, selv om det er riktig at du har vært
                sykmeldt under 20 prosent. Søknad om sykepenger blir tilgengelig etter at sykmeldingsperioden er over.
                Hvis du ikke skal søke om sykepenger, kan du avbryte søknaden.
            </BodyLong>
        </GuidePanel>
    )
}

export default ForklaringUnder20Prosent
