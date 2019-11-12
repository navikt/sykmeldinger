import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Fieldset, Radio, SkjemaGruppe, RadioPanelGruppe } from 'nav-frontend-skjema';
import { CheckboksPanelGruppe, CheckboksPanel, Checkbox } from 'nav-frontend-skjema';
import useForm from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
    .object()
    .shape({
        opplysningeneErRiktige: yup.string().required(),
        periode: yup.boolean(),
        sykmeldingsgrad: yup.boolean(),
        arbeidsgiver: yup.boolean(),
        diagnose: yup.boolean(),
        andreOpplysninger: yup.boolean(),
        sykmeldtFra: yup.string().required(),
    })
    .test('uriktigeOpplysninger', 'Vennligst velg ett eller flere alternativ', (obj): boolean => {
        if (obj.opplysningeneErRiktige === 'false') {
            if (
                obj.periode === false &&
                obj.sykmeldingsgrad === false &&
                obj.arbeidsgiver === false &&
                obj.diagnose === false &&
                obj.andreOpplysninger === false
            ) {
                return false;
            }
            return true;
        }
        return true;
    });

const Sporsmal: React.FC = () => {
    const { register, handleSubmit, watch, triggerValidation, getValues, errors } = useForm({
        validationSchema: schema,
    }); // initialise the hook
    const watchOpplysningeneErRiktige = watch('opplysningeneErRiktige');

    const onSubmit = (data: any) => {
        console.log(data);
        console.log(errors);
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <PanelBase>
                <SkjemaGruppe
                    feil={errors.opplysningeneErRiktige ? { feilmelding: 'Vennligst velg Ja eller Nei' } : undefined}
                >
                    <Fieldset legend="Er opplysningene i sykmeldingen riktige?">
                        <Radio
                            label="Ja"
                            name="opplysningeneErRiktige"
                            value="true"
                            radioRef={register as any}
                        />
                        <Radio
                            label="Nei"
                            name="opplysningeneErRiktige"
                            value="false"
                            radioRef={register as any}
                        />
                    </Fieldset>
                </SkjemaGruppe>
                {watchOpplysningeneErRiktige === "false" && (
                    <SkjemaGruppe
                        feil={
                            errors.undefined ? { feilmelding: 'Vennligst velg ett eller flere alternativ' } : undefined
                        }
                    >
                        <Fieldset legend="Hva er som ikke stemmer?">
                            <Checkbox label="Periode" name="periode" checkboxRef={register as any} />
                            <Checkbox label="Sykmeldingsgrad" name="sykmeldingsgrad" checkboxRef={register as any} />
                            <Checkbox label="Arbeidsgiver" name="arbeidsgiver" checkboxRef={register as any} />
                            <Checkbox label="Diagnose" name="diagnose" checkboxRef={register as any} />
                            <Checkbox
                                label="Andre opplysninger"
                                name="andreOpplysninger"
                                checkboxRef={register as any}
                            />
                        </Fieldset>
                    </SkjemaGruppe>
                )}
            </PanelBase>
            <br/>
            <PanelBase>
                <SkjemaGruppe feil={errors.sykmeldtFra ? { feilmelding: 'Velg hvor du er sykmeldt fra' } : undefined}>
                    <Fieldset legend="Jeg er sykmeldt fra">
                        <Radio
                            label="Liste med arbeidsgivere"
                            name="sykmeldtFra"
                            value="arbg"
                            radioRef={register as any}
                        />
                        <Radio
                            label="Jobb som selstendig næringsdrivende"
                            name="sykmeldtFra"
                            value="selvstendigNaringsdrivende"
                            radioRef={register as any}
                        />
                        <Radio
                            label="Jobb som frilanser"
                            name="sykmeldtFra"
                            value="frilanser"
                            radioRef={register as any}
                        />
                    </Fieldset>
                </SkjemaGruppe>
            </PanelBase>
            <input type="submit" />
        </form>
    );
};

export default Sporsmal;
