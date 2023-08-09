import { BodyShort, GuidePanel, Link, Heading } from '@navikt/ds-react'

import {
    ShortName,
    SvarUnion_JaNeiSvar_Fragment,
    ArbeidssituasjonType,
    YesOrNo,
    Merknad,
    Merknadtype,
    Periode,
    Periodetype,
    SvarUnion_ArbeidssituasjonSvar_Fragment,
    SykmeldingStatusFragment,
} from '../../fetching/graphql.generated'

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

    const erUnderBehandlingTilbakedatert = sykmeldingMerknader.some((it) => it.type === Merknadtype.UNDER_BEHANDLING)

    const arbeidssituasjonSporsmal = sykmeldingStatus.sporsmalOgSvarListe
        .flatMap((it) => it.svar)
        .find((svar): svar is SvarUnion_ArbeidssituasjonSvar_Fragment => svar.__typename === 'ArbeidssituasjonSvar')

    const harForsikringSporsmal = sykmeldingStatus.sporsmalOgSvarListe
        .filter((spmOgSvar) => spmOgSvar.shortName === ShortName.FORSIKRING)
        .flatMap((it) => it.svar)
        .find((svar): svar is SvarUnion_JaNeiSvar_Fragment => svar.__typename === 'JaNeiSvar')

    const erFlEllerSnHarForsikring =
        (arbeidssituasjonSporsmal?.arbeidsituasjon === ArbeidssituasjonType.FRILANSER ||
            arbeidssituasjonSporsmal?.arbeidsituasjon === ArbeidssituasjonType.NAERINGSDRIVENDE) &&
        harForsikringSporsmal?.jaNei === YesOrNo.NO

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
            <GuidePanel poster className="mb-8">
                <div className="mb-4">
                    <BodyShort>
                        Takk, da har vi fått det vi trenger. Du får en melding fra oss hvis vi trenger noe mer fra deg.
                    </BodyShort>
                </div>

                <div>
                    <BodyShort>God bedring!</BodyShort>
                </div>
            </GuidePanel>

            <div className="my-8 rounded-medium bg-surface-subtle p-8">
                <Heading spacing size="small" level="3">
                    Greit å vite
                </Heading>

                {erFlEllerSnHarForsikring && (
                    <BodyShort className="mb-4">
                        NAV dekker ikke de{' '}
                        <Link href="https://www.nav.no/sykepenger#hvem-kan-fa" target="_blank">
                            første 16 dagene
                        </Link>{' '}
                        av sykefraværet, med mindre du har tegnet{' '}
                        <Link href="https://www.nav.no/forsikring-selvstendig-naringsdrivende" target="_blank">
                            forsikring
                        </Link>
                        .
                    </BodyShort>
                )}

                <BodyShort>
                    Hvis du vurderer å reise utenfor EØS mens du er sykmeldt, må du{' '}
                    <Link href="https://www.nav.no/syk/sykepengesoknad/sykepengesoknad-utland" target="_blank">
                        søke om å beholde
                    </Link>{' '}
                    sykepengene før du reiser.
                </BodyShort>
            </div>
        </div>
    )
}

export default StatusInfo
