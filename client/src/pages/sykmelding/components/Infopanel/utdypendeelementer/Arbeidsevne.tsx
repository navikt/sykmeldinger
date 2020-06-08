import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';

interface ArbeidsevneProps {
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV }: ArbeidsevneProps) => {
    if (!tiltakArbeidsplassen && !tiltakNAV) {
        return null;
    }

    return (
        <SeksjonMedTittel understrek tittel="Hva skal til for å bedre arbeidsevnen?">
            <ElementMedTekst
                tittel="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                tekst={tiltakArbeidsplassen}
                margin
                vis={!!tiltakArbeidsplassen}
            />
            <ElementMedTekst tittel="Tiltak i regi av NAV" tekst={tiltakNAV} margin vis={!!tiltakNAV} />
        </SeksjonMedTittel>
    );
};

export default Arbeidsevne;
