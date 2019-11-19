import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';

import './statuspanel.less';

interface SendtStatuspanelProps {
    sykmelding: Sykmelding;
}

const SendtStatuspanel = ({ sykmelding }: SendtStatuspanelProps) => {
    // TODO: sykmelding.bekreftetDato
    if (!true) {
        return null;
    }

    // TODO: Erstatt datoer med de faktiske datoene
    // dato sendt
    // organisasjonsnummer

    return (
        <div className="statuspanel">
            <div className="statuspanel-rad">
                <EtikettMedTekst tittel="Status" tekst="Sendt til arbeidsgiver" />
                <EtikettMedTekst tittel="Dato sendt" tekst={tilLesbarDatoMedArstall(new Date())} />
            </div>
            <div className="statuspanel-rad">
                <EtikettMedTekst tittel="Arbeidsgiver" tekst={sykmelding.arbeidsgiver.navn} />
                <EtikettMedTekst tittel="Organisasjonsnummer" tekst="TODO: Organisasjonsnummer" />
            </div>
        </div>
    );
};

export default SendtStatuspanel;
