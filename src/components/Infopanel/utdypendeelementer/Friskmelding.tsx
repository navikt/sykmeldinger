import React from 'react';

import { Prognose } from '../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

import tekster from '../Infopanel-tekster';
import Margin from '../layout/Margin';
import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';

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
                    <EnkelCheckbox
                        tittel={tekster['friskmelding.samme-arbeidsgiver']}
                        bold
                        margin
                        checked={erIArbeid.egetArbeidPaSikt}
                        vis={erIArbeid.egetArbeidPaSikt}
                    />
                    <ElementMedTekst
                        vis={erIArbeid.egetArbeidPaSikt && !!erIArbeid.arbeidFOM}
                        tittel={tekster['friskmelding.arbeidfom']}
                        tekst={tilLesbarDatoMedArstall(erIArbeid.arbeidFOM)}
                        innrykk
                    />
                </Margin>
                <Margin>
                    <EnkelCheckbox
                        tittel={tekster['friskmelding.annen-arbeidsgiver']}
                        bold
                        margin
                        checked={erIArbeid.annetArbeidPaSikt}
                        vis={erIArbeid.annetArbeidPaSikt}
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
                <EnkelCheckbox
                    tittel={tekster['friskmelding.ingen-arbeidsgiver']}
                    bold
                    margin
                    checked={erIkkeIArbeid.arbeidsforPaSikt}
                    vis={erIkkeIArbeid.arbeidsforPaSikt}
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
        <SeksjonMedTittel understrek tittel={tekster['friskmelding.tittel']}>
            <EnkelCheckbox
                tittel={tekster['friskmelding.arbeidsfor.tittel']}
                checked={arbeidsforEtterPeriode}
                margin
                bold
                vis={arbeidsforEtterPeriode}
            />
            <ElementMedTekst tittel={tekster['friskmelding.hensyn']} tekst={hensynArbeidsplassen} margin />
            <ErIArbeidSeksjon />
            <ErIkkeIArbeidSeksjon />
        </SeksjonMedTittel>
    );
};

export default Friskmelding;
