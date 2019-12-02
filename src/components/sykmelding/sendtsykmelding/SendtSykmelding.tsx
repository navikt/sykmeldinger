import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import Sidetopp from '../../sidetopp/Sidetopp';
import SendtStatuspanel from '../../statuspanel/SendtStatuspanel';
import VisningArbeidsgiver from '../../visning-arbeidsgiver/VisningArbeidsgiver';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import FraverSeksjon from '../../infopanel/panelelementer/FraverSeksjon';
import SvangerskapSeksjon from '../../infopanel/panelelementer/SvangerskapSeksjon';
import SkadeSeksjon from '../../infopanel/panelelementer/SkadeSeksjon';
import PrognoseSeksjon from '../../infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsuforSeksjon from '../../infopanel/panelelementer/ArbeidsuforSeksjon';
import ArbeidsgiverSeksjon from '../../infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../infopanel/panelelementer/LegeSeksjon';
import Utvidbar from '../../utvidbar/Utvidbar';
import BehandlingsDatoer from '../../infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../../infopanel/layout/ElementMedTekst';

import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';
import person from '../../../svg/person.svg';
import personHover from '../../../svg/personHover.svg';

import tekster from './sendtsykmelding-tekster';
import Tittel from '../../infopanel/layout/Tittel';

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
