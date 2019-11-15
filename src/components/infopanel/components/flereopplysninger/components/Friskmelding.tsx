import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';

import { Prognose } from '../../../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';

import OpplysningerSeksjon from './OpplysningerSeksjon';

import tekster from '../flereopplysninger-tekster';
import Margin from '../../Margin';
import ElementMedTekst from './ElementMedTekst';

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
            <Margin>
                <Margin>
                    <Checkbox
                        label={tekster['friskmelding.samme-arbeidsgiver']}
                        checked={erIArbeid.egetArbeidPaSikt}
                        readOnly
                    />
                    <ElementMedTekst
                        vis={erIArbeid.egetArbeidPaSikt && !!erIArbeid.arbeidFOM}
                        tittel={tekster['friskmelding.arbeidfom']}
                        tekst={tilLesbarDatoMedArstall(erIArbeid.arbeidFOM)}
                        innrykk
                    />
                </Margin>
                <Margin>
                    <Checkbox
                        label={tekster['friskmelding.annen-arbeidsgiver']}
                        checked={erIArbeid.annetArbeidPaSikt}
                        readOnly
                    />
                    <ElementMedTekst
                        vis={erIArbeid.annetArbeidPaSikt && !!erIArbeid.vurderingsdato}
                        tittel={tekster['friskmelding.vurderingsdato']}
                        tekst={tilLesbarDatoMedArstall(erIArbeid.vurderingsdato)}
                        innrykk
                    />
                </Margin>
            </Margin>
        );
    };

    const ErIkkeIArbeidSeksjon = () => {
        if (!erIkkeIArbeid) {
            return null;
        }

        return (
            <Margin>
                <Checkbox
                    label={tekster['friskmelding.ingen-arbeidsgiver']}
                    checked={erIkkeIArbeid.arbeidsforPaSikt}
                    readOnly
                />
                <ElementMedTekst
                    vis={!!erIkkeIArbeid.arbeidsforFOM}
                    tittel={tekster['friskmelding.arbeidfom']}
                    tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.arbeidsforFOM)}
                />
                <ElementMedTekst
                    vis={!!erIkkeIArbeid.vurderingsdato}
                    tittel={tekster['friskmelding.ingen-arbeidsgiver.vurdering']}
                    tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.vurderingsdato)}
                />
            </Margin>
        );
    };

    return (
        <OpplysningerSeksjon tittel={tekster['friskmelding.tittel']}>
            <Checkbox label={tekster['friskmelding.arbeidsfor.tittel']} checked={arbeidsforEtterPeriode} readOnly />
            <ElementMedTekst tittel={tekster['friskmelding.hensyn']} tekst={hensynArbeidsplassen} margin />
            <ErIArbeidSeksjon />
            <ErIkkeIArbeidSeksjon />
        </OpplysningerSeksjon>
    );
};

export default Friskmelding;
