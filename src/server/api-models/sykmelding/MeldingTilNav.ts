import { z } from 'zod'

export type MeldingTilNAV = z.infer<typeof MeldingTilNAVSchema>
export const MeldingTilNAVSchema = z.object({
    bistandUmiddelbart: z.boolean(),
    beskrivBistand: z.string().nullable(),
})
