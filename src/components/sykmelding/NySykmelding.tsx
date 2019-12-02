import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import Sporsmal from '../sporsmal/Sporsmal';
import Arbeidsgiver from '../../types/arbeidsgiverTypes';

interface SykmeldingProps {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
    sykmeldingUtenforVentetid: boolean;
}

const NySykmelding = ({
    sykmelding,
    arbeidsgivere,
    sykmeldingUtenforVentetid,
}: SykmeldingProps) => {
    return (
        <div className="sykmelding-container">
            <Sporsmal
                sykmelding={sykmelding}
                arbeidsgivere={arbeidsgivere}
                sykmeldingUtenforVentetid={sykmeldingUtenforVentetid}
            />
        </div>
    );
};

export default NySykmelding;
