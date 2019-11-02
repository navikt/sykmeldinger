import React from 'react';
import { Link } from 'react-router-dom';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import { Sidetittel } from 'nav-frontend-typografi';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: false,
    },
];

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
                <p>hello world</p>
                <Link to="/sykmeldinger">Dine sykmeldinger</Link>
            </div>
        </>
    );
};

export default DittSykefravaer;
