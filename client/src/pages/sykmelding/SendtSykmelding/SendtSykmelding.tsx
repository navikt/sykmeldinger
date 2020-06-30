import React from 'react';

import Arbeidsevne from '../components/Infopanel/utdypendeelementer/Arbeidsevne';
import ArbeidsgiverSeksjon from '../components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../components/Infopanel/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../components/Infopanel/utdypendeelementer/BehandlingsDatoer';
import DiagnoseSeksjon from '../components/Infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import ElementMedTekst from '../components/Infopanel/layout/ElementMedTekst';
import FraverSeksjon from '../components/Infopanel/panelelementer/FraverSeksjon';
import Friskmelding from '../components/Infopanel/utdypendeelementer/Friskmelding';
import LegeSeksjon from '../components/Infopanel/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../components/Infopanel/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../components/Infopanel/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../components/Infopanel/layout/SeksjonMedTittel';
import SendtStatuspanel from '../components/Statuspanel/SendtStatuspanel';
import Sidetopp from '../components/Sidetopp/Sidetopp';
import SkadeSeksjon from '../components/Infopanel/panelelementer/SkadeSeksjon';
import SvangerskapSeksjon from '../components/Infopanel/panelelementer/SvangerskapSeksjon';
import SykmeldingPerioder from '../components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import Tittel from '../components/Infopanel/layout/Tittel';
import UtdypendeOpplysninger from '../components/Infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Utvidbar from '../components/Utvidbar/Utvidbar';
import VisningArbeidsgiver from './VisningArbeidsgiver';
import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';
import person from '../../../svg/person.svg';
import personHover from '../../../svg/personHover.svg';
import { Sykmelding } from '../../../types/sykmelding';

interface SendtSykmeldingProps {
    sykmelding: Sykmelding;
}

const SendtSykmelding = ({ sykmelding }: SendtSykmeldingProps) => {
    return (
        <div className="sykmelding-container">
            <Sidetopp tekst="Sykmelding" />

            <SendtStatuspanel sykmelding={sykmelding} />

            <Utvidbar apen tittel="Dine opplysninger" fargetema="info" ikon={person} ikonHover={personHover}>
                <Tittel tekst="Sykmelding" />
                <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
                {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering?.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={!!sykmelding.medisinskVurdering?.svangerskap} />
                <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
                <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                <PrognoseSeksjon prognose={sykmelding.prognose} />
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <Utvidbar
                    ikon={doktor}
                    ikonHover={doktorHover}
                    tittel="Flere opplysninger fra den som har sykmeldt deg"
                >
                    <BehandlingsDatoer
                        behandletTidspunkt={sykmelding.behandletTidspunkt}
                        syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                    />
                    <MulighetForArbeid />
                    <Friskmelding prognose={sykmelding.prognose} />
                    <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
                    <Arbeidsevne
                        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                        tiltakNAV={sykmelding.tiltakNAV}
                    />
                    <SeksjonMedTittel tittel="Annet">
                        <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
                    </SeksjonMedTittel>
                </Utvidbar>
            </Utvidbar>

            <VisningArbeidsgiver sykmelding={sykmelding} />
        </div>
    );
};

export default SendtSykmelding;
