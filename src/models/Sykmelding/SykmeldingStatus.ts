import { z } from 'zod';

import { LocalDateSchema } from '../date';

const ArbeidsgiverStatusSchema = z.object({
    orgnummer: z.string(),
    orgNavn: z.string(),
    juridiskOrgnummer: z.string().nullable(),
});

enum ShortName {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    NY_NARMESTE_LEDER = 'NY_NARMESTE_LEDER',
    FRAVAER = 'FRAVAER',
    PERIODE = 'PERIODE',
    FORSIKRING = 'FORSIKRING',
}

enum Svartype {
    ARBEIDSSITUASJON = 'ARBEIDSSITUASJON',
    PERIODER = 'PERIODER',
    JA_NEI = 'JA_NEI',
}

const SvarSchema = z.object({
    svarType: z.nativeEnum(Svartype),
    svar: z.string(),
});

const SporsmalSchema = z.object({
    tekst: z.string(),
    shortName: z.nativeEnum(ShortName),
    svar: SvarSchema,
});

export enum StatusEvent {
    SENDT = 'SENDT',
    APEN = 'APEN',
    AVBRUTT = 'AVBRUTT',
    UTGATT = 'UTGATT',
    BEKREFTET = 'BEKREFTET',
}

export type SykmeldingStatus = z.infer<typeof SykmeldingStatusSchema>;
export const SykmeldingStatusSchema = z.object({
    statusEvent: z.nativeEnum(StatusEvent),
    timestamp: LocalDateSchema,
    arbeidsgiver: ArbeidsgiverStatusSchema.nullable(),
    sporsmalOgSvarListe: z.array(SporsmalSchema),
});
