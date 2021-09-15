import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Periode from '../../models/Sykmelding/Periode';
import SykmeldingStatus from '../../models/Sykmelding/SykmeldingStatus';
import Spacing from '../Spacing/Spacing';
import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg';
import Merknad from '../../models/Sykmelding/Merknad';
import { Merknadtype } from '../InformationBanner/InformationBanner';

import styles from './StatusInfo.module.css';

interface StatusInfoProps {
    sykmeldingStatus: SykmeldingStatus;
    sykmeldingsperioder: Periode[];
    sykmeldingMerknader: Merknad[];
}

const StatusInfo: React.FC<StatusInfoProps> = ({ sykmeldingStatus, sykmeldingsperioder, sykmeldingMerknader }) => {
    const erAvventende = sykmeldingsperioder.some((p) => p.type === 'AVVENTENDE');

    const erGradertReisetilskudd = sykmeldingsperioder.some((p) => p.gradert?.reisetilskudd);
    const erReisetilskuddKombinert =
        sykmeldingsperioder.some((p) => p.reisetilskudd === true) &&
        sykmeldingsperioder.some((p) => p.reisetilskudd === false);
    const maSokePapir = erGradertReisetilskudd || erReisetilskuddKombinert;

    const erUnderBehandlingTilbakedatert = sykmeldingMerknader.some(
        (it) => it.type === Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING,
    );

    const arbeidssituasjonSporsmal = sykmeldingStatus.sporsmalOgSvarListe.find(
        (sporsmal) => sporsmal.shortName === 'ARBEIDSSITUASJON',
    );
    const erArbeidstaker = arbeidssituasjonSporsmal?.svar.svar === 'ARBEIDSTAKER';
    const erFlEllerSn =
        arbeidssituasjonSporsmal?.svar.svar === 'FRILANSER' ||
        arbeidssituasjonSporsmal?.svar.svar === 'NAERINGSDRIVENDE';

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
                            Adressen til NAV finner du på en{' '}
                            <Lenke href="https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2008-07.04D/brev">
                                egen førsteside
                            </Lenke>{' '}
                            som skal skrives ut og sendes sammen med papirene.
                        </Normaltekst>
                    </Spacing>
                    <Normaltekst>God bedring!</Normaltekst>
                </Veilederpanel>
            </div>
        );
    }

    if (erUnderBehandlingTilbakedatert) {
        return (
            <div data-testid="status-info" className={styles.root}>
                <Veilederpanel type="plakat" fargetema="advarsel" svg={<VeilederMaleSvg />}>
                    <Spacing amount="small">
                        <Normaltekst>
                            Vanligvis fyller du ut en søknad om sykepenger når sykmeldingen er over.
                        </Normaltekst>
                    </Spacing>
                    <Spacing amount="small">
                        <Normaltekst>
                            Siden legen har skrevet at sykmeldingen startet før dere hadde kontakt, må NAV først vurdere
                            om det var en gyldig grunn til dette.
                        </Normaltekst>
                    </Spacing>
                    <Spacing amount="small">
                        <Normaltekst>
                            Du får en melding fra oss når vurderingen er ferdig og søknaden er klar til utfylling.
                        </Normaltekst>
                    </Spacing>
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

                <a href={window._env_?.SYKEPENGESOKNAD_URL || '#'} className="knapp">
                    Gå til søknader
                </a>
            </Veilederpanel>
        </div>
    );
};

export default StatusInfo;
