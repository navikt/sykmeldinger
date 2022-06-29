import React, { useEffect, useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';

import Spacing from '../../../Spacing/Spacing';
import useGetSykmeldingIdParam from '../../../../hooks/useGetSykmeldingIdParam';
import { useChangeSykmeldingStatus } from '../../../../hooks/useMutations';
import { SykmeldingChangeStatus } from '../../../../fetching/graphql.generated';
import { useAmplitude } from '../../../../amplitude/amplitude';

const skjemanavn = 'avbryt åpen papirsykmelding';

function PapirInfoheader(): JSX.Element {
    const sykmeldingId = useGetSykmeldingIdParam();
    const logEvent = useAmplitude();
    const [{ loading, error }, avbryt] = useChangeSykmeldingStatus(
        sykmeldingId,
        SykmeldingChangeStatus.Avbryt,
        () => logEvent({ eventName: 'skjema fullført', data: { skjemanavn } }),
        () => logEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn } }),
    );
    const [harGittVidere, setHarGittVidere] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (harGittVidere) {
            logEvent({ eventName: 'skjema åpnet', data: { skjemanavn } });
        }
    }, [harGittVidere, logEvent]);

    return (
        <div className="hide-on-print">
            <RadioPanelGruppe
                name="harDuGittPapirsykmeldingenVidere"
                legend="Har du allerede gitt papirsykmeldingen videre?"
                radios={[
                    { label: 'Ja', value: 'Ja' },
                    { label: 'Nei', value: 'Nei' },
                ]}
                checked={!!harGittVidere ? 'Ja' : harGittVidere === false ? 'Nei' : undefined}
                onChange={(_event, value) => {
                    if (!harGittVidere)
                        logEvent({ eventName: 'skjema startet', data: { skjemanavn } }, { 'har gitt videre': value });

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

                    <Knapp spinner={loading} disabled={loading} onClick={() => avbryt()}>
                        Avbryt sykmeldingen
                    </Knapp>

                    {error && (
                        <Spacing direction="top">
                            <AlertStripeFeil>
                                En feil oppstod som gjorde at sykmeldingen ikke kunne avbrytes. Prøv igjen senere.
                            </AlertStripeFeil>
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
}

export default PapirInfoheader;
