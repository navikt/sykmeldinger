import React from 'react';
import Innrykk from './Innrykk';
import Margin from './Margin';
import boks from '../../../svg/boks.svg';
import sjekkboks from '../../../svg/sjekkboks.svg';
import { Normaltekst, Element } from 'nav-frontend-typografi';

interface EnkelCheckboxProps {
    tittel: string;
    checked: boolean;
    margin?: boolean;
    innrykk?: boolean;
    bold?: boolean;
}

const EnkelCheckbox = ({ tittel, checked, margin, innrykk, bold }: EnkelCheckboxProps) => {
    const innhold = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ marginRight: '1rem' }} src={checked ? sjekkboks : boks} alt="sjekkboks ikon" />
            <span>{bold ? <Element>{tittel}</Element> : <Normaltekst>{tittel}</Normaltekst>}</span>
        </div>
    );

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold;
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin;

    return <div style={{ flex: '1' }}>{medInnrykk}</div>;
};

export default EnkelCheckbox;
