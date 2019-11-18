import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import Innrykk from './Innrykk';
import Margin from './Margin';

interface ElementMedTekstProps {
    vis?: boolean;
    tittel: string;
    tekst?: string;
    innrykk?: boolean;
    margin?: boolean;
}

const ElementMedTekst = ({ vis, tittel, tekst, innrykk, margin }: ElementMedTekstProps) => {
    if (vis === false) {
        return null;
    }

    const innhold = (
        <>
            <Element>{tittel}</Element>
            {tekst && <Normaltekst>- {tekst}</Normaltekst>}
        </>
    );

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold;
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin;

    return medInnrykk;
};

export default ElementMedTekst;
