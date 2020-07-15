import React, { useState, useMemo, useEffect } from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

// helper function for infering types with Object.entries
export const getEntries = <T extends {}>(object: T): Array<[keyof T, T[keyof T]]> =>
    Object.entries(object) as Array<[keyof T, T[keyof T]]>;

export type ValidationFunctions<T> = { [key in Required<keyof T>]: (value: Partial<T>) => string | undefined };

interface FormConfig<T> {
    validationFunctions: ValidationFunctions<T>;
    defaultValues?: Partial<T>;
}

interface Form<T> {
    formState: Partial<T>;
    errors: Map<keyof T, FeiloppsummeringFeil>;
    setFormState: React.Dispatch<React.SetStateAction<Partial<T>>>;
    handleSubmit: (onSubmit: (state: T) => void) => void;
}

const useForm = <T>({ validationFunctions, defaultValues = {} }: FormConfig<T>): Form<T> => {
    const [state, setState] = useState<Partial<T>>(defaultValues);
    const [errors, setErrors] = useState<Map<keyof T, FeiloppsummeringFeil>>(new Map<keyof T, FeiloppsummeringFeil>());
    const [isFirstSubmit, setIsFirstSubmit] = useState<boolean>(true);
    console.log(state);

    const errorsMemo: Map<keyof T, FeiloppsummeringFeil> = useMemo(() => {
        const errorMap = new Map<keyof T, FeiloppsummeringFeil>();
        getEntries(validationFunctions).forEach(([key, validationFunction]) => {
            const maybeError = validationFunction(state);
            if (maybeError) {
                errorMap.set(key, { feilmelding: maybeError, skjemaelementId: String(key) });
            } else {
                errorMap.delete(key);
            }
        });
        return errorMap;
    }, [state, validationFunctions]);

    useEffect(() => {
        if (isFirstSubmit === false) {
            setErrors(errorsMemo);
        }
    }, [isFirstSubmit, setErrors, errorsMemo]);

    // Type guard ensuring that state conforms to T is list of errors is empty
    const isValidForm = <T>(state: any): state is T => {
        if (errorsMemo.size) {
            return false;
        }
        return true;
    };

    const handleSubmit = (onSubmit: (state: T) => void) => {
        if (isFirstSubmit) {
            setIsFirstSubmit(false);
        }
        if (isValidForm<T>(state)) {
            onSubmit(state);
        }
    };

    return { formState: state, errors, setFormState: setState, handleSubmit };
};

export default useForm;
