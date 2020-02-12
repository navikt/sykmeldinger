import {
    Arbeidsforhold,
    ErrorsSchemaType,
    FeilOpplysninger,
    FieldValuesType,
    JaEllerNei,
    Skjemafelt,
    ValidatorSchemaType,
    ValidatorType,
} from './skjemaTypes';

export const validators: ValidatorSchemaType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: [
        {
            test: (value?: string | string[]): value is string => !!(value as string),
            failText: 'Du må bekrefte om opplysningene er riktige',
        },
    ],
    [Skjemafelt.SYKMELDT_FRA]: [
        {
            test: (value?: string | string[]): value is string => !!(value as string),
            failText: 'Du må oppgi hvor du er sykmeldt fra',
            requiresOneOf: [
                { name: Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE, requiredValue: JaEllerNei.JA },
                {
                    name: Skjemafelt.FEIL_OPPLYSNINGER,
                    requiredValues: [
                        FeilOpplysninger.ARBEIDSGIVER,
                        FeilOpplysninger.DIAGNOSE,
                        FeilOpplysninger.ANDRE_OPPLYSNINGER,
                    ],
                },
            ],
            requiresNoneOf: [
                {
                    name: Skjemafelt.FEIL_OPPLYSNINGER,
                    values: [FeilOpplysninger.PERIODE, FeilOpplysninger.SYKMELDINGSGRAD],
                },
            ],
        },
    ],
    [Skjemafelt.FRILANSER_EGENMELDING]: [
        {
            test: (value?: string | string[]): value is string => !!(value as string),
            failText: 'Du må svare på om du har brukt egenmeldingsdager under sykefraværet',
            requiresOneOf: [
                {
                    name: Skjemafelt.SYKMELDT_FRA,
                    requiredValues: [Arbeidsforhold.FRILANSER, Arbeidsforhold.SELVSTENDIG_NARINGSDRIVENDE],
                },
            ],
        },
    ],
    [Skjemafelt.FRILANSER_FORSIKRING]: [
        {
            test: (value?: string | string[]): value is string => !!(value as string),
            failText: 'Du må svare på om du har forsikring som gjelder for de første 16 dagene av sykefraværet',
            requiresOneOf: [
                {
                    name: Skjemafelt.SYKMELDT_FRA,
                    requiredValues: [Arbeidsforhold.FRILANSER, Arbeidsforhold.SELVSTENDIG_NARINGSDRIVENDE],
                },
            ],
        },
    ],
    [Skjemafelt.OPPFOLGING]: [
        {
            test: (value?: string | string[]): value is string => !!(value as string),
            failText: 'Du må svare på om det er ANSVARLIG_NAVN som skal følge deg opp på jobben når du er syk',
            requiresOneOf: [
                {
                    name: Skjemafelt.SYKMELDT_FRA,
                    requiredValue: Arbeidsforhold.ARBEIDSGIVER,
                },
            ],
        },
    ],
    [Skjemafelt.FEIL_OPPLYSNINGER]: [
        {
            test: (value?: string | string[]): value is string[] => (value as string[]).length > 0,
            failText: 'Du må oppgi hvilke opplysninger som ikke er riktige',
            requiresOneOf: [{ name: Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE, requiredValue: JaEllerNei.NEI }],
        },
    ],
    [Skjemafelt.EGENMELDINGSPERIODER]: [
        {
            test: (value?: string | string[]): value is string[] => true, // TODO: Validator
            failText: 'Periode mangler utfylling',
            requiresOneOf: [
                {
                    name: Skjemafelt.FRILANSER_EGENMELDING,
                    requiredValue: JaEllerNei.JA,
                },
            ],
        },
    ],
};

export const validateField = (name: Skjemafelt, validators: ValidatorSchemaType, fieldValues: FieldValuesType) => {
    const validator = validators[name];

    if (!validator) {
        return null;
    }

    return validator.find((v: ValidatorType) => {
        if (v.requiresNoneOf) {
            const anyRequiredEmptyFieldsDefined = v.requiresNoneOf.some(({ name, values }) => {
                const fieldValue = fieldValues[name];

                if (fieldValue instanceof Array) {
                    return !values.some(value => fieldValue.includes(value));
                }

                return !values.some(value => fieldValue === value);
            });

            if (!anyRequiredEmptyFieldsDefined) {
                return null;
            }
        }

        if (v.requiresOneOf) {
            const oneRequiredFieldIsDefined = v.requiresOneOf.some(({ name, requiredValue, requiredValues }) => {
                const fieldValue = fieldValues[name];

                if (fieldValue instanceof Array) {
                    if (requiredValue) {
                        return fieldValue.includes(requiredValue);
                    }

                    if (requiredValues) {
                        return requiredValues.some(value => fieldValue.includes(value));
                    }
                } else {
                    if (requiredValue) {
                        return fieldValue === requiredValue;
                    }

                    if (requiredValues) {
                        return requiredValues.some(value => fieldValue === value);
                    }
                }

                return false;
            });

            if (!oneRequiredFieldIsDefined) {
                return null;
            }
        }

        return !v.test(fieldValues[name]);
    });
};

export const validateAll = (fieldValues: FieldValuesType, errorSchema: ErrorsSchemaType) => {
    const validationErrors = errorSchema;

    const newErrors = Object.keys(fieldValues).reduce((accumulatedErrors, fieldKey) => {
        const failedValidation = validateField(fieldKey as Skjemafelt, validators, fieldValues);
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
