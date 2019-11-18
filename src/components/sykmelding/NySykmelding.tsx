import React, { useRef, useEffect } from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import Sporsmal from '../sporsmal/Sporsmal';

interface SykmeldingProps {
    sykmelding: Sykmelding;
    sykmeldingUtenforVentetid: boolean;
}

const NySykmelding: React.FC<SykmeldingProps> = ({ sykmelding, sykmeldingUtenforVentetid }: SykmeldingProps) => {
    return (
        <div className="sykmelding-container">
            <Sporsmal sykmelding={sykmelding} sykmeldingUtenforVentetid={sykmeldingUtenforVentetid} />
        </div>
    );
};

export default NySykmelding;
