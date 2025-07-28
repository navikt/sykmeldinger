import { ReactElement } from 'react'
import { Accordion, BodyLong, BodyShort, Heading, Link, LinkPanel } from '@navikt/ds-react'

import { bundledEnv } from '../../utils/env'

export const InfoOmDigitalSykmelding = (): ReactElement => (
    <Accordion.Item>
        <Accordion.Header>Om den digitale sykmeldingen</Accordion.Header>
        <Accordion.Content>
            <section>
                <BodyLong spacing>
                    NAV får alle sykmeldinger som blir skrevet i Norge. Den som er sykmeldt, finner den på{' '}
                    <Link href={bundledEnv.NEXT_PUBLIC_SYKEFRAVAER_ROOT || '#'}>Ditt sykefravær</Link>, der du er logget
                    inn nå.
                </BodyLong>
                <BodyLong spacing>
                    Du kan kreve at NAV sletter sykmeldingen din. Da kan du bruke{' '}
                    <Link href="https://nav.no/skrivtiloss">nav.no/skrivtiloss</Link> eller ringe 55 55 33 33.
                </BodyLong>
            </section>

            <section>
                <Heading size="small" level="3" spacing>
                    Formålet med sykmeldingen
                </Heading>
                <BodyLong>Ifølge folketrygdloven har den to formål:</BodyLong>
                <ul>
                    <BodyLong as="li">
                        - Melde fra om sykefravær til NAV og arbeidsgiveren slik at du kan få hjelp til å komme tilbake
                        i jobb.
                    </BodyLong>
                    <BodyLong as="li" spacing>
                        - Legge til rette for at du kan søke om sykepenger.
                    </BodyLong>
                </ul>
            </section>
            <section>
                <Heading size="small" level="3" spacing>
                    Må jeg bruke den digitale sykmeldingen?
                </Heading>
                <BodyLong>
                    Du kan be om å få sykmeldingen på papir hvis du ikke ønsker å bruke denne digitale løsningen.
                    Papirsykmeldingen inneholder de samme opplysningene som den digitale sykmeldingen.
                </BodyLong>
            </section>
        </Accordion.Content>
    </Accordion.Item>
)

export function SerIkkeSykmelding(): ReactElement {
    return (
        <Accordion.Item>
            <Accordion.Header>Ser du ikke sykmeldingen din her?</Accordion.Header>
            <Accordion.Content>
                <LinkPanel
                    href="https://nav.no/dokumentarkiv/tema/SYM"
                    target="_blank"
                    border
                    className="mb-8 mt-4 rounded-lg"
                >
                    <LinkPanel.Title className="text-heading-xsmall">Sjekk dokumentlisten</LinkPanel.Title>
                </LinkPanel>

                <div className="mb-4">
                    <BodyShort>
                        Det kan også bety at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du{' '}
                        <Link
                            href="https://www.helsedirektoratet.no/veiledere/sykmelderveileder/sykmelding-og-erklaeringer"
                            target="_blank"
                        >
                            papirsykmeldingen
                        </Link>{' '}
                        i stedet.
                    </BodyShort>
                </div>

                <div className="mb-4">
                    <BodyShort>
                        <Link href="https://www.nav.no/kontaktoss" target="_blank">
                            Kontakt oss
                        </Link>{' '}
                        om du fortsatt ikke finner det du leter etter.
                    </BodyShort>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    )
}
