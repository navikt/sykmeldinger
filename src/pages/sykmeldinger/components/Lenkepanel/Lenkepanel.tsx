import React, { useState } from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { toReadableTotalPeriodLength } from '../../../../utils/datoUtils';
import { useHistory } from 'react-router-dom';
import { getPeriodDescriptionStrings } from '../../../../utils/periodeUtils';
import LenkepanelIcon from './LenkepanelIcon';
import LenkepanelEtikett from './LenkepanelEtikett';
import './Lenkepanel.less';
import { Sykmelding } from '../../../../types/sykmelding';

interface LenkepanelProps {
    sykmelding: Sykmelding;
}

const Lenkepanel: React.FC<LenkepanelProps> = ({ sykmelding }) => {
    const status = sykmelding.sykmeldingStatus.statusEvent;
    const behandlingsutfallStatus = sykmelding.behandlingsutfall.status;
    const sykmeldingsperioder = sykmelding.sykmeldingsperioder;
    const arbeidsgiverNavn = sykmelding.arbeidsgiver?.navn;

    const [isHoverState, setIsHoverState] = useState<boolean>(false);

    const periodeString = toReadableTotalPeriodLength(sykmeldingsperioder);

    const linkToSykmelding = `${window._env_?.SYKMELDINGER_ROOT}/${sykmelding.id}`;
    const history = useHistory();

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
                <LenkepanelIcon
                    hover={isHoverState}
                    behandlingsutfall={behandlingsutfallStatus}
                    isPaper={Boolean(sykmelding.papirsykmelding)}
                />
                <div className="lenkepanel-content__main-content">
                    <Normaltekst tag="p">{periodeString}</Normaltekst>
                    <Undertittel tag="h3">{sykmelding.papirsykmelding ? 'Papirsykmelding' : 'Sykmelding'}</Undertittel>
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
                <div className="lenkepanel-content__status-text">
                    <LenkepanelEtikett status={status} behandlingsutfall={behandlingsutfallStatus} />
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel;
