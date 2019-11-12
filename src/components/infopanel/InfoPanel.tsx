import React from 'react';
import { Sykmelding, Prognose } from '../../types/sykmeldingTypes';
import { Sidetittel } from 'nav-frontend-typografi';

import EkspanderbartpanelWrapper from './components/ekspanderbartpanelwrapper/EkspanderbartpanelWrapper';
import SykmeldingPerioder from './components/periode/SykmeldingPerioder';
import DiagnoseSeksjon from './components/diagnose/DiagnoseSeksjon';
import LegeSeksjon from './components/LegeSeksjon';
import ArbeidsgiverSeksjon from './components/ArbeidsgiverSeksjon';
import PrognoseSeksjon from './components/PrognoseSeksjon';
import FraverSeksjon from './components/FraverSeksjon';
import SkadeSeksjon from './components/SkadeSeksjon';
import SvangerskapSeksjon from './components/SvangerskapSeksjon';
import ArbeidsuforSeksjon from './components/ArbeidsuforSeksjon';

import './infopanel.less';

interface InfoPanelProps {
    sykmelding: Sykmelding;
}

const InfoPanel = ({ sykmelding }: InfoPanelProps) => {
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

                <EkspanderbartpanelWrapper />
            </div>
        </article>
    );
};

export default InfoPanel;
