import React from 'react';

import CheckboxMedDato from '../layout/Checkbox/CheckboxMedDato';
import { MedisinskVurdering } from '../../../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';

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
            checkboxTittel="Sykdommen kan skyldes en skade/yrkessykdom"
            checked
            tittel="Skadedato"
            tekst={tilLesbarDatoMedArstall(yrkesskadeDato)}
        />
    );
};

export default SkadeSeksjon;
