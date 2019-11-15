import React from 'react';

import tekster from '../../infopanel-tekster';

import OpplysningerSeksjon from '../layout/OpplysningerSeksjon';
import ElementMedTekst from '../layout/ElementMedTekst';

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
