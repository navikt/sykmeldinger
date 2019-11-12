import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';

import PanelRad from '../PanelRad';

import tekster from './svangerskap-tekster';

interface SvangerskapSeksjonProps {
    svangerskap: boolean;
}

const SvangerskapSeksjon = ({ svangerskap }: SvangerskapSeksjonProps) => {
    if (!svangerskap) {
        return null;
    }
    return (
        <PanelRad>
            <Checkbox label={tekster['svangerskap.tittel']} checked readOnly />
        </PanelRad>
    );
};

export default SvangerskapSeksjon;
