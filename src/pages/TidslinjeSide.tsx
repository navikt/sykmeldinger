import React, { useState, useEffect, useRef } from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import Tekstomrade from 'nav-frontend-tekstomrade';
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/brodsmuler';
import TidslinjeMedArbeidsgiver from '../components/tidslinje/TidslinjeMedArbeidsgiver';
import './TidslinjeSide.less';

const brodsmuler: Brodsmule[] = [
    {
        tittel: 'Ditt sykefravaer',
        sti: '/',
        erKlikkbar: true,
    },
    {
        tittel: 'Hva skjer under sykefraværet?',
        sti: '/tidslinje',
        erKlikkbar: false,
    },
];

const TidslinjeSide: React.FC = () => {
    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler}></Brodsmuler>
            <Sidetittel className="sidetittel">Hva skjer under sykefraværet?</Sidetittel>
            <Tekstomrade className="infoheader">
                På tidslinjen ser du hva som forventes av deg i løpet av sykefraværet. Oppgavene kan gjøres på andre
                tidspunkter hvis det er behov for det. Hvis du er for syk til å delta i jobb eller aktivitet, kan du få
                unntak fra enkelte av oppgavene
            </Tekstomrade>
            <span className="tidslinje">
                <TidslinjeMedArbeidsgiver />
            </span>
        </div>
    );
};

export default TidslinjeSide;
