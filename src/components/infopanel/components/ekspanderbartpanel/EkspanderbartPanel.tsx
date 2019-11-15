import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import tekster from '../../infopanel-tekster';

import './ekspanderbartpanel.less';

interface PanelHeadingProps {
    tittel: string;
}

const PanelHeading = ({ tittel }: PanelHeadingProps) => {
    return (
        <div className="ekspanderbartpanel-heading">
            <div className="ekspanderbartpanel-ikon">ikon</div>
            <div className="ekspanderbartpanel-tekst">{tittel}</div>
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
