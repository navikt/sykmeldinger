import React from 'react';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import EtikettMedTekst from '../../../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../../../utils/datoUtils';

interface StatuspanelProps {
    sykmelding: Sykmelding;
}

const Statuspanel = ({ sykmelding }: StatuspanelProps) => {
    // TODO: sykmelding.bekreftetDato
    if (!true) {
        return null;
    }

    // TODO: Erstatt datoer med de faktiske datoene
    // dato avvist: mottattTidspunkt
    // dato bekreftet: bekreftetDato

    return (
        <div
            style={{
                display: 'flex',
                background: 'white',
                padding: '2rem 3rem 2rem 3rem',
                marginTop: '2rem',
                marginBottom: '4rem',
            }}
        >
            <div style={{ flex: '1' }}>
                <EtikettMedTekst tittel="Status" tekst="Avvist av NAV" />
            </div>
            <div style={{ flex: '1' }}>
                <EtikettMedTekst tittel="Dato avvist" tekst={tilLesbarDatoMedArstall(new Date())} />
            </div>
            <div style={{ flex: '1' }}>
                <EtikettMedTekst tittel="Bekreftet av deg" tekst={tilLesbarDatoMedArstall(new Date())} />
            </div>
        </div>
    );
};

export default Statuspanel;
