import './SykmeldingsopplysningerContainer.less';

import React, { useState, useRef } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import Sykmeldingview from './Sykmeldingview';
import PlasterSvg from './Svg/PlasterSvg';
import ArbeidsgiverSvg from './Svg/ArbeidsgiverSvg';
import Lukknapp from '../Lukknapp/Lukknap';

interface SykmeldingsopplysningerProps {
    sykmelding: Sykmelding;
    expandable?: boolean;
    expandedDefault?: boolean;
    arbeidsgiver?: boolean;
}

const Sykmeldingsopplysninger: React.FC<SykmeldingsopplysningerProps> = ({
    sykmelding,
    expandable = true,
    expandedDefault = true,
    arbeidsgiver = false,
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);
    const elementRef = useRef<HTMLElement>(null);

    const title = arbeidsgiver ? 'Dette får arbeidsgiveren din se' : 'Din sykmelding';
    const contentId = `sykmelding-${sykmelding.id}-content${arbeidsgiver ? '-arbeidsgiver' : ''}`;
    const headerId = `sykmelding-${sykmelding.id}-header${arbeidsgiver ? '-arbeidsgiver' : ''}`;

    return (
        <article aria-labelledby={headerId} ref={elementRef} className="sykmeldingsopplysninger">
            {expandable === true ? (
                <button
                    id={headerId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={contentId}
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
                        {arbeidsgiver ? <ArbeidsgiverSvg /> : <PlasterSvg />}
                    </div>
                    <Undertittel className="sykmeldingsopplysninger__text" tag="h2">
                        {title}
                    </Undertittel>
                    <NavFrontendChevron type={expanded ? 'opp' : 'ned'} />
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
                id={contentId}
                aria-labelledby={headerId}
                aria-hidden={!expanded}
                className={`sykmeldingsopplysninger__content ${
                    expanded ? '' : 'sykmeldingsopplysninger__content--hidden'
                }`}
            >
                <Sykmeldingview sykmelding={sykmelding} arbeidsgiver={arbeidsgiver} />
                <Lukknapp onClick={() => setExpanded(false)} />
            </div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
