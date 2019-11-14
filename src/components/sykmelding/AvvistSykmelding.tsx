import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvvistSykmelding: React.FC<SykmeldingProps> = ({ sykmelding }: SykmeldingProps) => {
    return <div className="sykmelding-container">avvist</div>;
};

export default AvvistSykmelding;
