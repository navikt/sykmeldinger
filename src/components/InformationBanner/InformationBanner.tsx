import { BodyLong, GuidePanel, Heading, Label, SpeechBubble } from '@navikt/ds-react';

import { Merknad } from '../../fetching/graphql.generated';
import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg';

import styles from './InformationBanner.module.css';

export enum Merknadtype {
    UGYLDIG_TILBAKEDATERING = 'UGYLDIG_TILBAKEDATERING',
    TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER = 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
    TILBAKEDATERING_UNDER_BEHANDLING = 'UNDER_BEHANDLING',
}

interface InformationBannerProps {
    merknader?: readonly Merknad[] | null;
    papirsykmelding?: boolean | null;
}

const InformationBanner = ({ merknader, papirsykmelding }: InformationBannerProps): JSX.Element => {
    if (merknader?.some((merknad) => merknad.type === Merknadtype.UGYLDIG_TILBAKEDATERING)) {
        return (
            <div data-testid="merknad-banner">
                <GuidePanel poster>
                    <div className={styles.merknadBannerSection}>
                        <Heading className={styles.title} level="2" size="small">
                            Tilbakedateringen kan ikke godkjennes
                        </Heading>
                        <BodyLong className={styles.paragraph}>
                            Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan
                            datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om
                            det er en gyldig grunn for tilbakedateringen.
                        </BodyLong>
                        <BodyLong className={styles.paragraph}>
                            Sykmeldingen din startet før du oppsøkte behandleren, og vi kan ikke godkjenne grunnen.
                            Derfor vil du ikke få sykepenger for disse dagene.
                        </BodyLong>
                    </div>
                    <Heading level="2" size="small" className={styles.title}>
                        Hva gjør jeg nå?
                    </Heading>
                    <BodyLong>
                        Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger.
                        Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de
                        tilbakedaterte dagene, og du får samtidig mulighet til å klage.
                    </BodyLong>
                </GuidePanel>
            </div>
        );
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER)) {
        return (
            <div data-testid="merknad-banner">
                <GuidePanel poster>
                    <Heading level="2" size="small" className={styles.title}>
                        Behov for mer opplysninger
                    </Heading>
                    <BodyLong className={styles.paragraph}>
                        Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi innhenter
                        opplysninger om hvorfor sykmeldingen er datert tilbake.
                    </BodyLong>
                    <BodyLong>Du kan likevel sende inn søknaden om sykepenger.</BodyLong>
                </GuidePanel>
            </div>
        );
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING)) {
        return (
            <div data-testid="merknad-banner">
                <UnderBehandlingGuidePanel isSent={false} />
            </div>
        );
    }

    if (papirsykmelding === true) {
        return (
            <div data-testid="papir-banner">
                <GuidePanel poster>
                    <Label>Før du bruker sykmeldingen</Label>
                    <BodyLong>
                        Du har allerede fått sykmeldingen på papir av den som sykmeldte deg. Nå har vi skannet den slik
                        at du kan gjøre resten digitalt.
                    </BodyLong>
                </GuidePanel>
            </div>
        );
    }

    return (
        <div className={styles.veilederMottattSykmeldingen}>
            <SpeechBubble illustration={<VeilederMaleSvg />} position="left">
                <SpeechBubble.Bubble>
                    <Label>Vi har mottatt sykmeldingen din</Label>
                    <BodyLong>
                        Under ser du opplysningene vi har fått fra behandleren din. Stemmer dette med det dere ble enige
                        om?
                    </BodyLong>
                    <BodyLong>Når du er ferdig sender du sykmeldingen, nederst på siden.</BodyLong>
                </SpeechBubble.Bubble>
            </SpeechBubble>
        </div>
    );
};

export function UnderBehandlingGuidePanel({ isSent }: { isSent: boolean }): JSX.Element {
    return (
        <GuidePanel poster>
            <Heading level="2" size="small" className={styles.title}>
                Viktig informasjon
            </Heading>
            <BodyLong className={styles.paragraph}>
                Vanligvis starter sykmeldingen fra den dagen du er hos legen. I ditt tilfelle har legen skrevet at den
                startet tidligere. NAV må derfor vurdere om det er en gyldig grunn for at sykmeldingen din starter før
                du var i kontakt med legen.
            </BodyLong>
            {!isSent && (
                <>
                    <BodyLong className={styles.paragraph}>Du kan fortsatt sende inn sykmeldingen som vanlig.</BodyLong>
                    <hr className={styles.merknadBannerRuler} />
                    <BodyLong>
                        Under sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om?
                        Du velger selv om du vil bruke sykmeldingen.
                    </BodyLong>
                </>
            )}
        </GuidePanel>
    );
}

export default InformationBanner;
