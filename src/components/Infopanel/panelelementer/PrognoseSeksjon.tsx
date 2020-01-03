import React from 'react';

import tekster from '../Infopanel-tekster';
import { Prognose } from '../../../types/sykmeldingTypes';
import EtikettMedTekst from '../layout/EtikettMedTekst';

interface PrognoseSeksjonProps {
    prognose?: Prognose;
}

const PrognoseSeksjon = ({ prognose }: PrognoseSeksjonProps) => {
    if (!prognose?.hensynArbeidsplassen) {
        return null;
    }
    return <EtikettMedTekst tittel={tekster['prognose.hensyn.tittel']} tekst={prognose.hensynArbeidsplassen} margin />;
};

export default PrognoseSeksjon;
