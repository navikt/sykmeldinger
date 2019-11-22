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
        <article className="panel">
            <header className={`panel-header panel-${fargetema}`}>
                <img className="panel-header-icon" src={plaster} alt="plasterikon" />{' '}
                <span>
                    <Element>{tittel}</Element>
                </span>
            </header>
            <div className="panel-content">{children}</div>
        </article>
    );
};

export default InfoPanel;
