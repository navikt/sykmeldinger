import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { Fieldset, SkjemaGruppe, Checkbox } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import { AlertStripeHjelper } from '../../../utils/alertstripe-utils';

interface OpplysningeneErFeilProps {
    vis: boolean;
    visAlertstripeAvbryt: boolean;
    visAlertstripeBrukArbeidsgiver: boolean;
    visAlertstripeBruk: boolean;
    register: any;
    errors: Partial<Record<string, FieldError>>;
}

const OpplysningeneErFeil: React.FC<OpplysningeneErFeilProps> = ({
    vis,
    visAlertstripeAvbryt,
    visAlertstripeBrukArbeidsgiver,
    visAlertstripeBruk,
    register,
    errors,
}: OpplysningeneErFeilProps) => {
    if (vis) {
        return (
            <>
                <SkjemaGruppe
                    feil={errors.opplysninger ? { feilmelding: tekster['opplysningeneErFeil.feilmelding'] } : undefined}
                    className="skjemagruppe--undersporsmal"
                >
                    <Fieldset legend={tekster['opplysningeneErFeil.tittel']}>
                        <Checkbox
                            label={tekster['opplysningeneErFeil.periode']}
                            name="periode"
                            checkboxRef={register as any}
                        />
                        <Checkbox
                            label={tekster['opplysningeneErFeil.sykmeldingsgrad']}
                            name="sykmeldingsgrad"
                            checkboxRef={register as any}
                        />
                        <Checkbox
                            label={tekster['opplysningeneErFeil.arbeidsgiver']}
                            name="arbeidsgiver"
                            checkboxRef={register as any}
                        />
                        <Checkbox
                            label={tekster['opplysningeneErFeil.diagnose']}
                            name="diagnose"
                            checkboxRef={register as any}
                        />
                        <Checkbox
                            label={tekster['opplysningeneErFeil.andreOpplysninger']}
                            name="andreOpplysninger"
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
    }

    return <></>;
};

export default OpplysningeneErFeil;
