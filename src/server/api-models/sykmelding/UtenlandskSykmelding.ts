import { z } from 'zod'

export type UtenlandskSykmelding = z.infer<typeof UtenlandskSykmeldingSchema>
export const UtenlandskSykmeldingSchema = z.object({
    land: z.string(),
})
