import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { SykmeldingStatus } from '../../../../types/sykmelding';
import dayjs from 'dayjs';
import checkMark from './checkMark.svg';
import './Statuspanel.less';

interface StatuspanelHeaderProps {
    sykmeldingstatus: SykmeldingStatus;
    erEgenmeldt: boolean;
}

const StatuspanelHeader: React.FC<StatuspanelHeaderProps> = ({ sykmeldingstatus, erEgenmeldt }) => {
    const { timestamp, statusEvent, arbeidsgiver } = sykmeldingstatus;

    const title = ((): string => {
        switch (statusEvent) {
            case 'SENDT':
                return arbeidsgiver?.orgNavn
                    ? `Sykmeldingen er sendt til ${arbeidsgiver.orgNavn}`
                    : 'Sykmeldingen er sendt til NAV';
            case 'BEKREFTET':
                return `${erEgenmeldt ? 'Egenmeldingen' : 'Sykmeldingen'} er sendt til NAV`;
            default:
                throw new Error('Sykmeldingen har ukjent status');
        }
    })();

    return (
        <div id="statuspanel__header">
            <img src={checkMark} alt="checkmark" />
            <div id="statuspanel__header-content">
                <Systemtittel tag="h2">{title}</Systemtittel>
                <Normaltekst>Dato sendt: {dayjs(timestamp).format('dddd D. MMMM, kl. HH:mm')}</Normaltekst>
            </div>
        </div>
    );
};

export default StatuspanelHeader;
