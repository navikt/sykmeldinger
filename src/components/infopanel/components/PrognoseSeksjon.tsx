import React from 'react';
import PanelRad from './PanelRad';
import PanelSeksjon from './PanelSeksjon';

import tekster from '../infopanel-tekster';
import { Prognose } from '../../../types/sykmeldingTypes';

interface PrognoseSeksjonProps {
    prognose?: Prognose;
}

const PrognoseSeksjon = ({ prognose }: PrognoseSeksjonProps) => {
    if (!prognose || !prognose.hensynArbeidsplassen) {
        return null;
    }
    return (
        <PanelRad>
            <PanelSeksjon tittel={tekster['prognose.hensyn.tittel']} verdi={prognose.hensynArbeidsplassen} />
        </PanelRad>
    );
};

export default PrognoseSeksjon;
