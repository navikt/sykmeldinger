import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { Sidetittel, EtikettLiten } from 'nav-frontend-typografi';

import './infopanel.less';

interface InfoPanelProps {
    sykmelding: Sykmelding;
}

const InfoPanel = ({ sykmelding }: InfoPanelProps) => {
    return (
        <article className="panel">
            <header className="panel-header">ikon og navn</header>
            <div className="panel-content">
                <Sidetittel>Sykmelding</Sidetittel>

                <EtikettLiten>Periode</EtikettLiten>
            </div>
        </article>
    );
};

export default InfoPanel;
