import React, { useState } from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';

import env from '../../../../utils/env';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';

import LenkepanelIcon from './LenkepanelIcon';
import LenkepanelEtikett from './LenkepanelEtikett';
import styles from './Lenkepanel.module.css';

interface LenkepanelProps {
    sykmelding: Sykmelding;
    isNew: boolean;
}

const Lenkepanel: React.FC<LenkepanelProps> = ({ sykmelding, isNew }) => {
    const status = sykmelding.sykmeldingStatus.statusEvent;
    const behandlingsutfallStatus = sykmelding.behandlingsutfall.status;
    const arbeidsgiverNavn = sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn;

    const [isHoverState, setIsHoverState] = useState<boolean>(false);

    const linkToSykmelding = `${env.SYKMELDINGER_ROOT}/${sykmelding.id}`;
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
            className={isNew ? styles.lenkepanelAlert : ''}
            border
        >
            <div className={styles.lenkepanelContent}>
                <div className={styles.icon}>
                    <LenkepanelIcon
                        hover={isHoverState}
                        behandlingsutfall={behandlingsutfallStatus}
                        isPaper={Boolean(sykmelding.papirsykmelding)}
                    />
                </div>
                <div className={styles.mainContent}>
                    <Normaltekst tag="p">{sykmelding.getReadableSykmeldingLength()}</Normaltekst>
                    <Undertittel tag="h3">{sykmelding.getSykmeldingTitle()}</Undertittel>
                    <ul>
                        {sykmelding.sykmeldingsperioder.map((periode, index) => (
                            <li key={index}>
                                <Normaltekst>{periode.getDescription(arbeidsgiverNavn)}</Normaltekst>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.statusText}>
                    <LenkepanelEtikett status={status} behandlingsutfall={behandlingsutfallStatus} />
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel;
