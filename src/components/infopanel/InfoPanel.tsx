import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { Sidetittel } from 'nav-frontend-typografi';
import EkspanderbartpanelWrapper from './components/ekspanderbartpanelwrapper/EkspanderbartpanelWrapper';
import PanelRad from './components/PanelRad';
import PanelSeksjon from './components/PanelSeksjon';
import SykmeldingPerioder from './components/sykmeldingperiode/SykmeldingPerioder';
import DiagnoseSeksjon from './components/diagnose/DiagnoseSeksjon';

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
                {sykmelding.medisinskVurdering.biDiagnoser.map(diagnose => (
                    <DiagnoseSeksjon diagnose={diagnose} bidiagnose />
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
                <PanelRad>
                    <PanelSeksjon tittel="Arbeidsgiver som legen har skrevet inn" verdi="asd" />
                </PanelRad>
                <PanelRad>
                    <PanelSeksjon tittel="Lege/sykmelder" verdi={sykmelding.navnFastlege} />
                    <PanelSeksjon tittel="Lege/sykmelder" verdi={sykmelding.navnFastlege} />
                    <PanelSeksjon tittel="Lege/sykmelder" verdi={sykmelding.navnFastlege} />
                </PanelRad>

                <EkspanderbartpanelWrapper />
            </div>
        </article>
    );
};

export default InfoPanel;
