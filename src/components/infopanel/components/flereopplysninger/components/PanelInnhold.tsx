import React from 'react';
import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { Sykmelding, Prognose } from '../../../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';

import PanelInnholdSeksjon from './PanelInnholdSeksjon';

import tekster from '../flereopplysninger-tekster';
import Margin from '../../Margin';
import Friskmelding from './Friskmelding';

interface PanelInnholdProps {
    sykmelding: Sykmelding;
}

const PanelInnhold = ({ sykmelding }: PanelInnholdProps) => {
    if (!sykmelding.prognose) {
        return null;
    }

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
            <div>mulighet for arbeid</div> <hr />
            <Friskmelding prognose={sykmelding.prognose} />
            <div>utdypende opplysninger</div> <hr />
            <div>hva skal til for å bedre arbeidsevnen</div> <hr />
            <div>annet</div> <hr />
        </>
    );
};

export default PanelInnhold;
