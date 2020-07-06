import './Statuspanel.less';

import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';

import EtikettMedTekst from '../Sykmeldingsopplysninger/layout/EtikettMedTekst';
import Margin from '../Sykmeldingsopplysninger/layout/Margin';
import { tilLesbarDatoMedArstall } from '../../../../utils/datoUtils';
import { Sykmelding } from '../../../../types/sykmelding';

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
                        <EtikettMedTekst tittel="Status" tekst="Avbrutt av deg" />
                    </div>
                    <div className="statuspanel__element">
                        <EtikettMedTekst tittel="Dato sendt" tekst={tilLesbarDatoMedArstall(new Date())} />
                    </div>
                </div>
                <div className="statuspanel-knapp">
                    <Knapp
                        onClick={() => {
                            // TODO: Gjenåpne avbrutt sykmeldingen og oppdater sykmeldingsdataen
                            window.location.reload();
                        }}
                    >
                        Bruk sykmeldingen
                    </Knapp>
                </div>
            </Panel>
        </Margin>
    );
};

export default AvbruttStatuspanel;
