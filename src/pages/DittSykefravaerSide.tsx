import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import { Sidetittel } from 'nav-frontend-typografi';
import DinArbeidssituasjon from '../components/DinArbeidssituasjon';
import NaermesteLeder from '../types/naermesteLederTypes';
import Lenkepanel from 'nav-frontend-lenkepanel';
import Tekstomrade from 'nav-frontend-tekstomrade';
import Sporsmal from '../components/sporsmal/sporsmal';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: false,
    },
];

const tempLedere = [
    Object.assign(new NaermesteLeder(), { navn: 'Navn Navnesen', organisasjonsnavn: 'Pontypandy Fireservice' }),
];

const DittSykefravaer: React.FC = () => {
    const history = useHistory();

    return (
        <>
            <div className="sidebanner">
                <div className="sidebanner__innhold">
                    <Brodsmuler brodsmuler={brodsmuler} />
                    <Sidetittel>Ditt sykefravaer</Sidetittel>
                </div>
            </div>
            <div className="limit">
                <Sporsmal />
                <DinArbeidssituasjon naermesteLedere={tempLedere} />
                <Lenkepanel
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        history.push('/sykmeldinger');
                    }}
                    tittelProps="undertittel"
                    border
                >
                    Dine Sykmeldinger
                </Lenkepanel>
                <Lenkepanel href="#" tittelProps="undertittel" border>
                    Søknader om sykepenger
                </Lenkepanel>
                <Lenkepanel href="#" tittelProps="undertittel" border>
                    Oppfølgingsplaner
                </Lenkepanel>
                <Lenkepanel href="#" tittelProps="undertittel" border>
                    Hva skjer under sykefraværet?
                </Lenkepanel>
                <Tekstomrade>
                    NAV bruker personopplysninger til å utarbeide statistikk, utredninger og analyser. Dette gjør vi for
                    å øke vår kunnskap om hva som fungerer, og for å kunne forbedre NAVs tjenester. Personopplysningene
                    behandles da i en form som gjør at det ikke er mulig å knytte opplysningene direkte til
                    enkeltpersoner.
                </Tekstomrade>
            </div>
        </>
    );
};

export default DittSykefravaer;
