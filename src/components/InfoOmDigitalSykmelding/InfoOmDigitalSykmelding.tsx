import { BodyLong, Heading, Link } from '@navikt/ds-react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { getPublicEnv } from '../../utils/env';

import styles from './InfoOmDigitalSykmelding.module.css';

const publicEnv = getPublicEnv();

const InfoOmDigitalSykmelding = (): JSX.Element => (
    <Ekspanderbartpanel
        className={styles.infoOmDigitalSykmelding}
        tittel={
            <div className={styles.infoOmDigitalSykmeldingTitle}>
                <Heading size="medium" level="2">
                    Om den digitale sykmeldingen
                </Heading>
            </div>
        }
    >
        <div className={styles.infoOmDigitalSykmeldingInnhold}>
            <section>
                <BodyLong className={styles.infoOmDigitalSykmeldingParagraph}>
                    NAV får alle sykmeldinger som blir skrevet i Norge. Den som er sykmeldt, finner den på{' '}
                    <Link href={publicEnv.SYKEFRAVAER_ROOT || '#'}>ditt sykefravær</Link>, der du er logget inn nå.
                </BodyLong>
                <BodyLong className={styles.infoOmDigitalSykmeldingParagraph}>
                    Du kan kreve at NAV sletter sykmeldingen din. Da kan du bruke{' '}
                    <Link href="https://nav.no/skrivtiloss">nav.no/skrivtiloss</Link> eller ringe 55 55 33 33.
                </BodyLong>
            </section>

            <section>
                <Heading size="small" level="3" className={styles.infoOmDigitalSykmeldingSubtitle}>
                    Formålet med sykmeldingen
                </Heading>
                <BodyLong>Ifølge folketrygdloven har den to formål:</BodyLong>
                <ul>
                    <BodyLong as="li">
                        melde fra om sykefravær til NAV og arbeidsgiveren slik at du kan få hjelp til å komme tilbake i
                        jobb
                    </BodyLong>
                    <BodyLong as="li">legge til rette for at du kan søke om sykepenger</BodyLong>
                </ul>
            </section>

            <section>
                <Heading size="small" level="3" className={styles.infoOmDigitalSykmeldingSubtitle}>
                    Må jeg bruke den digitale sykmeldingen?
                </Heading>
                <BodyLong>
                    Du kan be om å få sykmeldingen på papir hvis du ikke ønsker å bruke denne digitale løsningen.
                    Papirsykmeldingen inneholder de samme opplysningene som den digitale sykmeldingen.
                </BodyLong>
            </section>
        </div>
    </Ekspanderbartpanel>
);

export default InfoOmDigitalSykmelding;
