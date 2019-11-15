import React from 'react';

import tekster from '../flereopplysninger-tekster';

import OpplysningerSeksjon from './OpplysningerSeksjon';
import ElementMedTekst from './ElementMedTekst';

interface ArbeidsevneProps {
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV }: ArbeidsevneProps) => {
    return (
        <OpplysningerSeksjon tittel={tekster['arbeidsevne.tittel']}>
            <ElementMedTekst
                tittel={tekster['arbeidsevne.tilrettelegging.tittel']}
                tekst={tiltakArbeidsplassen}
                margin
            />
            <ElementMedTekst tittel={tekster['arbeidsevne.tiltak.tittel']} tekst={tiltakNAV} margin />
        </OpplysningerSeksjon>
    );
};

export default Arbeidsevne;
