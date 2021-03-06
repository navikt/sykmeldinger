import React, { useState } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useAvbryt from '../../../../hooks/useAvbryt';
import { useParams } from 'react-router-dom';
import Spacing from '../../../../components/Spacing/Spacing';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';

const PapirInfoheader = () => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { isLoading, mutate: avbryt, error } = useAvbryt(sykmeldingId);

    const [harGittVidere, setHarGittVidere] = useState<boolean | undefined>(undefined);

    return (
        <div>
            <RadioPanelGruppe
                name="harDuGittPapirsykmeldingenVidere"
                legend="Har du allerede gitt papirsykmeldingen videre?"
                radios={[
                    { label: 'Ja', value: 'Ja' },
                    { label: 'Nei', value: 'Nei' },
                ]}
                checked={!!harGittVidere ? 'Ja' : harGittVidere === false ? 'Nei' : undefined}
                onChange={(_event, value) => {
                    if (value === 'Ja') {
                        setHarGittVidere(true);
                    } else {
                        setHarGittVidere(false);
                    }
                }}
            />

            {harGittVidere === true && (
                <Spacing direction="top">
                    <Spacing amount="small">
                        <AlertStripeInfo>
                            <Spacing amount="small">
                                <Normaltekst>
                                    Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i
                                    stedet. Det er en fordel for begge: Da får dere alt her, både sykepengesøknaden og
                                    andre meldinger som handler om sykefraværet. Papirsykmeldingen kan du legge bort.
                                    Det du gjør her, erstatter papiret.
                                </Normaltekst>
                            </Spacing>

                            <Element>
                                Hvis du får ja fra arbeidsgiveren din kan du fortsette utfyllingen på denne siden. Hvis
                                du i stedet skal fortsette med papiret må du avbryte denne sykmeldingen.
                            </Element>
                        </AlertStripeInfo>
                    </Spacing>

                    <Knapp spinner={isLoading} onClick={() => avbryt()}>
                        Avbryt sykmeldingen
                    </Knapp>

                    {error && (
                        <Spacing direction="top">
                            <AlertStripeFeil>{error.message}</AlertStripeFeil>
                        </Spacing>
                    )}
                </Spacing>
            )}

            {harGittVidere === false && (
                <Spacing direction="top">
                    <AlertStripeInfo>
                        <Element>Da kan du sende sykmeldingen herfra</Element>
                        <Normaltekst>
                            Under sjekker du opplysningene fra den som sykmeldte deg. Stemmer det med det dere ble enige
                            om? Du velger selv om du vil bruke sykmeldingen.
                        </Normaltekst>
                    </AlertStripeInfo>
                </Spacing>
            )}
        </div>
    );
};

export default PapirInfoheader;
