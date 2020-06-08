import React from 'react';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { useFormContext } from 'react-hook-form';

import { AlertStripeHjelper } from '../../../../../../utils/alertstripe-utils';
import { Skjemafelt } from '../../../../../../types/sporsmalTypes';

interface OpplysningeneErFeilProps {
    vis: boolean;
    visAlertstripeAvbryt: boolean;
    visAlertstripeBrukArbeidsgiver: boolean;
    visAlertstripeBruk: boolean;
}

const OpplysningeneErFeil = ({
    vis,
    visAlertstripeAvbryt,
    visAlertstripeBrukArbeidsgiver,
    visAlertstripeBruk,
}: OpplysningeneErFeilProps) => {
    const { register, errors } = useFormContext();

    if (!vis) {
        return null;
    }

    return (
        <>
            <SkjemaGruppe
                feil={errors.opplysninger ? { feilmelding: errors.opplysninger.message } : undefined}
                className="skjemagruppe--undersporsmal"
            >
                <fieldset>
                    <legend>Hvilke opplysninger er ikke riktige?</legend>
                    <Checkbox label="Periode" name={Skjemafelt.PERIODE} checkboxRef={register as any} />
                    <Checkbox label="Sykmeldingsgrad" name={Skjemafelt.SYKMELDINGSGRAD} checkboxRef={register as any} />
                    <Checkbox label="Arbeidsgiver" name={Skjemafelt.ARBEIDSGIVER} checkboxRef={register as any} />
                    <Checkbox label="Diagnose" name={Skjemafelt.DIAGNOSE} checkboxRef={register as any} />
                    <Checkbox
                        label="Andre opplysninger"
                        name={Skjemafelt.ANDRE_OPPLYSNINGER}
                        checkboxRef={register as any}
                    />
                </fieldset>
            </SkjemaGruppe>
            <AlertStripeHjelper
                vis={visAlertstripeAvbryt}
                type="advarsel"
                tittel="Du trenger ny sykmelding."
                tekst='Du må avbryte denne sykmeldingen og kontakte den som har sykmeldt deg for å få en ny. For å avbryte, velg "Jeg ønsker ikke å bruke denne sykmeldingen" nederst på siden'
            />
            <AlertStripeHjelper
                vis={visAlertstripeBrukArbeidsgiver}
                type="info"
                tittel="Du kan bruke sykmeldingen din."
                tekst="Du velger hvilken arbeidsgiver sykmeldingen skal sendes til i neste spørsmål. Obs! Arbeidsgiveren som står i sykmeldingen fra før endres ikke, og vil være synlig for arbeidsgiveren du sender sykmeldingen til. Får du flere sykmeldinger må du gi beskjed til den som sykmelder deg om at det er lagt inn feil arbeidsgiver."
            />
            <AlertStripeHjelper
                vis={visAlertstripeBruk}
                type="info"
                tittel="Du kan bruke sykmeldingen din."
                tekst="Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil."
            />
        </>
    );
};

export default OpplysningeneErFeil;
