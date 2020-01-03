import React from 'react';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import Sidetopp from '../../components/Sidetopp/Sidetopp';
import SendtStatuspanel from '../../components/Statuspanel/SendtStatuspanel';
import VisningArbeidsgiver from '../../../../components/visning-arbeidsgiver/VisningArbeidsgiver';
import SykmeldingPerioder from '../../components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../components/Infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import FraverSeksjon from '../../components/Infopanel/panelelementer/FraverSeksjon';
import SvangerskapSeksjon from '../../components/Infopanel/panelelementer/SvangerskapSeksjon';
import SkadeSeksjon from '../../components/Infopanel/panelelementer/SkadeSeksjon';
import PrognoseSeksjon from '../../components/Infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsuforSeksjon from '../../components/Infopanel/panelelementer/ArbeidsuforSeksjon';
import ArbeidsgiverSeksjon from '../../components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../components/Infopanel/panelelementer/LegeSeksjon';
import Utvidbar from '../../../../components/utvidbar/Utvidbar';
import BehandlingsDatoer from '../../components/Infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../components/Infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../components/Infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../components/Infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../components/Infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../components/Infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../../components/Infopanel/layout/ElementMedTekst';

import doktor from '../../../../svg/doktor.svg';
import doktorHover from '../../../../svg/doktorHover.svg';
import person from '../../../../svg/person.svg';
import personHover from '../../../../svg/personHover.svg';

import tekster from './SendtSykmelding-tekster';
import Tittel from '../../components/Infopanel/layout/Tittel';

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
                    tittel={tekster['sendt-sykmelding.flere-opplysninger.tittel']}
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
                        <ElementMedTekst
                            margin
                            tittel={tekster['sendt-sykmelding.lege.tittel']}
                            tekst={sykmelding.behandler.tlf}
                        />
                    </SeksjonMedTittel>
                </Utvidbar>
            </Utvidbar>

            <VisningArbeidsgiver sykmelding={sykmelding} />
        </div>
    );
};

export default SendtSykmelding;
