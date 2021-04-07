import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import DateFormatter from '../../../../../utils/DateFormatter';

interface BehandlingsDatoerProps {
    behandletTidspunkt: Date;
    syketilfelleStartDato?: Date;
}

const BehandlingsDatoer = ({ behandletTidspunkt, syketilfelleStartDato }: BehandlingsDatoerProps) => {
    return (
        <SeksjonMedTittel understrek>
            <ElementMedTekst
                tittel="Dato sykmeldingen ble skrevet"
                tekst={DateFormatter.toReadableDate(behandletTidspunkt, { withYear: true })}
                margin
            />
            {syketilfelleStartDato ? (
                <ElementMedTekst
                    vis={!!syketilfelleStartDato}
                    tittel="Når startet det legemeldte fraværet?"
                    tekst={DateFormatter.toReadableDate(syketilfelleStartDato, { withYear: true })}
                    margin
                />
            ) : null}
        </SeksjonMedTittel>
    );
};

export default BehandlingsDatoer;
