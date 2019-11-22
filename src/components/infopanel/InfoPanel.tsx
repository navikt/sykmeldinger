import React from 'react';
import { Element } from 'nav-frontend-typografi';

import plaster from '../../svg/plaster.svg';

import './infopanel.less';

interface InfoPanelProps {
    fargetema: string;
    tittel: string;
    children: any | any[];
}

const InfoPanel = ({ fargetema, tittel, children }: InfoPanelProps) => {
    return (
        <article className="infopanel">
            <header className={`infopanel-header infopanel-${fargetema}`}>
                <img className="infopanel-header-icon" src={plaster} alt="plasterikon" />{' '}
                <span>
                    <Element>{tittel}</Element>
                </span>
            </header>
            <div className="infopanel-content">{children}</div>
        </article>
    );
};

export default InfoPanel;
