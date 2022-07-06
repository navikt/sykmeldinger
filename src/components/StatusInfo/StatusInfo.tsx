import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { GuidePanel, Link } from '@navikt/ds-react';

import { Merknad, Periode, Periodetype, SykmeldingStatus } from '../../fetching/graphql.generated';
import Spacing from '../Spacing/Spacing';
import VeilederMaleSvg from '../Veileder/svg/VeilederMaleSvg';
import { Merknadtype } from '../InformationBanner/InformationBanner';
import { getPublicEnv } from '../../utils/env';

import styles from './StatusInfo.module.css';

const publicEnv = getPublicEnv();

interface StatusInfoProps {
    sykmeldingStatus: SykmeldingStatus;
    sykmeldingsperioder: readonly Periode[];
    sykmeldingMerknader: readonly Merknad[];
}

function StatusInfo({
    sykmeldingStatus,
    sykmeldingsperioder,
    sykmeldingMerknader,
}: StatusInfoProps): JSX.Element | null {
    const erAvventende = sykmeldingsperioder.some((p) => p.type === Periodetype.Avventende);

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
                <GuidePanel poster>
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
                </GuidePanel>
            </div>
        );
    }

    if (erUnderBehandlingTilbakedatert) {
        return (
            <div data-testid="status-info" className={styles.root}>
                <GuidePanel poster>
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
                </GuidePanel>
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
                        <Link href={publicEnv.SYKEPENGESOKNAD_URL || '#'}>dine søknader</Link>.
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
}

export default StatusInfo;
