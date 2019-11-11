import React from 'react';
import { Arbeidsgiver } from '../../../../types/sykmeldingTypes';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import PanelRad from '../PanelRad';

import tekster from './arbeidsgiver-tekster';

interface ArbeidsgiverSeksjonProps {
    arbeidsgiver: Arbeidsgiver;
}

const ArbeidsgiverSeksjon = ({ arbeidsgiver }: ArbeidsgiverSeksjonProps) => {
    if (!arbeidsgiver.harArbeidsgiver) {
        return null;
    }

    return (
        <PanelRad>
            <div style={{ flex: '1' }}>
                <EtikettLiten>{tekster['arbeidsgiver.tittel']}</EtikettLiten>
                <Normaltekst>{arbeidsgiver.navn}</Normaltekst>
                <Undertekst>
                    {arbeidsgiver.stillingsprosent}
                    {tekster['arbeidsgiver.stillingsprosent']}
                </Undertekst>
            </div>
        </PanelRad>
    );
};

export default ArbeidsgiverSeksjon;
