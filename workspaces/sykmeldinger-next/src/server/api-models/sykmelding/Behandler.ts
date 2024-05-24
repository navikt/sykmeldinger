import { z } from 'zod'

const AdresseSchema = z.object({
    gate: z.string().nullable(),
    postnummer: z.number().nullable(),
    kommune: z.string().nullable(),
    postboks: z.string().nullable(),
    land: z.string().nullable(),
})

export type Behandler = z.infer<typeof BehandlerSchema>
export const BehandlerSchema = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().nullable(),
    etternavn: z.string(),
    adresse: AdresseSchema,
    tlf: z.string().nullable(),
})
