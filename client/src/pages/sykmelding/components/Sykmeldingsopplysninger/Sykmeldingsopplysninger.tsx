import './Sykmeldingsopplysninger.less';

import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import plaster from './plaster.svg';

interface SykmeldingsopplysningerProps {
    children: any | any[];
}

const Sykmeldingsopplysninger = ({ children }: SykmeldingsopplysningerProps) => {
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
