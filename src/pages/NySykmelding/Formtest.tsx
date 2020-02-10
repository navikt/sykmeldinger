import React, { SyntheticEvent, useRef, useState } from 'react';
import {
    CheckboksPanelGruppe,
    Feiloppsummering,
    FeiloppsummeringFeil,
    Input,
    RadioPanelGruppe,
    SkjemaGruppe,
} from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';

import Vis from '../../utils/vis';

type FieldNames = 'opplysninger' | 'sykmeldtFra' | 'sykmeldtDato' | 'forsikring' | 'oppfolging' | 'opplysninger_feil';

type FieldValuesType = {
    opplysninger: string;
    sykmeldtFra: string;
    sykmeldtDato: string;
    forsikring: string;
    oppfolging: string;
    opplysninger_feil: string[];
};

type ErrorsSchemaType = {
    opplysninger: string | null;
    sykmeldtFra: string | null;
    sykmeldtDato: string | null;
    forsikring: string | null;
    oppfolging: string | null;
    opplysninger_feil: string | null;
};

const fieldValuesSchema: FieldValuesType = {
    opplysninger: '',
    sykmeldtFra: '',
    sykmeldtDato: '',
    forsikring: '',
    oppfolging: '',
    opplysninger_feil: [],
};

const errorSchema: ErrorsSchemaType = {
    opplysninger: null,
    sykmeldtFra: null,
    sykmeldtDato: null,
    forsikring: null,
    oppfolging: null,
    opplysninger_feil: null,
};

type ValidatorSchemaType = {
    opplysninger: ValidatorType[];
    sykmeldtFra: ValidatorType[];
    sykmeldtDato: ValidatorType[];
    forsikring: ValidatorType[];
    oppfolging: ValidatorType[];
    opplysninger_feil: ValidatorType[];
};

type FormProps = {
    errorMessages: FeiloppsummeringFeil[];
    fieldValues: FieldValuesType;
    errors: ErrorsSchemaType;
    onSubmit: any;
    handleChange: any;
    reset: (event: SyntheticEvent) => void;
    feiloppsummering: React.RefObject<HTMLDivElement>;
};

// TODO: Erstatt any
const Form = ({ errorMessages, fieldValues, errors, onSubmit, handleChange, reset, feiloppsummering }: FormProps) => {
    return (
        <form onSubmit={onSubmit}>
            <Panel>
                <RadioPanelGruppe
                    name="opplysninger"
                    legend={'Er opplysningene i sykmeldingen riktige?'}
                    radios={[
                        {
                            label: 'Ja',
                            value: 'ja',
                            id: 'b-opplysninger',
                        },
                        {
                            label: 'Nei',
                            value: 'nei',
                        },
                    ]}
                    onChange={(e, value) => handleChange(value, 'opplysninger')}
                    checked={fieldValues.opplysninger}
                    // @ts-ignore // TODO: Finn ut av riktig TS type her
                    feil={errors.opplysninger ? errors.opplysninger : null}
                />
                <Vis hvis={fieldValues.opplysninger === 'ja'}>
                    <br />
                    <RadioPanelGruppe
                        name="sykmeldtFra"
                        legend={'Jeg er sykmeldt fra'}
                        radios={[
                            {
                                label: 'arbeidsgiver1',
                                value: 'arbeidsgiver1',
                                id: 'b-sykmeldtFra',
                            },
                            {
                                label: 'arbeidsgiver2',
                                value: 'arbeidsgiver2',
                            },
                            {
                                label: 'Jobb som selvstendig næringsdrivende',
                                value: 'selvstendig',
                            },
                            {
                                label: 'Jobb som frilanser',
                                value: 'frilanser',
                            },
                            {
                                label: 'Jobb hos en annen arbeidsgiver',
                                value: 'annenArbeidsgiver',
                            },
                            {
                                label: 'Jeg er arbeidsledig',
                                value: 'arbeidsledig',
                            },
                            {
                                label: 'Jeg finner ingenting som passer for meg',
                                value: 'annet',
                            },
                        ]}
                        onChange={(e, value) => handleChange(value, 'sykmeldtFra')}
                        checked={fieldValues.sykmeldtFra}
                        // @ts-ignore // TODO: Finn ut av riktig TS type her
                        feil={errors.sykmeldtFra ? errors.sykmeldtFra : null}
                    />
                    <Vis
                        hvis={
                            ['arbeidsgiver1', 'arbeidsgiver2'].includes(
                                fieldValues.sykmeldtFra,
                            ) /* skal gjelde på alle valgte arbeidsgivere */
                        }
                    >
                        <br />
                        <RadioPanelGruppe
                            name="oppfolging"
                            legend={'Er det <ARBEIDSGIVER> som skal følge deg opp på jobben når du er syk?'}
                            radios={[
                                {
                                    label: 'Ja',
                                    value: 'ja',
                                    id: 'b-oppfolging',
                                },
                                {
                                    label: 'Nei',
                                    value: 'nei',
                                },
                            ]}
                            onChange={(e, value) => handleChange(value, 'oppfolging')}
                            checked={fieldValues.oppfolging}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={errors.oppfolging ? errors.oppfolging : null}
                        />
                    </Vis>
                    <Vis
                        hvis={
                            ['selvstendig', 'frilanser'].includes(
                                fieldValues.sykmeldtFra,
                            ) /* skal gjelde på alle valgte arbeidsgivere */
                        }
                    >
                        <br />
                        <RadioPanelGruppe
                            name="sykmeldtDato"
                            legend={
                                'Vi har registrert at du ble sykmeldt <SYKMELDING DATO>. Brukte du egenmelding eller noen annen sykmelding før denne datoen?'
                            }
                            radios={[
                                {
                                    label: 'Ja',
                                    value: 'ja',
                                    id: 'b-sykmeldtDato',
                                },
                                {
                                    label: 'Nei',
                                    value: 'nei',
                                },
                            ]}
                            onChange={(e, value) => handleChange(value, 'sykmeldtDato')}
                            checked={fieldValues.sykmeldtDato}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={errors.sykmeldtDato ? errors.sykmeldtDato : null}
                        />
                        <br />
                        <RadioPanelGruppe
                            name="forsikring"
                            legend={'Har du forsikring som gjelder de første 16 dagene av sykefraværet?'}
                            radios={[
                                {
                                    label: 'Ja',
                                    value: 'ja',
                                    id: 'b-forsikring',
                                },
                                {
                                    label: 'Nei',
                                    value: 'nei',
                                },
                            ]}
                            onChange={(e, value) => handleChange(value, 'forsikring')}
                            checked={fieldValues.forsikring}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={errors.forsikring ? errors.forsikring : null}
                        />
                    </Vis>
                </Vis>
                <Vis hvis={fieldValues.opplysninger === 'nei'}>
                    <br />
                    <CheckboksPanelGruppe
                        legend={'Hvilke opplysninger er ikke riktige?'}
                        checkboxes={[
                            {
                                label: 'Periode',
                                value: 'periode',
                                id: 'b-opplysninger_feil',
                                checked: fieldValues.opplysninger_feil.indexOf('periode') !== -1,
                            },
                            {
                                label: 'Sykmeldingsgrad',
                                value: 'sykmeldingsgrad',
                                checked: fieldValues.opplysninger_feil.indexOf('sykmeldingsgrad') !== -1,
                            },
                            {
                                label: 'Arbeidsgiver',
                                value: 'arbeidsgiver',
                                checked: fieldValues.opplysninger_feil.indexOf('arbeidsgiver') !== -1,
                            },
                            {
                                label: 'Diagnose',
                                value: 'diagnose',
                                checked: fieldValues.opplysninger_feil.indexOf('diagnose') !== -1,
                            },
                            {
                                label: 'Andre opplysninger',
                                value: 'andre',
                                checked: fieldValues.opplysninger_feil.indexOf('andre') !== -1,
                            },
                        ]}
                        onChange={(e, value) => handleChange(value, 'opplysninger_feil')}
                        // @ts-ignore // TODO: Finn ut av riktig TS type her
                        feil={errors.opplysninger_feil ? errors.opplysninger_feil : null}
                    />
                </Vis>
            </Panel>
            {errorMessages && !!errorMessages.length && (
                <Feiloppsummering
                    innerRef={feiloppsummering}
                    tittel="For å gå videre må du rette opp følgende:"
                    feil={errorMessages}
                />
            )}
            <div className="form-buttons" style={{ display: 'flex' }}>
                <Hovedknapp htmlType="submit">Fullfør</Hovedknapp>
                <Flatknapp onClick={reset}>Nullstill</Flatknapp>
            </div>
        </form>
    );
};

const getErrorMessages = (errors: ErrorsSchemaType) => {
    const definedErrors = Object.entries(errors).filter(([_key, value]) => !!value);

    const errorMessages = definedErrors.map(
        ([key, value]) =>
            ({
                skjemaelementId: `b-${key}`,
                feilmelding: value,
            } as FeiloppsummeringFeil),
    );

    return errorMessages;
};

type ValidatorType = {
    test: (value: string | string[]) => boolean;
    failText: string;
    requires?: {
        name: FieldNames;
        requiredValue: string;
    }[];
};

const validators: ValidatorSchemaType = {
    opplysninger: [
        {
            test: (value: string | string[]): value is string => !!(value as string),
            failText: 'Du må bekrefte om opplysningene er riktige',
        },
    ],
    sykmeldtFra: [
        {
            test: (value: string | string[]): value is string => !!(value as string),
            failText: 'Du må oppgi hvor du er sykmeldt fra',
            requires: [{ name: 'opplysninger', requiredValue: 'ja' }],
        },
    ],
    sykmeldtDato: [
        {
            test: (value: string | string[]): value is string => !!(value as string),
            failText: 'Du må svare på om du har brukt egenmeldingsdager under sykefraværet',
            requires: [{ name: 'sykmeldtFra', requiredValue: 'frilanser' /* TODO: Og selvstendig */ }],
        },
    ],
    forsikring: [
        {
            test: (value: string | string[]): value is string => !!(value as string),
            failText: 'Du må svare på om du har forsikring som gjelder for de første 16 dagene av sykefraværet',
            requires: [{ name: 'sykmeldtFra', requiredValue: 'frilanser' /* TODO: Og selvstendig */ }],
        },
    ],
    oppfolging: [
        {
            test: (value: string | string[]): value is string => !!(value as string),
            failText: 'Du må oppgi hvor du er sykmeldt fra',
            requires: [
                { name: 'sykmeldtFra', requiredValue: 'arbeidsgiver1' /* TODO: Må støtte en eller flere felter */ },
            ],
        },
    ],
    opplysninger_feil: [
        {
            test: (value: string | string[]): value is string[] => (value as string[]).length > 0,
            failText: 'Du må oppgi hvilke opplysninger som ikke er riktige',
            requires: [{ name: 'opplysninger', requiredValue: 'nei' }],
        },
    ],
};

const validateField = (name: FieldNames, validators: ValidatorSchemaType, fieldValues: FieldValuesType) => {
    const validator = validators[name];

    if (!validator) {
        return null;
    }

    return validator.find((v: ValidatorType) => {
        if (v.requires) {
            const requirementsAreFulfilled = v.requires.every(({ name, requiredValue }) => {
                return fieldValues[name] === requiredValue;
            });

            if (requirementsAreFulfilled) {
                return !v.test(fieldValues[name]);
            }

            return null;
        }
        return !v.test(fieldValues[name]);
    });
};

const validateAll = (fieldValues: FieldValuesType) => {
    const validationErrors = errorSchema;

    const newErrors = Object.keys(fieldValues).reduce((accumulatedErrors, fieldKey) => {
        const failedValidation = validateField(fieldKey as FieldNames, validators, fieldValues);
        if (failedValidation) {
            return {
                ...accumulatedErrors,
                [fieldKey]: failedValidation.failText,
            };
        }
        return accumulatedErrors;
    }, validationErrors);

    if (Object.keys(newErrors).length > 0) {
        return newErrors;
    }

    return errorSchema;
};

const FormTest = () => {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(errorSchema);
    const [fieldValues, setFieldValues] = useState(fieldValuesSchema);
    const feiloppsummering = useRef<HTMLDivElement>(null);

    const reset = (event: SyntheticEvent) => {
        if (event) {
            event.preventDefault();
        }

        setSubmitSuccess(false);
        setSubmitAttempt(false);
        setSubmitting(false);
        setErrors(errorSchema);
        setFieldValues(fieldValuesSchema);
    };

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        const errors = validateAll(fieldValues);

        const hasErrors = Object.values(errors).some(error => !!error);

        if (hasErrors) {
            setErrors(errors);
            setSubmitAttempt(true);
            feiloppsummering.current?.focus();
        } else {
            setSubmitAttempt(false);
            setSubmitting(true);

            // do submit
            console.log('submitting', fieldValues);

            window.setTimeout(() => {
                setSubmitting(false);
                setSubmitSuccess(true);
            }, 500);
        }
    };

    const clearDependentValues = (name: FieldNames) => {
        let updatedFieldValues = { ...fieldValues };
        let updatedErrors = { ...errors };

        if (name === 'opplysninger') {
            updatedFieldValues = { ...updatedFieldValues, opplysninger_feil: [], sykmeldtFra: '' };
            updatedErrors = { ...errors, opplysninger_feil: null, sykmeldtFra: null };
        }

        if (name === 'sykmeldtFra') {
            updatedFieldValues = { ...updatedFieldValues, forsikring: '', sykmeldtDato: '' };
            updatedErrors = { ...errors, forsikring: null, sykmeldtDato: null };
        }

        return { updatedFieldValues, updatedErrors };
    };

    const handleChange = (value: string, name: FieldNames) => {
        const { updatedFieldValues, updatedErrors } = clearDependentValues(name);

        const getValue = () => {
            if (name === 'opplysninger_feil') {
                const index = fieldValues.opplysninger_feil.indexOf(value);

                if (index === -1) {
                    return [...fieldValues.opplysninger_feil, value];
                }

                return fieldValues.opplysninger_feil.filter((_opplysninger_feil, oIndex) => oIndex !== index);
            }

            return value;
        };

        const updatedValues = { ...updatedFieldValues, [name]: getValue() };

        const invalid = validateField(name, validators, updatedValues);

        if (submitAttempt) {
            const newErrors = { ...updatedErrors, [name]: invalid ? invalid.failText : null };

            setErrors(newErrors);

            const hasErrors = validateAll(updatedValues);

            if (!hasErrors) {
                setSubmitAttempt(false);
            }
        }

        setFieldValues(updatedValues);
    };

    const errorMessages = getErrorMessages(errors);

    return (
        <div className="form-test">
            <div aria-live="assertive">
                {!submitSuccess && (
                    <Form
                        errorMessages={errorMessages}
                        fieldValues={fieldValues}
                        errors={errors}
                        onSubmit={submit}
                        handleChange={handleChange}
                        reset={reset}
                        feiloppsummering={feiloppsummering}
                    />
                )}
                {submitSuccess && <div>Skjema sendt</div>}
            </div>
        </div>
    );
};

export default FormTest;
