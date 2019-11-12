import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import './ekspanderbartpanelwrapper.less';

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

interface EkspanderbartpanelWrapperProps {
    tittel: string;
    children?: JSX.Element[];
}

const EkspanderbartpanelWrapper = ({ tittel, children }: EkspanderbartpanelWrapperProps) => {
    if (!children || children.length === 0) {
        return null;
    }

    return (
        <div className="ekspanderbart-panel">
            <EkspanderbartpanelBase heading={<PanelHeading tittel={tittel} />} border>
                {children}
            </EkspanderbartpanelBase>
        </div>
    );
};

export default EkspanderbartpanelWrapper;
