import React from 'react';
import PanelRad from './PanelRad';
import PanelSeksjon from './PanelSeksjon';

import tekster from '../infopanel-tekster';

interface LegeSeksjonProps {
    navn: string;
}

const LegeSeksjon = ({ navn }: LegeSeksjonProps) => {
    return (
        <PanelRad>
            <PanelSeksjon tittel={tekster['lege.avsender.tittel']} verdi={navn} />
        </PanelRad>
    );
};

export default LegeSeksjon;
