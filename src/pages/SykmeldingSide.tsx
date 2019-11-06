import React from 'react';

import Sykmelding from '../components/sykmelding/sykmelding';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmeldinger',
        sti: '/sykmeldinger',
        erKlikkbar: true,
    },
    {
        tittel: 'Sykmelding',
        sti: '/sykmeldinger/:id',
        erKlikkbar: false,
    },
];

const SykmeldingSide: React.FC = () => {
    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler} />
            <p>Sykmelding side</p>
            <Sykmelding sykmeldingtype={'NY'} />
        </div>
    );
};

export default SykmeldingSide;
