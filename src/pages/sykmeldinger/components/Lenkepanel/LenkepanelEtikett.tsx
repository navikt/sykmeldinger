import { EtikettAdvarsel, EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import React from 'react';

import { RegelStatus } from '../../../../models/Sykmelding/Behandlingsutfall';
import { StatusEvent } from '../../../../models/Sykmelding/SykmeldingStatus';

interface LenkepanelEtikettProps {
    status: keyof typeof StatusEvent;
    behandlingsutfall: keyof typeof RegelStatus;
}

const LenkepanelEtikett: React.FC<LenkepanelEtikettProps> = ({ status, behandlingsutfall }) => {
    if (behandlingsutfall === 'INVALID') {
        if (status === 'APEN') {
            return <EtikettFokus mini>Avvist av NAV</EtikettFokus>;
        } else if (status === 'BEKREFTET') {
            return <EtikettFokus mini>Avvist av NAV</EtikettFokus>;
        }
    }

    if (status === 'AVBRUTT') {
        return <EtikettAdvarsel mini>Avbrutt av deg</EtikettAdvarsel>;
    } else if (status === 'SENDT') {
        return <EtikettSuksess mini>Sendt til arbeidsgiver</EtikettSuksess>;
    } else if (status === 'UTGATT') {
        return <EtikettInfo mini>Utgått</EtikettInfo>;
    } else if (status === 'BEKREFTET') {
        return <EtikettSuksess mini>Sendt til NAV</EtikettSuksess>;
    }

    return null;
};

export default LenkepanelEtikett;
