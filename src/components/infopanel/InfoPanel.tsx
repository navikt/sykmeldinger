import React from 'react';
import { Sykmelding, Arbeidsgiver } from '../../types/sykmeldingTypes';
import { Sidetittel } from 'nav-frontend-typografi';
import EkspanderbartpanelWrapper from './components/ekspanderbartpanelwrapper/EkspanderbartpanelWrapper';
import PanelRad from './components/PanelRad';
import PanelSeksjon from './components/PanelSeksjon';
import SykmeldingPerioder from './components/periode/SykmeldingPerioder';
import DiagnoseSeksjon from './components/diagnose/DiagnoseSeksjon';
import LegeSeksjon from './components/lege/LegeSeksjon';
import ArbeidsgiverSeksjon from './components/arbeidsgiver/ArbeidsgiverSeksjon';

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

                <PanelRad>
                    <PanelSeksjon tittel="Beskriv fraværet" verdi="asd" />
                </PanelRad>
                <p>spm med checkbox</p>
                <PanelRad>
                    <PanelSeksjon tittel="Skadedato" verdi="asd" />
                </PanelRad>
                <p>spm med checkbox</p>
                <PanelRad>
                    <PanelSeksjon tittel="Beskriv eventuelle hensyn som må tas på arbeidsplassen" verdi="asd" />
                </PanelRad>

                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />

                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <EkspanderbartpanelWrapper />
            </div>
        </article>
    );
};

export default InfoPanel;
