import { z } from 'zod';

export type Pasient = z.infer<typeof PasientSchema>;
export const PasientSchema = z.object({
    fnr: z.string().nullable(),
    fornavn: z.string().nullable(),
    mellomnavn: z.string().nullable(),
    etternavn: z.string().nullable(),
});

export function getPasientName(pasient: Pasient): string | undefined {
    if (!pasient.fornavn) return undefined;

    return `${pasient.fornavn}${pasient.mellomnavn ? ' ' + pasient.mellomnavn : ''}${
        pasient.etternavn ? ' ' + pasient.etternavn : ''
    }`;
}
