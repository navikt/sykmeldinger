import React from 'react';

import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';

interface BehandlingsDatoerProps {
    behandletTidspunkt: Date;
    syketilfelleStartDato?: Date;
}

const BehandlingsDatoer = ({ behandletTidspunkt, syketilfelleStartDato }: BehandlingsDatoerProps) => {
    return (
        <SeksjonMedTittel>
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
