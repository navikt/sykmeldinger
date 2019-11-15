import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import tekster from '../../infopanel-tekster';

import doktor from '../../../../svg/doktor.svg';

import './ekspanderbartpanel.less';

interface PanelHeadingProps {
    tittel: string;
}

const PanelHeading = ({ tittel }: PanelHeadingProps) => {
    return (
        <div className="ekspanderbartpanel-heading">
            <img className="ekspanderbartpanel-ikon" alt="doktor ikon" src={doktor} />
            <span>
                <strong className="ekspanderbartpanel-tekst">{tittel}</strong>
            </span>
        </div>
    );
};

interface EkspanderbartpanelProps {
    children: any | any[];
}

const Ekspanderbartpanel = ({ children }: EkspanderbartpanelProps) => {
    return (
        <div className="ekspanderbart-panel">
            <EkspanderbartpanelBase heading={<PanelHeading tittel={tekster['flere-opplysninger.tittel']} />} border>
                {children}
            </EkspanderbartpanelBase>
        </div>
    );
};

export default Ekspanderbartpanel;
