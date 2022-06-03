import React from 'react';
import { Tag } from '@navikt/ds-react';

import { RegelStatus } from '../../../models/Sykmelding/Behandlingsutfall';
import { StatusEvent } from '../../../models/Sykmelding/SykmeldingStatus';

interface LenkepanelEtikettProps {
    status: keyof typeof StatusEvent;
    behandlingsutfall: keyof typeof RegelStatus;
}

const LenkepanelEtikett: React.FC<LenkepanelEtikettProps> = ({ status, behandlingsutfall }) => {
    if (behandlingsutfall === 'INVALID') {
        if (status === 'APEN' || status === 'BEKREFTET') {
            return (
                <Tag variant="warning" size="small">
                    Avvist av NAV
                </Tag>
            );
        }
    }

    switch (status) {
        case 'AVBRUTT':
            return (
                <Tag variant="error" size="small">
                    Avbrutt av deg
                </Tag>
            );
        case 'SENDT':
            return (
                <Tag variant="success" size="small">
                    Sendt til arbeidsgiver
                </Tag>
            );
        case 'UTGATT':
            return (
                <Tag variant="info" size="small">
                    Utgått
                </Tag>
            );
        case 'BEKREFTET':
            return (
                <Tag variant="success" size="small">
                    Sendt til NAV
                </Tag>
            );
        default:
            return null;
    }
};

export default LenkepanelEtikett;
