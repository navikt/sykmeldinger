import React from 'react';

import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import OpplysningerSeksjon from '../layout/OpplysningerSeksjon';
import ElementMedTekst from '../layout/ElementMedTekst';

interface BehandlingsDatoerProps {
    behandletTidspunkt: Date;
    syketilfelleStartDato?: Date;
}

const BehandlingsDatoer = ({ behandletTidspunkt, syketilfelleStartDato }: BehandlingsDatoerProps) => {
    return (
        <OpplysningerSeksjon>
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
        </OpplysningerSeksjon>
    );
};

export default BehandlingsDatoer;
