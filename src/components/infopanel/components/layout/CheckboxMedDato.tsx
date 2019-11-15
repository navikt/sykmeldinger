import React from 'react';
import Innrykk from './Innrykk';
import Margin from './Margin';
import { Checkbox } from 'nav-frontend-skjema';
import EtikettMedTekst from './EtikettMedTekst';

interface CheckboxMedDatoProps {
    checkboxTittel: string;
    checked: boolean;
    tittel: string;
    tekst?: string;
    margin?: boolean;
    innrykk?: boolean;
}

const CheckboxMedDato = ({ checkboxTittel, checked, tittel, tekst, margin, innrykk }: CheckboxMedDatoProps) => {
    const innhold = (
        <>
            <Checkbox label={checkboxTittel} checked={checked} readOnly />
            {tekst && <EtikettMedTekst tittel={tittel} tekst={tekst} innrykk margin />}
        </>
    );

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold;
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin;

    return <div style={{ flex: '1' }}>{medInnrykk}</div>;
};

export default CheckboxMedDato;
