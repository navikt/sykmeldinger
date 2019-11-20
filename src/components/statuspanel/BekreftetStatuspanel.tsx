import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { Knapp } from 'nav-frontend-knapper';

import './statuspanel.less';

interface BekreftetStatuspanelProps {
    sykmelding: Sykmelding;
}

const BekreftetStatuspanel = ({ sykmelding }: BekreftetStatuspanelProps) => {
    // TODO: sykmelding.bekreftetDato
    if (!true) {
        return null;
    }

    // TODO: Erstatt datoer med de faktiske datoene
    // dato bekreftet

    return (
        <div className="statuspanel">
            <div className="statuspanel-rad">
                <EtikettMedTekst tittel="Status" tekst="Bekreftet av deg" />
                <EtikettMedTekst tittel="Dato bekreftet" tekst={tilLesbarDatoMedArstall(new Date())} />
                <EtikettMedTekst tittel="Jeg er sykmeldt fra" tekst="TODO: Sykmeldt fra" />
            </div>
        </div>
    );
};

export default BekreftetStatuspanel;
