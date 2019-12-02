import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { Knapp } from 'nav-frontend-knapper';

import './statuspanel.less';
import tekster from './statuspanel-tekster';

interface AvbruttStatuspanelProps {
    sykmelding: Sykmelding;
}

const AvbruttStatuspanel = ({ sykmelding }: AvbruttStatuspanelProps) => {
    // TODO: sykmelding.bekreftetDato
    if (!true) {
        return null;
    }

    // TODO: Erstatt datoer med de faktiske datoene
    // dato sendt

    return (
        <div className="statuspanel">
            <div className="statuspanel-rad">
                <EtikettMedTekst tittel={tekster['statuspanel.status']} tekst={tekster['statuspanel.status.avvist']} />
                <EtikettMedTekst tittel={tekster['statuspanel.status']} tekst={tilLesbarDatoMedArstall(new Date())} />
            </div>
            <div style={{ padding: '1rem' }}>
                <Knapp onClick={() => console.log('bruk sykmelding')}>Bruk sykmeldingen</Knapp>
            </div>
        </div>
    );
};

export default AvbruttStatuspanel;
