import React from 'react';
import { Diagnose } from '../../../../types/sykmeldingTypes';
import PanelRad from '../PanelRad';
import DiagnoseKodeSeksjon from './DiagnoseKodeSeksjon';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';

import tekster from '../../infopanel-tekster';

interface DiagnoseSeksjonProps {
    diagnose?: Diagnose;
    bidiagnose?: boolean;
}

const DiagnoseSeksjon = ({ diagnose, bidiagnose }: DiagnoseSeksjonProps) => {
    if (!diagnose) {
        return null;
    }

    const { tekst, kode, system } = diagnose;

    const tittel = bidiagnose ? tekster['bidiagnose.tittel'] : tekster['diagnose.tittel'];

    return (
        <PanelRad>
            <div style={{ flex: '1' }}>
                <EtikettLiten>{tittel}</EtikettLiten>
                <Normaltekst>{tekst}</Normaltekst>
                <Undertekst>{tekster['diagnose.meta']}</Undertekst>
            </div>
            <DiagnoseKodeSeksjon kode={kode} system={system} showHelp={!bidiagnose} />
        </PanelRad>
    );
};

export default DiagnoseSeksjon;
