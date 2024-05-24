import { z } from 'zod'

import { AnnenFraverGrunn } from '../../graphql/resolver-types.generated'
import { LocalDateSchema } from '../date'

const DiagnoseSchema = z.object({
    kode: z.string(),
    system: z.string(),
    tekst: z.string().nullable(),
})

const AnnenFraversArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    grunn: z.array(z.nativeEnum(AnnenFraverGrunn)),
})

export type MedisinskVurdering = z.infer<typeof MedisinskVurderingSchema>
export const MedisinskVurderingSchema = z.object({
    hovedDiagnose: DiagnoseSchema.nullable(),
    biDiagnoser: z.array(DiagnoseSchema),
    annenFraversArsak: AnnenFraversArsakSchema.nullable(),
    svangerskap: z.boolean(),
    yrkesskade: z.boolean(),
    yrkesskadeDato: LocalDateSchema.nullable(),
})
