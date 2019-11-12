import React from 'react';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import tekster from '../../infopanel-tekster';

interface DiagnoseKodeSeksjonProps {
    kode: string;
    system: string;
    showHelp: boolean;
}

const DiagnoseKodeSeksjon = ({ kode, system, showHelp }: DiagnoseKodeSeksjonProps) => {
    return (
        <div style={{ flex: '1', display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <EtikettLiten>{tekster['diagnosekode.tittel']}</EtikettLiten>
                <Normaltekst>{kode}</Normaltekst>
                <Undertekst>{system}</Undertekst>
            </div>
            {showHelp && <Hjelpetekst>{tekster['diagnosekode.hjelpetekst.tekst']}</Hjelpetekst>}
        </div>
    );
};

export default DiagnoseKodeSeksjon;
