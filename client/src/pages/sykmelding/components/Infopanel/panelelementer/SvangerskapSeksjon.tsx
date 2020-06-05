import React from 'react';

import EnkelCheckbox from '../layout/Checkbox/EnkelCheckbox';
import tekster from '../Infopanel-tekster';

interface SvangerskapSeksjonProps {
    svangerskap: boolean;
}

const SvangerskapSeksjon = ({ svangerskap }: SvangerskapSeksjonProps) => {
    if (!svangerskap) {
        return null;
    }
    return <EnkelCheckbox tittel={tekster['svangerskap.tittel']} checked margin vis />;
};

export default SvangerskapSeksjon;
