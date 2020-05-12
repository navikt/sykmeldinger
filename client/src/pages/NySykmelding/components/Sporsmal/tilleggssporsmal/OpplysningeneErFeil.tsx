import React from 'react';
import { Checkbox, Fieldset, SkjemaGruppe } from 'nav-frontend-skjema';
import { useFormContext } from 'react-hook-form';

import tekster from '../Sporsmal-tekster';
import { AlertStripeHjelper } from '../../../../../utils/alertstripe-utils';
import { Skjemafelt } from '../../../../../types/sporsmalTypes';

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
                <Fieldset legend={tekster['opplysningeneErFeil.tittel']}>
                    <Checkbox
                        label={tekster['opplysningeneErFeil.periode']}
                        name={Skjemafelt.PERIODE}
                        checkboxRef={register as any}
                    />
                    <Checkbox
                        label={tekster['opplysningeneErFeil.sykmeldingsgrad']}
                        name={Skjemafelt.SYKMELDINGSGRAD}
                        checkboxRef={register as any}
                    />
                    <Checkbox
                        label={tekster['opplysningeneErFeil.arbeidsgiver']}
                        name={Skjemafelt.ARBEIDSGIVER}
                        checkboxRef={register as any}
                    />
                    <Checkbox
                        label={tekster['opplysningeneErFeil.diagnose']}
                        name={Skjemafelt.DIAGNOSE}
                        checkboxRef={register as any}
                    />
                    <Checkbox
                        label={tekster['opplysningeneErFeil.andreOpplysninger']}
                        name={Skjemafelt.ANDRE_OPPLYSNINGER}
                        checkboxRef={register as any}
                    />
                </Fieldset>
            </SkjemaGruppe>
            <AlertStripeHjelper
                vis={visAlertstripeAvbryt}
                type="advarsel"
                tittel={tekster['alertstripe.du-trenger-ny-sykmelding.tittel']}
                tekst={tekster['alertstripe.du-trenger-ny-sykmelding.tekst']}
            />
            <AlertStripeHjelper
                vis={visAlertstripeBrukArbeidsgiver}
                type="info"
                tittel={tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel']}
                tekst={tekster['alertstripe.du-kan-bruke-sykmeldingen.arbeidsgiver.tekst']}
            />
            <AlertStripeHjelper
                vis={visAlertstripeBruk}
                type="info"
                tittel={tekster['alertstripe.du-kan-bruke-sykmeldingen.tittel']}
                tekst={tekster['alertstripe.du-kan-bruke-sykmeldingen.tekst']}
            />
        </>
    );
};

export default OpplysningeneErFeil;
