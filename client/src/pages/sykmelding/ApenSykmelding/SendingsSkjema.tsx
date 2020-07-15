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
import useFetch from '../../commonComponents/hooks/useFetch';
import { SoknadBehandlet } from '../../../types/soknadBehandlet';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const soknadBehandletFetcher = useFetch<SoknadBehandlet>(
        `${process.env.REACT_APP_SYFOREST_ROOT}/soknader/sykmelding-behandlet?sykmeldingId=${sykmelding.id}`,
    );
    const bekreftFetcher = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/v1/actions/bekreft?sykmeldingId=${sykmelding.id}`,
        undefined,
    );
    const sendFetcher = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/v1/actions/send?sykmeldingId=${sykmelding.id}`,
        undefined,
    );
    const avbrytFetcher = useFetch(
        `${process.env.REACT_APP_SYFOREST_ROOT}/v1/actions/avbryt?sykmeldingId=${sykmelding.id}`,
        undefined,
    );

    const [visAvbrytDialog, setVisAvbrytDialog] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [errors, setErrors] = useState(errorSchema);
    const [fieldValues, setFieldValues] = useState(fieldValuesSchema);
    const feiloppsummering = useRef<HTMLDivElement>(null);

    const skalViseAvbryt = brukerTrengerNySykmelding(fieldValues);

    const skalViseSend = visSend(fieldValues, skalViseAvbryt); // TODO: Needs refactor

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
            if (skalViseSend) {
                sendFetcher.fetch({ method: 'POST', body: JSON.stringify(fieldValues) });
                // TODO: Poll soknadBehandletFetcher until soknadBehandletFetcher.data.erBehandlet returns true
            } else {
                bekreftFetcher.fetch({ method: 'POST', body: JSON.stringify(fieldValues) });
            }
        }
    };

    const onAvbryt = () => {
        avbrytFetcher.fetch();
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
                        submitting={bekreftFetcher.status === 'PENDING' || sendFetcher.status === 'PENDING'}
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
                    visSpinner={avbrytFetcher.status === 'PENDING'}
                />
            </div>
        </div>
    );
};

export default SendingsSkjema;
