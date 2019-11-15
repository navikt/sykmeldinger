import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';

import Ekspanderbartpanel from './components/ekspanderbartpanel/EkspanderbartPanel';

import SykmeldingPerioder from './components/periode/SykmeldingPerioder';
import DiagnoseSeksjon from './components/diagnose/DiagnoseSeksjon';
import LegeSeksjon from './components/LegeSeksjon';
import ArbeidsgiverSeksjon from './components/ArbeidsgiverSeksjon';
import PrognoseSeksjon from './components/PrognoseSeksjon';
import FraverSeksjon from './components/FraverSeksjon';
import SkadeSeksjon from './components/SkadeSeksjon';
import SvangerskapSeksjon from './components/SvangerskapSeksjon';
import ArbeidsuforSeksjon from './components/ArbeidsuforSeksjon';

import BehandlingsDatoer from './components/flereopplysninger/BehandlingsDatoer';
import Friskmelding from './components/flereopplysninger/Friskmelding';
import UtdypendeOpplysninger from './components/flereopplysninger/UtdypendeOpplysninger';
import Arbeidsevne from './components/flereopplysninger/Arbeidsevne';
import OpplysningerSeksjon from './components/flereopplysninger/OpplysningerSeksjon';
import ElementMedTekst from './components/flereopplysninger/ElementMedTekst';

import { Sykmelding } from '../../types/sykmeldingTypes';

import './infopanel.less';

interface InfoPanelProps {
    sykmelding: Sykmelding;
}

const InfoPanel = ({ sykmelding }: InfoPanelProps) => {
    console.log(sykmelding);
    return (
        <article className="panel">
            <header className="panel-header">ikon navn</header>
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

                <Ekspanderbartpanel>
                    <BehandlingsDatoer
                        behandletTidspunkt={sykmelding.behandletTidspunkt}
                        syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                    />
                    <OpplysningerSeksjon tittel="Mulighet for arbeid">
                        <div>pasienten kan ikke være i arbeid</div>
                    </OpplysningerSeksjon>
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
