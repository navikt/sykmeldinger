import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import './flereopplysninger.less';
import { Sykmelding } from '../../../../types/sykmeldingTypes';

import tekster from '../../infopanel-tekster';

import PanelInnhold from './components/PanelInnhold';

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

interface FlereOpplysningerProps {
    sykmelding: Sykmelding;
}

const FlereOpplysninger = ({ sykmelding }: FlereOpplysningerProps) => {
    return (
        <div className="ekspanderbart-panel">
            <EkspanderbartpanelBase heading={<PanelHeading tittel={tekster['flere-opplysninger.tittel']} />} border>
                <PanelInnhold sykmelding={sykmelding} />
            </EkspanderbartpanelBase>
        </div>
    );
};

export default FlereOpplysninger;
