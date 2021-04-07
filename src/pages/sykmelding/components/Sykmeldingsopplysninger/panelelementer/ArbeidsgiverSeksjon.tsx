import React from 'react';
import ArbeidsgiverSykmelding from '../../../../../models/Sykmelding/ArbeidsgiverSykmelding';

import EtikettMedTekst from '../layout/EtikettMedTekst';

interface ArbeidsgiverSeksjonProps {
    arbeidsgiver?: ArbeidsgiverSykmelding;
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
