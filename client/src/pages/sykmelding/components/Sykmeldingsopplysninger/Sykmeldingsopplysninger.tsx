import './Sykmeldingsopplysninger.less';

import React, { useState, useRef } from 'react';
import { Undertittel, Normaltekst, Element } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import plaster from './svg/plaster.svg';
import plasterHover from './svg/plasterHover.svg';
import arbeidsgiver from './svg/arbeidsgiver.svg';
import arbeidsgiverHover from './svg/arbeidsgiverHover.svg';
import doktor from './svg/doktor.svg';
import doktorHover from './svg/doktorHover.svg';

interface SykmeldingsopplysningerProps {
    id: string;
    title: string;
    expandedDefault?: boolean;
    type?: 'NORMAL' | 'ARBEIDSGIVER' | 'FLERE_OPPLYSNINGER';
    children: React.ReactNode | React.ReactChild | React.ReactChildren;
}

const Sykmeldingsopplysninger = ({
    id,
    title,
    expandedDefault = true,
    type = 'NORMAL',
    children,
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);
    const elementRef = useRef(document.createElement('article'));

    const icons: { iconNormal: string; iconHover: string } = (() => {
        switch (type) {
            case 'ARBEIDSGIVER':
                return { iconNormal: arbeidsgiver, iconHover: arbeidsgiverHover };
            case 'NORMAL':
                return { iconNormal: plaster, iconHover: plasterHover };
            case 'FLERE_OPPLYSNINGER':
                return { iconNormal: doktor, iconHover: doktorHover };
        }
    })();
    const [icon, setIcon] = useState(icons.iconNormal);

    const classStyleModifier: string = (() => {
        switch (type) {
            case 'ARBEIDSGIVER':
                return 'sykmeldingsopplysninger__header--bg-violet';
            case 'FLERE_OPPLYSNINGER':
                return 'sykmeldingsopplysninger__header--bg-white';
            case 'NORMAL':
                return '';
        }
    })();

    return (
        <article id={id} ref={elementRef} className="sykmeldingsopplysninger">
            <button
                aria-expanded={expanded}
                onMouseEnter={() => setIcon(icons.iconHover)}
                onMouseLeave={() => setIcon(icons.iconNormal)}
                onClick={() => {
                    if (!expanded) {
                        setTimeout(() => {
                            elementRef.current.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                    }
                    setExpanded(!expanded);
                }}
                className={`sykmeldingsopplysninger__header ${classStyleModifier}`}
            >
                <img aria-hidden="true" className="sykmeldingsopplysninger__icon" src={icon} alt="Opplysniger" />
                {type === 'FLERE_OPPLYSNINGER' ? (
                    <Element className="sykmeldingsopplysninger__text" tag="h3">
                        {title}
                    </Element>
                ) : (
                    <Undertittel className="sykmeldingsopplysninger__text" tag="h2">
                        {title}
                    </Undertittel>
                )}
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
