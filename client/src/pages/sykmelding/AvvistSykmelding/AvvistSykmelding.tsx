import React, { useState } from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import ArbeidsgiverSeksjon from '../components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import AvvistStatuspanel from '../components/Statuspanel/AvvistStatuspanel';
import DiagnoseSeksjon from '../components/Infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import Infopanel from '../components/Infopanel/Infopanel';
import LegeSeksjon from '../components/Infopanel/panelelementer/LegeSeksjon';
import NoytralMann from '../../../svg/NoytralMann.svg';
import Sidetopp from '../components/Sidetopp/Sidetopp';
import SykmeldingPerioder from '../components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import Tittel from '../components/Infopanel/layout/Tittel';
import Veileder from '../components/Veileder/Veileder';
import VeilederInnhold from './VeilederInnhold';
import { Sykmelding } from '../../../types/sykmelding';

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
                svg={NoytralMann}
                innhold={<VeilederInnhold sykmelding={sykmelding} />}
            />

            <Infopanel fargetema="feil" tittel="Avvist sykmelding">
                <Tittel tekst="Sykmelding" />
                <SykmeldingPerioder perioder={sykmelding.sykmeldingsperioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering?.hovedDiagnose} />
                {sykmelding.medisinskVurdering?.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />
            </Infopanel>

            <div style={{ textAlign: 'center' }}>
                <div style={{ width: 'fit-content', margin: 'auto', padding: '2rem' }}>
                    <BekreftCheckboksPanel
                        label="Jeg bekrefter at jeg har lest at sykmeldingen er avvist"
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
