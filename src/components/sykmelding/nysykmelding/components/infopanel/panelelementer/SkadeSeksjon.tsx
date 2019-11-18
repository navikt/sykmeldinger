import React from 'react';
import { MedisinskVurdering } from '../../../../../../types/sykmeldingTypes';

import { tilLesbarDatoMedArstall } from '../../../../../../utils/datoUtils';

import tekster from '../infopanel-tekster';
import CheckboxMedDato from '../layout/CheckboxMedDato';

interface SkadeSeksjonProps {
    medisinskVurdering: MedisinskVurdering;
}

const SkadeSeksjon = ({ medisinskVurdering }: SkadeSeksjonProps) => {
    const { yrkesskadeDato, yrkesskade } = medisinskVurdering;
    if (!yrkesskade) {
        return null;
    }

    return (
        <CheckboxMedDato
            checkboxTittel={tekster['skade.tittel']}
            checked
            tittel={tekster['skade.dato.tittel']}
            tekst={tilLesbarDatoMedArstall(yrkesskadeDato)}
        />
    );
};

export default SkadeSeksjon;
