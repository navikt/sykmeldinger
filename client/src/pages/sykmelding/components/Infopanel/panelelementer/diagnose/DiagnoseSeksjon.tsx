import './Diagnoseseksjon.less';

import React from 'react';

import DiagnoseKodeSeksjon from './DiagnoseKodeSeksjon';
import EtikettMedTekst from '../../layout/EtikettMedTekst';
import tekster from '../../Infopanel-tekster';
import { Diagnose } from '../../../../../../types/sykmeldingTypes';

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
        <div className="diagnose-container">
            <div className="diagnose-seksjon">
                <EtikettMedTekst tittel={tittel} tekst={tekst} undertekst={tekster['diagnose.meta']} />
            </div>
            <div className="diagnose-seksjon-kode">
                <DiagnoseKodeSeksjon kode={kode} system={system} visHjelp={!bidiagnose} />
            </div>
        </div>
    );
};

export default DiagnoseSeksjon;
