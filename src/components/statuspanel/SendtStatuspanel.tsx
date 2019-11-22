import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import EtikettMedTekst from '../infopanel/layout/EtikettMedTekst';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';
import { Panel } from 'nav-frontend-paneler';

import './statuspanel.less';
import Margin from '../infopanel/layout/Margin';

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
        <Margin>
            <Panel border>
                <div className="statuspanel">
                    <div className="statuspanel__kolonne">
                        <div className="statuspanel__element">
                            <EtikettMedTekst tittel="Status" tekst="Sendt til arbeidsgiver" />
                        </div>
                        <div className="statuspanel__element">
                            <EtikettMedTekst tittel="Arbeidsgiver" tekst={sykmelding.arbeidsgiver.navn} />
                        </div>
                    </div>
                    <div className="statuspanel__kolonne">
                        <div className="statuspanel__element">
                            <EtikettMedTekst tittel="Dato sendt" tekst={tilLesbarDatoMedArstall(new Date())} />
                        </div>
                        <div className="statuspanel__element">
                            <EtikettMedTekst tittel="Organisasjonsnummer" tekst="TODO: Organisasjonsnummer" />
                        </div>
                    </div>
                </div>
            </Panel>
        </Margin>
    );
};

export default SendtStatuspanel;
