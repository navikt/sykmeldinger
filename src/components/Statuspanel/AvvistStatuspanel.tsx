import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { Panel } from 'nav-frontend-paneler';

import './Statuspanel.less';
import Margin from '../Infopanel/layout/Margin';
import tekster from './Statuspanel-tekster';

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
                        tittel={tekster['statuspanel.status']}
                        tekst={tekster['statuspanel.status.avvist']}
                    />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst
                        tittel={tekster['statuspanel.dato-avvist']}
                        tekst={tilLesbarDatoMedArstall(new Date())}
                    />
                </div>
                <div className="statuspanel__element">
                    <EtikettMedTekst
                        tittel={tekster['statuspanel.bekreftet-avvist-dato']}
                        tekst={tilLesbarDatoMedArstall(new Date())}
                    />
                </div>
            </Panel>
        </Margin>
    );
};

export default AvvistStatuspanel;
