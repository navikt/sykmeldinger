import React from 'react';
import { Sykmelding, Prognose } from '../../types/sykmeldingTypes';
import { Sidetittel } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';

import EkspanderbartpanelWrapper from './components/ekspanderbartpanelwrapper/EkspanderbartpanelWrapper';
import SykmeldingPerioder from './components/periode/SykmeldingPerioder';
import DiagnoseSeksjon from './components/diagnose/DiagnoseSeksjon';
import LegeSeksjon from './components/lege/LegeSeksjon';
import ArbeidsgiverSeksjon from './components/arbeidsgiver/ArbeidsgiverSeksjon';
import PrognoseSeksjon from './components/prognose/PrognoseSeksjon';
import FraverSeksjon from './components/fraver/FraverSeksjon';

import './infopanel.less';
import SkadeSeksjon from './components/skade/SkadeSeksjon';
import SvangerskapSeksjon from './components/svangerskap/SvangerskapSeksjon';
import ArbeidsuforSeksjon from './components/arbeidsufor/ArbeidsuforSeksjon';

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
