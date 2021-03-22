import React from 'react';

import CheckboxMedDato from '../layout/Checkbox/CheckboxMedDato';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';
import MedisinskVurdering from '../../../../../types/sykmelding/MedisinskVurdering';

interface SkadeSeksjonProps {
    medisinskVurdering?: MedisinskVurdering;
}

const SkadeSeksjon = ({ medisinskVurdering }: SkadeSeksjonProps) => {
    if (!medisinskVurdering?.yrkesskade) {
        return null;
    }

    return (
        <CheckboxMedDato
            checkboxTittel="Sykdommen kan skyldes en skade/yrkessykdom"
            checked
            tittel="Skadedato"
            tekst={tilLesbarDatoMedArstall(medisinskVurdering.yrkesskadeDato)}
        />
    );
};

export default SkadeSeksjon;
