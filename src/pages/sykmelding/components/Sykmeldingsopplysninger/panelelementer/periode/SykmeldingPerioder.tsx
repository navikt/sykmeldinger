import React from 'react';

import Margin from '../../layout/Margin';
import PeriodeSeksjon from './PeriodeSeksjon';
import { Sykmelding } from '../../../../../../models/Sykmelding/Sykmelding';

interface SykmeldingPerioderProps {
    sykmelding: Sykmelding;
}

const SykmeldingPerioder = ({ sykmelding }: SykmeldingPerioderProps) => {
    const perioder = sykmelding.getSykmeldingperioderSorted();
    return (
        <>
            {perioder.map((periode, index) => (
                <Margin key={index.toString()}>
                    <PeriodeSeksjon periode={periode} understrek={perioder.length > 1} />
                </Margin>
            ))}
        </>
    );
};

export default SykmeldingPerioder;
