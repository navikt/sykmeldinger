import { z } from 'zod'

import { LocalDateSchema } from './date'

export type NaermesteLeder = z.infer<typeof NaermesteLederSchema>
export const NaermesteLederSchema = z.object({
    aktoerId: z.string(),
    navn: z.string(),
    orgnummer: z.string(),
    organisasjonsnavn: z.string(),
    epost: z.string().nullable(),
    mobil: z.string().nullable(),
    aktivTom: LocalDateSchema.nullable(),
    arbeidsgiverForskuttererLoenn: z.boolean().nullable(),
})

export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>
export const ArbeidsgiverSchema = z.object({
    orgnummer: z.string(),
    juridiskOrgnummer: z.string(),
    navn: z.string(),
    stillingsprosent: z.string(),
    stilling: z.string(),
    aktivtArbeidsforhold: z.boolean(),
    naermesteLeder: NaermesteLederSchema.nullable(),
})
