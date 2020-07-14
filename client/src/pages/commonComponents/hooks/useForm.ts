import React, { useState, useEffect, useCallback } from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

// helper function for infering types with Object.entries
export const getEntries = <T extends {}>(object: T): Array<[keyof T, T[keyof T]]> =>
    Object.entries(object) as Array<[keyof T, T[keyof T]]>;

export type ValidationFunctions<T> = { [key in keyof T]: (value: Partial<T>) => string | undefined };

interface Form<T> {
    formState: Partial<T>;
    errors: FeiloppsummeringFeil[] | null;
    setFormState: React.Dispatch<React.SetStateAction<Partial<T>>>;
    handleSubmit: (onSubmit: (state: T) => void) => void;
}

interface FormConfig<T> {
    validationFunctions: ValidationFunctions<T>;
    defaultValues: Partial<T>;
}

const useForm = <T>({ validationFunctions, defaultValues = {} }: FormConfig<T>): Form<T> => {
    const [state, setState] = useState<Partial<T>>(defaultValues);
    const [errors, setErrors] = useState<FeiloppsummeringFeil[] | null>(null);
    const [isFirstSubmit, setIsFirstSubmit] = useState<boolean>(true);

    const getErrors = useCallback(() => {
        const errors: FeiloppsummeringFeil[] = [];
        getEntries(validationFunctions).forEach(([key, validationFunction]) => {
            const maybeError = validationFunction(state);
            if (maybeError) {
                errors.push({ feilmelding: maybeError, skjemaelementId: key as string });
            }
        });
        return errors.length ? errors : null;
    }, [state, validationFunctions]);

    // Type guard ensuring that state conforms to T is list of errors is empty
    const isValid = <T>(state: any): state is T => {
        if (getErrors()) {
            return false;
        }
        return true;
    };

    const handleSubmit = (onSubmit: (state: T) => void) => {
        if (isFirstSubmit) {
            setIsFirstSubmit(false);
        }
        if (isValid<T>(state)) {
            onSubmit(state);
        }
    };

    useEffect(() => {
        if (!isFirstSubmit) {
            setErrors(getErrors());
        }
    }, [isFirstSubmit, getErrors]);

    return { formState: state, errors, setFormState: setState, handleSubmit };
};

export default useForm;
