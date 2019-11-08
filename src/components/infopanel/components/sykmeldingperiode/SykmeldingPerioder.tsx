import React from 'react';

import { Periode } from '../../../../types/sykmeldingTypes';
import { sorterPerioderEldsteFoerst } from '../../../../utils/sorterSykemeldingUtils';
import PanelRad from '../PanelRad';
import PeriodeSeksjon from '../periodeseksjon/PeriodeSeksjon';

interface SykmeldingPerioderProps {
    perioder: Periode[];
}

const SykmeldingPerioder = ({ perioder }: SykmeldingPerioderProps) => {
    const sortert = sorterPerioderEldsteFoerst(perioder);
    return (
        <div>
            {sortert.map((periode, index) => (
                <PanelRad key={index.toString()}>
                    <PeriodeSeksjon periode={periode} />
                </PanelRad>
            ))}
        </div>
    );
};

export default SykmeldingPerioder;
