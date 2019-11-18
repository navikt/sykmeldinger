import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import Sidetopp from '../../sidetopp/Sidetopp';
import Veileder from '../../veileder/Veileder';

import Statuspanel from './components/Statuspanel';
import NoytralMann from '../../veileder/NoytralMann';
import VeilederInnhold from './components/VeilederInnhold';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import ArbeidsgiverSeksjon from '../../infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../infopanel/panelelementer/LegeSeksjon';
import { Sidetittel } from 'nav-frontend-typografi';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvvistSykmelding = ({ sykmelding }: SykmeldingProps) => {
    console.log(sykmelding);
    return (
        <div className="sykmelding-container">
            <Sidetopp tekst="Sykmelding" />
            <Veileder
                type="plakat"
                kompakt
                fargetema="feilmelding"
                svg={<NoytralMann />}
                innhold={<VeilederInnhold sykmelding={sykmelding} />}
            />

            <Statuspanel sykmelding={sykmelding} />
            <InfoPanel fargetema="feil" tittel="Avvist sykmelding">
                <Sidetittel className="panel-content-header">Sykmelding</Sidetittel>
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />
            </InfoPanel>
        </div>
    );
};

export default AvvistSykmelding;
