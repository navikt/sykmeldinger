import React, { ReactElement } from 'react'
import { BodyLong, GuidePanel } from '@navikt/ds-react'

type Props = {
    grad: number
}

function ForklaringUnder20Prosent({ grad }: Props): ReactElement {
    return (
        <GuidePanel poster>
            <BodyLong spacing>Under ser du opplysningene vi har fått fra behandleren din.</BodyLong>
            <BodyLong spacing>
                Denne sykmeldingen viser at du er {grad} prosent sykmeldt. Hvis du er under 20 prosent sykmeldt, har du
                ikke rett til sykepenger. Om du er sykmeldt fra flere arbeidsforhold, kan du i noen tilfeller ha rett
                til sykepenger likevel.
            </BodyLong>
            <BodyLong spacing>
                Hvis sykmeldingsgraden er feil må du avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for
                å få en ny.
            </BodyLong>
            <BodyLong>
                Hvis opplysningene i sykmeldingen stemmer, sender du sykmeldingen, nederst på siden. Når
                sykmeldingsperioden er over må du sende søknad om sykepenger for å få vurdert om du har rett til
                sykepenger.
            </BodyLong>
        </GuidePanel>
    )
}

export default ForklaringUnder20Prosent
