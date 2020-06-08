import './Diagnoseseksjon.less';

import React from 'react';
import { EtikettLiten, Normaltekst, Undertekst } from 'nav-frontend-typografi';

import HjelpetekstWrapper from '../../../Hjelpetekst/HjelpetekstWrapper';

interface DiagnoseKodeSeksjonProps {
    kode: string;
    system: string;
    visHjelp: boolean;
}

const DiagnoseKodeSeksjon = ({ kode, system, visHjelp }: DiagnoseKodeSeksjonProps) => {
    return (
        <>
            <div className="diagnose-seksjon-kode-tittel-container">
                <EtikettLiten>Diagnosen vises ikke til arbeidsgiveren</EtikettLiten>
                {visHjelp && (
                    <HjelpetekstWrapper tekst="Diagnosekoden henviser til de internasjonale kodeverkene som klassifiserer sykdom og symptomer. De ulike diagnosekodene brukes for å gi en mest mulig presis diagnose." />
                )}
            </div>

            <Normaltekst>{kode}</Normaltekst>
            <Undertekst>{system}</Undertekst>
        </>
    );
};

export default DiagnoseKodeSeksjon;
