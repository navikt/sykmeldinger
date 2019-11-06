import React from 'react';
import { Link } from 'react-router-dom';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import { Sidetittel } from 'nav-frontend-typografi';
import DinArbeidssituasjon from '../components/DinArbeidssituasjon';
import NaermesteLeder from '../types/naermesteLederTypes';
import Lenkepanel from 'nav-frontend-lenkepanel';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: false,
    },
];

const tempLedere = [Object.assign(new NaermesteLeder(), { navn: 'Navn Navnesen', organisasjonsnavn: 'Pontypandy Fireservice' })];

const DittSykefravaer: React.FC = () => {
    return (
        <>
            <div className="sidebanner">
                <div className="sidebanner__innhold">
                    <Brodsmuler brodsmuler={brodsmuler} />
                    <Sidetittel>Ditt sykefravaer</Sidetittel>
                </div>
            </div>
            <div className="limit">
                <DinArbeidssituasjon naermesteLedere={tempLedere} />
                <Lenkepanel href="/sykmeldinger" tittelProps="undertittel" border>Dine Sykmeldinger</Lenkepanel>
                <Lenkepanel href="#" tittelProps="undertittel" border>Søknader om sykepenger</Lenkepanel>
                <Lenkepanel href="#" tittelProps="undertittel" border>Oppfølgingsplaner</Lenkepanel>
                <Lenkepanel href="#" tittelProps="undertittel" border>Hva skjer under sykefraværet?</Lenkepanel>
            </div>
        </>
    );
};

export default DittSykefravaer;
