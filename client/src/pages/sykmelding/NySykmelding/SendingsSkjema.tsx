import React, { SyntheticEvent, useRef, useState } from 'react';

import AvbrytDialog from './skjemaComponents/AvbrytDialog';
import Form from './skjemaComponents/Form';
import {
    Arbeidsforhold,
    ErrorsSchemaType,
    FeilOpplysninger,
    FieldValuesType,
    Skjemafelt,
} from './skjemaComponents/skjemaTypes';
import { brukerTrengerNySykmelding, clearDependentValues } from './skjemaComponents/skjemaUtils';
import { getFailText, validateAll, validateField, validators } from './skjemaComponents/validators';
import { Sykmelding } from '../../../types/sykmelding';
import { Arbeidsgiver } from '../../../types/arbeidsgiver';

export const fieldValuesSchema: FieldValuesType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: undefined,
    [Skjemafelt.SYKMELDT_FRA]: undefined,
    [Skjemafelt.FRILANSER_EGENMELDING]: undefined,
    [Skjemafelt.EGENMELDINGSPERIODER]: [[]],
    [Skjemafelt.FRILANSER_FORSIKRING]: undefined,
    [Skjemafelt.OPPFOLGING]: undefined,
    [Skjemafelt.FEIL_OPPLYSNINGER]: [],
};

export const errorSchema: ErrorsSchemaType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: null,
    [Skjemafelt.SYKMELDT_FRA]: null,
    [Skjemafelt.FRILANSER_EGENMELDING]: null,
    [Skjemafelt.EGENMELDINGSPERIODER]: null,
    [Skjemafelt.FRILANSER_FORSIKRING]: null,
    [Skjemafelt.OPPFOLGING]: null,
    [Skjemafelt.FEIL_OPPLYSNINGER]: null,
};

type SendingsSkjemaProps = {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
};

const visSend = (fieldValues: FieldValuesType, skalViseAvbryt: boolean) => {
    if (!skalViseAvbryt) {
        const sykmeldtFra = fieldValues[Skjemafelt.SYKMELDT_FRA];

        if (sykmeldtFra) {
            return Arbeidsforhold.ARBEIDSGIVER.includes(sykmeldtFra);
        }
    }

    return false;
};

const SendingsSkjema = ({ sykmelding, arbeidsgivere }: SendingsSkjemaProps) => {
    const [visAvbrytDialog, setVisAvbrytDialog] = useState(false);
    // TODO:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(errorSchema);
    const [fieldValues, setFieldValues] = useState(fieldValuesSchema);
    const feiloppsummering = useRef<HTMLDivElement>(null);

    const skalViseAvbryt = brukerTrengerNySykmelding(fieldValues);

    const skalViseSend = visSend(fieldValues, skalViseAvbryt);

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        const errors = validateAll(fieldValues, errorSchema, { arbeidsgivere });

        const hasErrors = Object.values(errors).some((error) => !!error);

        if (hasErrors) {
            setErrors(errors);
            setSubmitAttempt(true);
            feiloppsummering.current?.focus();
        } else {
            setSubmitAttempt(false);
            setSubmitting(true);

            if (skalViseSend) {
                // TODO: Send sykmelding. Create re-usable function as sending is done from multiple components
                console.log('Send sykmelding TODO');
            } else {
                // TODO: Bekreft sykmelding. Create re-usable function as bekrefting is done from multiple components
                console.log('Bekreft sykmelding TODO');
            }
        }
    };

    const onAvbryt = () => {
        // TODO: Avbryt sykmelding.
        console.log('Avbryt sykmelding TODO');
    };

    const handleChange = (value: string | string[] | string[][], name: Skjemafelt) => {
        if (visAvbrytDialog) {
            setVisAvbrytDialog(false);
        }

        const { updatedFieldValues, updatedErrors } = clearDependentValues(name, errors, fieldValues);

        const getValue = () => {
            if (name === Skjemafelt.FEIL_OPPLYSNINGER) {
                const index = fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].indexOf(value as FeilOpplysninger);

                if (index === -1) {
                    return [...fieldValues[Skjemafelt.FEIL_OPPLYSNINGER], value];
                }

                return fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].filter((_key, oIndex) => oIndex !== index);
            }

            return value;
        };

        const updatedValues = { ...updatedFieldValues, [name]: getValue() };

        const invalid = validateField(name, validators, updatedValues);

        if (submitAttempt) {
            const newErrors = {
                ...updatedErrors,
                [name]: invalid ? getFailText(fieldValues, invalid, { arbeidsgivere }) : null,
            };

            setErrors(newErrors);

            const hasErrors = validateAll(updatedValues, errorSchema, { arbeidsgivere });

            if (!hasErrors) {
                setSubmitAttempt(false);
            }
        }

        setFieldValues(updatedValues);
    };

    return (
        <div className="form-test">
            <div aria-live="assertive">
                {!submitSuccess && (
                    <Form
                        sykmelding={sykmelding}
                        fieldValues={fieldValues}
                        errors={errors}
                        onSubmit={submit}
                        onAvbryt={onAvbryt}
                        handleChange={handleChange}
                        feiloppsummering={feiloppsummering}
                        submitting={submitting}
                        skalViseSend={skalViseSend}
                        skalViseAvbryt={skalViseAvbryt}
                        arbeidsgivere={arbeidsgivere}
                        setVisAvbrytDialog={setVisAvbrytDialog}
                    />
                )}
                <AvbrytDialog
                    vis={visAvbrytDialog}
                    setVisAvbrytDialog={setVisAvbrytDialog}
                    onAvbryt={onAvbryt}
                    visSpinner={submitting}
                />
            </div>
        </div>
    );
};

export default SendingsSkjema;
