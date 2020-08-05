import React, { useState } from 'react';
import { StatusEvent, RegelStatus, Periode } from '../../../../types/sykmelding';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import plaster from './svg/plaster.svg';
import plasterHover from './svg/plasterHover.svg';
import plasterInfo from './svg/plasterInfo.svg';
import plasterInfoHover from './svg/plasterInfoHover.svg';
import plasterAvbrutt from './svg/plasterAvbrutt.svg';
import plasterAvbruttHover from './svg/plasterAvbruttHover.svg';
import plasterAvvist from './svg/plasterAvvist.svg';
import plasterAvvistHover from './svg/plasterAvvistHover.svg';
import { EtikettLiten, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './Lenkepanel.less';
import { toReadableTotalPeriodLength } from '../../../../utils/datoUtils';
import { useHistory } from 'react-router-dom';

// TODO: Get all icons
const getIcons = (status: StatusEvent, behandlingsutfall: RegelStatus): { iconNormal: string; iconHover: string } => {
    // Only UTGATT, INVALID and AVBRUTT have custom icons.
    switch (status) {
        case 'UTGATT':
            return { iconNormal: plasterInfo, iconHover: plasterInfoHover };
        case 'AVBRUTT':
            return { iconNormal: plasterAvbrutt, iconHover: plasterAvbruttHover };
        default:
            if (behandlingsutfall === 'INVALID') {
                return { iconNormal: plasterAvvist, iconHover: plasterAvvistHover };
            }
            return { iconNormal: plaster, iconHover: plasterHover };
    }
};

const getStatusText = (status: StatusEvent, behandlingsutfall: RegelStatus): string => {
    switch (status) {
        case 'AVBRUTT':
            return 'Avbrutt av deg';
        case 'SENDT':
            return 'Sendt til arbeidsgiver';
        case 'UTGATT':
            return 'Utgått';
        case 'BEKREFTET':
            if (behandlingsutfall === 'INVALID') {
                return 'Bekreftet avvist';
            }
            return 'Sendt til NAV';
        default:
            if (behandlingsutfall === 'INVALID') {
                return 'Avvist av NAV';
            }
            return '';
    }
};

interface LenkepanelProps {
    sykmeldingId: string;
    sykmeldingsstatus: StatusEvent;
    sykmeldingBehandlingsutvall: RegelStatus;
    sykmeldingsperioder: Periode[];
    arbeidsgiverNavn?: string;
    erEgenmeldt?: boolean;
}

const Lenkepanel = ({
    sykmeldingId,
    sykmeldingsstatus,
    sykmeldingBehandlingsutvall,
    sykmeldingsperioder,
    arbeidsgiverNavn,
    erEgenmeldt,
}: LenkepanelProps) => {
    const iconSet = getIcons(sykmeldingsstatus, sykmeldingBehandlingsutvall);
    const [activeIcon, setActiveIcon] = useState<string>(iconSet.iconNormal);

    const statusText = getStatusText(sykmeldingsstatus, sykmeldingBehandlingsutvall);
    const periodeString = toReadableTotalPeriodLength(sykmeldingsperioder);

    const history = useHistory();

    // TODO: Change hardcoded sykmeldingsgrad
    return (
        <LenkepanelBase
            onMouseEnter={() => setActiveIcon(iconSet.iconHover)}
            onMouseLeave={() => setActiveIcon(iconSet.iconNormal)}
            href={`/${sykmeldingId}`}
            onClick={(event) => {
                event.preventDefault();
                history.push(`/${sykmeldingId}`);
                window.scrollTo(0, 0);
            }}
            className={sykmeldingsstatus === 'APEN' ? 'lenkepanel--alert' : ''}
            border
        >
            <div className="lenkepanel-content">
                <img src={activeIcon} alt="" />
                <div className="lenkepanel-content__main-content">
                    <Normaltekst>{periodeString}</Normaltekst>
                    <Undertittel>{erEgenmeldt ? 'Egenmelding' : 'Sykmelding'}</Undertittel>
                    <Normaltekst>{`100% sykmeldt ${arbeidsgiverNavn ? 'fra ' + arbeidsgiverNavn : ''}`}</Normaltekst>
                </div>
                <div className="lenkepanel-content__status-text">
                    <EtikettLiten>{statusText}</EtikettLiten>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel;
