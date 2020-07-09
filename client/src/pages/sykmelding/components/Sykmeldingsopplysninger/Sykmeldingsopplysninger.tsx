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
    children: any | any[];
}

const Sykmeldingsopplysninger = ({
    title,
    children,
    expandedDefault = true,
    type = 'NORMAL',
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);

    const iconNormal = type === 'ARBEIDSGIVER' ? arbeidsgiver : plaster;
    const iconHover = type === 'ARBEIDSGIVER' ? arbeidsgiverHover : plasterHover;
    const [icon, setIcon] = useState(iconNormal);

    const typeClassname = type === 'ARBEIDSGIVER' ? `-${type}` : '';
    const hiddenClassname = expanded ? '' : '-hidden';

    return (
        <article className="sykmeldingsopplysninger">
            <button
                onMouseEnter={() => setIcon(iconHover)}
                onMouseLeave={() => setIcon(iconNormal)}
                onClick={() => setExpanded(!expanded)}
                className={`sykmeldingsopplysninger__header${typeClassname}${hiddenClassname} sykmeldingsopplysninger-expandable`}
            >
                <img className="sykmeldingsopplysninger__icon" width={30} src={icon} alt="Opplysniger" />
                <span className="sykmeldingsopplysninger__text">
                    <Undertittel tag="h2">{title}</Undertittel>
                </span>
                <div className="sykmeldingsopplysninger__expand">
                    <Normaltekst className="sykmeldingsopplysninger__expand__text" tag="em">
                        {expanded ? 'Lukk' : 'Åpne'}
                    </Normaltekst>
                    <NavFrontendChevron type={expanded ? 'opp' : 'ned'} />
                </div>
            </button>
            <div className={`sykmeldingsopplysninger__content${expanded ? '' : '-hidden'}`}>{children}</div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
