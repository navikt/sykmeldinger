import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import env from '../../utils/env';
import './InfoOmDigitalSykmelding.less';

const InfoOmDigitalSykmelding: React.FC = () => (
    <Ekspanderbartpanel
        className="info-om-digital-sykmelding"
        tittel={
            <div className="info-om-digital-sykmelding__title">
                <Undertittel tag="h2">Om den digitale sykmeldingen</Undertittel>
            </div>
        }
    >
        <div className="info-om-digital-sykmelding__innhold">
            <section>
                <Normaltekst className="info-omdigital-sykmelding__paragraph" style={{ marginBottom: '1rem' }}>
                    NAV får alle sykmeldinger som blir skrevet i Norge. Den som er sykmeldt, finner den på{' '}
                    <Lenke href={env.SYKEFRAVAER_ROOT || '#'}>ditt sykefravær</Lenke>, der du er logget inn nå.
                </Normaltekst>
                <Normaltekst className="info-omdigital-sykmelding__paragraph">
                    Du kan kreve at NAV sletter sykmeldingen din. Da kan du bruke{' '}
                    <Lenke href="https://nav.no/skrivtiloss">nav.no/skrivtiloss</Lenke> eller ringe 55 55 33 33.
                </Normaltekst>
            </section>

            <section>
                <Undertittel className="info-om-digital-sykmelding__subtitle" tag="h3">
                    Formålet med sykmeldingen
                </Undertittel>
                <Normaltekst>Ifølge folketrygdloven har den to formål:</Normaltekst>
                <ul>
                    <Normaltekst tag="li">
                        melde fra om sykefravær til NAV og arbeidsgiveren slik at du kan få hjelp til å komme tilbake i jobb
                    </Normaltekst>
                    <Normaltekst tag="li">legge til rette for at du kan søke om sykepenger</Normaltekst>
                </ul>
            </section>

            <section>
                <Undertittel className="info-om-digital-sykmelding__subtitle" tag="h3">
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
