import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import tekster from '../Infopanel-tekster';

interface ArbeidsevneProps {
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV }: ArbeidsevneProps) => {
    return (
        <SeksjonMedTittel understrek tittel={tekster['arbeidsevne.tittel']}>
            <ElementMedTekst
                tittel={tekster['arbeidsevne.tilrettelegging.tittel']}
                tekst={tiltakArbeidsplassen}
                margin
            />
            <ElementMedTekst tittel={tekster['arbeidsevne.tiltak.tittel']} tekst={tiltakNAV} margin />
        </SeksjonMedTittel>
    );
};

export default Arbeidsevne;
