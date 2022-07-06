import { Link } from '@navikt/ds-react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { getPublicEnv } from '../../utils/env';

import styles from './InfoOmDigitalSykmelding.module.css';

const publicEnv = getPublicEnv();

const InfoOmDigitalSykmelding = (): JSX.Element => (
    <Ekspanderbartpanel
        className={styles.infoOmDigitalSykmelding}
        tittel={
            <div className={styles.infoOmDigitalSykmeldingTitle}>
                <Undertittel tag="h2">Om den digitale sykmeldingen</Undertittel>
            </div>
        }
    >
        <div className={styles.infoOmDigitalSykmeldingInnhold}>
            <section>
                <Normaltekst className={styles.infoOmDigitalSykmeldingParagraph}>
                    NAV får alle sykmeldinger som blir skrevet i Norge. Den som er sykmeldt, finner den på{' '}
                    <Link href={publicEnv.SYKEFRAVAER_ROOT || '#'}>ditt sykefravær</Link>, der du er logget inn nå.
                </Normaltekst>
                <Normaltekst className={styles.infoOmDigitalSykmeldingParagraph}>
                    Du kan kreve at NAV sletter sykmeldingen din. Da kan du bruke{' '}
                    <Link href="https://nav.no/skrivtiloss">nav.no/skrivtiloss</Link> eller ringe 55 55 33 33.
                </Normaltekst>
            </section>

            <section>
                <Undertittel className={styles.infoOmDigitalSykmeldingSubtitle} tag="h3">
                    Formålet med sykmeldingen
                </Undertittel>
                <Normaltekst>Ifølge folketrygdloven har den to formål:</Normaltekst>
                <ul>
                    <Normaltekst tag="li">
                        melde fra om sykefravær til NAV og arbeidsgiveren slik at du kan få hjelp til å komme tilbake i
                        jobb
                    </Normaltekst>
                    <Normaltekst tag="li">legge til rette for at du kan søke om sykepenger</Normaltekst>
                </ul>
            </section>

            <section>
                <Undertittel className={styles.infoOmDigitalSykmeldingSubtitle} tag="h3">
                    Må jeg bruke den digitale sykmeldingen?
                </Undertittel>
                <Normaltekst>
                    Du kan be om å få sykmeldingen på papir hvis du ikke ønsker å bruke denne digitale løsningen.
                    Papirsykmeldingen inneholder de samme opplysningene som den digitale sykmeldingen.
                </Normaltekst>
            </section>
        </div>
    </Ekspanderbartpanel>
);

export default InfoOmDigitalSykmelding;
