import React from 'react';

import EnkelCheckbox from '../layout/EnkelCheckbox';
import tekster from '../Infopanel-tekster';
import { Prognose } from '../../../types/sykmeldingTypes';

interface ArbeidsuforSeksjonProps {
    prognose?: Prognose;
}

const ArbeidsuforSeksjon = ({ prognose }: ArbeidsuforSeksjonProps) => {
    if (!prognose) {
        return null;
    }

    if (prognose.arbeidsforEtterPeriode) {
        return null;
    }

    return <EnkelCheckbox tittel={tekster['arbeidsufor.tittel']} checked margin vis />;
};

export default ArbeidsuforSeksjon;
