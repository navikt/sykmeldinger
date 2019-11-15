import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import './flereopplysninger.less';
import { Sykmelding } from '../../../../types/sykmeldingTypes';

import tekster from '../../infopanel-tekster';

import BehandlingsDatoer from './components/BehandlingsDatoer';
import Friskmelding from './components/Friskmelding';
import UtdypendeOpplysninger from './components/UtdypendeOpplysninger';
import Arbeidsevne from './components/Arbeidsevne';
import OpplysningerSeksjon from './components/OpplysningerSeksjon';
import ElementMedTekst from './components/ElementMedTekst';

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
            <EkspanderbartpanelBase
                apen
                heading={<PanelHeading tittel={tekster['flere-opplysninger.tittel']} />}
                border
            >
                <BehandlingsDatoer
                    behandletTidspunkt={sykmelding.behandletTidspunkt}
                    syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                />
                <div>mulighet for arbeid</div> <hr />
                <Friskmelding prognose={sykmelding.prognose} />
                <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
                <Arbeidsevne tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} tiltakNAV={sykmelding.tiltakNAV} />
                <OpplysningerSeksjon tittel="Annet" utenUnderstrek>
                    <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
                </OpplysningerSeksjon>
            </EkspanderbartpanelBase>
        </div>
    );
};

export default FlereOpplysninger;
