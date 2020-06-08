import './Statuspanel.less';

import React from 'react';
import Panel from 'nav-frontend-paneler';

import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import Margin from '../Infopanel/layout/Margin';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../../utils/datoUtils';

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
        <Margin>
            <Panel border className="statuspanel">
                <div className="statuspanel__element">
                    <EtikettMedTekst
                        tittel="Status"
                        tekst="Bekreftet av deg"
                    />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst
                        tittel="Dato bekreftet"
                        tekst={tilLesbarDatoMedArstall(new Date())}
                    />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst tittel="Jeg er sykmeldt fra" tekst="TODO: Sykmeldt fra" />
                </div>
            </Panel>
        </Margin>
    );
};

export default BekreftetStatuspanel;
