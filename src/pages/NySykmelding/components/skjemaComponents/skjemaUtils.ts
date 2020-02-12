import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { ErrorsSchemaType, FieldValuesType, Skjemafelt } from './skjemaTypes';

export const getErrorMessages = (errors: ErrorsSchemaType) => {
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

export const clearDependentValues = (name: Skjemafelt, errors: ErrorsSchemaType, fieldValues: FieldValuesType) => {
    let updatedFieldValues = { ...fieldValues };
    let updatedErrors = { ...errors };

    if (name === Skjemafelt.OPPLYSNINGENE_ER_RIKTIGE) {
        updatedFieldValues = {
            ...updatedFieldValues,
            [Skjemafelt.FEIL_OPPLYSNINGER]: [],
            [Skjemafelt.SYKMELDT_FRA]: undefined,
        };
        updatedErrors = { ...errors, [Skjemafelt.FEIL_OPPLYSNINGER]: null, [Skjemafelt.SYKMELDT_FRA]: null };
    }

    if (name === Skjemafelt.SYKMELDT_FRA) {
        updatedFieldValues = {
            ...updatedFieldValues,
            [Skjemafelt.FRILANSER_FORSIKRING]: undefined,
            [Skjemafelt.FRILANSER_EGENMELDING]: undefined,
        };
        updatedErrors = {
            ...errors,
            [Skjemafelt.FRILANSER_FORSIKRING]: null,
            [Skjemafelt.FRILANSER_EGENMELDING]: null,
        };
    }

    if (name === Skjemafelt.FEIL_OPPLYSNINGER) {
        updatedFieldValues = {
            ...updatedFieldValues,
            [Skjemafelt.SYKMELDT_FRA]: undefined,
            [Skjemafelt.OPPFOLGING]: undefined,
            [Skjemafelt.FRILANSER_EGENMELDING]: undefined,
            [Skjemafelt.FRILANSER_FORSIKRING]: undefined,
        };
        updatedErrors = {
            ...errors,
            [Skjemafelt.SYKMELDT_FRA]: null,
            [Skjemafelt.OPPFOLGING]: null,
            [Skjemafelt.FRILANSER_EGENMELDING]: null,
            [Skjemafelt.FRILANSER_FORSIKRING]: null,
        };
    }

    return { updatedFieldValues, updatedErrors };
};
