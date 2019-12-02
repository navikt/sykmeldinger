import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvvistSykmelding = ({ sykmelding }: SykmeldingProps) => {
    return <div className="sykmelding-container">avvist</div>;
};

export default AvvistSykmelding;
