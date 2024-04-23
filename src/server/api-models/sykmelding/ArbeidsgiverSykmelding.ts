import { z } from 'zod'

export type ArbeidsgiverSykmelding = z.infer<typeof ArbeidsgiverSykmeldingSchema>
export const ArbeidsgiverSykmeldingSchema = z.object({
    navn: z.string().nullable(),
})

export type TidligereArbeidsgiverList = z.infer<typeof TidligereArbeidsgiverListSchema>
export const TidligereArbeidsgiverListSchema = z.object({
    orgNavn: z.string(),
    orgnummer: z.string(),
    sykmeldingsId: z.string(),
})
