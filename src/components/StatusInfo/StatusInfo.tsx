import { ReactElement } from 'react'
import { BodyShort, GuidePanel, Link, Heading } from '@navikt/ds-react'

import { Merknad, Merknadtype, Periode, Periodetype, SykmeldingStatusFragment } from 'queries'

import { logAmplitudeEvent } from '../../amplitude/amplitude'
import { browserEnv } from '../../utils/env'

interface StatusInfoProps {
    sykmeldingStatus: SykmeldingStatusFragment
    sykmeldingsperioder: readonly Periode[]
    sykmeldingMerknader: readonly Merknad[]
}

function StatusInfo({
    sykmeldingStatus,
    sykmeldingsperioder,
    sykmeldingMerknader,
}: StatusInfoProps): ReactElement | null {
    const erAvventende = sykmeldingsperioder.some((p) => p.type === Periodetype.AVVENTENDE)

    const erUnderBehandlingTilbakedatert = sykmeldingMerknader.some((it) => it.type === Merknadtype.UNDER_BEHANDLING)

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
            <div data-testid="status-info">
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
            <div className="my-8 rounded-medium bg-surface-subtle p-8">
                <Heading spacing size="small" level="3">
                    Skal du reise utenfor EU/EØS når du er sykmeldt?
                </Heading>
                <BodyShort>
                    Hvis du skal reise utenfor EU/EØS når du er sykmeldt, kan du miste retten til sykepenger. Du kan
                    søke NAV om å beholde sykepengene dine mens du er på reise. Du bør sende søknaden på forhånd, og jo
                    tidligere du søker, jo bedre. Les mer om reise utenfor EU/EØS og send søknad på{' '}
                    <Link
                        href={`${browserEnv.NEXT_PUBLIC_SYKEPENGESOKNAD_URL}/sykepengesoknad-utland`}
                        target="_bland"
                        onClick={() =>
                            logAmplitudeEvent({
                                eventName: 'navigere',
                                data: {
                                    destinasjon: 'opphold i utland info',
                                    lenketekst: 'Sykepenger sok opphold utland',
                                },
                            })
                        }
                    >
                        nav.no/syk/sykepengesoknad/sykepengesoknad-utland
                    </Link>
                    .
                </BodyShort>
            </div>
        </div>
    )
}

export default StatusInfo
