import React from 'react';
import { Sykmelding } from '../../types/sykmeldingTypes';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const AvbruttSykmelding = ({ sykmelding }: SykmeldingProps) => {
    return <div className="sykmelding-container">avvist</div>;
};

export default AvbruttSykmelding;
