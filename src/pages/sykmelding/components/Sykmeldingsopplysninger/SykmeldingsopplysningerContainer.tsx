import './SykmeldingsopplysningerContainer.less';

import React, { useState, useRef } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import plaster from './svg/plaster.svg';
import plasterHover from './svg/plasterHover.svg';
import arbeidsgiverSvg from './svg/arbeidsgiver.svg';
import arbeidsgiverHover from './svg/arbeidsgiverHover.svg';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Sykmeldingview from '../Sykmeldingview/Sykmeldingview';

interface SykmeldingsopplysningerProps {
    id: string;
    title: string;
    sykmelding: Sykmelding;
    expandedDefault?: boolean;
    arbeidsgiver?: boolean;
}

const Sykmeldingsopplysninger: React.FC<SykmeldingsopplysningerProps> = ({
    id,
    title,
    sykmelding,
    expandedDefault = true,
    arbeidsgiver = false,
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);
    const elementRef = useRef(document.createElement('article'));

    const icons: { iconNormal: string; iconHover: string } = (() => {
        if (arbeidsgiver) {
            return { iconNormal: arbeidsgiverSvg, iconHover: arbeidsgiverHover };
        }
        return { iconNormal: plaster, iconHover: plasterHover };
    })();
    const [icon, setIcon] = useState(icons.iconNormal);

    const classStyleModifier: string = (() => {
        if (arbeidsgiver) {
            return 'sykmeldingsopplysninger__header--bg-violet';
        }
        return '';
    })();

    return (
        <article id={id} ref={elementRef} className="sykmeldingsopplysninger">
            <button
                type="button"
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
                <Sykmeldingview sykmelding={sykmelding} arbeidsgiver={arbeidsgiver} />
            </div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
