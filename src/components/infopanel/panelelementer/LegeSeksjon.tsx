import React from 'react';

import tekster from '../infopanel-tekster';
import EtikettMedTekst from '../layout/EtikettMedTekst';

interface LegeSeksjonProps {
    navn: string;
}

const LegeSeksjon = ({ navn }: LegeSeksjonProps) => {
    return <EtikettMedTekst tittel={tekster['lege.avsender.tittel']} tekst={navn} margin />;
};

export default LegeSeksjon;
