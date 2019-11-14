import React from 'react';
import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';

import { Prognose } from '../../../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';

import PanelSeksjon from './PanelSeksjon';

import tekster from '../flereopplysninger-tekster';
import Margin from '../../Margin';

interface FriskmeldingProps {
    prognose?: Prognose;
}

const Friskmelding = ({ prognose }: FriskmeldingProps) => {
    if (!prognose) {
        return null;
    }

    const { erIArbeid, erIkkeIArbeid, hensynArbeidsplassen, arbeidsforEtterPeriode } = prognose;

    const ErIArbeidSeksjon = () => {
        if (!erIArbeid) {
            return null;
        }

        return (
            <>
                <Margin>
                    <Checkbox
                        label={tekster['friskmelding.samme-arbeidsgiver']}
                        checked={erIArbeid.egetArbeidPaSikt}
                        readOnly
                    />
                    {erIArbeid.egetArbeidPaSikt && erIArbeid.arbeidFOM ? (
                        <>
                            <Element>{tekster['friskmelding.arbeidfom']}</Element>
                            <Normaltekst>- {tilLesbarDatoMedArstall(erIArbeid.arbeidFOM)}</Normaltekst>
                        </>
                    ) : null}
                </Margin>
                <Margin>
                    <Checkbox
                        label={tekster['friskmelding.annen-arbeidsgiver']}
                        checked={erIArbeid.annetArbeidPaSikt}
                        readOnly
                    />
                    {erIArbeid.annetArbeidPaSikt && erIArbeid.vurderingsdato ? (
                        <>
                            <Element>{tekster['friskmelding.vurderingsdato']}</Element>
                            <Normaltekst>- {tilLesbarDatoMedArstall(erIArbeid.vurderingsdato)}</Normaltekst>
                        </>
                    ) : null}
                </Margin>
            </>
        );
    };

    const ErIkkeIArbeidSeksjon = () => {
        if (!erIkkeIArbeid) {
            return null;
        }

        return (
            <>
                <Checkbox
                    label={tekster['friskmelding.ingen-arbeidsgiver']}
                    checked={erIkkeIArbeid.arbeidsforPaSikt}
                    readOnly
                />
                {erIkkeIArbeid.arbeidsforFOM ? (
                    <>
                        <Element>{tekster['friskmelding.arbeidfom']}</Element>
                        <Normaltekst>- {tilLesbarDatoMedArstall(erIkkeIArbeid.arbeidsforFOM)}</Normaltekst>
                    </>
                ) : null}
                {erIkkeIArbeid.vurderingsdato ? (
                    <>
                        <Element>{tekster['friskmelding.ingen-arbeidsgiver.vurdering']}</Element>
                        <Normaltekst>- {tilLesbarDatoMedArstall(erIkkeIArbeid.vurderingsdato)}</Normaltekst>
                    </>
                ) : null}
            </>
        );
    };

    const HensynArbeidsplassenSeksjon = () => {
        if (!hensynArbeidsplassen) {
            return null;
        }

        return (
            <Margin>
                <EtikettLiten>{tekster['friskmelding.hensyn']}</EtikettLiten>
                <Normaltekst>{hensynArbeidsplassen}</Normaltekst>
            </Margin>
        );
    };

    return (
        <PanelSeksjon tittel={tekster['friskmelding.tittel']}>
            <Checkbox label={tekster['friskmelding.arbeidsfor.tittel']} checked={arbeidsforEtterPeriode} readOnly />
            <HensynArbeidsplassenSeksjon />
            <ErIArbeidSeksjon />
            <ErIkkeIArbeidSeksjon />
        </PanelSeksjon>
    );
};

export default Friskmelding;
