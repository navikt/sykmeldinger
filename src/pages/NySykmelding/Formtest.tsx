import React, { SyntheticEvent, useRef, useState } from 'react';
import { CheckboksPanelGruppe, Feiloppsummering, FeiloppsummeringFeil, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';

type FieldNames = 'choices' | 'address' | 'zip' | 'city';

type FieldValuesType = {
    choices: string[];
    address: string;
    zip: string;
    city: string;
};

type ErrorsSchemaType = {
    choices: string | null;
    address: string | null;
    zip: string | null;
    city: string | null;
};

const fieldValuesSchema: FieldValuesType = {
    choices: [],
    address: '',
    zip: '',
    city: '',
};

const errorSchema: ErrorsSchemaType = {
    choices: null,
    address: null,
    zip: null,
    city: null,
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
            <CheckboksPanelGruppe
                legend={'Hva vil du ha levert'}
                checkboxes={[
                    {
                        label: 'Eplejuice',
                        value: 'juice1',
                        checked: fieldValues.choices.indexOf('juice1') !== -1,
                        id: 'b-choices',
                    },
                    {
                        label: 'Appelsinjuice',
                        value: 'juice2',
                        checked: fieldValues.choices.indexOf('juice2') !== -1,
                    },
                    {
                        label: 'Melk',
                        value: 'melk',
                        checked: fieldValues.choices.indexOf('melk') !== -1,
                    },
                    {
                        label: 'Ananasjuice',
                        value: 'juice3',
                        checked: fieldValues.choices.indexOf('juice3') !== -1,
                    },
                ]}
                onChange={(e, value) => handleChange(value, 'choices')}
                // @ts-ignore // TODO: Finn ut av riktig TS type her
                feil={errors.choices ? errors.choices : null}
            />
            <br />
            <br />
            <SkjemaGruppe legend="Leveringsadresse">
                <Input
                    id="b-address"
                    label="Adresse"
                    value={fieldValues.address}
                    onChange={e => handleChange(e.currentTarget.value, 'address')}
                    // @ts-ignore // TODO: Finn ut av riktig TS type her
                    feil={errors.address ? errors.address : null}
                />
                <div className="fields postnr-sted">
                    <div className="postnr-sted__postnr">
                        <Input
                            id="b-zip"
                            label="Postnummer (4 siffer)"
                            value={fieldValues.zip}
                            onChange={e => handleChange(e.currentTarget.value, 'zip')}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={errors.zip ? errors.zip : null}
                        />
                    </div>
                    <div className="postnr-sted__poststed">
                        <Input
                            id="b-city"
                            label="Poststed"
                            value={fieldValues.city}
                            onChange={e => handleChange(e.currentTarget.value, 'city')}
                            // @ts-ignore // TODO: Finn ut av riktig TS type her
                            feil={errors.city ? errors.city : null}
                        />
                    </div>
                </div>
            </SkjemaGruppe>
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
    const definedErrors = Object.entries(errors).filter(([key, value]) => !!value);

    const errorMessages = definedErrors.map(
        ([key, value]) =>
            ({
                skjemaelementId: `b-${key}`,
                feilmelding: value,
            } as FeiloppsummeringFeil),
    );

    return errorMessages;
};

const validators: ValidatorSchemaType = {
    choices: [
        {
            test: (value: string | string[] | number): value is string[] => (value as string[]).length > 0,
            failText: 'Du må velge minst èn ting',
        },
    ],
    address: [
        {
            test: (value: string | string[] | number): value is string => !!(value as string),
            failText: 'Du må oppgi en gateadresse',
        },
    ],
    zip: [
        {
            test: (value: string | string[] | number): value is string => !!(value as string),
            failText: 'Du må oppgi et postnummer',
        },
        {
            test: (value: string | string[] | number): value is string =>
                (value as string).toString().length === 4 && /^\d+$/.test(value as string),
            failText: 'Postnummer må ha 4 siffer',
        },
    ],
    city: [
        {
            test: (value: string | string[] | number): value is string => !!(value as string),
            failText: 'Du må oppgi et poststed',
        },
    ],
};

const validateField = (name: FieldNames, validators: ValidatorSchemaType, fieldValues: FieldValuesType) => {
    const validator = validators[name];

    if (!validator) {
        return null;
    }

    return validator.find((v: ValidatorType) => {
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

type ValidatorType = {
    test: (value: string | string[] | number) => boolean;
    failText: string;
};

type ValidatorSchemaType = {
    choices: ValidatorType[];
    address: ValidatorType[];
    zip: ValidatorType[];
    city: ValidatorType[];
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

    const handleChange = (value: string, name: FieldNames) => {
        const getValue = () => {
            if (name === 'choices') {
                const index = fieldValues.choices.indexOf(value);

                if (index === -1) {
                    return [...fieldValues.choices, value];
                }

                return fieldValues.choices.filter((_choice, choiceIndex) => choiceIndex !== index);
            }

            return value;
        };

        const updatedValues = { ...fieldValues, [name]: getValue() };

        const invalid = validateField(name, validators, updatedValues);

        if (submitAttempt) {
            const newErrors = { ...errors, [name]: invalid ? invalid.failText : null };

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
            <Systemtittel>Skjema</Systemtittel>
            <br />
            <br />
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
