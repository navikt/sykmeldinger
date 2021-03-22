import React from 'react';
import Prognose from '../../../../../types/sykmelding/Prognose';

import EnkelCheckbox from '../layout/Checkbox/EnkelCheckbox';

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

    return <EnkelCheckbox tittel="Pasienten er 100 % arbeidsfør etter perioden" checked margin vis />;
};

export default ArbeidsuforSeksjon;
