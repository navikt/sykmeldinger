import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Lenke from 'nav-frontend-lenker';
import Periode from '../../models/Sykmelding/Periode';
import SykmeldingStatus from '../../models/Sykmelding/SykmeldingStatus';
import Spacing from '../Spacing/Spacing';
import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg';
import Merknad from '../../models/Sykmelding/Merknad';
import { Merknadtype } from '../InformationBanner/InformationBanner';
import env from '../../utils/env';

import styles from './StatusInfo.module.css';

interface StatusInfoProps {
    sykmeldingStatus: SykmeldingStatus;
    sykmeldingsperioder: Periode[];
    sykmeldingMerknader: Merknad[];
}

const StatusInfo: React.FC<StatusInfoProps> = ({ sykmeldingStatus, sykmeldingsperioder, sykmeldingMerknader }) => {
    const erAvventende = sykmeldingsperioder.some((p) => p.type === 'AVVENTENDE');

    const erUnderBehandlingTilbakedatert = sykmeldingMerknader.some(
        (it) => it.type === Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING,
    );

    const arbeidssituasjonSporsmal = sykmeldingStatus.sporsmalOgSvarListe.find(
        (sporsmal) => sporsmal.shortName === 'ARBEIDSSITUASJON',
    );
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
                        Når sykefraværet er over, får du en melding fra oss igjen. Da svarer du på noen spørsmål slik at
                        vi kan beregne sykepengene dine riktig.
                    </Normaltekst>
                </Spacing>
                <Spacing amount="small">
                    <Normaltekst>
                        Du kan kikke på det allerede nå i{' '}
                        <Lenke href={env.SYKEPENGESOKNAD_URL || '#'}>dine søknader</Lenke>.
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
            </Veilederpanel>
        </div>
    );
};

export default StatusInfo;
