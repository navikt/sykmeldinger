import { BodyShort, GuidePanel, Link } from '@navikt/ds-react'

import {
    ArbeidssituasjonType,
    Merknad,
    Periode,
    Periodetype,
    SvarUnion_ArbeidssituasjonSvar_Fragment,
    SykmeldingStatusFragment,
} from '../../fetching/graphql.generated'
import { Merknadtype } from '../InformationBanner/InformationBanner'

import styles from './StatusInfo.module.css'

interface StatusInfoProps {
    sykmeldingStatus: SykmeldingStatusFragment
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

    const arbeidssituasjonSporsmal = sykmeldingStatus.sporsmalOgSvarListe
        .flatMap((it) => it.svar)
        .find((svar): svar is SvarUnion_ArbeidssituasjonSvar_Fragment => svar.__typename === 'ArbeidssituasjonSvar')

    const erFlEllerSn =
        arbeidssituasjonSporsmal?.arbeidsituasjon === ArbeidssituasjonType.FRILANSER ||
        arbeidssituasjonSporsmal?.arbeidsituasjon === ArbeidssituasjonType.NAERINGSDRIVENDE

    if (sykmeldingStatus.statusEvent !== 'SENDT' && sykmeldingStatus.statusEvent !== 'BEKREFTET') return null

    if (erAvventende && sykmeldingStatus.statusEvent === 'BEKREFTET') return null

    if (erAvventende) {
        return (
            <div data-testid="status-info">
                <GuidePanel poster>
                    <div className="mb-4">
                        <BodyShort>
                            Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det
                            blir lagt til rette for deg på arbeidsplassen.
                        </BodyShort>
                    </div>
                    <div className="mb-4">
                        <BodyShort>
                            Husk at du har mulighet til å lage en digital oppfølgingsplan sammen med arbeidsgiveren din.
                            Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for
                            det.
                        </BodyShort>
                    </div>
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
                    <div className="mb-4">
                        <BodyShort>Vanligvis fyller du ut en søknad om sykepenger når sykmeldingen er over.</BodyShort>
                    </div>
                    <div className="mb-4">
                        <BodyShort>
                            Siden legen har skrevet at sykmeldingen startet før dere hadde kontakt, må NAV først vurdere
                            om det var en gyldig grunn til dette.
                        </BodyShort>
                    </div>
                    <div className="mb-4">
                        <BodyShort>
                            Du får en melding fra oss når vurderingen er ferdig og søknaden er klar til utfylling.
                        </BodyShort>
                    </div>
                </GuidePanel>
            </div>
        )
    }

    return (
        <div data-testid="status-info">
            <GuidePanel poster>
                <div className="mb-4">
                    <BodyShort>
                        Når sykefraværet er over, får du en melding fra oss igjen. Da svarer du på noen spørsmål slik at
                        vi kan beregne sykepengene dine riktig.
                    </BodyShort>
                </div>
                <div className="mb-4">
                    <BodyShort>
                        Hvis du vurderer å reise utenfor EØS mens du er sykmeldt, må du{' '}
                        <Link href="https://www.nav.no/syk/sykepengesoknad/sykepengesoknad-utland" target="_blank">
                            søke om å beholde sykepengene
                        </Link>{' '}
                        før du reiser.
                    </BodyShort>
                </div>

                {erFlEllerSn && (
                    <div className="mb-4">
                        <BodyShort>
                            Husk at NAV ikke dekker sykepenger de første 16 dagene av sykefraværet, med mindre du har
                            tegnet forsikring. Har du ikke forsikring, trenger du ikke levere søknad hvis sykefraværet
                            er kortere enn 17 dager.
                        </BodyShort>
                    </div>
                )}

                <div className="mb-4">
                    <BodyShort>God bedring!</BodyShort>
                </div>
            </GuidePanel>
        </div>
    )
}

export default StatusInfo
