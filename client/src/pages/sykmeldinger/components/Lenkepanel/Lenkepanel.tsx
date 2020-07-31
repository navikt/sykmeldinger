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
const getIcons = (status: StatusEvent | RegelStatus): { iconNormal: string; iconHover: string } => {
    // Only UTGATT INVALID and AVBRUTT have custom icons.
    switch (status) {
        case 'UTGATT':
            return { iconNormal: plasterInfo, iconHover: plasterInfoHover };
        case 'INVALID':
            return { iconNormal: plasterAvvist, iconHover: plasterAvvistHover };
        case 'AVBRUTT':
            return { iconNormal: plasterAvbrutt, iconHover: plasterAvbruttHover };
        default:
            return { iconNormal: plaster, iconHover: plasterHover };
    }
};

const getStatusText = (status: StatusEvent | RegelStatus): string => {
    switch (status) {
        case 'AVBRUTT':
            return 'Avbrutt av deg';
        case 'INVALID':
            return 'Avvist av NAV';
        case 'SENDT':
            return 'Sendt til arbeidsgiver';
        case 'UTGATT':
            return 'Utgått';
        case 'BEKREFTET':
            return 'Sendt til NAV';
        default:
            return '';
    }
};

interface LenkepanelProps {
    sykmeldingId: string;
    sykmeldingsstatus: StatusEvent | RegelStatus; // Needs to be a union of SatusEvent and RegelStatus becuase AVVIST is not part of StatusEvent.
    sykmeldingsperioder: Periode[];
    arbeidsgiverNavn?: string;
    erEgenmeldt?: boolean;
}

const Lenkepanel = ({
    sykmeldingId,
    sykmeldingsstatus,
    sykmeldingsperioder,
    arbeidsgiverNavn,
    erEgenmeldt,
}: LenkepanelProps) => {
    const iconSet = getIcons(sykmeldingsstatus);
    const [activeIcon, setActiveIcon] = useState<string>(iconSet.iconNormal);

    const statusText = getStatusText(sykmeldingsstatus);
    const periodeString = toReadableTotalPeriodLength(sykmeldingsperioder);

    const history = useHistory();

    return (
        <LenkepanelBase
            onMouseEnter={() => setActiveIcon(iconSet.iconHover)}
            onMouseLeave={() => setActiveIcon(iconSet.iconNormal)}
            href={`/sykmeldinger/${sykmeldingId}`}
            onClick={(event) => {
                event.preventDefault();
                history.push(`/sykmeldinger/${sykmeldingId}`);
                window.scrollTo(0, 0);
            }}
            className={sykmeldingsstatus === 'APEN' || sykmeldingsstatus === 'INVALID' ? 'lenkepanel--alert' : ''}
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
