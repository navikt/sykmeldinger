import { ReactElement } from 'react'
import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'

import { Merknad, Merknadtype } from 'queries'

interface InfoBannerSendtProps {
    merknader: readonly Merknad[]
}

const InformationBannerSendt = ({ merknader }: InfoBannerSendtProps): ReactElement | null => {
    if (merknader.find((merknad: Merknad) => merknad.type === Merknadtype.DELVIS_GODKJENT)) {
        return (
            <div className="mb-8" data-testid="merknad-banner">
                <GuidePanel poster>
                    <div className="mb-6">
                        <Heading className="mb-4" level="2" size="small">
                            Sykmeldingen din er delvis godkjent
                        </Heading>
                        <BodyLong className="mb-2">
                            Sykmeldingen din starter før du oppsøkte lege. Perioden før du oppsøkte lege er
                            tilbakedatert, og det er ikke oppgitt noen gyldig grunn til dette. Du vil derfor ikke få
                            sykepenger for denne perioden. Sykmeldingen er godkjent fra tidspunktet du oppsøkte lege.
                        </BodyLong>
                    </div>
                    <Heading level="2" size="small" className="mb-4">
                        Hva gjør jeg nå?
                    </Heading>
                    <BodyLong>
                        Dersom du har sendt inn søknaden om sykepenger, vil vi vurdere om du har rett til sykepenger for
                        den delen av sykmeldingen som er godkjent. Du vil da få et skriftlig vedtak med nærmere
                        begrunnelse og informasjon om klagemuligheter.
                    </BodyLong>
                </GuidePanel>
            </div>
        )
    }

    if (merknader.find((merknad: Merknad) => merknad.type === Merknadtype.UGYLDIG_TILBAKEDATERING)) {
        return (
            <div className="mb-8" data-testid="merknad-banner">
                <GuidePanel poster>
                    <div className="mb-6">
                        <Heading className="mb-4" level="2" size="small">
                            Tilbakedateringen kan ikke godkjennes
                        </Heading>
                        <BodyLong className="mb-2">
                            Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan
                            datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om
                            det er en gyldig grunn for tilbakedateringen.
                        </BodyLong>
                        <BodyLong className="mb-2">
                            Sykmeldingen din startet før du oppsøkte behandleren, og vi kan ikke godkjenne grunnen.
                            Derfor vil du ikke få sykepenger for disse dagene.
                        </BodyLong>
                    </div>
                    <Heading level="2" size="small" className="mb-4">
                        Hva gjør jeg nå?
                    </Heading>
                    <BodyLong>
                        Når søknaden om sykepenger er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få
                        sykepenger for de tilbakedaterte dagene, og du får samtidig mulighet til å klage.
                    </BodyLong>
                </GuidePanel>
            </div>
        )
    }
    return null
}

export default InformationBannerSendt
