import dayjs from 'dayjs';

import tekster from '../SendingsSkjema-tekster';
import {
    Arbeidsforhold,
    ErrorsSchemaType,
    FeilOpplysninger,
    FieldValuesType,
    JaEllerNei,
    Skjemafelt,
    ValidationProps,
    ValidatorSchemaType,
    ValidatorType,
} from './skjemaTypes';
import { getLedetekst } from '../../../../utils/utils';
import { hentValgtArbeidsgiverNaermesteLederNavn } from './skjemaUtils';

export const validators: ValidatorSchemaType = {
    [Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE]: [
        {
            test: (value?: string | string[] | string[][]): value is string => !!(value as string),
            failText: tekster['feilmelding.opplysningene-er-riktige'],
        },
    ],
    [Skjemafelt.SYKMELDT_FRA]: [
        {
            test: (value?: string | string[] | string[][]): value is string => !!(value as string),
            failText: tekster['feilmelding.sykmeldt-fra'],
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
            test: (value?: string | string[] | string[][]): value is string => !!(value as string),
            failText: tekster['feilmelding.frilanser.egenmelding'],
            requiresOneOf: [
                {
                    name: Skjemafelt.SYKMELDT_FRA,
                    requiredValues: [Arbeidsforhold.FRILANSER, Arbeidsforhold.SELVSTENDIG_NARINGSDRIVENDE],
                },
            ],
        },
    ],
    [Skjemafelt.EGENMELDINGSPERIODER]: [
        {
            test: (value?: string | string[] | string[][]): value is string[][] => {
                const perioder = value as string[][];
                return perioder.every(periode => periode.length === 2);
            },
            failText: tekster['feilmelding.egenmeldingsperioder.periode-mangler-utfylling'],
            requiresOneOf: [
                {
                    name: Skjemafelt.FRILANSER_EGENMELDING,
                    requiredValue: JaEllerNei.JA,
                },
            ],
        },
        {
            test: (value?: string | string[] | string[][]): value is string[][] => {
                const perioder = value as string[][];

                const sortertEtterStartDato = perioder.sort((a, b) => {
                    if (dayjs(a[0]).isBefore(dayjs(b[0]))) {
                        return -1;
                    } else if (dayjs(a[0]).isSame(dayjs(b[0]))) {
                        return 0;
                    }
                    return 1;
                });

                for (let i = 0; i < sortertEtterStartDato.length - 1; i++) {
                    if (
                        dayjs(sortertEtterStartDato[i + 1][0]).isBefore(dayjs(sortertEtterStartDato[i][1])) ||
                        dayjs(sortertEtterStartDato[i + 1][0]).isSame(dayjs(sortertEtterStartDato[i][1]))
                    ) {
                        return false;
                    }
                }
                return true;
            },
            failText: tekster['feilmelding.egenmeldingsperioder.overlapp'],
            requiresOneOf: [
                {
                    name: Skjemafelt.FRILANSER_EGENMELDING,
                    requiredValue: JaEllerNei.JA,
                },
            ],
        },
    ],
    [Skjemafelt.FRILANSER_FORSIKRING]: [
        {
            test: (value?: string | string[] | string[][]): value is string => !!(value as string),
            failText: tekster['feilmelding.frilanser.forsikring'],
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
            test: (value?: string | string[] | string[][]): value is string => !!(value as string),
            failText: tekster['sykmeldtFra.arbeidsgiver.bekreft.feilmelding'],
            failTextReplacement: (
                fieldValues: FieldValuesType,
                failText: string,
                { arbeidsgivere }: ValidationProps,
            ) => {
                const arbeidsgivernavn = hentValgtArbeidsgiverNaermesteLederNavn(fieldValues, arbeidsgivere);
                return getLedetekst(failText, { '%ARBEIDSGIVER%': arbeidsgivernavn });
            },
            requiresOneOf: [
                {
                    name: Skjemafelt.SYKMELDT_FRA,
                    startsWith: Arbeidsforhold.ARBEIDSGIVER,
                },
            ],
        },
    ],
    [Skjemafelt.FEIL_OPPLYSNINGER]: [
        {
            test: (value?: string | string[] | string[][]): value is string[] => (value as string[]).length > 0,
            failText: tekster['opplysningeneErFeil.feilmelding'],
            requiresOneOf: [{ name: Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE, requiredValue: JaEllerNei.NEI }],
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
                    return !values.some(value => fieldValue.flat().includes(value));
                }

                return !values.some(value => fieldValue === value);
            });

            if (!anyRequiredEmptyFieldsDefined) {
                return null;
            }
        }

        if (v.requiresOneOf) {
            const oneRequiredFieldIsDefined = v.requiresOneOf.some(
                ({ name, startsWith, requiredValue, requiredValues }) => {
                    const fieldValue = fieldValues[name];

                    if (fieldValue instanceof Array) {
                        if (requiredValue) {
                            return fieldValue.flat().includes(requiredValue);
                        }

                        if (requiredValues) {
                            return requiredValues.some(value => fieldValue.flat().includes(value));
                        }
                    } else {
                        if (startsWith) {
                            return fieldValue?.startsWith(startsWith);
                        }

                        if (requiredValue) {
                            return fieldValue === requiredValue;
                        }

                        if (requiredValues) {
                            return requiredValues.some(value => fieldValue === value);
                        }
                    }

                    return false;
                },
            );

            if (!oneRequiredFieldIsDefined) {
                return null;
            }
        }

        return !v.test(fieldValues[name]);
    });
};

export const getFailText = (fieldValues: FieldValuesType, failedValidation: ValidatorType, props: ValidationProps) => {
    if (!failedValidation.failTextReplacement) {
        return failedValidation.failText;
    }

    return failedValidation.failTextReplacement(fieldValues, failedValidation.failText, props);
};

export const validateAll = (fieldValues: FieldValuesType, errorSchema: ErrorsSchemaType, props: ValidationProps) => {
    const validationErrors = errorSchema;

    const newErrors = Object.keys(fieldValues).reduce((accumulatedErrors, fieldKey) => {
        const failedValidation = validateField(fieldKey as Skjemafelt, validators, fieldValues);

        if (failedValidation) {
            const failText = getFailText(fieldValues, failedValidation, props);
            return {
                ...accumulatedErrors,
                [fieldKey]: failText,
            };
        }
        return accumulatedErrors;
    }, validationErrors);

    if (Object.keys(newErrors).length > 0) {
        return newErrors;
    }

    return errorSchema;
};
