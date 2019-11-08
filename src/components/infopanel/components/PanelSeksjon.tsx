import React from 'react';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';

interface PanelSeksjonProps {
    tittel: string;
    verdi: string;
    skjultForArbeidsgiverTekst?: string;
}

const PanelSeksjon = ({ tittel, verdi, skjultForArbeidsgiverTekst }: PanelSeksjonProps) => {
    return (
        <div style={{ flex: '1' }}>
            <EtikettLiten>{tittel}</EtikettLiten>
            <Normaltekst>{verdi}</Normaltekst>
            {skjultForArbeidsgiverTekst && <Undertekst>{skjultForArbeidsgiverTekst}</Undertekst>}
        </div>
    );
};

export default PanelSeksjon;
