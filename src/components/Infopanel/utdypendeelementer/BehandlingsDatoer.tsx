import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

interface BehandlingsDatoerProps {
    behandletTidspunkt: Date;
    syketilfelleStartDato?: Date;
}

const BehandlingsDatoer = ({ behandletTidspunkt, syketilfelleStartDato }: BehandlingsDatoerProps) => {
    return (
        <SeksjonMedTittel understrek>
            <ElementMedTekst
                tittel="Dato sykmeldingen ble skrevet"
                tekst={tilLesbarDatoMedArstall(behandletTidspunkt)}
                margin
            />
            <ElementMedTekst
                vis={!!syketilfelleStartDato}
                tittel="Når startet det legemeldte fraværet?"
                tekst={tilLesbarDatoMedArstall(syketilfelleStartDato)}
                margin
            />
        </SeksjonMedTittel>
    );
};

export default BehandlingsDatoer;
