import { z } from 'zod'

export type ArbeidsgiverSykmelding = z.infer<typeof ArbeidsgiverSykmeldingSchema>
export const ArbeidsgiverSykmeldingSchema = z.object({
    navn: z.string().nullable(),
})
