import React from 'react';

import { Periode } from '../../../../../../types/sykmeldingTypes';
import { sorterPerioderEldsteFoerst } from '../../../../../../utils/sorterSykemeldingUtils';
import PeriodeSeksjon from './PeriodeSeksjon';
import Margin from '../../layout/Margin';

interface SykmeldingPerioderProps {
    perioder: Periode[];
}

const SykmeldingPerioder = ({ perioder }: SykmeldingPerioderProps) => {
    const sortert = sorterPerioderEldsteFoerst(perioder);
    return (
        <>
            {sortert.map((periode, index) => (
                <Margin key={index.toString()}>
                    <PeriodeSeksjon periode={periode} understrek={sortert.length > 1} />
                </Margin>
            ))}
        </>
    );
};

export default SykmeldingPerioder;
