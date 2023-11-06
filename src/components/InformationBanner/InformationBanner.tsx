import { ReactElement } from 'react'
import { BodyLong, GuidePanel, Heading, Label, Chat } from '@navikt/ds-react'

import { Merknad, Merknadtype } from 'queries'

import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg'

interface InformationBannerProps {
    merknader?: readonly Merknad[] | null
    papirsykmelding?: boolean | null
}

const InformationBanner = ({ merknader, papirsykmelding }: InformationBannerProps): ReactElement => {
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

    if (merknader?.some((merknad) => merknad.type === Merknadtype.UNDER_BEHANDLING)) {
        return (
            <div data-testid="merknad-banner">
                <UnderBehandlingGuidePanel isSent={false} />
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
        <div className="sm:px-8">
            <Chat
                className="p-0 sm:pr-8"
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

export function UnderBehandlingGuidePanel({ isSent }: { isSent: boolean }): ReactElement {
    return (
        <GuidePanel poster>
            <Heading level="2" size="small" className="mb-4">
                Viktig informasjon
            </Heading>
            <BodyLong className="mb-2">
                Vanligvis starter sykmeldingen fra den dagen du er hos legen. I ditt tilfelle har legen skrevet at den
                startet tidligere. NAV må derfor vurdere om det er en gyldig grunn for at sykmeldingen din starter før
                du var i kontakt med legen.
            </BodyLong>
            {!isSent && (
                <>
                    <BodyLong className="mb-2">Du kan fortsatt sende inn sykmeldingen som vanlig.</BodyLong>
                    <hr className="my-4 opacity-50" />
                    <BodyLong>
                        Under sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om?
                        Du velger selv om du vil bruke sykmeldingen.
                    </BodyLong>
                </>
            )}
        </GuidePanel>
    )
}

export default InformationBanner
