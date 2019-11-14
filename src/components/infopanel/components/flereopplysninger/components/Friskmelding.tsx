import React from 'react';
import { Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';

import { Prognose } from '../../../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';

import PanelSeksjon from './PanelSeksjon';

import tekster from '../flereopplysninger-tekster';
import Margin from '../../Margin';
import Innrykk from '../../Innrykk';

interface FriskmeldingProps {
    prognose?: Prognose;
}

const Friskmelding = ({ prognose }: FriskmeldingProps) => {
    // TODO: legg til logikk for visning av seksjon
    /*
    const visSeksjon = (sykmelding.friskmelding.antarReturSammeArbeidsgiver ||
    sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver ||
    sykmelding.friskmelding.antarReturAnnenArbeidsgiver ||
    sykmelding.friskmelding.tilbakemeldingReturArbeid ||
    sykmelding.friskmelding.utenArbeidsgiverTilbakemelding ||
    sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeid ||
    sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato ||
    sykmelding.friskmelding.utenArbeidsgiverTilbakemelding);
    */
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
                    {erIArbeid.egetArbeidPaSikt && erIArbeid.arbeidFOM && (
                        <Innrykk>
                            <Element>{tekster['friskmelding.arbeidfom']}</Element>
                            <Normaltekst>- {tilLesbarDatoMedArstall(erIArbeid.arbeidFOM)}</Normaltekst>
                        </Innrykk>
                    )}
                </Margin>
                <Margin>
                    <Checkbox
                        label={tekster['friskmelding.annen-arbeidsgiver']}
                        checked={erIArbeid.annetArbeidPaSikt}
                        readOnly
                    />
                    {erIArbeid.annetArbeidPaSikt && erIArbeid.vurderingsdato && (
                        <Innrykk>
                            <Element>{tekster['friskmelding.vurderingsdato']}</Element>
                            <Normaltekst>- {tilLesbarDatoMedArstall(erIArbeid.vurderingsdato)}</Normaltekst>
                        </Innrykk>
                    )}
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
                {erIkkeIArbeid.arbeidsforFOM && (
                    <>
                        <Element>{tekster['friskmelding.arbeidfom']}</Element>
                        <Normaltekst>- {tilLesbarDatoMedArstall(erIkkeIArbeid.arbeidsforFOM)}</Normaltekst>
                    </>
                )}
                {erIkkeIArbeid.vurderingsdato && (
                    <>
                        <Element>{tekster['friskmelding.ingen-arbeidsgiver.vurdering']}</Element>
                        <Normaltekst>- {tilLesbarDatoMedArstall(erIkkeIArbeid.vurderingsdato)}</Normaltekst>
                    </>
                )}
            </>
        );
    };

    return (
        <PanelSeksjon tittel={tekster['friskmelding.tittel']}>
            <Checkbox label={tekster['friskmelding.arbeidsfor.tittel']} checked={arbeidsforEtterPeriode} readOnly />
            <Margin>
                <Element>{tekster['friskmelding.hensyn']}</Element>
                <Normaltekst>{hensynArbeidsplassen}</Normaltekst>
            </Margin>
            <ErIArbeidSeksjon />
            <ErIkkeIArbeidSeksjon />
        </PanelSeksjon>
    );
};

export default Friskmelding;
