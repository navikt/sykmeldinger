import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { StatusEvent } from '../../../../types/sykmelding';
import dayjs from 'dayjs';
import checkMark from './checkMark.svg';
import './Statuspanel.less';

interface StatuspanelHeaderProps {
    sykmeldingstatus: StatusEvent;
    erEgenmeldt: boolean;
    sykmeldingSendtEllerBekreftetDato: Date;
    arbeidsgiverNavn?: string;
}

const StatuspanelHeader = ({
    sykmeldingstatus,
    erEgenmeldt,
    sykmeldingSendtEllerBekreftetDato,
    arbeidsgiverNavn,
}: StatuspanelHeaderProps) => {
    const title = (function (): string {
        switch (sykmeldingstatus) {
            case 'SENDT':
                return arbeidsgiverNavn
                    ? `Sykmeldingen er sendt til ${arbeidsgiverNavn}`
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
                <Normaltekst>
                    Dato sendt: {dayjs(sykmeldingSendtEllerBekreftetDato).format('dddd D. MMMM, kl. HH:mm')}
                </Normaltekst>
            </div>
        </div>
    );
};

export default StatuspanelHeader;
