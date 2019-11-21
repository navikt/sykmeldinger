import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';

interface FrilanserSporsmalProps {
    vis: boolean;
    register: any;
    errors: Partial<Record<string, FieldError>>;
}

const FrilanserSporsmal = ({ vis, register, errors }: FrilanserSporsmalProps) => {
    if (vis) {
        return (
            <>
                <SkjemaGruppe
                    feil={errors.frilanserEgenmelding ? { feilmelding: 'Velg om du har hatt egenmelding' } : undefined}
                    className="skjemagruppe--undersporsmal"
                >
                    <Fieldset legend={tekster['frilanser.egenmelding.tittel']}>
                        <Radio
                            label={tekster['ja']}
                            name="frilanserEgenmelding"
                            value="true"
                            radioRef={register as any}
                        />
                        <Radio
                            label={tekster['nei']}
                            name="frilanserEgenmelding"
                            value="false"
                            radioRef={register as any}
                        />
                    </Fieldset>
                </SkjemaGruppe>
                <SkjemaGruppe
                    feil={errors.frilanserForsikring ? { feilmelding: 'Velg om du har hatt forsikring' } : undefined}
                    className="skjemagruppe--undersporsmal"
                >
                    <Fieldset legend={tekster['frilanser.forsikring.tittel']}>
                        <Radio
                            label={tekster['ja']}
                            name="frilanserForsikring"
                            value="true"
                            radioRef={register as any}
                        />
                        <Radio
                            label={tekster['nei']}
                            name="frilanserForsikring"
                            value="false"
                            radioRef={register as any}
                        />
                    </Fieldset>
                </SkjemaGruppe>
            </>
        );
    }

    return <></>;
};

export default FrilanserSporsmal;
