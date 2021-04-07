import React, { useState } from 'react';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useAvbryt from '../../../../hooks/useAvbryt';
import { useParams } from 'react-router-dom';

const PapirInfoheader = () => {
    const { sykmeldingId } = useParams<{ sykmeldingId: string }>();
    const { isLoading, mutate: avbryt } = useAvbryt(sykmeldingId);

    const [harGittVidere, setHarGittVidere] = useState<boolean | undefined>(undefined);

    return (
        <>
            <Innholdstittel className="margin-bottom--1">Før du bruker sykmeldingen</Innholdstittel>
            <Normaltekst tag="p" className="margin-bottom--2">
                Du har allerede fått sykmeldingen på papir av den som sykmeldte deg. Nå har vi skannet den slik at du
                kan gjøre resten digitalt.
            </Normaltekst>

            <RadioPanelGruppe
                name="harDuGittPapirsykmeldingenVidere"
                className="margin-bottom--2"
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
                <>
                    <Normaltekst tag="p" className="margin-bottom--1">
                        Da avbryter du den digitale sykmeldingen.
                    </Normaltekst>
                    <Knapp className="margin-bottom--2" spinner={isLoading} onClick={() => avbryt()}>
                        Avbryt den digitale sykmeldingen
                    </Knapp>
                </>
            )}

            {harGittVidere === false && (
                <>
                    <Normaltekst tag="p" className="margin-bottom--2">
                        Hør med arbeidsgiveren din om det er greit at du sender sykmeldingen herfra i stedet. Det er en
                        fordel for begge: Da får dere alt her, både sykepengesøknaden og andre meldinger som handler om
                        sykefraværet. Papirsykmeldingen kan du legge bort. Det du gjør her erstatter papiret.
                    </Normaltekst>

                    <Element className="margin-bottom--1">Hvis du får ja fra arbeidsgiveren din:</Element>
                    <a href="#apen-sykmelding-form" className="knapp margin-bottom--2">
                        Gå til utfyllingen
                    </a>

                    <Element className="margin-bottom--1">Hvis du i stedet skal fortsette med papiret:</Element>
                    <Knapp className="margin-bottom--2" spinner={isLoading} onClick={() => avbryt()}>
                        Avbryt den digitale sykmeldingen
                    </Knapp>
                </>
            )}
        </>
    );
};

export default PapirInfoheader;
