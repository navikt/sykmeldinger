import React, { useState } from 'react';
import { StatusEvent, RegelStatus, Periode } from '../../../../types/sykmelding';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { EtikettAdvarsel, EtikettSuksess, EtikettInfo, EtikettFokus } from 'nav-frontend-etiketter';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import stethoscope from './svg/stethoscope.svg';
import stethoscopeHover from './svg/stethoscopeHover.svg';
import papersykmelding from './svg/papersykmelding.svg';
import papersykmeldingHover from './svg/papersykmeldingHover.svg';
import declined from './svg/declined.svg';
import declinedHover from './svg/declinedHover.svg';
import './Lenkepanel.less';
import { toReadableTotalPeriodLength } from '../../../../utils/datoUtils';
import { useHistory } from 'react-router-dom';
import { getPeriodDescriptionStrings } from '../../../../utils/periodeUtils';

interface IconSet {
    iconNormal: string;
    iconHover: string;
}

interface LenkepanelProps {
    sykmeldingId: string;
    sykmeldingsstatus: StatusEvent;
    sykmeldingBehandlingsutfall: RegelStatus;
    sykmeldingsperioder: Periode[];
    arbeidsgiverNavn?: string;
    erEgenmeldt: boolean;
    erPapir: boolean;
}

const Lenkepanel: React.FC<LenkepanelProps> = ({
    sykmeldingId,
    sykmeldingsstatus,
    sykmeldingBehandlingsutfall,
    sykmeldingsperioder,
    arbeidsgiverNavn,
    erEgenmeldt,
    erPapir,
}) => {
    const getIconSet = (behandlingsutfall: RegelStatus, erPapir: boolean): IconSet => {
        if (behandlingsutfall === 'INVALID') {
            return { iconNormal: declined, iconHover: declinedHover };
        }
        if (erPapir) {
            return { iconNormal: papersykmelding, iconHover: papersykmeldingHover };
        }
        return { iconNormal: stethoscope, iconHover: stethoscopeHover };
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

    const iconSet = getIconSet(sykmeldingBehandlingsutfall, erPapir);
    const [activeIcon, setActiveIcon] = useState<string>(iconSet.iconNormal);

    const etikett = getEtikett(sykmeldingsstatus, sykmeldingBehandlingsutfall);
    const periodeString = toReadableTotalPeriodLength(sykmeldingsperioder);

    const linkToSykmelding = `/sykmeldinger/${sykmeldingId}`;
    const history = useHistory();

    return (
        <LenkepanelBase
            onMouseEnter={() => setActiveIcon(iconSet.iconHover)}
            onMouseLeave={() => setActiveIcon(iconSet.iconNormal)}
            href={linkToSykmelding}
            onClick={(event) => {
                event.preventDefault();
                history.push(linkToSykmelding);
                window.scrollTo(0, 0);
            }}
            className={sykmeldingsstatus === 'APEN' ? 'lenkepanel--alert' : ''}
            border
        >
            <div className="lenkepanel-content">
                <img key={sykmeldingId} src={activeIcon} alt="Sykmeldingikon" />
                <div className="lenkepanel-content__main-content">
                    <Normaltekst tag="p">{periodeString}</Normaltekst>
                    <Undertittel tag="h3">{getMainTitle(erEgenmeldt, erPapir)}</Undertittel>
                    <ul>
                        {getPeriodDescriptionStrings(sykmeldingsperioder, arbeidsgiverNavn).map(
                            (periodString, index) => (
                                <li key={index}>
                                    <Normaltekst>{periodString}</Normaltekst>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
                {etikett && <div className="lenkepanel-content__status-text">{etikett}</div>}
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel;
