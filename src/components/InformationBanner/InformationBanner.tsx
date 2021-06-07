import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Merknad from '../../models/Sykmelding/Merknad';
import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg';
import './InformationBanner.less';

export enum Merknadtype {
    UGYLDIG_TILBAKEDATERING = 'UGYLDIG_TILBAKEDATERING',
    TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER = 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
}

interface InformationBannerProps {
    merknader?: Merknad[];
    papirsykmelding?: boolean;
}

const InformationBanner: React.FC<InformationBannerProps> = ({ merknader, papirsykmelding }) => {
    if (merknader?.some((merknad) => merknad.type === Merknadtype.UGYLDIG_TILBAKEDATERING)) {
        return (
            <div data-testid="merknad-banner">
                <Veilederpanel kompakt type="plakat" svg={<VeilederMaleSvg />}>
                    <div className="merknad-banner__section">
                        <Undertittel className="merknad-banner__title" tag="h2">
                            Tilbakedateringen kan ikke godkjennes
                        </Undertittel>
                        <Normaltekst className="merknad-banner__paragraph">
                            Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan
                            datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om
                            det er en gyldig grunn for tilbakedateringen.
                        </Normaltekst>
                        <Normaltekst className="merknad-banner__paragraph">
                            Sykmeldingen din startet før du oppsøkte behandleren, og vi kan ikke godkjenne grunnen.
                            Derfor vil du ikke få sykepenger for disse dagene.
                        </Normaltekst>
                    </div>
                    <Undertittel tag="h2" className="merknad-banner__title">
                        Hva gjør jeg nå?
                    </Undertittel>
                    <Normaltekst>
                        Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger.
                        Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de
                        tilbakedaterte dagene, og du får samtidig mulighet til å klage.
                    </Normaltekst>
                </Veilederpanel>
            </div>
        );
    }

    if (merknader?.some((merknad) => merknad.type === Merknadtype.TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER)) {
        return (
            <div data-testid="merknad-banner">
                <Veilederpanel kompakt type="plakat" svg={<VeilederMaleSvg />}>
                    <Undertittel tag="h2" className="merknad-banner__title">
                        Behov for mer opplysninger
                    </Undertittel>
                    <Normaltekst className="merknad-banner__paragraph">
                        Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi kontakter nå
                        behandleren din for å få opplysninger om hvorfor sykmeldingen er datert tilbake.
                    </Normaltekst>
                    <Normaltekst>Du kan likevel sende inn søknaden om sykepenger.</Normaltekst>
                </Veilederpanel>
            </div>
        );
    }

    if (papirsykmelding === true) {
        return (
            <div data-testid="papir-banner">
                <Veilederpanel kompakt type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
                    <Element>Før du bruker sykmeldingen</Element>
                    <Normaltekst>
                        Du har allerede fått sykmeldingen på papir av den som sykmeldte deg. Nå har vi skannet den slik
                        at du kan gjøre resten digitalt.
                    </Normaltekst>
                </Veilederpanel>
            </div>
        );
    }

    return (
        <Veilederpanel kompakt type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
            Hei, her sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige om? Du
            velger selv om du vil bruke sykmeldingen.
        </Veilederpanel>
    );
};

export default InformationBanner;
