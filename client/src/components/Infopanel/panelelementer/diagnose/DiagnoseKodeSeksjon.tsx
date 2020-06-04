import './Diagnoseseksjon.less';

import React from 'react';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';

import HjelpetekstWrapper from '../../../Hjelpetekst/HjelpetekstWrapper';
import tekster from '../../Infopanel-tekster';

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
