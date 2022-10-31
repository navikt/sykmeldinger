import { z } from 'zod'

import { LocalDateSchema } from './date'

export type ErUtenforVentetid = z.infer<typeof ErUtenforVentetidSchema>
export const ErUtenforVentetidSchema = z.object({
    erUtenforVentetid: z.boolean(),
    oppfolgingsdato: LocalDateSchema.nullable(),
})
