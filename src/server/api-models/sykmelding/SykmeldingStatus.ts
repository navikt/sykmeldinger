import { z } from 'zod'

import { LocalDateSchema } from '../date'
import { ShortName, StatusEvent, Svartype } from '../../graphql/resolver-types.generated'

const ArbeidsgiverStatusSchema = z.object({
    orgnummer: z.string(),
    orgNavn: z.string(),
    juridiskOrgnummer: z.string().nullable(),
})

const SvarSchema = z.object({
    svarType: z.nativeEnum(Svartype),
    svar: z.string(),
})

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
