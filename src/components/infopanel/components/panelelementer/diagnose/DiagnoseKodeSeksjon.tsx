import React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import tekster from '../../../infopanel-tekster';
import EtikettMedTekst from '../../layout/EtikettMedTekst';

interface DiagnoseKodeSeksjonProps {
    kode: string;
    system: string;
    showHelp: boolean;
}

const DiagnoseKodeSeksjon = ({ kode, system, showHelp }: DiagnoseKodeSeksjonProps) => {
    return (
        <div style={{ flex: '1', display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <EtikettMedTekst tittel={tekster['diagnosekode.tittel']} tekst={kode} undertekst={system} />
            </div>
            {showHelp && <Hjelpetekst>{tekster['diagnosekode.hjelpetekst.tekst']}</Hjelpetekst>}
        </div>
    );
};

export default DiagnoseKodeSeksjon;
