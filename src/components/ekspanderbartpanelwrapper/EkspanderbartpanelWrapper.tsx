import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { Element } from 'nav-frontend-typografi';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import './ekspanderbartpanelwrapper.less';

interface EkspanderbartpanelWrapperProps {
    sykmelding: Sykmelding;
}

const PanelHeading = () => {
    return (
        <div className="ekspanderbartpanel-heading">
            <div className="ekspanderbartpanel-ikon">ikon</div>
            <div className="ekspanderbartpanel-tekst">Flere opplysninger fra den som har sykmeldt deg</div>
            <Element className="ekspanderbartpanel-chevron-tekst">Åpne</Element>
        </div>
    );
};

const EkspanderbartpanelWrapper = () => {
    return (
        <div className="ekspanderbart-panel">
            <EkspanderbartpanelBase heading={<PanelHeading />} border>
                innhold
            </EkspanderbartpanelBase>
        </div>
    );
};

export default EkspanderbartpanelWrapper;
