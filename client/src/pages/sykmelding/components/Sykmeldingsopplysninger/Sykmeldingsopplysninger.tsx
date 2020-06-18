import './Sykmeldingsopplysninger.less';

import React, { useState } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';

import plaster from './plaster.svg';

interface SykmeldingsopplysningerProps {
    children: any | any[];
    expandable?: boolean;
    expandedDefault?: boolean;
}

const Sykmeldingsopplysninger = ({ children, expandable, expandedDefault = true }: SykmeldingsopplysningerProps) => {
    const [expanded, setExpanded] = useState(expandedDefault);

    console.log(expandable);

    if (expandable) {
        return (
            <article className="sykmeldingsopplysninger">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={`sykmeldingsopplysninger__header${
                        expanded ? '' : '-hidden'
                    } sykmeldingsopplysninger-expandable`}
                >
                    <img className="sykmeldingsopplysninger__icon" width={30} src={plaster} alt="plasterikon" />
                    <span className="sykmeldingsopplysninger__text">
                        <Undertittel tag="h2">Opplysninger fra sykmeldingen</Undertittel>
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
            <header className="sykmeldingsopplysninger__header">
                <img className="sykmeldingsopplysninger__icon" width={30} src={plaster} alt="plasterikon" />
                <span className="sykmeldingsopplysninger__text">
                    <Undertittel tag="h2">Opplysninger fra sykmeldingen</Undertittel>
                </span>
            </header>
            <div className="sykmeldingsopplysninger__content">{children}</div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
