import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { Panel } from 'nav-frontend-paneler';

import './statuspanel.less';
import Margin from '../infopanel/layout/Margin';

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
        <Margin stor>
            <Panel border className="statuspanel">
                <div className="statuspanel__element">
                    <EtikettMedTekst tittel="Status" tekst="Avvist av NAV" />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst tittel="Dato avvist" tekst={tilLesbarDatoMedArstall(new Date())} />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst tittel="Bekreftet av deg" tekst={tilLesbarDatoMedArstall(new Date())} />
                </div>
            </Panel>
        </Margin>
    );
};

export default AvvistStatuspanel;
