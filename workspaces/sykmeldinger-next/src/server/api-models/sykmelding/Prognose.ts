import { z } from 'zod'

import { LocalDateSchema } from '../date'

const ErIArbeidSchema = z.object({
    egetArbeidPaSikt: z.boolean(),
    annetArbeidPaSikt: z.boolean(),
    arbeidFOM: LocalDateSchema.nullable(),
    vurderingsdato: LocalDateSchema.nullable(),
})

const ErIkkeIArbeid = z.object({
    arbeidsforPaSikt: z.boolean(),
    arbeidsforFOM: LocalDateSchema.nullable(),
    vurderingsdato: LocalDateSchema.nullable(),
})

export type Prognose = z.infer<typeof PrognoseSchema>
export const PrognoseSchema = z.object({
    arbeidsforEtterPeriode: z.boolean(),
    hensynArbeidsplassen: z.string().nullable(),
    erIArbeid: ErIArbeidSchema.nullable(),
    erIkkeIArbeid: ErIkkeIArbeid.nullable(),
})
