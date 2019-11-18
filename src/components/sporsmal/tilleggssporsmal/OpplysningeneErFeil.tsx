import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { Fieldset, SkjemaGruppe, Checkbox } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';

interface OpplysningeneErFeilProps {
    vis: boolean;
    register: any;
    errors: Partial<Record<string, FieldError>>;
}

const OpplysningeneErFeil: React.FC<OpplysningeneErFeilProps> = ({
    vis,
    register,
    errors,
}: OpplysningeneErFeilProps) => {
    if (vis) {
        return (
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
        );
    }

    return <></>;
};

export default OpplysningeneErFeil;
