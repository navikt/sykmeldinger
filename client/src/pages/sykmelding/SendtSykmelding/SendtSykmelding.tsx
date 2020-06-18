import React from 'react';

import Arbeidsevne from '../components/Sykmeldingsopplysninger/utdypendeelementer/Arbeidsevne';
import ArbeidsgiverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsuforSeksjon';
import BehandlingsDatoer from '../components/Sykmeldingsopplysninger/utdypendeelementer/BehandlingsDatoer';
import DiagnoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import ElementMedTekst from '../components/Sykmeldingsopplysninger/layout/ElementMedTekst';
import FraverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/FraverSeksjon';
import Friskmelding from '../components/Sykmeldingsopplysninger/utdypendeelementer/Friskmelding';
import LegeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import MulighetForArbeid from '../components/Sykmeldingsopplysninger/utdypendeelementer/MulighetForArbeid';
import PrognoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/PrognoseSeksjon';
import SeksjonMedTittel from '../components/Sykmeldingsopplysninger/layout/SeksjonMedTittel';
import SkadeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/SkadeSeksjon';
import SvangerskapSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/SvangerskapSeksjon';
import SykmeldingPerioder from '../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
import Tittel from '../components/Sykmeldingsopplysninger/layout/Tittel';
import UtdypendeOpplysninger from '../components/Sykmeldingsopplysninger/utdypendeelementer/UtdypendeOpplysninger';
import Utvidbar from '../components/Utvidbar/Utvidbar';
import VisningArbeidsgiver from './VisningArbeidsgiver';
import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';
import person from '../../../svg/person.svg';
import personHover from '../../../svg/personHover.svg';
import { Sykmelding } from '../../../types/sykmeldingTypes';

interface SendtSykmeldingProps {
    sykmelding: Sykmelding;
}

const SendtSykmelding = ({ sykmelding }: SendtSykmeldingProps) => {
    return (
        <div className="sykmelding-container">
            %KVITTERING% - Sendt, inaktiv søknad - Sendt, aktiv søknad - Sendt, ferdig (?)
            <Utvidbar apen tittel="Dine opplysninger" fargetema="info" ikon={person} ikonHover={personHover}>
                <Tittel tekst="Sykmelding" />
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={sykmelding.medisinskVurdering.svangerskap} />
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
