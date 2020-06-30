import './Statuspanel.less';

import React from 'react';
import Panel from 'nav-frontend-paneler';

import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import Margin from '../Infopanel/layout/Margin';
import { tilLesbarDatoMedArstall } from '../../../../utils/datoUtils';
import { Sykmelding } from '../../../../types/sykmelding';

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
                    <EtikettMedTekst
                        tittel="Status"
                        tekst="Avvist av NAV"
                    />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst
                        tittel="Dato avvist"
                        tekst={tilLesbarDatoMedArstall(new Date())}
                    />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst
                        tittel="Bekreftet av deg"
                        tekst={tilLesbarDatoMedArstall(new Date())}
                    />
                </div>
            </Panel>
        </Margin>
    );
};

export default AvvistStatuspanel;
