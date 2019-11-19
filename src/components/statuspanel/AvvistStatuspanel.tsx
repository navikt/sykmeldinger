import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';

import './statuspanel.less';

interface AvvistStatuspanelProps {
    sykmelding: Sykmelding;
}

const AvvistStatuspanel = ({ sykmelding }: AvvistStatuspanelProps) => {
    // TODO: sykmelding.bekreftetDato
    if (!true) {
        return null;
    }

    // TODO: Erstatt datoer med de faktiske datoene
    // dato avvist: mottattTidspunkt
    // dato bekreftet: bekreftetDato

    return (
        <div className="statuspanel">
            <div className="statuspanel-rad">
                <EtikettMedTekst tittel="Status" tekst="Avvist av NAV" />
                <EtikettMedTekst tittel="Dato avvist" tekst={tilLesbarDatoMedArstall(new Date())} />
                <EtikettMedTekst tittel="Bekreftet av deg" tekst={tilLesbarDatoMedArstall(new Date())} />
            </div>
        </div>
    );
};

export default AvvistStatuspanel;
