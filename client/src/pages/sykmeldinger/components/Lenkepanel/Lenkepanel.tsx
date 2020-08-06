import React, { useState } from 'react';
import { StatusEvent, RegelStatus, Periode } from '../../../../types/sykmelding';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { EtikettAdvarsel, EtikettSuksess, EtikettInfo, EtikettFokus } from 'nav-frontend-etiketter';
import plaster from './svg/plaster.svg';
import plasterHover from './svg/plasterHover.svg';
import plasterInfo from './svg/plasterInfo.svg';
import plasterInfoHover from './svg/plasterInfoHover.svg';
import plasterAvbrutt from './svg/plasterAvbrutt.svg';
import plasterAvbruttHover from './svg/plasterAvbruttHover.svg';
import plasterAvvist from './svg/plasterAvvist.svg';
import plasterAvvistHover from './svg/plasterAvvistHover.svg';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
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

const getEtikett = (status: StatusEvent, behandlingsutfall: RegelStatus): JSX.Element | null => {
    switch (status) {
        case 'AVBRUTT':
            return <EtikettAdvarsel mini>Avbrutt av deg</EtikettAdvarsel>;
        case 'SENDT':
            return <EtikettSuksess mini>Sendt til arbeidsgiver</EtikettSuksess>;
        case 'UTGATT':
            return <EtikettInfo mini>Utgått</EtikettInfo>;
        case 'BEKREFTET':
            if (behandlingsutfall === 'INVALID') {
                return <EtikettFokus mini>Bekreftet avvist</EtikettFokus>;
            }
            return <EtikettSuksess mini>Sendt til NAV</EtikettSuksess>;
        default:
            if (behandlingsutfall === 'INVALID') {
                return <EtikettFokus mini>Avvist av NAV</EtikettFokus>;
            }
            return null;
    }
};

const getMainTitle = (erEgenmeldt?: boolean, erPapir?: boolean): string => {
    if (erEgenmeldt) {
        return 'Egenmelding';
    }
    if (erPapir) {
        return 'Papirsykmelding';
    }
    return 'Sykmelding';
};

interface LenkepanelProps {
    sykmeldingId: string;
    sykmeldingsstatus: StatusEvent;
    sykmeldingBehandlingsutfall: RegelStatus;
    sykmeldingsperioder: Periode[];
    arbeidsgiverNavn?: string;
    erEgenmeldt?: boolean;
    erPapir?: boolean;
}

const Lenkepanel = ({
    sykmeldingId,
    sykmeldingsstatus,
    sykmeldingBehandlingsutfall,
    sykmeldingsperioder,
    arbeidsgiverNavn,
    erEgenmeldt,
    erPapir,
}: LenkepanelProps) => {
    const iconSet = getIcons(sykmeldingsstatus, sykmeldingBehandlingsutfall);
    const [activeIcon, setActiveIcon] = useState<string>(iconSet.iconNormal);

    const etikett = getEtikett(sykmeldingsstatus, sykmeldingBehandlingsutfall);
    const periodeString = toReadableTotalPeriodLength(sykmeldingsperioder);

    const history = useHistory();

    // TODO: Change hardcoded sykmeldingsgrad
    return (
        <LenkepanelBase
            onMouseEnter={() => setActiveIcon(iconSet.iconHover)}
            onMouseLeave={() => setActiveIcon(iconSet.iconNormal)}
            href={process.env.REACT_APP_SYKMELDINGER_ROOT + sykmeldingId}
            onClick={(event) => {
                event.preventDefault();
                history.push(process.env.REACT_APP_SYKMELDINGER_ROOT + sykmeldingId);
                window.scrollTo(0, 0);
            }}
            className={sykmeldingsstatus === 'APEN' ? 'lenkepanel--alert' : ''}
            border
        >
            <div className="lenkepanel-content">
                <img src={activeIcon} alt="" />
                <div className="lenkepanel-content__main-content">
                    <Normaltekst>{periodeString}</Normaltekst>
                    <Undertittel>{getMainTitle(erEgenmeldt, erPapir)}</Undertittel>
                    <Normaltekst>{`100% sykmeldt ${arbeidsgiverNavn ? 'fra ' + arbeidsgiverNavn : ''}`}</Normaltekst>
                </div>
                {etikett && <div className="lenkepanel-content__status-text">{etikett}</div>}
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel;
