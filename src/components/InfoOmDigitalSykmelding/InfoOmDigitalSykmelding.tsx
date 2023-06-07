import { ReactElement } from 'react'
import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'

import { browserEnv } from '../../utils/env'

const InfoOmDigitalSykmelding = (): ReactElement => (
    <Accordion.Item>
        <Accordion.Header>Om den digitale sykmeldingen</Accordion.Header>
        <Accordion.Content>
            <section>
                <BodyLong spacing>
                    NAV får alle sykmeldinger som blir skrevet i Norge. Den som er sykmeldt, finner den på{' '}
                    <Link href={browserEnv.NEXT_PUBLIC_SYKEFRAVAER_ROOT || '#'}>ditt sykefravær</Link>, der du er logget
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
                        melde fra om sykefravær til NAV og arbeidsgiveren slik at du kan få hjelp til å komme tilbake i
                        jobb
                    </BodyLong>
                    <BodyLong as="li" spacing>
                        legge til rette for at du kan søke om sykepenger
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

export default InfoOmDigitalSykmelding
