import { BodyShort, GuidePanel, Link } from '@navikt/ds-react'

import { Merknad, Periode, Periodetype, SykmeldingStatus } from '../../fetching/graphql.generated'
import Spacing from '../Spacing/Spacing'
import { Merknadtype } from '../InformationBanner/InformationBanner'

import styles from './StatusInfo.module.css'

interface StatusInfoProps {
    sykmeldingStatus: SykmeldingStatus
    sykmeldingsperioder: readonly Periode[]
    sykmeldingMerknader: readonly Merknad[]
}

function StatusInfo({
    sykmeldingStatus,
    sykmeldingsperioder,
    sykmeldingMerknader,
}: StatusInfoProps): JSX.Element | null {
    const erAvventende = sykmeldingsperioder.some((p) => p.type === Periodetype.AVVENTENDE)

    const erUnderBehandlingTilbakedatert = sykmeldingMerknader.some(
        (it) => it.type === Merknadtype.TILBAKEDATERING_UNDER_BEHANDLING,
    )

    const arbeidssituasjonSporsmal = sykmeldingStatus.sporsmalOgSvarListe.find(
        (sporsmal) => sporsmal.shortName === 'ARBEIDSSITUASJON',
    )
    const erFlEllerSn =
        arbeidssituasjonSporsmal?.svar.svar === 'FRILANSER' ||
        arbeidssituasjonSporsmal?.svar.svar === 'NAERINGSDRIVENDE'

    if (sykmeldingStatus.statusEvent !== 'SENDT' && sykmeldingStatus.statusEvent !== 'BEKREFTET') return null

    if (erAvventende && sykmeldingStatus.statusEvent === 'BEKREFTET') return null

    if (erAvventende) {
        return (
            <div data-testid="status-info">
                <GuidePanel poster>
                    <Spacing amount="small">
                        <BodyShort>
                            Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det
                            blir lagt til rette for deg på arbeidsplassen.
                        </BodyShort>
                    </Spacing>
                    <Spacing amount="small">
                        <BodyShort>
                            Husk at du har mulighet til å lage en digital oppfølgingsplan sammen med arbeidsgiveren din.
                            Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for
                            det.
                        </BodyShort>
                    </Spacing>
                    <a href="/oppfolgingsplan/oppfolgingsplaner" className="knapp">
                        Lag en oppfølgingsplan
                    </a>
                </GuidePanel>
            </div>
        )
    }

    if (erUnderBehandlingTilbakedatert) {
        return (
            <div data-testid="status-info" className={styles.root}>
                <GuidePanel poster>
                    <Spacing amount="small">
                        <BodyShort>Vanligvis fyller du ut en søknad om sykepenger når sykmeldingen er over.</BodyShort>
                    </Spacing>
                    <Spacing amount="small">
                        <BodyShort>
                            Siden legen har skrevet at sykmeldingen startet før dere hadde kontakt, må NAV først vurdere
                            om det var en gyldig grunn til dette.
                        </BodyShort>
                    </Spacing>
                    <Spacing amount="small">
                        <BodyShort>
                            Du får en melding fra oss når vurderingen er ferdig og søknaden er klar til utfylling.
                        </BodyShort>
                    </Spacing>
                </GuidePanel>
            </div>
        )
    }

    return (
        <div data-testid="status-info">
            <GuidePanel poster>
                <Spacing amount="small">
                    <BodyShort>
                        Når sykefraværet er over, får du en melding fra oss igjen. Da svarer du på noen spørsmål slik at
                        vi kan beregne sykepengene dine riktig.
                    </BodyShort>
                </Spacing>
                <Spacing amount="small">
                    <BodyShort>
                        Hvis du vurderer å reise utenfor EØS mens du er sykmeldt, må du{' '}
                        <Link href="https://www.nav.no/syk/sykepengesoknad/sykepengesoknad-utland" target="_blank">
                            søke om å beholde sykepengene
                        </Link>{' '}
                        før du reiser.
                    </BodyShort>
                </Spacing>

                {erFlEllerSn && (
                    <Spacing amount="small">
                        <BodyShort>
                            Husk at NAV ikke dekker sykepenger de første 16 dagene av sykefraværet, med mindre du har
                            tegnet forsikring. Har du ikke forsikring, trenger du ikke levere søknad hvis sykefraværet
                            er kortere enn 17 dager.
                        </BodyShort>
                    </Spacing>
                )}

                <Spacing amount="small">
                    <BodyShort>God bedring!</BodyShort>
                </Spacing>
            </GuidePanel>
        </div>
    )
}

export default StatusInfo
