import './Statuspanel.less';

import React from 'react';
import { Panel } from 'nav-frontend-paneler';

import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import Margin from '../Infopanel/layout/Margin';
import tekster from './Statuspanel-tekster';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';

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
