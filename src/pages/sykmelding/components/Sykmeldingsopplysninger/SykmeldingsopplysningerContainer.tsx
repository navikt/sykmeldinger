import './SykmeldingsopplysningerContainer.less';

import React, { useState, useRef } from 'react';
import { Undertittel, Normaltekst, Element } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import plaster from './svg/plaster.svg';
import plasterHover from './svg/plasterHover.svg';
import arbeidsgiver from './svg/arbeidsgiver.svg';
import arbeidsgiverHover from './svg/arbeidsgiverHover.svg';
import doktor from './svg/doktor.svg';
import doktorHover from './svg/doktorHover.svg';
import SykmeldingsopplysningerNormal from './SykmeldingVariants/SykmeldingsopplysningerNormal';
import { Sykmelding } from '../../../../models/Sykmelding/Sykmelding';
import SykmeldingsopplysningerArbeidsgiver from './SykmeldingVariants/SykmeldingsopplysningerArbeidsgiver';
import SykmeldingsopplysningerAvvist from './SykmeldingVariants/SykmeldingsopplysningerAvvist';

interface SykmeldingsopplysningerProps {
    id: string;
    title: string;
    sykmelding: Sykmelding;
    expandedDefault?: boolean;
    type?: 'NORMAL' | 'AVVIST' | 'ARBEIDSGIVER' | 'FLERE_OPPLYSNINGER';
}

const Sykmeldingsopplysninger: React.FC<SykmeldingsopplysningerProps> = ({
    id,
    title,
    sykmelding,
    expandedDefault = true,
    type = 'NORMAL',
}: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);
    const elementRef = useRef(document.createElement('article'));

    const icons: { iconNormal: string; iconHover: string } = (() => {
        switch (type) {
            case 'ARBEIDSGIVER':
                return { iconNormal: arbeidsgiver, iconHover: arbeidsgiverHover };
            case 'FLERE_OPPLYSNINGER':
                return { iconNormal: doktor, iconHover: doktorHover };
            default:
                return { iconNormal: plaster, iconHover: plasterHover };
        }
    })();
    const [icon, setIcon] = useState(icons.iconNormal);

    const classStyleModifier: string = (() => {
        switch (type) {
            case 'ARBEIDSGIVER':
                return 'sykmeldingsopplysninger__header--bg-violet';
            case 'FLERE_OPPLYSNINGER':
                return 'sykmeldingsopplysninger__header--bg-white';
            default:
                return '';
        }
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
                {type === 'NORMAL' && <SykmeldingsopplysningerNormal sykmelding={sykmelding} />}
                {type === 'AVVIST' && <SykmeldingsopplysningerAvvist sykmelding={sykmelding} />}
                {type === 'ARBEIDSGIVER' && <SykmeldingsopplysningerArbeidsgiver sykmelding={sykmelding} />}
            </div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
