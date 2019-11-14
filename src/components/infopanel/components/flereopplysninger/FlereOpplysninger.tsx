import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import './flereopplysninger.less';
import { Sykmelding } from '../../../../types/sykmeldingTypes';

import tekster from '../../infopanel-tekster';

import BehandlingsDatoer from './components/BehandlingsDatoer';
import Friskmelding from './components/Friskmelding';

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
                <BehandlingsDatoer
                    behandletTidspunkt={sykmelding.behandletTidspunkt}
                    syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                />
                <div>mulighet for arbeid</div> <hr />
                <Friskmelding prognose={sykmelding.prognose} />
                <div>utdypende opplysninger</div> <hr />
                <div>hva skal til for å bedre arbeidsevnen</div> <hr />
                <div>annet</div> <hr />
            </EkspanderbartpanelBase>
        </div>
    );
};

export default FlereOpplysninger;
