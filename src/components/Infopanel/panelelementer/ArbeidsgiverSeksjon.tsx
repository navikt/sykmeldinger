import React from 'react';

import EtikettMedTekst from '../layout/EtikettMedTekst';
import tekster from '../Infopanel-tekster';
import { Arbeidsgiver } from '../../../types/sykmeldingTypes';

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
