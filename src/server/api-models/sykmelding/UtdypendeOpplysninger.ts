import { z } from 'zod'

export enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER = 'SKJERMET_FOR_ARBEIDSGIVER',
    SKJERMET_FOR_NAV = 'SKJERMET_FOR_NAV',
}

export const UtdypendeOpplysningSchema = z.object({
    sporsmal: z.string().nullable(),
    svar: z.string(),
    restriksjoner: z.array(z.nativeEnum(SvarRestriksjon)),
})

export type UtdypendeOpplysning = z.infer<typeof UtdypendeOpplysningSchema>
