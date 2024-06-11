import { ExternalLinkIcon } from '@navikt/aksel-icons'
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react'
import { ReactElement } from 'react'

function EHelseforsikring(): ReactElement {
    return (
        <Box className="mt-20" padding="6" background="surface-info-subtle">
            <Heading size="small" level="4" spacing>
                Fikk du denne sykmeldingen uten å møte opp på legekontoret?
            </Heading>
            <BodyShort spacing>
                Nasjonalt senter for e-helseforskning forsker på sykmeldinger gitt uten oppmøte hos legen og vil gjerne
                høre dine erfaringer.
            </BodyShort>
            <BodyShort spacing>
                Undersøkelsen er anonym, frivillig og uavhengig av NAV. Verken NAV eller fastlegen din får vite at du
                har svart. Når du trykker på lenken under blir du videresendt til undersøkelsen.
            </BodyShort>
            <Link href="https://redcap.helsenord.no/redcap/surveys/?s=K9NYC3WP4E7EY4YY" target="_blank">
                <ExternalLinkIcon />
                Klikk her for å delta (ekstern lenke).
            </Link>
        </Box>
    )
}

export default EHelseforsikring
