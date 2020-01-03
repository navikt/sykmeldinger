import React from 'react';
import { Arbeidsgiver } from '../../../types/sykmeldingTypes';

import tekster from '../Infopanel-tekster';
import EtikettMedTekst from '../layout/EtikettMedTekst';

interface ArbeidsgiverSeksjonProps {
    arbeidsgiver: Arbeidsgiver;
}

const ArbeidsgiverSeksjon = ({ arbeidsgiver }: ArbeidsgiverSeksjonProps) => {
    if (!arbeidsgiver.harArbeidsgiver) {
        return null;
    }

    return (
        <EtikettMedTekst
            tittel={tekster['arbeidsgiver.tittel']}
            tekst={arbeidsgiver.navn}
            undertekst={`${arbeidsgiver.stillingsprosent}${tekster['arbeidsgiver.stillingsprosent']}`}
            margin
        />
    );
};

export default ArbeidsgiverSeksjon;
