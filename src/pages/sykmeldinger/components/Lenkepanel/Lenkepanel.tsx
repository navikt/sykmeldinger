import React, { useState } from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import LenkepanelIcon from './LenkepanelIcon';
import LenkepanelEtikett from './LenkepanelEtikett';
import './Lenkepanel.less';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';

interface LenkepanelProps {
    sykmelding: Sykmelding;
}

const Lenkepanel: React.FC<LenkepanelProps> = ({ sykmelding }) => {
    const status = sykmelding.sykmeldingStatus.statusEvent;
    const behandlingsutfallStatus = sykmelding.behandlingsutfall.status;
    const arbeidsgiverNavn = sykmelding.arbeidsgiver?.navn;

    const [isHoverState, setIsHoverState] = useState<boolean>(false);

    const linkToSykmelding = `${window._env_?.SYKMELDINGER_ROOT}/${sykmelding.id}`;
    const history = useHistory();

    const getTitle = (): string => {
        if (sykmelding.papirsykmelding) {
            return 'Papirsykmelding';
        }
        if (sykmelding.egenmeldt) {
            return 'Egenmelding';
        }
        return 'Sykmelding';
    };

    return (
        <LenkepanelBase
            onMouseEnter={() => setIsHoverState(true)}
            onMouseLeave={() => setIsHoverState(false)}
            href={linkToSykmelding}
            onClick={(event) => {
                event.preventDefault();
                history.push(linkToSykmelding);
                window.scrollTo(0, 0);
            }}
            className={status === 'APEN' ? 'lenkepanel--alert' : ''}
            border
        >
            <div className="lenkepanel-content">
                <div className="lenkepanel-content__icon">
                    <LenkepanelIcon
                        hover={isHoverState}
                        behandlingsutfall={behandlingsutfallStatus}
                        isPaper={Boolean(sykmelding.papirsykmelding)}
                    />
                </div>
                <div className="lenkepanel-content__main-content">
                    <Normaltekst tag="p">{sykmelding.getReadableSykmeldingLength()}</Normaltekst>
                    <Undertittel tag="h3">{getTitle()}</Undertittel>
                    <ul>
                        {sykmelding.sykmeldingsperioder.map((periode, index) => (
                            <li key={index}>
                                <Normaltekst>{periode.getDescription(arbeidsgiverNavn)}</Normaltekst>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lenkepanel-content__status-text">
                    <LenkepanelEtikett status={status} behandlingsutfall={behandlingsutfallStatus} />
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel;
