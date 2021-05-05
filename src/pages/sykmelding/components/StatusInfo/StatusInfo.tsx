import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { StatusEvent } from '../../../../models/Sykmelding/SykmeldingStatus';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';

interface StatusInfoProps {
    avventende?: boolean;
    statusEvent: keyof typeof StatusEvent;
}

const StatusInfo: React.FC<StatusInfoProps> = ({ avventende, statusEvent }) => {
    if (statusEvent !== 'SENDT' && statusEvent !== 'BEKREFTET') return null;

    if (avventende && statusEvent === 'BEKREFTET') return null;

    if (avventende) {
        return (
            <Veilederpanel type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
                <Spacing amount="small">
                    <Normaltekst>
                        Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det blir
                        lagt til rette for deg på arbeidsplassen.
                    </Normaltekst>
                </Spacing>
                <Spacing amount="small">
                    <Normaltekst>
                        Husk at du har mulighet til å lage en digital oppfølgingsplan sammen med arbeidsgiveren din.
                        Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for det.
                    </Normaltekst>
                </Spacing>
                <a href="/oppfolgingsplan/oppfolgingsplaner" className="knapp">
                    Gå til oppfølgingsplaner
                </a>
            </Veilederpanel>
        );
    }

    return (
        <Veilederpanel type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
            {statusEvent === 'SENDT' && (
                <>
                    <Spacing amount="small">
                        <Normaltekst>
                            Når dagene i denne sykmeldingen er over, sender du søknaden om sykepenger. Du får en melding
                            fra oss når den er klar til å fylles ut.
                        </Normaltekst>
                    </Spacing>
                    <Spacing amount="small">
                        <Normaltekst>
                            NAV dekker ikke sykepenger de første 16 dagene av sykefraværet, med mindre du har tegnet
                            forsikring. Har du ikke forsikring, trenger du ikke levere søknad hvis sykefraværet er
                            kortere enn 16 dager.
                        </Normaltekst>
                    </Spacing>
                </>
            )}

            {statusEvent === 'BEKREFTET' && (
                <>
                    <Spacing amount="small">
                        <Normaltekst>
                            Neste steg blir å sende inn søknaden om sykepenger. Denne, samt informasjon om søknaden og
                            sykepenger finner du under søknader.
                        </Normaltekst>
                    </Spacing>
                </>
            )}

            <Spacing amount="small">
                <Normaltekst>God bedring!</Normaltekst>
            </Spacing>
            <Spacing>
                <a href="/sykepengesoknad" className="knapp">
                    Gå til søknader
                </a>
            </Spacing>
            <Element>Skal du ut og reise?</Element>
            <Lenke href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykepenger/sykepenger-ved-utenlandsopphold">
                Les om hva du må gjøre for å beholde sykepengene.
            </Lenke>
        </Veilederpanel>
    );
};

export default StatusInfo;
