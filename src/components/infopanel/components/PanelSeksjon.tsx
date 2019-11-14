import React from 'react';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Innrykk from './Innrykk';

interface PanelSeksjonProps {
    tittel: string;
    verdi?: string;
    skjultForArbeidsgiverTekst?: string;
    innrykk?: boolean;
}

const PanelSeksjon = ({ tittel, verdi, skjultForArbeidsgiverTekst, innrykk }: PanelSeksjonProps) => {
    const innhold = (
        <>
            <EtikettLiten>{tittel}</EtikettLiten>
            <Normaltekst>{verdi}</Normaltekst>
            {skjultForArbeidsgiverTekst && <Undertekst>{skjultForArbeidsgiverTekst}</Undertekst>}
        </>
    );

    return <div style={{ flex: '1' }}>{innrykk ? <Innrykk>{innhold}</Innrykk> : innhold}</div>;
};

export default PanelSeksjon;
