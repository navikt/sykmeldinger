import React from 'react';
import tekster from '../../infopanel-tekster';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import HjelpetekstWrapper from '../../../hjelpetekst/HjelpetekstWrapper';

import './diagnoseseksjon.less';

interface DiagnoseKodeSeksjonProps {
    kode: string;
    system: string;
    visHjelp: boolean;
}

const DiagnoseKodeSeksjon = ({ kode, system, visHjelp }: DiagnoseKodeSeksjonProps) => {
    return (
        <>
            <div className="diagnose-seksjon-kode-tittel-container">
                <EtikettLiten>{tekster['diagnosekode.tittel']}</EtikettLiten>
                {visHjelp && <HjelpetekstWrapper tekst={tekster['diagnosekode.hjelpetekst.tekst']} />}
            </div>

            <Normaltekst>{kode}</Normaltekst>
            <Undertekst>{system}</Undertekst>
        </>
    );
};

export default DiagnoseKodeSeksjon;
