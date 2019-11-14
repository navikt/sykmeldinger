import React from 'react';

import tekster from '../flereopplysninger-tekster';

import PanelSeksjon from '../components/PanelSeksjon';
import Margin from '../../Margin';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface ArbeidsevneProps {
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV }: ArbeidsevneProps) => {
    return (
        <PanelSeksjon tittel={tekster['arbeidsevne.tittel']}>
            <Margin>
                <Element>{tekster['arbeidsevne.tilrettelegging.tittel']}</Element>
                <Normaltekst>- {tiltakArbeidsplassen}</Normaltekst>
            </Margin>
            <Margin>
                <Element>{tekster['arbeidsevne.tiltak.tittel']}</Element>
                <Normaltekst>- {tiltakNAV}</Normaltekst>
            </Margin>
        </PanelSeksjon>
    );
};

export default Arbeidsevne;
