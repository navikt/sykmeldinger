import { z } from 'zod'

import { LocalDateSchema } from '../date'
import { ShortName, StatusEvent } from '../../graphql/resolver-types.generated'
import { ArbeidssituasjonType, YesOrNo } from '../../../fetching/graphql.generated'

export enum Svartype {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    PERIODER = 'PERIODER',
    JA_NEI = 'JA_NEI',
    DAGER = 'DAGER',
}

export enum JaEllerNei {
    JA = 'JA',
    NEI = 'NEI',
}

const ArbeidsgiverStatusSchema = z.object({
    orgnummer: z.string(),
    orgNavn: z.string(),
})

const JaNeiSvarSchema = z.object({
    svarType: z.literal(Svartype.JA_NEI),
    svar: z.nativeEnum(JaEllerNei).transform((svar) => (svar === JaEllerNei.JA ? YesOrNo.YES : YesOrNo.NO)),
})

const ArbeidssituasjonSvarSchema = z.object({
    svarType: z.literal(Svartype.ARBEIDSSITUASJON),
    svar: z.nativeEnum(ArbeidssituasjonType),
})

export type DagerSvar = z.infer<typeof DagerSvarSchema>
const DagerSvarSchema = z.object({
    svarType: z.literal(Svartype.DAGER),
    svar: z.preprocess((obj: unknown) => JSON.parse(String(obj)), z.array(LocalDateSchema)),
})

const PerioderSvarSchema = z.object({
    svarType: z.literal(Svartype.PERIODER),
    svar: z.preprocess(
        (obj: unknown) => JSON.parse(String(obj)),
        z.array(z.object({ fom: LocalDateSchema, tom: LocalDateSchema })),
    ),
})

export type Svar = z.infer<typeof SvarSchema>
const SvarSchema = z.discriminatedUnion('svarType', [
    JaNeiSvarSchema,
    DagerSvarSchema,
    ArbeidssituasjonSvarSchema,
    PerioderSvarSchema,
])

export type Sporsmal = z.infer<typeof SporsmalSchema>
const SporsmalSchema = z.object({
    tekst: z.string(),
    shortName: z.nativeEnum(ShortName),
    svar: SvarSchema,
})

export type SykmeldingStatus = z.infer<typeof SykmeldingStatusSchema>
export const SykmeldingStatusSchema = z.object({
    statusEvent: z.nativeEnum(StatusEvent),
    timestamp: LocalDateSchema,
    arbeidsgiver: ArbeidsgiverStatusSchema.nullable(),
    sporsmalOgSvarListe: z.array(SporsmalSchema),
})
