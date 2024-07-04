import { z } from 'zod'

import { LocalDateSchema } from '../date'
import {
    ShortName,
    StatusEvent,
    UriktigeOpplysningerType,
    ArbeidssituasjonType,
    YesOrNo,
    Blad,
    LottOgHyre,
    JaEllerNei,
} from '../../graphql/resolver-types.generated'

export enum Svartype {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    PERIODER = 'PERIODER',
    JA_NEI = 'JA_NEI',
    DAGER = 'DAGER',
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SporsmalSvarSchema = <T>(type: z.ZodType<T>) =>
    z.object({
        sporsmaltekst: z.string(),
        svar: type,
    })

export type BrukerSvar = z.infer<typeof BrukerSvarSchema>
const BrukerSvarSchema = z.object({
    erOpplysningeneRiktige: SporsmalSvarSchema(z.nativeEnum(JaEllerNei)),
    uriktigeOpplysninger: SporsmalSvarSchema(z.array(z.nativeEnum(UriktigeOpplysningerType))).nullable(),
    arbeidssituasjon: SporsmalSvarSchema(z.nativeEnum(ArbeidssituasjonType)),
    arbeidsgiverOrgnummer: SporsmalSvarSchema(z.string()).nullable(),
    riktigNarmesteLeder: SporsmalSvarSchema(z.nativeEnum(JaEllerNei)).nullable(),
    harBruktEgenmelding: SporsmalSvarSchema(z.nativeEnum(JaEllerNei)).nullable(),
    egenmeldingsperioder: SporsmalSvarSchema(
        z.array(
            z.object({
                fom: LocalDateSchema,
                tom: LocalDateSchema,
            }),
        ),
    ).nullable(),
    harForsikring: SporsmalSvarSchema(z.nativeEnum(JaEllerNei)).nullable(),
    egenmeldingsdager: SporsmalSvarSchema(z.array(LocalDateSchema)).nullable(),
    harBruktEgenmeldingsdager: SporsmalSvarSchema(z.nativeEnum(JaEllerNei)).nullable(),
    fisker: z
        .object({
            blad: SporsmalSvarSchema(z.nativeEnum(Blad)),
            lottOgHyre: SporsmalSvarSchema(z.nativeEnum(LottOgHyre)),
        })
        .nullable(),
    arbeidsledig: z
        .object({
            arbeidsledigFraOrgnummer: SporsmalSvarSchema(z.string()).nullable(),
        })
        .nullable(),
})

export type SykmeldingStatus = z.infer<typeof SykmeldingStatusSchema>
export const SykmeldingStatusSchema = z.object({
    statusEvent: z.nativeEnum(StatusEvent),
    timestamp: LocalDateSchema,
    arbeidsgiver: ArbeidsgiverStatusSchema.nullable(),
    sporsmalOgSvarListe: z.array(SporsmalSchema),
    brukerSvar: BrukerSvarSchema.nullable(),
})
