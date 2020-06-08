import React from 'react';

import EtikettMedTekst from '../layout/EtikettMedTekst';

interface LegeSeksjonProps {
    navn: string;
}

const LegeSeksjon = ({ navn }: LegeSeksjonProps) => {
    return <EtikettMedTekst tittel="Lege / sykmelder" tekst={navn} margin />;
};

export default LegeSeksjon;
