import './Sykmeldingsopplysninger.less';

import React, { useState } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';

import plaster from './plaster.svg';

interface SykmeldingsopplysningerProps {
    title: string;
    expandable?: boolean;
    expandedDefault?: boolean;
    iconNormal: string;
    iconHover: string;
    type?: 'arbeidsgiver' | '';
    children: any | any[];
}

const Sykmeldingsopplysninger = ({
    title,
    children,
    expandable,
    expandedDefault = true,
    iconNormal,
    iconHover,
    type = '',
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);
    const [icon, setIcon] = useState(iconNormal);

    const typeClassname = type ? `-${type}` : '';
    const hiddenClassname = expanded ? '' : '-hidden';
    const imgAlt = 'Opplysningsikon';

    if (expandable) {
        return (
            <article className="sykmeldingsopplysninger">
                <button
                    onMouseEnter={() => setIcon(iconHover)}
                    onMouseLeave={() => setIcon(iconNormal)}
                    onClick={() => setExpanded(!expanded)}
                    className={`sykmeldingsopplysninger__header${typeClassname}${hiddenClassname} sykmeldingsopplysninger-expandable`}
                >
                    <img className="sykmeldingsopplysninger__icon" width={30} src={icon} alt={imgAlt} />
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
    }

    return (
        <article className="sykmeldingsopplysninger">
            <header className={`sykmeldingsopplysninger__header${typeClassname}`}>
                <img className="sykmeldingsopplysninger__icon" width={30} src={plaster} alt={imgAlt} />
                <span className="sykmeldingsopplysninger__text">
                    <Undertittel tag="h2">{title}</Undertittel>
                </span>
            </header>
            <div className="sykmeldingsopplysninger__content">{children}</div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
