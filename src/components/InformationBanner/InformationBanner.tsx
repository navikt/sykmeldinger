import { BodyLong, GuidePanel, Label } from '@navikt/ds-react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veileder from 'nav-frontend-veileder';

import { Merknad } from '../../fetching/graphql.generated';
import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg';

import styles from './InformationBanner.module.css';
import Bubble from './Bubble';

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
                        <Undertittel className={styles.title} tag="h2">
                            Tilbakedateringen kan ikke godkjennes
                        </Undertittel>
                        <Normaltekst className={styles.paragraph}>
                            Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan
                            datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om
                            det er en gyldig grunn for tilbakedateringen.
                        </Normaltekst>
                        <Normaltekst className={styles.paragraph}>
                            Sykmeldingen din startet før du oppsøkte behandleren, og vi kan ikke godkjenne grunnen.
                            Derfor vil du ikke få sykepenger for disse dagene.
                        </Normaltekst>
                    </div>
                    <Undertittel tag="h2" className={styles.title}>
                        Hva gjør jeg nå?
                    </Undertittel>
                    <Normaltekst>
                        Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger.
                        Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de
                        tilbakedaterte dagene, og du får samtidig mulighet til å klage.
                    </Normaltekst>
                </GuidePanel>
            </div>
        );
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER)) {
        return (
            <div data-testid="merknad-banner">
                <GuidePanel poster>
                    <Undertittel tag="h2" className={styles.title}>
                        Behov for mer opplysninger
                    </Undertittel>
                    <Normaltekst className={styles.paragraph}>
                        Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi innhenter
                        opplysninger om hvorfor sykmeldingen er datert tilbake.
                    </Normaltekst>
                    <Normaltekst>Du kan likevel sende inn søknaden om sykepenger.</Normaltekst>
                </GuidePanel>
            </div>
        );
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING)) {
        return (
            <div data-testid="merknad-banner">
                <GuidePanel poster>
                    <Undertittel tag="h2" className={styles.title}>
                        Viktig informasjon
                    </Undertittel>
                    <Normaltekst className={styles.paragraph}>
                        Vanligvis starter sykmeldingen fra den dagen du er hos legen. I ditt tilfelle har legen skrevet
                        at den startet tidligere. NAV må derfor vurdere om det er en gyldig grunn for at sykmeldingen
                        din starter før du var i kontakt med legen.
                    </Normaltekst>
                    <Normaltekst className={styles.paragraph}>
                        Du kan fortsatt sende inn sykmeldingen som vanlig.
                    </Normaltekst>
                    <hr className={styles.merknadBannerRuler} />
                    <Normaltekst>
                        Under sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om?
                        Du velger selv om du vil bruke sykmeldingen.
                    </Normaltekst>
                </GuidePanel>
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
            <Veileder storrelse="S" fargetema="info">
                <VeilederMaleSvg />
            </Veileder>
            <div className={styles.mottattSykmeldingTekst}>
                <Bubble>
                    <Label>Vi har mottatt sykmeldingen din</Label>
                    <BodyLong>
                        Under ser du opplysningene vi har fått fra behandleren din. Stemmer dette med det dere ble enige
                        om?
                    </BodyLong>
                    <BodyLong>Når du er ferdig sender du sykmeldingen, nederst på siden.</BodyLong>
                </Bubble>
            </div>
        </div>
    );
};

export default InformationBanner;
