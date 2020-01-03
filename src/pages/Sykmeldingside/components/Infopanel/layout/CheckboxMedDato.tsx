import React from 'react';
import Innrykk from './Innrykk';
import Margin from './Margin';
import boks from '../../../../../svg/boks.svg';
import sjekkboks from '../../../../../svg/sjekkboks.svg';
import EtikettMedTekst from './EtikettMedTekst';
import { Normaltekst, Element } from 'nav-frontend-typografi';

interface CheckboxMedDatoProps {
    checkboxTittel: string;
    checked: boolean;
    tittel: string;
    tekst?: string;
    margin?: boolean;
    innrykk?: boolean;
    bold?: boolean;
}

const CheckboxMedDato = ({ checkboxTittel, checked, tittel, tekst, bold, margin, innrykk }: CheckboxMedDatoProps) => {
    const innhold = (
        <>
            <Margin>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ marginRight: '1rem' }} src={checked ? sjekkboks : boks} alt="sjekkboks ikon" />
                    <span>
                        {bold ? <Element>{checkboxTittel}</Element> : <Normaltekst>{checkboxTittel}</Normaltekst>}
                    </span>
                </div>
            </Margin>
            {tekst && <EtikettMedTekst tittel={tittel} tekst={tekst} innrykk margin />}
        </>
    );

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold;
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin;

    return <div style={{ flex: '1' }}>{medInnrykk}</div>;
};

export default CheckboxMedDato;
