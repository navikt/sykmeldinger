import { z } from 'zod'

export type NaermesteLeder = z.infer<typeof NaermesteLederSchema>
export const NaermesteLederSchema = z.object({
    navn: z.string(),
})

export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>
export const ArbeidsgiverSchema = z.object({
    orgnummer: z.string(),
    navn: z.string(),
    aktivtArbeidsforhold: z.boolean(),
    naermesteLeder: NaermesteLederSchema.nullable(),
})
