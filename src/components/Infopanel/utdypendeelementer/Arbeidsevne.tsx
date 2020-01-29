import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import tekster from '../Infopanel-tekster';

interface ArbeidsevneProps {
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV }: ArbeidsevneProps) => {
    if (!tiltakArbeidsplassen && !tiltakNAV) {
        return null;
    }

    return (
        <SeksjonMedTittel understrek tittel={tekster['arbeidsevne.tittel']}>
            <ElementMedTekst
                tittel={tekster['arbeidsevne.tilrettelegging.tittel']}
                tekst={tiltakArbeidsplassen}
                margin
                vis={!!tiltakArbeidsplassen}
            />
            <ElementMedTekst tittel={tekster['arbeidsevne.tiltak.tittel']} tekst={tiltakNAV} margin vis={!!tiltakNAV} />
        </SeksjonMedTittel>
    );
};

export default Arbeidsevne;
