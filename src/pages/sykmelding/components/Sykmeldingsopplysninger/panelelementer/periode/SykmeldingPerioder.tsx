import React from 'react';

import Margin from '../../layout/Margin';
import PeriodeSeksjon from './PeriodeSeksjon';
import { sorterPerioderEldsteFoerst } from '../../../../../../utils/sorterSykemeldingUtils';
import Periode from '../../../../../../types/sykmelding/Periode';

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
