import React, { useState } from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

import ArbeidsgiverSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/ArbeidsgiverSeksjon';
import DiagnoseSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/diagnose/DiagnoseSeksjon';
import Sykmeldingsopplysninger from '../components/Sykmeldingsopplysninger/Sykmeldingsopplysninger';
import LegeSeksjon from '../components/Sykmeldingsopplysninger/panelelementer/LegeSeksjon';
import NoytralMann from '../../../svg/NoytralMann.svg';
import SykmeldingPerioder from '../components/Sykmeldingsopplysninger/panelelementer/periode/SykmeldingPerioder';
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
            <div style={{ marginTop: '80px', marginBottom: '20px' }}>
                <Veilederpanel
                    type="plakat"
                    kompakt
                    fargetema="normal"
                    svg={<img src={NoytralMann} alt="NAV Veileder" />}
                >
                    <VeilederContent sykmelding={sykmelding} />
                </Veilederpanel>
            </div>

            <Sykmeldingsopplysninger>
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />
            </Sykmeldingsopplysninger>

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
