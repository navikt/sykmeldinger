import React from 'react';
import { Diagnose } from '../../../../../types/sykmeldingTypes';
import PanelRad from '../../layout/PanelRad';
import DiagnoseKodeSeksjon from './DiagnoseKodeSeksjon';

import tekster from '../../../infopanel-tekster';
import EtikettMedTekst from '../../layout/EtikettMedTekst';

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
                <EtikettMedTekst tittel={tittel} tekst={tekst} undertekst={tekster['diagnose.meta']} />
            </div>
            <DiagnoseKodeSeksjon kode={kode} system={system} showHelp={!bidiagnose} />
        </PanelRad>
    );
};

export default DiagnoseSeksjon;
