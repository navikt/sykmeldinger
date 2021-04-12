import './SykmeldingsopplysningerContainer.less';

import React, { useState, useRef } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Sykmeldingview from '../Sykmeldingview/Sykmeldingview';
import PlasterSvg from './Svg/PlasterSvg';
import PlasterHoverSvg from './Svg/PlasterHoverSvg';
import ArbeidsgiverSvg from './Svg/ArbeidsgiverSvg';
import ArbeidsgiverHoverSvg from './Svg/ArbeidsgiverHoverSvg';

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

    const icons = (() => {
        if (arbeidsgiver) {
            return { iconNormal: ArbeidsgiverSvg, iconHover: ArbeidsgiverHoverSvg };
        }
        return { iconNormal: PlasterSvg, iconHover: PlasterHoverSvg };
    })();
    const [icon, setIcon] = useState<JSX.Element>(icons.iconNormal);

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
                <div className="sykmeldingsopplysninger__icon">{icon}</div>
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
