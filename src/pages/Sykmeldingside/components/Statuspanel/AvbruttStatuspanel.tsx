import React from 'react';
import { Sykmelding } from '../../../../types/sykmeldingTypes';
import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../../../utils/datoUtils';
import { Knapp } from 'nav-frontend-knapper';

import './statuspanel.less';
import tekster from './Statuspanel-tekster';
import Margin from '../Infopanel/layout/Margin';
import { Panel } from 'nav-frontend-paneler';

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
        <Margin>
            <Panel border>
                <div className="statuspanel">
                    <div className="statuspanel__element">
                        <EtikettMedTekst
                            tittel={tekster['statuspanel.status']}
                            tekst={tekster['statuspanel.status.avbrutt']}
                        />
                    </div>
                    <div className="statuspanel__element">
                        <EtikettMedTekst
                            tittel={tekster['statuspanel.dato-sendt']}
                            tekst={tilLesbarDatoMedArstall(new Date())}
                        />
                    </div>
                </div>
                <div className="statuspanel-knapp">
                    <Knapp onClick={() => console.log('bruk sykmelding')}>Bruk sykmeldingen</Knapp>
                </div>
            </Panel>
        </Margin>
    );
};

export default AvbruttStatuspanel;
