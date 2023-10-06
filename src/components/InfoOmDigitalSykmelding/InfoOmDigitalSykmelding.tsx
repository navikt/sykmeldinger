import { ReactElement } from 'react'
import { BodyLong, Heading, Link, LinkPanel, ExpansionCard } from '@navikt/ds-react'

import { browserEnv } from '../../utils/env'

export const InfoOmDigitalSykmelding = (): ReactElement => (
    <div className="grid gap-2 mt-20 mb-4">
        <ExpansionCard size="small" aria-label="Small-variant">
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h3" size="small">
                    Om den digitale sykmeldingen
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="py-2">
                    <BodyLong spacing>
                        NAV får alle sykmeldinger som blir skrevet i Norge. Den som er sykmeldt, finner den på{' '}
                        <Link href={browserEnv.NEXT_PUBLIC_SYKEFRAVAER_ROOT || '#'}>ditt sykefravær</Link>, der du er
                        logget inn nå.
                    </BodyLong>
                    <BodyLong spacing>
                        Du kan kreve at NAV sletter sykmeldingen din. Da kan du bruke{' '}
                        <Link href="https://nav.no/skrivtiloss">nav.no/skrivtiloss</Link> eller ringe 55 55 33 33.
                    </BodyLong>
                </div>

                <div className="pb-2">
                    <Heading size="small" level="3" spacing>
                        Formålet med sykmeldingen
                    </Heading>
                    <BodyLong>Ifølge folketrygdloven har den to formål:</BodyLong>
                </div>

                <ul className="list-disc list-inside">
                    <BodyLong as="li">
                        melde fra om sykefravær til NAV og arbeidsgiveren slik at du kan få hjelp til å komme tilbake i
                        jobb
                    </BodyLong>
                    <BodyLong as="li" spacing>
                        legge til rette for at du kan søke om sykepenger
                    </BodyLong>
                </ul>

                <div className="pb-2">
                    <Heading size="small" level="3" spacing>
                        Må jeg bruke den digitale sykmeldingen?
                    </Heading>
                    <BodyLong>
                        Du kan be om å få sykmeldingen på papir hvis du ikke ønsker å bruke denne digitale løsningen.
                        Papirsykmeldingen inneholder de samme opplysningene som den digitale sykmeldingen.
                    </BodyLong>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    </div>
)

export const SerIkkeSykmelding = (): ReactElement => (
    <div className="grid gap-6">
        <ExpansionCard size="small" aria-label="Small-variant">
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h3" size="small">
                    Ser du ikke sykmeldingen din her?
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div>
                    <LinkPanel
                        href="https://person.nav.no/mine-saker/tema/SYM"
                        target="_blank"
                        border
                        className="mb-8 mt-4 rounded-large"
                    >
                        <LinkPanel.Title className="text-heading-xsmall">Sjekk dokumentlisten</LinkPanel.Title>
                    </LinkPanel>
                </div>

                <div>
                    <BodyLong spacing>
                        Det kan også bety at den som har sykmeldt deg ikke sender den digitalt til NAV. Da bruker du{' '}
                        <Link
                            href="https://www.helsedirektoratet.no/veiledere/sykmelderveileder/sykmelding-og-erklaeringer"
                            target="_blank"
                        >
                            papirsykmeldingen
                        </Link>{' '}
                        i stedet.
                    </BodyLong>
                </div>

                <div className="pb-2">
                    <BodyLong>
                        <Link href="https://www.nav.no/kontaktoss" target="_blank">
                            Kontakt oss
                        </Link>{' '}
                        om du fortsatt ikke finner det du leter etter.
                    </BodyLong>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    </div>
)
