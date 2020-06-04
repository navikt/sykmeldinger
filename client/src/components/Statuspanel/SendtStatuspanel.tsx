import './Statuspanel.less';

import React from 'react';
import { Panel } from 'nav-frontend-paneler';

import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import Margin from '../Infopanel/layout/Margin';
import tekster from './Statuspanel-tekster';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';

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
                            <EtikettMedTekst
                                tittel={tekster['statuspanel.status']}
                                tekst={tekster['statuspanel.status.sendt']}
                            />
                        </div>
                        <div className="statuspanel__element">
                            <EtikettMedTekst
                                tittel={tekster['statuspanel.arbeidsgiver']}
                                tekst={sykmelding.arbeidsgiver.navn}
                            />
                        </div>
                    </div>
                    <div className="statuspanel__kolonne">
                        <div className="statuspanel__element">
                            <EtikettMedTekst
                                tittel={tekster['statuspanel.dato-sendt']}
                                tekst={tilLesbarDatoMedArstall(new Date())}
                            />
                        </div>
                        <div className="statuspanel__element">
                            <EtikettMedTekst
                                tittel={tekster['statuspanel.organisasjonsnummer']}
                                tekst="TODO: Organisasjonsnummer"
                            />
                        </div>
                    </div>
                </div>
            </Panel>
        </Margin>
    );
};

export default SendtStatuspanel;
