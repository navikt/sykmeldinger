import React, { useState } from 'react';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useAvbryt from '../../../../hooks/useAvbryt';
import { useParams } from 'react-router-dom';
import Panel from 'nav-frontend-paneler';
import Spacing from '../../../commonComponents/Spacing/Spacing';

const PapirInfoheader = () => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { isLoading, mutate: avbryt } = useAvbryt(sykmeldingId);

    const [harGittVidere, setHarGittVidere] = useState<boolean | undefined>(undefined);

    return (
        <Panel border>
            <Spacing amount="small">
                <Innholdstittel>Før du bruker sykmeldingen</Innholdstittel>
            </Spacing>

            <Spacing>
                <Normaltekst tag="p">
                    Du har allerede fått sykmeldingen på papir av den som sykmeldte deg. Nå har vi skannet den slik at
                    du kan gjøre resten digitalt.
                </Normaltekst>
            </Spacing>

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
                        <Normaltekst tag="p">Da avbryter du den digitale sykmeldingen.</Normaltekst>
                    </Spacing>

                    <Knapp spinner={isLoading} onClick={() => avbryt()}>
                        Avbryt den digitale sykmeldingen
                    </Knapp>
                </Spacing>
            )}

            {harGittVidere === false && (
                <Spacing direction="top">
                    <Spacing>
                        <Normaltekst tag="p">
                            Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i stedet. Det er
                            en fordel for begge: Da får dere alt her, både sykepengesøknaden og andre meldinger som
                            handler om sykefraværet. Papirsykmeldingen kan du legge bort. Det du gjør her erstatter
                            papiret.
                        </Normaltekst>
                    </Spacing>

                    <Spacing amount="small">
                        <Element>Hvis du får ja fra arbeidsgiveren din:</Element>
                    </Spacing>

                    <Spacing>
                        <a href="#apen-sykmelding-form">Gå til utfyllingen</a>
                    </Spacing>

                    <Spacing amount="small">
                        <Element>Hvis du i stedet skal fortsette med papiret:</Element>
                    </Spacing>

                    <Knapp spinner={isLoading} onClick={() => avbryt()}>
                        Avbryt den digitale sykmeldingen
                    </Knapp>
                </Spacing>
            )}
        </Panel>
    );
};

export default PapirInfoheader;
