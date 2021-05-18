import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Periode from '../../../../models/Sykmelding/Periode';
import SykmeldingStatus from '../../../../models/Sykmelding/SykmeldingStatus';
import Spacing from '../../../commonComponents/Spacing/Spacing';
import VeilederMaleSvg from '../../../commonComponents/Veileder/svg/VeilederMaleSvg';

interface StatusInfoProps {
    sykmeldingStatus: SykmeldingStatus;
    sykmeldingsperioder: Periode[];
}

const StatusInfo: React.FC<StatusInfoProps> = ({ sykmeldingStatus, sykmeldingsperioder }) => {
    const erAvventende = sykmeldingsperioder.some((p) => p.type === 'AVVENTENDE');

    const erGradertReisetilskudd = sykmeldingsperioder.some((p) => p.gradert?.reisetilskudd);
    const erReisetilskuddKombinert =
        sykmeldingsperioder.some((p) => p.reisetilskudd === true) &&
        sykmeldingsperioder.some((p) => p.reisetilskudd === false);
    const maSokePapir = erGradertReisetilskudd || erReisetilskuddKombinert;

    const arbeidssituasjonSporsmal = sykmeldingStatus.sporsmalOgSvarListe.find(
        (sporsmal) => sporsmal.shortName === 'ARBEIDSSITUASJON',
    );
    const erArbeidstaker = arbeidssituasjonSporsmal?.svar.svar === 'ARBEIDSTAKER';
    const erFlEllerSn =
        arbeidssituasjonSporsmal?.svar.svar === 'FRILANSER' ||
        arbeidssituasjonSporsmal?.svar.svar === 'SELVSTENDIG_NARINGSDRIVENDE';

    if (sykmeldingStatus.statusEvent !== 'SENDT' && sykmeldingStatus.statusEvent !== 'BEKREFTET') return null;

    if (erAvventende && sykmeldingStatus.statusEvent === 'BEKREFTET') return null;

    if (erAvventende) {
        return (
            <div data-testid="status-info">
                <Veilederpanel type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
                    <Spacing amount="small">
                        <Normaltekst>
                            Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det
                            blir lagt til rette for deg på arbeidsplassen.
                        </Normaltekst>
                    </Spacing>
                    <Spacing amount="small">
                        <Normaltekst>
                            Husk at du har mulighet til å lage en digital oppfølgingsplan sammen med arbeidsgiveren din.
                            Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for
                            det.
                        </Normaltekst>
                    </Spacing>
                    <a href="/oppfolgingsplan/oppfolgingsplaner" className="knapp">
                        Lag en oppfølgingsplan
                    </a>
                </Veilederpanel>
            </div>
        );
    }

    if (maSokePapir) {
        return (
            <div data-testid="status-info">
                <Veilederpanel type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
                    <Spacing amount="small">
                        <Element>Du må gjøre resten på papir</Element>
                    </Spacing>
                    <Spacing amount="small">
                        <Normaltekst>
                            Vi jobber med å digitalisere sykepengesøknaden for alle type sykmeldinger, men akkurat denne
                            er vi ikke helt ferdige med.
                        </Normaltekst>
                    </Spacing>
                    <Spacing amount="small">
                        <Normaltekst>
                            Skal du søke om sykepenger, fyller du ut del D av papirsykmeldingen du fikk hos legen. Hvis
                            du ikke har fått papiret, må du be legen om å få det.
                        </Normaltekst>
                    </Spacing>
                    {erArbeidstaker && (
                        <Spacing amount="small">
                            <Normaltekst>
                                Hør med arbeidsgiveren din om du skal sende del D direkte til dem eller til NAV.
                            </Normaltekst>
                        </Spacing>
                    )}
                    <Spacing amount="small">
                        <Normaltekst>
                            Adressen til NAV finner du på en <Lenke href="#">egen førsteside</Lenke> som skal skrives ut
                            og sendes sammen med papirene.
                        </Normaltekst>
                    </Spacing>
                    <Normaltekst>God bedring!</Normaltekst>
                </Veilederpanel>
            </div>
        );
    }

    return (
        <div data-testid="status-info">
            <Veilederpanel type="plakat" fargetema="info" svg={<VeilederMaleSvg />}>
                <Spacing amount="small">
                    <Normaltekst>
                        Neste steg blir å sende inn søknaden. Denne, samt informasjon om sykepenger finner du under dine
                        søknader.
                    </Normaltekst>
                </Spacing>

                {erFlEllerSn && (
                    <Spacing amount="small">
                        <Normaltekst>
                            Husk at NAV ikke dekker sykepenger de første 16 dagene av sykefraværet, med mindre du har
                            tegnet forsikring. Har du ikke forsikring, trenger du ikke levere søknad hvis sykefraværet
                            er kortere enn 17 dager.
                        </Normaltekst>
                    </Spacing>
                )}

                <Spacing amount="small">
                    <Normaltekst>God bedring!</Normaltekst>
                </Spacing>

                <a href="/sykepengesoknad" className="knapp">
                    Gå til søknader
                </a>
            </Veilederpanel>
        </div>
    );
};

export default StatusInfo;
