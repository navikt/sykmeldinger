import { z } from 'zod'

import { ArbeidsgiverSchema } from './Arbeidsgiver'

export type Brukerinformasjon = z.infer<typeof BrukerinformasjonSchema>
export const BrukerinformasjonSchema = z.object({
    arbeidsgivere: z.array(ArbeidsgiverSchema),
})
