import React, { SyntheticEvent, useRef, useState } from 'react';

import Arbeidsgiver from '../../../types/arbeidsgiverTypes';
import AvbrytDialog from './skjemaComponents/AvbrytDialog';
import Form from './skjemaComponents/Form';
import useFetch, { isNotStarted } from '../../../hooks/useFetch';
import {
    Arbeidsforhold,
    ErrorsSchemaType,
    FeilOpplysninger,
    FieldValuesType,
    JaEllerNei,
    Skjemafelt,
} from './skjemaComponents/skjemaTypes';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import { clearDependentValues } from './skjemaComponents/skjemaUtils';
import { getFailText, validateAll, validateField, validators } from './skjemaComponents/validators';

export const fieldValuesSchema: FieldValuesType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: undefined,
    [Skjemafelt.SYKMELDT_FRA]: undefined,
    [Skjemafelt.FRILANSER_EGENMELDING]: undefined,
    [Skjemafelt.FRILANSER_FORSIKRING]: undefined,
    [Skjemafelt.OPPFOLGING]: undefined,
    [Skjemafelt.FEIL_OPPLYSNINGER]: [],
    [Skjemafelt.EGENMELDINGSPERIODER]: [[]],
};

export const errorSchema: ErrorsSchemaType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: null,
    [Skjemafelt.SYKMELDT_FRA]: null,
    [Skjemafelt.FRILANSER_EGENMELDING]: null,
    [Skjemafelt.FRILANSER_FORSIKRING]: null,
    [Skjemafelt.OPPFOLGING]: null,
    [Skjemafelt.FEIL_OPPLYSNINGER]: null,
    [Skjemafelt.EGENMELDINGSPERIODER]: null,
};

type SendingsSkjemaProps = {
    sykmelding: Sykmelding;
    arbeidsgivere: Arbeidsgiver[];
};

const SendingsSkjema = ({ sykmelding, arbeidsgivere }: SendingsSkjemaProps) => {
    const [visAvbrytDialog, setVisAvbrytDialog] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState(errorSchema);
    const [fieldValues, setFieldValues] = useState(fieldValuesSchema);
    const feiloppsummering = useRef<HTMLDivElement>(null);

    const sendSykmelding = useFetch<any>(); // TODO: Oppdater return type
    const bekreftSykmelding = useFetch<any>(); // TODO: Oppdater return type
    const avbrytSykmelding = useFetch<any>(); // TODO: Oppdater return type

    const skalViseAvbryt =
        fieldValues[Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE] === JaEllerNei.NEI &&
        fieldValues[Skjemafelt.FEIL_OPPLYSNINGER].some(feil =>
            [FeilOpplysninger.PERIODE, FeilOpplysninger.SYKMELDINGSGRAD].includes(feil as FeilOpplysninger),
        );

    const skalViseSend =
        !skalViseAvbryt &&
        !!(
            fieldValues[Skjemafelt.SYKMELDT_FRA] &&
            Arbeidsforhold.ARBEIDSGIVER.includes(fieldValues[Skjemafelt.SYKMELDT_FRA]!)
        );

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        const errors = validateAll(fieldValues, errorSchema, { arbeidsgivere });

        const hasErrors = Object.values(errors).some(error => !!error);

        if (hasErrors) {
            setErrors(errors);
            setSubmitAttempt(true);
            feiloppsummering.current?.focus();
        } else {
            setSubmitAttempt(false);
            setSubmitting(true);

            if (skalViseSend) {
                if (isNotStarted(sendSykmelding)) {
                    sendSykmelding.fetch(
                        `${process.env.REACT_APP_API_URL}/sykmelding/send/`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: sykmelding.id, fieldValues }),
                        },
                        () => {
                            setSubmitSuccess(true);
                            setSubmitting(false);
                            // Hvis appen kjører i solo modus, skal vi ikke redirecte til annen app
                            if (process.env.REACT_APP_SOLO) {
                                window.location.reload();
                            } else {
                                window.location.assign(`${process.env.REACT_APP_SYKEFRAVAER_URL}`);
                            }
                        },
                    );
                }
            } else {
                if (isNotStarted(bekreftSykmelding)) {
                    sendSykmelding.fetch(
                        `${process.env.REACT_APP_API_URL}/sykmelding/bekreft/`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: sykmelding.id, fieldValues }),
                        },
                        () => {
                            setSubmitSuccess(true);
                            setSubmitting(false);
                            // Hvis appen kjører i solo modus, skal vi ikke redirecte til annen app
                            if (process.env.REACT_APP_SOLO) {
                                window.location.reload();
                            } else {
                                window.location.assign(`${process.env.REACT_APP_SYKEFRAVAER_URL}`);
                            }
                        },
                    );
                }
            }
        }
    };

    const onAvbryt = () => {
        if (isNotStarted(avbrytSykmelding)) {
            avbrytSykmelding.fetch(
                `${process.env.REACT_APP_API_URL}/sykmelding/avbryt/${sykmelding.id}`,
                {
                    method: 'POST',
                },
                () => {
                    setSubmitSuccess(true);
                    setSubmitting(false);
                    // Hvis appen kjører i solo modus, skal vi ikke redirecte til annen app
                    if (process.env.REACT_APP_SOLO) {
                        window.location.reload();
                    } else {
                        window.location.assign(`${process.env.REACT_APP_SYKEFRAVAER_URL}`);
                    }
                },
            );
        }
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
