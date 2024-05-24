import { z } from 'zod'

export type TidligereArbeidsgivere = z.infer<typeof TidligereArbeidsgivereSchema>
export const TidligereArbeidsgivereSchema = z.object({
    orgNavn: z.string(),
    orgnummer: z.string(),
})
