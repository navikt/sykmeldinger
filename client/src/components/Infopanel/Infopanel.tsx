import './Infopanel.less';

import React from 'react';
import { Element } from 'nav-frontend-typografi';

import plaster from '../../svg/plaster.svg';

interface InfopanelProps {
    fargetema: string;
    tittel: string;
    children: any | any[];
}

const Infopanel = ({ fargetema, tittel, children }: InfopanelProps) => {
    return (
        <article className="infopanel">
            <header className={`infopanel-header infopanel-${fargetema}`}>
                <img className="infopanel-header-icon" src={plaster} alt="plasterikon" />{' '}
                <span className="infopanel-header-tekst">
                    <Element>{tittel}</Element>
                </span>
            </header>
            <div className="infopanel-content">{children}</div>
        </article>
    );
};

export default Infopanel;
