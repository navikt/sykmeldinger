import React, { useState } from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import Sidetopp from '../../sidetopp/Sidetopp';
import Veileder from '../../veileder/Veileder';

import AvvistStatuspanel from '../../statuspanel/AvvistStatuspanel';
import Tittel from '../../infopanel/layout/Tittel';
import NoytralMann from '../../veileder/NoytralMann';
import VeilederInnhold from './components/VeilederInnhold';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import ArbeidsgiverSeksjon from '../../infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../infopanel/panelelementer/LegeSeksjon';
import { Hovedknapp } from 'nav-frontend-knapper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';

import tekster from './avvistsykmelding-tekster';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvvistSykmelding = ({ sykmelding }: SykmeldingProps) => {
    const [bekreftet, setBekreftet] = useState(false);
    console.log(sykmelding);
    return (
        <div className="sykmelding-container">
            <Sidetopp tekst="Sykmelding" />

            <AvvistStatuspanel sykmelding={sykmelding} />

            <Veileder
                type="plakat"
                kompakt
                fargetema="feilmelding"
                svg={<NoytralMann />}
                innhold={<VeilederInnhold sykmelding={sykmelding} />}
            />

            <InfoPanel fargetema="feil" tittel="Avvist sykmelding">
                <Tittel tekst="Sykmelding" />
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />
            </InfoPanel>

            <div style={{ textAlign: 'center' }}>
                <div style={{ width: 'fit-content', margin: 'auto', padding: '2rem' }}>
                    <BekreftCheckboksPanel
                        label={tekster['sykmelding.bekreft-lest']}
                        checked={bekreftet}
                        onChange={() => setBekreftet(!bekreftet)}
                    />
                </div>
                <Hovedknapp disabled={!bekreftet} onClick={() => console.log('bekreft')}>
                    Bekreft
                </Hovedknapp>
            </div>
        </div>
    );
};

export default AvvistSykmelding;
