import { FieldError, FieldErrors } from 'react-hook-form'

import { FormValues } from '../SendSykmeldingForm'

type TraversableTree = FieldError | FieldErrors<FormValues>

type FieldErrorWithName = FieldError & { name: string }

/**
 * Slightly cumbersome function to extract all errors from a FieldErrors object as a flat array.
 *
 * Explicitly implemented to also support useFieldArray usage, which creates some funkyness in the recursive traversal.
 */
export function extractAllErrors(errors: TraversableTree, parentKey: string | null): FieldErrorWithName[] {
    if (Array.isArray(errors)) {
        return traverseArrayErrors(errors, parentKey)
    } else {
        return traverseObjectErrors(errors, parentKey)
    }
}

function traverseArrayErrors(fields: FieldError[], parentKey: string | null): FieldErrorWithName[] {
    return fields.flatMap((field, index): FieldErrorWithName[] => {
        if (!field) return []

        // With useFieldArray, the field can directly be a FieldError, or a object that goes deeper
        if ('message' in field) {
            return [{ ...field, name: `${parentKey ? `${parentKey}.` : ''}${index}` }]
        }

        // If it's an object, we need to continue the traversal
        return extractAllErrors(field, `${parentKey ? `${parentKey}.` : ''}${index}`)
    })
}

// This is a best effort attempt to re-create the types we lose due to Object.entries casting to Record<string, any>
type FieldErrorTuple = [key: string, value: FieldError | FieldErrors<FormValues> | undefined] | undefined

function traverseObjectErrors(fields: TraversableTree, parentKey: string | null): FieldErrorWithName[] {
    // There is some loss in the typing here, what we care about is that this is an Record of field-names to FieldError or an even deeper tree.
    return Object.entries(fields).flatMap((tuple: FieldErrorTuple): FieldErrorWithName[] => {
        // When RHF has already found errors on a useFieldArray, adding a new field cause the new field to be undefined
        if (!tuple) return []
        const [key, value] = tuple

        if (!value) return []
        if ('message' in value) {
            return [{ ...value, name: `${parentKey ? `${parentKey}.` : ''}${key}` }]
        } else {
            return extractAllErrors(value, `${parentKey ? `${parentKey}.` : ''}${key}`)
        }
    })
}
