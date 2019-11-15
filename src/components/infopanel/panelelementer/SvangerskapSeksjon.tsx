import React from 'react';

import tekster from '../infopanel-tekster';
import EnkelCheckbox from '../layout/EnkelCheckbox';

interface SvangerskapSeksjonProps {
    svangerskap: boolean;
}

const SvangerskapSeksjon = ({ svangerskap }: SvangerskapSeksjonProps) => {
    if (!svangerskap) {
        return null;
    }
    return <EnkelCheckbox tittel={tekster['svangerskap.tittel']} checked margin />;
};

export default SvangerskapSeksjon;
