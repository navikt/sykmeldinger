import React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import tekster from '../../infopanel-tekster';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';

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
                {visHjelp && (
                    <div className="diagnose-seksjon-kode-hjelpetekst">
                        <Hjelpetekst>
                            <div style={{ maxWidth: 300 }}>{tekster['diagnosekode.hjelpetekst.tekst']}</div>
                        </Hjelpetekst>
                    </div>
                )}
            </div>

            <Normaltekst>{kode}</Normaltekst>
            <Undertekst>{system}</Undertekst>
        </>
    );
};

export default DiagnoseKodeSeksjon;
