import React from 'react';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';

interface PanelSeksjonProps {
    tittel: string;
    verdi?: string;
    skjultForArbeidsgiverTekst?: string;
    innrykk?: boolean;
}

const PanelSeksjon = ({ tittel, verdi, skjultForArbeidsgiverTekst, innrykk }: PanelSeksjonProps) => {
    return (
        <div style={{ flex: '1', marginLeft: innrykk ? '2.3rem' : 'inherit' }}>
            <EtikettLiten>{tittel}</EtikettLiten>
            <Normaltekst>{verdi}</Normaltekst>
            {skjultForArbeidsgiverTekst && <Undertekst>{skjultForArbeidsgiverTekst}</Undertekst>}
        </div>
    );
};

export default PanelSeksjon;
