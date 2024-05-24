import { z } from 'zod'

import countries from './countries-norwegian.json'

export type UtenlandskSykmelding = z.infer<typeof UtenlandskSykmeldingSchema>
export const UtenlandskSykmeldingSchema = z.object({
    land: z
        .string()
        .transform((value) => countries.find((country) => country.alpha3 === value.toLowerCase())?.name ?? value),
})
