import './Sykmeldingsopplysninger.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';

import plaster from './plaster.svg';

interface SykmeldingsopplysningerProps {
    children: any | any[];
}

const Sykmeldingsopplysninger = ({ children }: SykmeldingsopplysningerProps) => {
    return (
        <article className="infopanel">
            <header className="infopanel-header">
                <img className="infopanel-header-icon" src={plaster} alt="plasterikon" />{' '}
                <span className="infopanel-header-tekst">
                    <Element>Opplysninger fra sykmeldingen</Element>
                </span>
            </header>
            <div className="infopanel-content">{children}</div>
        </article>
    );
};

export default Sykmeldingsopplysninger;
