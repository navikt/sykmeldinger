import React from 'react';

import EtikettMedTekst from '../layout/EtikettMedTekst';
import { Arbeidsgiver } from '../../../../../types/sykmelding';

interface ArbeidsgiverSeksjonProps {
    arbeidsgiver?: Arbeidsgiver;
}

const ArbeidsgiverSeksjon = ({ arbeidsgiver }: ArbeidsgiverSeksjonProps) => {
    if (!arbeidsgiver) {
        return null;
    }

    return (
        <EtikettMedTekst
            tittel="Arbeidsgiver som legen har skrevet inn"
            tekst={arbeidsgiver.navn}
            undertekst={`${arbeidsgiver.stillingsprosent}% stilling`}
            margin
        />
    );
};

export default ArbeidsgiverSeksjon;
