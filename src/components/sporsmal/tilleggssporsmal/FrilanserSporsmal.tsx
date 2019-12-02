import React from 'react';
import { FieldError, ValidationPayload } from 'react-hook-form/dist/types';
import { Fieldset, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import tekster from '../sporsmal-tekster';
import Egenmeldingsdager from './Egenmeldingsdager';
import { JaEllerNei } from '../Sporsmal';

interface FrilanserSporsmalProps {
    vis: boolean;
    register: any;
    unregister: any;
    errors: Partial<Record<string, FieldError>>;
    setValue: (name: string, value: any, shouldValidate?: boolean) => void;
    triggerValidation: (
        payload?: ValidationPayload<string, any> | ValidationPayload<string, any>[] | undefined,
        shouldRender?: any,
    ) => Promise<boolean>;
    isSubmitted: boolean;
    watchFrilanserEgemelding: string;
}

const FrilanserSporsmal = ({
    vis,
    register,
    unregister,
    errors,
    setValue,
    triggerValidation,
    isSubmitted,
    watchFrilanserEgemelding,
}: FrilanserSporsmalProps) => {
    if (!vis) {
        return null;
    }

    return (
        <>
            <SkjemaGruppe
                feil={errors.frilanserEgenmelding ? { feilmelding: tekster['frilanser.egenmelding.feilmelding'] } : undefined}
                className="skjemagruppe--undersporsmal"
            >
                <Fieldset legend={tekster['frilanser.egenmelding.tittel']}>
                    <Radio
                        label={tekster['ja']}
                        name="frilanserEgenmelding"
                        value={JaEllerNei.JA}
                        radioRef={register as any}
                    />
                    <Radio
                        label={tekster['nei']}
                        name="frilanserEgenmelding"
                        value={JaEllerNei.NEI}
                        radioRef={register as any}
                    />
                </Fieldset>
            </SkjemaGruppe>
            <Egenmeldingsdager
                vis={watchFrilanserEgemelding === JaEllerNei.JA}
                register={register}
                unregister={unregister}
                setValue={setValue}
                triggerValidation={triggerValidation}
                isSubmitted={isSubmitted}
                errors={errors}
            />
            <SkjemaGruppe
                feil={errors.frilanserForsikring ? { feilmelding: tekster['frilanser.forsikring.feilmelding'] } : undefined}
                className="skjemagruppe--undersporsmal"
            >
                <Fieldset legend={tekster['frilanser.forsikring.tittel']}>
                    <Radio label={tekster['ja']} name="frilanserForsikring" value="true" radioRef={register as any} />
                    <Radio label={tekster['nei']} name="frilanserForsikring" value="false" radioRef={register as any} />
                </Fieldset>
            </SkjemaGruppe>
        </>
    );
};

export default FrilanserSporsmal;
