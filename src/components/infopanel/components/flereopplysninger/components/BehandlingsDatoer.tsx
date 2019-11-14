import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';

import PanelSeksjon from './PanelSeksjon';

interface BehandlingsDatoerProps {
    behandletTidspunkt: Date;
    syketilfelleStartDato?: Date;
}

const BehandlingsDatoer = ({ behandletTidspunkt, syketilfelleStartDato }: BehandlingsDatoerProps) => {
    return (
        <PanelSeksjon>
            <>
                <Element>Dato sykmeldingen ble skrevet</Element>
                <Normaltekst>- {tilLesbarDatoMedArstall(behandletTidspunkt)}</Normaltekst>
            </>
            {syketilfelleStartDato ? (
                <>
                    <Element>Når startet det legemeldte fraværet?</Element>
                    <Normaltekst>- {tilLesbarDatoMedArstall(syketilfelleStartDato)}</Normaltekst>
                </>
            ) : null}
        </PanelSeksjon>
    );
};

export default BehandlingsDatoer;
