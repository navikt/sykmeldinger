import React from 'react';

import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/Checkbox/EnkelCheckbox';
import Margin from '../layout/Margin';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import DateFormatter from '../../../../../utils/DateFormatter';
import Prognose from '../../../../../models/Sykmelding/Prognose';

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
                    {!!erIArbeid.arbeidFOM && (
                        <ElementMedTekst
                            vis={erIArbeid.egetArbeidPaSikt && !!erIArbeid.arbeidFOM}
                            tittel="Anslå når du tror dette kan skje"
                            tekst={DateFormatter.toReadableDate(erIArbeid.arbeidFOM, { withYear: true })}
                            innrykk
                        />
                    )}
                </Margin>
                <Margin>
                    <EnkelCheckbox
                        tittel="Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver"
                        bold
                        margin
                        checked={erIArbeid.annetArbeidPaSikt}
                        vis={erIArbeid.annetArbeidPaSikt}
                    />
                    {!!erIArbeid.vurderingsdato && (
                        <ElementMedTekst
                            vis={erIArbeid.annetArbeidPaSikt && !!erIArbeid.vurderingsdato}
                            tittel="Når antar du å kunne gi tilbakemelding på dette?"
                            tekst={DateFormatter.toReadableDate(erIArbeid.vurderingsdato, { withYear: true })}
                            innrykk
                        />
                    )}
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
                {!!erIkkeIArbeid.arbeidsforFOM && (
                    <ElementMedTekst
                        vis={!!erIkkeIArbeid.arbeidsforFOM}
                        tittel="Anslå når du tror dette kan skje"
                        tekst={DateFormatter.toReadableDate(erIkkeIArbeid.arbeidsforFOM, { withYear: true })}
                    />
                )}
                {!!erIkkeIArbeid.vurderingsdato && (
                    <ElementMedTekst
                        vis={!!erIkkeIArbeid.vurderingsdato}
                        tittel="Når antar du å kunne gi tilbakemelding på dette?"
                        tekst={DateFormatter.toReadableDate(erIkkeIArbeid.vurderingsdato, { withYear: true })}
                    />
                )}
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
