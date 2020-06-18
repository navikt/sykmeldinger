import React, { useState } from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import ArbeidsgiverSeksjon from '../components/Infopanel/panelelementer/ArbeidsgiverSeksjon';
import DiagnoseSeksjon from '../components/Infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import Infopanel from '../components/Infopanel/Infopanel';
import LegeSeksjon from '../components/Infopanel/panelelementer/LegeSeksjon';
import NoytralMann from '../../../svg/NoytralMann.svg';
import SykmeldingPerioder from '../components/Infopanel/panelelementer/periode/SykmeldingPerioder';
import Tittel from '../components/Infopanel/layout/Tittel';
import VeilederContent from './VeilederContent';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import Veilederpanel from 'nav-frontend-veilederpanel';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvvistSykmelding = ({ sykmelding }: SykmeldingProps) => {
    const [bekreftet, setBekreftet] = useState(false);
    console.log(sykmelding);
    return (
        <div className="sykmelding-container">
            <Veilederpanel type="plakat" kompakt fargetema="normal" svg={<img src={NoytralMann} alt="NAV Veileder" />}>
                <VeilederContent sykmelding={sykmelding} />
            </Veilederpanel>

            <Infopanel fargetema="feil" tittel="Avvist sykmelding">
                <Tittel tekst="Sykmelding" />
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
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
