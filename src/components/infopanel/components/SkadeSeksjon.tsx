import React from 'react';
import { MedisinskVurdering } from '../../../types/sykmeldingTypes';
import { Checkbox } from 'nav-frontend-skjema';

import PanelRad from './PanelRad';
import PanelSeksjon from './PanelSeksjon';

import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import tekster from '../infopanel-tekster';

interface SkadeSeksjonProps {
    medisinskVurdering: MedisinskVurdering;
}

const SkadeSeksjon = ({ medisinskVurdering }: SkadeSeksjonProps) => {
    const { yrkesskadeDato, yrkesskade } = medisinskVurdering;
    if (!yrkesskade) {
        return null;
    }

    return (
        <>
            <Checkbox label={tekster['skade.tittel']} checked readOnly />
            {yrkesskadeDato && (
                <PanelRad>
                    <PanelSeksjon
                        tittel={tekster['skade.dato.tittel']}
                        verdi={tilLesbarDatoMedArstall(yrkesskadeDato)}
                        innrykk
                    />
                </PanelRad>
            )}
        </>
    );
};

export default SkadeSeksjon;
