import React from 'react';
import PanelRad from '../PanelRad';
import PanelSeksjon from '../PanelSeksjon';

import tekster from './fraver-tekster';

import { AnnenFraversArsak } from '../../../../types/sykmeldingTypes';

interface FraverSeksjonProps {
    fraver?: AnnenFraversArsak;
}

const FraverSeksjon = ({ fraver }: FraverSeksjonProps) => {
    if (!fraver || !fraver.beskrivelse) {
        return null;
    }

    return (
        <PanelRad>
            <PanelSeksjon tittel={tekster['fraver.tittel']} verdi={fraver.beskrivelse} />
        </PanelRad>
    );
};

export default FraverSeksjon;
