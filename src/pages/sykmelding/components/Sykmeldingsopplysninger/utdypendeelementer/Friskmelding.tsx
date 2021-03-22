import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/Checkbox/EnkelCheckbox';
import Margin from '../layout/Margin';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';
import Prognose from '../../../../../types/sykmelding/Prognose';

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
                        tittel="Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver"
                        bold
                        margin
                        checked={erIArbeid.egetArbeidPaSikt}
                        vis={erIArbeid.egetArbeidPaSikt}
                    />
                    <ElementMedTekst
                        vis={erIArbeid.egetArbeidPaSikt && !!erIArbeid.arbeidFOM}
                        tittel="Anslå når du tror dette kan skje"
                        tekst={tilLesbarDatoMedArstall(erIArbeid.arbeidFOM)}
                        innrykk
                    />
                </Margin>
                <Margin>
                    <EnkelCheckbox
                        tittel="Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver"
                        bold
                        margin
                        checked={erIArbeid.annetArbeidPaSikt}
                        vis={erIArbeid.annetArbeidPaSikt}
                    />
                    <ElementMedTekst
                        vis={erIArbeid.annetArbeidPaSikt && !!erIArbeid.vurderingsdato}
                        tittel="Når antar du å kunne gi tilbakemelding på dette?"
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
                    tittel="Jeg antar at pasienten på sikt kan komme tilbake i arbeid"
                    bold
                    margin
                    checked={erIkkeIArbeid.arbeidsforPaSikt}
                    vis={erIkkeIArbeid.arbeidsforPaSikt}
                />
                <ElementMedTekst
                    vis={!!erIkkeIArbeid.arbeidsforFOM}
                    tittel="Anslå når du tror dette kan skje"
                    tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.arbeidsforFOM)}
                />
                <ElementMedTekst
                    vis={!!erIkkeIArbeid.vurderingsdato}
                    tittel="Når antar du å kunne gi tilbakemelding på dette?"
                    tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.vurderingsdato)}
                />
            </Margin>
        );
    };

    return (
        <SeksjonMedTittel understrek tittel="Friskmelding/prognose">
            <EnkelCheckbox
                tittel="Pasienten er 100 prosent arbeidsfør etter denne perioden"
                checked={arbeidsforEtterPeriode}
                margin
                bold
                vis={arbeidsforEtterPeriode}
            />
            <ElementMedTekst
                tittel="Beskriv eventuelle hensyn som må tas på arbeidsplassen"
                tekst={hensynArbeidsplassen}
                margin
                vis={!!hensynArbeidsplassen}
            />
            <ErIArbeidSeksjon />
            <ErIkkeIArbeidSeksjon />
        </SeksjonMedTittel>
    );
};

export default Friskmelding;
