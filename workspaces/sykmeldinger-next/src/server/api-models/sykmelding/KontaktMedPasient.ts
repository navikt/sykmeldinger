import { z } from 'zod'

import { LocalDateSchema } from '../date'

export type KontaktMedPasient = z.infer<typeof KontaktMedPasientSchema>
export const KontaktMedPasientSchema = z.object({
    kontaktDato: LocalDateSchema.nullable(),
    begrunnelseIkkeKontakt: z.string().nullable(),
})
