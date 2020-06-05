import React from 'react';

import EtikettMedTekst from '../layout/EtikettMedTekst';
import tekster from '../Infopanel-tekster';
import { AnnenFraversArsak } from '../../../../../types/sykmeldingTypes';

interface FraverSeksjonProps {
    fraver?: AnnenFraversArsak;
}

const FraverSeksjon = ({ fraver }: FraverSeksjonProps) => {
    if (!fraver?.beskrivelse) {
        return null;
    }

    return <EtikettMedTekst tittel={tekster['fraver.tittel']} tekst={fraver.beskrivelse} margin />;
};

export default FraverSeksjon;
