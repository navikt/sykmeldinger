import React from 'react';
import { Sidetittel, Element } from 'nav-frontend-typografi';

import Ekspanderbartpanel from './layout/EkspanderbartPanel';

import SykmeldingPerioder from './panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from './panelelementer/diagnose/DiagnoseSeksjon';
import LegeSeksjon from './panelelementer/LegeSeksjon';
import ArbeidsgiverSeksjon from './panelelementer/ArbeidsgiverSeksjon';
import PrognoseSeksjon from './panelelementer/PrognoseSeksjon';
import FraverSeksjon from './panelelementer/FraverSeksjon';
import SkadeSeksjon from './panelelementer/SkadeSeksjon';
import SvangerskapSeksjon from './panelelementer/SvangerskapSeksjon';
import ArbeidsuforSeksjon from './panelelementer/ArbeidsuforSeksjon';

import BehandlingsDatoer from './utdypendeelementer/BehandlingsDatoer';
import Friskmelding from './utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from './utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from './utdypendeelementer/Arbeidsevne';
import MulighetForArbeid from './utdypendeelementer/MulighetForArbeid';
import OpplysningerSeksjon from './layout/OpplysningerSeksjon';
import ElementMedTekst from './layout/ElementMedTekst';

import { Sykmelding } from '../../types/sykmeldingTypes';

import plaster from '../../svg/plaster.svg';

import tekster from './infopanel-tekster';

import './infopanel.less';

interface InfoPanelProps {
    sykmelding: Sykmelding;
}

const InfoPanel = ({ sykmelding }: InfoPanelProps) => {
    console.log(sykmelding);
    return (
        <article className="panel">
            <header className="panel-header">
                <img className="panel-header-icon" src={plaster} alt="plasterikon" />{' '}
                <span>
                    <Element>Din sykmelding</Element>
                </span>
            </header>
            <div className="panel-content">
                <Sidetittel className="panel-content-header">Sykmelding</Sidetittel>
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

                <Ekspanderbartpanel tittel={tekster['flere-opplysninger.tittel']}>
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
                    <OpplysningerSeksjon tittel="Annet" utenUnderstrek>
                        <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
                    </OpplysningerSeksjon>
                </Ekspanderbartpanel>
            </div>
        </article>
    );
};

export default InfoPanel;
