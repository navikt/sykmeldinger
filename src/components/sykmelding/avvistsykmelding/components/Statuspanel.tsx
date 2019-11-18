import React from 'react';
import { Sykmelding } from '../../../../types/sykmeldingTypes';

interface StatuspanelProps {
    sykmelding: Sykmelding;
}

const Statuspanel = ({ sykmelding }: StatuspanelProps) => {
    // TODO: sykmelding.bekreftetDato
    if (!true) {
        return null;
    }

    return (
        <div>
            <div>
                <strong>Status</strong>
                <p>Avvist av NAV</p>
            </div>
            <div>
                <strong>Dato avvist</strong>
                <p>Dato</p>
            </div>
            <div>
                <strong>Bekreftet av deg</strong>
                <p>Dato</p>
            </div>
        </div>
    );
};

export default Statuspanel;
