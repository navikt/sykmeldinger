import './Statuspanel.less';
import { StatusEvent } from '../../../../types/sykmelding';
import React from 'react';
import checkMark from './checkMark.svg';
import information from './information.svg';
import { Systemtittel, Normaltekst, Element } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import Lenke from 'nav-frontend-lenker';

export type Soknadstype =
    | 'SOK_NA'
    | 'SOK_SENERE_KORT_SYKMELDING'
    | 'SOK_SENERE_LANG_SYKMELDING'
    | 'SOK_PAPIR'
    | 'SOK_SENDT'
    | 'UTEN_SOKNAD';

// Each prop defines whether each individual section of the statuspanel should be shown
interface StatuspanelProps {
    // Green checkmark header
    sykmeldingstatus: StatusEvent;
    erEgenmeldt?: boolean;
    arbeidsgiverNavn?: string;
    sykmeldingSendtEllerBekreftetDato: Date;
    // Status information about sykeforløp
    soknadstype: Soknadstype;
    avventendeSykmelding?: boolean;
    arbeidsgiverForskutterLonn?: boolean;
    skalViseInnteksmeldingInfo?: boolean; // TOOD: When does this apply?
    skalViseReisetilskuddInfo?: boolean;
    skalViseBehandlingsdagerInfo?: boolean; // TODO: Do we need this information?
}

// TODO: Refactor
const getSoknadtypeComponent = (soknadstype: Soknadstype): JSX.Element => {
    switch (soknadstype) {
        case 'SOK_NA':
            return <div>Du må søke nå</div>;
        case 'SOK_SENERE_KORT_SYKMELDING':
            return <div>Du må søke senere</div>;
        case 'SOK_SENERE_LANG_SYKMELDING':
            return <div>Du må søke senere. du har lang sykmelding</div>;
        case 'SOK_PAPIR':
            return <div>Du må søke på papir</div>;
        case 'SOK_SENDT':
            return <div>Søknaden er sendt</div>;
        case 'UTEN_SOKNAD':
            return <div>Du trenger ikke å søke</div>;
    }
};

const getStatusHeaderComponent = (
    sykmeldingstatus: StatusEvent,
    erEgenmeldt: boolean,
    sykmeldingSendtEllerBekreftetDato: Date,
    arbeidsgiverNavn?: string,
): JSX.Element => {
    const title = (function (): string {
        switch (sykmeldingstatus) {
            case 'SENDT':
                return arbeidsgiverNavn
                    ? `Sykmeldingen er sendt til ${arbeidsgiverNavn}`
                    : 'Sykmeldingen er sendt til NAV';
            case 'BEKREFTET':
                return `${erEgenmeldt ? 'Egenmeldingen' : 'Sykmeldingen'} er sendt til NAV`;
            default:
                throw new Error('Sykmeldingen har ukjent status');
        }
    })();

    return (
        <div className="statuspanel__header">
            <img src={checkMark} alt="checkmark" />
            <div>
                <Systemtittel>{title}</Systemtittel>
                <Normaltekst>
                    Dato sendt: {dayjs(sykmeldingSendtEllerBekreftetDato).format('dddd D. MMMM, kl. HH:mm')}
                </Normaltekst>
            </div>
        </div>
    );
};

const Statuspanel = ({
    sykmeldingstatus,
    erEgenmeldt = false,
    arbeidsgiverNavn,
    sykmeldingSendtEllerBekreftetDato,
    soknadstype,
    avventendeSykmelding = false,
    arbeidsgiverForskutterLonn,
    skalViseInnteksmeldingInfo = false,
    skalViseBehandlingsdagerInfo = false,
    skalViseReisetilskuddInfo = false,
}: StatuspanelProps) => {
    const statusHeaderComponent = getStatusHeaderComponent(
        sykmeldingstatus,
        erEgenmeldt,
        sykmeldingSendtEllerBekreftetDato,
        arbeidsgiverNavn,
    );
    const soknadstypeComponent = getSoknadtypeComponent(soknadstype);

    // TODO: Maybe refactor into smaller components
    return (
        <div className="statuspanel">
            {statusHeaderComponent}
            <div className="statuspanel__content">
                <img src={information} alt="" />
                <div className="statuspanel__sections">
                    <Systemtittel>Hva skjer videre?</Systemtittel>
                    <section>{soknadstypeComponent}</section>
                    {avventendeSykmelding ? (
                        <section>
                            <Element className="statuspanel__section-title">Avventende sykmelding</Element>
                            <Normaltekst>
                                Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis
                                det blir lagt til rette for deg på arbeidsplassen. Hvis tilrettelegging ikke er mulig,
                                og du blir helt borte fra jobben, må legen erstatte den avventende sykmeldingen med en
                                ordinær sykmelding hvis arbeidsgiveren din krever det.
                            </Normaltekst>
                        </section>
                    ) : null}
                    {arbeidsgiverForskutterLonn === undefined ? null : (
                        <section>
                            <Element className="statuspanel__section-title">
                                Arbeidsgiver forskutterer {arbeidsgiverForskutterLonn ? ' ' : ' ikke '} lønn
                            </Element>
                            <Normaltekst>Her er noe informasjon om forskuttering av lønn</Normaltekst>
                        </section>
                    )}
                    {skalViseReisetilskuddInfo ? (
                        <section>
                            <Element className="statuspanel__section-title">
                                Reisetilskudd: slik søker du om å få tilbake pengene
                            </Element>
                            <Normaltekst>
                                Vi jobber med å digitalisere sykepengesøknaden for alle type sykmeldinger, men denne er
                                vi ikke helt ferdig med. Derfor blir du nødt til å fylle ut søknad om reisetilskudd til
                                arbeidsreiser, hvor du legger ved kvitteringer for transporten.
                            </Normaltekst>
                        </section>
                    ) : null}
                    {skalViseInnteksmeldingInfo ? (
                        <section>
                            <Element className="statuspanel__section-title">Før NAV kan behandle søknaden</Element>
                            <Normaltekst>
                                Arbeidsgiveren din må sende oss inntektsmelding så fort som mulig. Når sykefraværet ditt
                                er lengre enn 16 dager, skal NAV saksbehandle søknaden, og da trenger vi
                                inntektsmeldingen.
                            </Normaltekst>
                        </section>
                    ) : null}
                    {skalViseBehandlingsdagerInfo ? (
                        <section>
                            <Element className="statuspanel__section-title">Sykmelding for behandlingsdager</Element>
                            <Normaltekst>Noe informasjon om en sykmelding som er for behandlingsdager</Normaltekst>
                        </section>
                    ) : null}
                    <section>
                        <Element className="statuspanel__section-title">Har du flere jobber?</Element>
                        <Normaltekst>
                            Du må levere én sykmelding per jobb. Kontakt den som har sykmeldt deg hvis du trenger flere
                            sykmeldinger.
                        </Normaltekst>
                    </section>
                    <section>
                        <Element className="statuspanel__section-title">Skal du ut og reise?</Element>
                        <Normaltekst>
                            <Lenke href="#">Les om hva du må gjøre for å beholde sykepengene.</Lenke>
                        </Normaltekst>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Statuspanel;
