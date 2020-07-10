import './Statuspanel.less';
import { StatusEvent } from '../../../../types/sykmelding';
import React from 'react';
import information from './information.svg';
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import StatuspanelSection from './StatuspanelSection';
import StatuspanelHeader from './StatuspanelHeader';
import SoknadSection from './SoknadSection';

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
    soknadFomDato?: Date;
    avventendeSykmelding?: boolean;
    arbeidsgiverForskutterLonn?: boolean;
    skalViseInnteksmeldingInfo?: boolean; // TOOD: When does this apply?
    skalViseReisetilskuddInfo?: boolean;
    skalViseBehandlingsdagerInfo?: boolean; // TODO: Do we need this information?
}

const Statuspanel = ({
    sykmeldingstatus,
    erEgenmeldt = false,
    arbeidsgiverNavn,
    sykmeldingSendtEllerBekreftetDato,
    soknadstype,
    soknadFomDato,
    avventendeSykmelding = false,
    arbeidsgiverForskutterLonn,
    skalViseInnteksmeldingInfo = false,
    skalViseBehandlingsdagerInfo = false,
    skalViseReisetilskuddInfo = false,
}: StatuspanelProps) => {
    return (
        <section id="statuspanel">
            <StatuspanelHeader
                sykmeldingstatus={sykmeldingstatus}
                erEgenmeldt={erEgenmeldt}
                sykmeldingSendtEllerBekreftetDato={sykmeldingSendtEllerBekreftetDato}
                arbeidsgiverNavn={arbeidsgiverNavn}
            />
            <div id="statuspanel__content">
                <img src={information} alt="informasjon" />
                <div id="statuspanel__sections">
                    <Systemtittel tag="h2">Hva skjer videre?</Systemtittel>
                    <SoknadSection soknadstype={soknadstype} soknadFomDato={soknadFomDato} />
                    <StatuspanelSection show={avventendeSykmelding} title="Avventende sykmelding">
                        Du har sendt beskjed til arbeidsgiveren din om at det er mulig å unngå sykmelding hvis det blir
                        lagt til rette for deg på arbeidsplassen. Hvis tilrettelegging ikke er mulig, og du blir helt
                        borte fra jobben, må legen erstatte den avventende sykmeldingen med en ordinær sykmelding hvis
                        arbeidsgiveren din krever det.
                    </StatuspanelSection>
                    <StatuspanelSection
                        show={arbeidsgiverForskutterLonn !== undefined}
                        title={`Arbeidsgiver forskutterer ${arbeidsgiverForskutterLonn ? ' ' : ' ikke '} lønn`}
                    >
                        Her er noe informasjon om forskuttering av lønn
                    </StatuspanelSection>
                    <StatuspanelSection
                        show={skalViseReisetilskuddInfo}
                        title="Reisetilskudd: slik søker du om å få tilbake pengene"
                    >
                        Vi jobber med å digitalisere sykepengesøknaden for alle type sykmeldinger, men denne er vi ikke
                        helt ferdig med. Derfor blir du nødt til å fylle ut søknad om reisetilskudd til arbeidsreiser,
                        hvor du legger ved kvitteringer for transporten.
                    </StatuspanelSection>
                    <StatuspanelSection show={skalViseInnteksmeldingInfo} title="Før NAV kan behandle søknaden">
                        Arbeidsgiveren din må sende oss inntektsmelding så fort som mulig. Når sykefraværet ditt er
                        lengre enn 16 dager, skal NAV saksbehandle søknaden, og da trenger vi inntektsmeldingen.
                    </StatuspanelSection>
                    <StatuspanelSection show={skalViseBehandlingsdagerInfo} title="Sykmelding for behandlingsdager">
                        Noe informasjon om en sykmelding som er for behandlingsdager
                    </StatuspanelSection>
                    <StatuspanelSection title="Har du flere jobber?">
                        Du må levere én sykmelding per jobb. Kontakt den som har sykmeldt deg hvis du trenger flere
                        sykmeldinger.
                    </StatuspanelSection>
                    <StatuspanelSection title="Skal du ut og reise?">
                        <Lenke href="#">Les om hva du må gjøre for å beholde sykepengene.</Lenke>
                    </StatuspanelSection>
                </div>
            </div>
        </section>
    );
};

export default Statuspanel;
