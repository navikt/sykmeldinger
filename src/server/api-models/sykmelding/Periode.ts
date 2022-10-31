import { z } from 'zod'

import { LocalDateSchema } from '../date'
import { ArbeidsrelatertArsakType, MedisinskArsakType, Periodetype } from '../../graphql/resolver-types.generated'

const GradertPeriodeSchema = z.object({
    grad: z.number(),
    reisetilskudd: z.boolean(),
})

const MedisinskArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(z.nativeEnum(MedisinskArsakType)),
})

const ArbeidsrelatertArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(z.nativeEnum(ArbeidsrelatertArsakType)),
})

export type AktivitetIkkeMuligPeriode = z.infer<typeof AktivitetIkkeMuligPeriodeSchema>
export const AktivitetIkkeMuligPeriodeSchema = z.object({
    medisinskArsak: MedisinskArsakSchema.nullable(),
    arbeidsrelatertArsak: ArbeidsrelatertArsakSchema.nullable(),
})

export type Periode = z.infer<typeof PeriodeSchema>
export const PeriodeSchema = z.object({
    fom: LocalDateSchema,
    tom: LocalDateSchema,
    gradert: GradertPeriodeSchema.nullable(),
    behandlingsdager: z.number().nullable(),
    innspillTilArbeidsgiver: z.string().nullable(),
    type: z.nativeEnum(Periodetype),
    aktivitetIkkeMulig: AktivitetIkkeMuligPeriodeSchema.nullable(),
    reisetilskudd: z.boolean(),
})
