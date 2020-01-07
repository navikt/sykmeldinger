import React from 'react';

import EtikettMedTekst from '../layout/EtikettMedTekst';
import tekster from '../Infopanel-tekster';

interface LegeSeksjonProps {
    navn: string;
}

const LegeSeksjon = ({ navn }: LegeSeksjonProps) => {
    return <EtikettMedTekst tittel={tekster['lege.avsender.tittel']} tekst={navn} margin />;
};

export default LegeSeksjon;
