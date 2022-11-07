import { BodyLong, BodyShort, GuidePanel, Heading, Panel } from '@navikt/ds-react'
import { Information } from '@navikt/ds-icons'

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
    const erAvventende = sykmeldingsperioder.some((p) => p.type === Periodetype.Avventende)

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
                        <BodyLong>
                            Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det
                            blir lagt til rette for deg på arbeidsplassen.
                        </BodyLong>
                    </Spacing>
                    <Spacing amount="small">
                        <BodyLong>
                            Husk at du har mulighet til å lage en digital oppfølgingsplan sammen med arbeidsgiveren din.
                            Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for
                            det.
                        </BodyLong>
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
                        <BodyLong>Vanligvis fyller du ut en søknad om sykepenger når sykmeldingen er over.</BodyLong>
                    </Spacing>
                    <Spacing amount="small">
                        <BodyLong>
                            Siden legen har skrevet at sykmeldingen startet før dere hadde kontakt, må NAV først vurdere
                            om det var en gyldig grunn til dette.
                        </BodyLong>
                    </Spacing>
                    <Spacing amount="small">
                        <BodyLong>
                            Du får en melding fra oss når vurderingen er ferdig og søknaden er klar til utfylling.
                        </BodyLong>
                    </Spacing>
                </GuidePanel>
            </div>
        )
    }

    return (
        <div data-testid="status-info">
            <Heading size="small" className={styles.iconHeading}>
                <Information />
                Hva skjer videre?
            </Heading>
            <Panel className={styles.panel}>
                <BodyLong spacing>
                    Nå innhenter vi opplysninger fra arbeidsgiveren din. Når eller om vi trenger noe mer fra deg får du
                    beskjed om i god tid.
                </BodyLong>
                {erFlEllerSn && (
                    <Spacing amount="small">
                        <BodyLong>
                            Husk at NAV ikke dekker sykepenger de første 16 dagene av sykefraværet, med mindre du har
                            tegnet forsikring. Har du ikke forsikring, trenger du ikke levere søknad hvis sykefraværet
                            er kortere enn 17 dager.
                        </BodyLong>
                    </Spacing>
                )}
                <BodyShort>God bedring!</BodyShort>
            </Panel>
        </div>
    )
}

export default StatusInfo
