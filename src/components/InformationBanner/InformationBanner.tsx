import { ReactElement } from 'react'
import { BodyLong, GuidePanel, Heading, Label, Chat } from '@navikt/ds-react'

import { Merknad, Merknadtype } from 'queries'

import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg'

import ForklaringOverSyttiInfo from './ForklaringOverSyttiInfo'
import ForklaringUnder20Prosent from './ForklaringUnder20Prosent'

interface InformationBannerProps {
    merknader?: readonly Merknad[] | null
    papirsykmelding?: boolean | null
    overSyttiAar?: boolean | null
    isUnder20Percent?: number | null
}

const InformationBanner = ({
    merknader,
    papirsykmelding,
    overSyttiAar,
    isUnder20Percent,
}: InformationBannerProps): ReactElement => {
    if (overSyttiAar) {
        return <ForklaringOverSyttiInfo />
    }

    if (isUnder20Percent) {
        return <ForklaringUnder20Prosent grad={isUnder20Percent} />
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.UGYLDIG_TILBAKEDATERING)) {
        return (
            <div data-testid="merknad-banner">
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
                        Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger.
                        Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de
                        tilbakedaterte dagene, og du får samtidig mulighet til å klage.
                    </BodyLong>
                </GuidePanel>
            </div>
        )
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER)) {
        return (
            <div data-testid="merknad-banner">
                <GuidePanel poster>
                    <Heading level="2" size="small" className="mb-4">
                        Behov for mer opplysninger
                    </Heading>
                    <BodyLong className="mb-2">
                        Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi innhenter
                        opplysninger om hvorfor sykmeldingen er datert tilbake.
                    </BodyLong>
                    <BodyLong>Du kan likevel sende inn søknaden om sykepenger.</BodyLong>
                </GuidePanel>
            </div>
        )
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.DELVIS_GODKJENT)) {
        return (
            <div data-testid="merknad-banner">
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
                        Du kan sende inn sykmeldingen nederst på siden, og deretter søknad om sykepenger. Når du har
                        sendt inn søknaden, vil vi vurdere om du har rett til sykepenger for den delen av sykmeldingen
                        som er godkjent. Du vil da få et skriftlig vedtak med nærmere begrunnelse og informasjon om
                        klagemuligheter.
                    </BodyLong>
                </GuidePanel>
            </div>
        )
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.UNDER_BEHANDLING)) {
        return (
            <div data-testid="merknad-banner">
                <UnderBehandlingGuidePanel />
            </div>
        )
    }

    if (papirsykmelding === true) {
        const guidePanelLabelId = 'guide-panel-label'
        return (
            <section aria-labelledby={guidePanelLabelId} data-testid="papir-banner">
                <GuidePanel poster>
                    <Label id={guidePanelLabelId}>Før du bruker sykmeldingen</Label>
                    <BodyLong>
                        Du har allerede fått sykmeldingen på papir av den som sykmeldte deg. Nå har vi skannet den slik
                        at du kan gjøre resten digitalt.
                    </BodyLong>
                </GuidePanel>
            </section>
        )
    }

    const mottattSykmeldingId = 'mottatt-sykmelding'

    return (
        <div className="md:px-8">
            <Chat
                className="p-0 md:pr-8"
                avatar={<VeilederMaleSvg />}
                position="left"
                aria-labelledby={mottattSykmeldingId}
            >
                <Chat.Bubble>
                    <Label id={mottattSykmeldingId}>Vi har mottatt sykmeldingen din</Label>
                    <BodyLong>
                        Under ser du opplysningene vi har fått fra behandleren din. Stemmer dette med det dere ble enige
                        om?
                    </BodyLong>
                    <BodyLong>Når du er ferdig sender du sykmeldingen, nederst på siden.</BodyLong>
                </Chat.Bubble>
            </Chat>
        </div>
    )
}

export function UnderBehandlingGuidePanel(): ReactElement {
    return (
        <GuidePanel poster>
            <div className="mb-6">
                <Heading className="mb-4" level="2" size="small">
                    Viktig informasjon
                </Heading>
                <BodyLong className="mb-2">
                    Sykmeldingen din er skrevet tilbake i tid, og NAV må derfor vurdere om det er en gyldig grunn til at
                    sykmeldingen starter før du var i kontakt med legen.
                </BodyLong>
                <BodyLong className="mb-2">
                    Hvis vi må innhente flere opplysninger om hvorfor sykmeldingen din er tilbakedatert, kan det ta
                    lengre tid for oss å behandle saken din.
                </BodyLong>
            </div>
            <Heading level="2" size="small" className="mb-4">
                Hva nå?
            </Heading>
            <BodyLong className="mb-2">
                For at vi skal behandle saken din så raskt som mulig, må du bekrefte sykmeldingen og sende søknad om
                sykepenger.
            </BodyLong>
            <BodyLong>
                Søknad om sykepenger blir tilgjengelig for innsending etter at sykmeldingsperioden er over, selv om
                sykmeldingen foreløpig ikke er godkjent.
            </BodyLong>
        </GuidePanel>
    )
}

export default InformationBanner
