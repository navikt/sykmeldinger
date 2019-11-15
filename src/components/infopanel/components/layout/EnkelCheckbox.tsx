import React from 'react';
import Innrykk from './Innrykk';
import Margin from './Margin';
import { Checkbox } from 'nav-frontend-skjema';

interface EnkelCheckboxProps {
    tittel: string;
    checked: boolean;
    margin?: boolean;
    innrykk?: boolean;
}

const EnkelCheckbox = ({ tittel, checked, margin, innrykk }: EnkelCheckboxProps) => {
    const innhold = (
        <>
            <Checkbox label={tittel} checked={checked} readOnly />
        </>
    );

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold;
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin;

    return <div style={{ flex: '1' }}>{medInnrykk}</div>;
};

export default EnkelCheckbox;
