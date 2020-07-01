import './Diagnoseseksjon.less';

import React from 'react';

import DiagnoseKodeSeksjon from './DiagnoseKodeSeksjon';
import EtikettMedTekst from '../../layout/EtikettMedTekst';
import { Diagnose } from '../../../../../../types/sykmelding';

interface DiagnoseSeksjonProps {
    diagnose?: Diagnose;
    bidiagnose?: boolean;
}

const DiagnoseSeksjon = ({ diagnose, bidiagnose }: DiagnoseSeksjonProps) => {
    if (!diagnose) {
        return null;
    }

    const { tekst, kode, system } = diagnose;

    const tittel = bidiagnose ? 'Bidiagnose' : 'Diagnose';

    return (
        <div className="diagnose-container">
            <div className="diagnose-seksjon">
                <EtikettMedTekst tittel={tittel} tekst={tekst} undertekst="Diagnosen vises ikke til arbeidsgiveren" />
            </div>
            <div className="diagnose-seksjon-kode">
                <DiagnoseKodeSeksjon kode={kode} system={system} visHjelp={!bidiagnose} />
            </div>
        </div>
    );
};

export default DiagnoseSeksjon;
