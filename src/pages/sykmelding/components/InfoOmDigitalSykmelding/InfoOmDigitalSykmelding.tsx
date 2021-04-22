import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './InfoOmDigitalSykmelding.less';

const InfoSvg: React.FC = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 0C6.72783 0 0 6.72783 0 15C0 23.2722 6.72783 30 15 30C23.2709 30 30 23.2722 30 15C30 6.72783 23.2709 0 15 0Z"
            fill="#5690A2"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.9563 8.20652C16.9563 7.12652 16.0778 6.25 14.9998 6.25C13.9178 6.25 13.0433 7.12652 13.0433 8.20652C13.0433 9.28848 13.9178 10.163 14.9998 10.163C16.0778 10.163 16.9563 9.28848 16.9563 8.20652ZM20.0236 22.5006C20.0236 21.8004 19.424 21.2615 18.7193 21.2615H16.3468V13.7538C16.3468 13.0536 15.7471 12.5146 15.0424 12.5146H12.5058C11.8 12.5146 11.2014 13.0534 11.2014 13.7538C11.2014 14.4542 11.8 14.9929 12.5058 14.9929H13.7381V21.2615H11.7389C11.0332 21.2615 10.4346 21.8002 10.4346 22.5006C10.4346 23.201 11.0332 23.7397 11.7389 23.7397H18.7193C19.424 23.7397 20.0236 23.2008 20.0236 22.5006Z"
            fill="white"
        />
    </svg>
);

const InfoOmDigitalSykmelding: React.FC = () => (
    <Ekspanderbartpanel
        className="info-om-digital-sykmelding"
        tittel={
            <div className="info-om-digital-sykmelding__title">
                <InfoSvg />
                <Undertittel tag="h2">Om den digitale sykmeldingen</Undertittel>
            </div>
        }
    >
        <section>
            <Normaltekst>
                NAV får alle sykmeldinger som blir skrevet i Norge. Den som er sykmeldt, finner den på{' '}
                <Lenke href="nav.no/dittsykefravaer">nav.no/dittsykefravær</Lenke>, der du er logget inn nå.
            </Normaltekst>
        </section>
        <section>
            <Normaltekst>
                Du kan kreve at NAV sletter sykmeldingen din. Da kan du bruke{' '}
                <Lenke href="nav.no/skrivtiloss">nav.no/skrivtiloss</Lenke> eller ringe 55 55 33 33.
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
    </Ekspanderbartpanel>
);

export default InfoOmDigitalSykmelding;
