import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Sykmelding } from '../../../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';

import PanelInnholdSeksjon from './PanelInnholdSeksjon';

interface PanelInnholdProps {
    sykmelding: Sykmelding;
}

const PanelInnhold = ({ sykmelding }: PanelInnholdProps) => {
    return (
        <>
            <PanelInnholdSeksjon>
                <>
                    <Element>Dato sykmeldingen ble skrevet</Element>
                    <Normaltekst>- {tilLesbarDatoMedArstall(sykmelding.behandletTidspunkt)}</Normaltekst>
                </>
                <>
                    {sykmelding.syketilfelleStartDato && (
                        <>
                            <Element>Når startet det legemeldte fraværet?</Element>
                            <Normaltekst>- {tilLesbarDatoMedArstall(sykmelding.syketilfelleStartDato)}</Normaltekst>
                        </>
                    )}
                </>
            </PanelInnholdSeksjon>
            <hr />
            <div>mulighet for arbeid</div> <hr />
            <div>friskmelding/prognose</div> <hr />
            <div>utdypende opplysninger</div> <hr />
            <div>hva skal til for å bedre arbeidsevnen</div> <hr />
            <div>annet</div> <hr />
        </>
    );
};

export default PanelInnhold;
