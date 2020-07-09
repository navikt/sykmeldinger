import './Sykmeldingsopplysninger.less';

import React, { useState } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import plaster from './plaster.svg';
import plasterHover from './plasterHover.svg';
import arbeidsgiver from './arbeidsgiver.svg';
import arbeidsgiverHover from './arbeidsgiverHover.svg';

interface SykmeldingsopplysningerProps {
    title: string;
    expandedDefault?: boolean;
    type?: 'NORMAL' | 'ARBEIDSGIVER';
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
}

const Sykmeldingsopplysninger = ({
    title,
    expandedDefault = true,
    type = 'NORMAL',
    children,
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);

    const iconNormal = type === 'ARBEIDSGIVER' ? arbeidsgiver : plaster;
    const iconHover = type === 'ARBEIDSGIVER' ? arbeidsgiverHover : plasterHover;
    const [icon, setIcon] = useState(iconNormal);

    return (
        <article className="sykmeldingsopplysninger">
            <button
                onMouseEnter={() => setIcon(iconHover)}
                onMouseLeave={() => setIcon(iconNormal)}
                onClick={() => setExpanded(!expanded)}
                className={`sykmeldingsopplysninger__header ${
                    type === 'ARBEIDSGIVER' ? 'sykmeldingsopplysninger__header--ARBEIDSGIVER' : ''
                }`}
            >
                <img className="sykmeldingsopplysninger__icon" src={icon} alt="Opplysniger" />
                <Undertittel className="sykmeldingsopplysninger__text" tag="h2">
                    {title}
                </Undertittel>
                <div className="sykmeldingsopplysninger__expand">
                    <Normaltekst className="sykmeldingsopplysninger__expand-text">
                        {expanded ? 'Lukk' : 'Åpne'}
                    </Normaltekst>
                    <NavFrontendChevron type={expanded ? 'opp' : 'ned'} />
                </div>
            </button>
            <div
                className={`sykmeldingsopplysninger__content ${
                    expanded ? '' : 'sykmeldingsopplysninger__content--hidden'
                }`}
            >
                {children}
            </div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
