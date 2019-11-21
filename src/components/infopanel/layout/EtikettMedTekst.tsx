import React from 'react';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Innrykk from './Innrykk';
import Margin from './Margin';

interface EtikettMedTekstProps {
    tittel: string;
    tekst?: string;
    undertekst?: string;
    margin?: boolean;
    innrykk?: boolean;
}

const EtikettMedTekst = ({ tittel, tekst, undertekst, margin, innrykk }: EtikettMedTekstProps) => {
    const innhold = (
        <>
            <EtikettLiten>{tittel}</EtikettLiten>
            <Normaltekst>{tekst}</Normaltekst>
            {undertekst && <Undertekst>{undertekst}</Undertekst>}
        </>
    );

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold;
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin;

    return <div style={{ flex: '1 1 auto' }}>{medInnrykk}</div>;
};

export default EtikettMedTekst;
