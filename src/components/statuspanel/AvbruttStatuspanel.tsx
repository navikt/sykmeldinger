import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { Knapp } from 'nav-frontend-knapper';

import './statuspanel.less';

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
                <EtikettMedTekst tittel="Status" tekst="Avbrutt av deg" />
                <EtikettMedTekst tittel="Dato sendt" tekst={tilLesbarDatoMedArstall(new Date())} />
            </div>
            <div style={{ padding: '1rem' }}>
                <Knapp onClick={() => console.log('bruk sykmelding')}>Bruk sykmeldingen</Knapp>
            </div>
        </div>
    );
};

export default AvbruttStatuspanel;
