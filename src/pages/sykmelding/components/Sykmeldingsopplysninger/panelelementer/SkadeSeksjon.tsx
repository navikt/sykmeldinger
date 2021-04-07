import React from 'react';

import CheckboxMedDato from '../layout/Checkbox/CheckboxMedDato';
import DateFormatter from '../../../../../utils/DateFormatter';
import MedisinskVurdering from '../../../../../models/Sykmelding/MedisinskVurdering';

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
            tekst={
                medisinskVurdering.yrkesskadeDato
                    ? DateFormatter.toReadableDate(medisinskVurdering.yrkesskadeDato, { withYear: true })
                    : undefined
            }
        />
    );
};

export default SkadeSeksjon;
