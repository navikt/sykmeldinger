import './SykmeldingsopplysningerContainer.less';

import React, { useState, useRef } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import Sykmeldingview from '../Sykmeldingview/Sykmeldingview';
import PlasterSvg from './Svg/PlasterSvg';
import ArbeidsgiverSvg from './Svg/ArbeidsgiverSvg';

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
    const elementRef = useRef<HTMLElement>(null);

    return (
        <article id={id} ref={elementRef} className="sykmeldingsopplysninger">
            {arbeidsgiver === true ? (
                <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => {
                        if (!expanded) {
                            setTimeout(() => {
                                elementRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 200);
                        }
                        setExpanded(!expanded);
                    }}
                    className={`sykmeldingsopplysninger__header ${
                        arbeidsgiver === true ? 'sykmeldingsopplysninger__header--bg-orange' : ''
                    } sykmeldingsopplysninger__header--expandable`}
                >
                    <div className="sykmeldingsopplysninger__icon">
                        <ArbeidsgiverSvg />
                    </div>
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
            ) : (
                <header className="sykmeldingsopplysninger__header">
                    <div className="sykmeldingsopplysninger__icon">
                        <PlasterSvg />
                    </div>
                    <Undertittel className="sykmeldingsopplysninger__text" tag="h2">
                        {title}
                    </Undertittel>
                </header>
            )}
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
