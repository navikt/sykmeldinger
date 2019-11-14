import React, { useRef, useEffect } from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';
import Sporsmal from '../sporsmal/Sporsmal';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const NySykmelding: React.FC<SykmeldingProps> = ({ sykmelding }: SykmeldingProps) => {
    return (
        <div className="sykmelding-container">
            <Sporsmal />
        </div>
    );
};

export default NySykmelding;
