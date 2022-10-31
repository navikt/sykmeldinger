import { z } from 'zod'

import { ArbeidsgiverSchema } from './Arbeidsgiver'

export type Brukerinformasjon = z.infer<typeof BrukerinformasjonSchema>
export const BrukerinformasjonSchema = z.object({
    strengtFortroligAdresse: z.boolean(),
    arbeidsgivere: z.array(ArbeidsgiverSchema),
})
