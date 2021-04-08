import React from 'react';
import { Sykmelding } from '../../../../../models/Sykmelding/Sykmelding';
import ElementMedTekst from '../layout/ElementMedTekst';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ArbeidsgiverSeksjon from '../panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../panelelementer/ArbeidsuforSeksjon';
import DiagnoseSeksjon from '../panelelementer/diagnose/DiagnoseSeksjon';
import FraverSeksjon from '../panelelementer/FraverSeksjon';
import LegeSeksjon from '../panelelementer/LegeSeksjon';
import SykmeldingPerioder from '../panelelementer/periode/SykmeldingPerioder';
import PrognoseSeksjon from '../panelelementer/PrognoseSeksjon';
import SkadeSeksjon from '../panelelementer/SkadeSeksjon';
import SvangerskapSeksjon from '../panelelementer/SvangerskapSeksjon';
import Sykmeldingsopplysninger from '../SykmeldingsopplysningerContainer';
import Arbeidsevne from '../utdypendeelementer/Arbeidsevne';
import BehandlingsDatoer from '../utdypendeelementer/BehandlingsDatoer';
import Friskmelding from '../utdypendeelementer/Friskmelding';
import MulighetForArbeid from '../utdypendeelementer/MulighetForArbeid';
import UtdypendeOpplysninger from '../utdypendeelementer/UtdypendeOpplysninger';

interface SykmeldingsopplysningerNormalProps {
    sykmelding: Sykmelding;
}

const SykmeldingsopplysningerNormal: React.FC<SykmeldingsopplysningerNormalProps> = ({ sykmelding }) => (
    <>
        <SykmeldingPerioder sykmelding={sykmelding} />
        <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
        {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
            <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} isBidiagnose />
        ))}
        <FraverSeksjon fraver={sykmelding.medisinskVurdering?.annenFraversArsak} />
        <SvangerskapSeksjon svangerskap={!!sykmelding.medisinskVurdering?.svangerskap} />
        <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
        <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
        <PrognoseSeksjon prognose={sykmelding.prognose} />
        <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
        {/* TODO */}
        <LegeSeksjon navn={sykmelding.navnFastlege || ''} />

        <Sykmeldingsopplysninger
            id="flere-sykmeldingsopplysnigner"
            title="Flere opplysniger fra den som sykmeldte deg"
            sykmelding={sykmelding}
            type="FLERE_OPPLYSNINGER"
            expandedDefault={false}
        >
            <BehandlingsDatoer
                behandletTidspunkt={sykmelding.behandletTidspunkt}
                syketilfelleStartDato={sykmelding.syketilfelleStartDato}
            />
            <MulighetForArbeid />
            <Friskmelding prognose={sykmelding.prognose} />
            <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
            <Arbeidsevne tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} tiltakNAV={sykmelding.tiltakNAV} />
            <SeksjonMedTittel tittel="Annet">
                <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
            </SeksjonMedTittel>
        </Sykmeldingsopplysninger>
    </>
);

export default SykmeldingsopplysningerNormal;