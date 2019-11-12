import React from 'react';
import { Prognose } from '../../../types/sykmeldingTypes';
import { Checkbox } from 'nav-frontend-skjema';

import PanelRad from './PanelRad';

import tekster from '../infopanel-tekster';

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

    return (
        <PanelRad>
            <Checkbox label={tekster['arbeidsufor.tittel']} checked readOnly />
        </PanelRad>
    );
};

export default ArbeidsuforSeksjon;
