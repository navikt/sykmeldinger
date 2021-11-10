import './SykmeldingsopplysningerContainer.less';

import React, { useRef } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Sykmelding } from '../../models/Sykmelding/Sykmelding';
import Sykmeldingview from './Sykmeldingview';
import ArbeidsgiverSvg from './Svg/ArbeidsgiverSvg';
import LegeSvg from './Svg/LegeSvg';

interface SykmeldingsopplysningerProps {
    sykmelding: Sykmelding;
    arbeidsgiver?: boolean;
}

const Sykmeldingsopplysninger: React.FC<SykmeldingsopplysningerProps> = ({
    sykmelding,
    arbeidsgiver = false,
}: SykmeldingsopplysningerProps) => {
    const elementRef = useRef<HTMLElement>(null);

    const title = arbeidsgiver ? 'Dette får arbeidsgiveren din se' : 'Opplysninger vi har mottatt fra behandleren din';
    const contentId = `sykmelding-${sykmelding.id}-content${arbeidsgiver ? '-arbeidsgiver' : ''}`;
    const headerId = `sykmelding-${sykmelding.id}-header${arbeidsgiver ? '-arbeidsgiver' : ''}`;

    return (
        <article aria-labelledby={headerId} ref={elementRef} className="sykmeldingsopplysninger">
            <header className="sykmeldingsopplysninger__header">
                <div className="sykmeldingsopplysninger__icon">
                    {arbeidsgiver ? <ArbeidsgiverSvg /> : <LegeSvg />}
                </div>
                <Undertittel className="sykmeldingsopplysninger__text" tag="h2">
                    {title}
                </Undertittel>
            </header>
            <div id={contentId} aria-labelledby={headerId} className="sykmeldingsopplysninger__content">
                <Sykmeldingview sykmelding={sykmelding} arbeidsgiver={arbeidsgiver} />
            </div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
