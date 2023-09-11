import { z } from 'zod'

import { LocalDateSchema } from '../date'
import { Periodetype, RegelStatus, StatusEvent } from '../../graphql/resolver-types.generated'

import { UtenlandskSykmeldingSchema } from './UtenlandskSykmelding'

const ArbeidsgiverMinimalSchema = z.object({
    orgNavn: z.string(),
    orgnummer: z.string(),
    juridiskOrgnummer: z.string(),
})

const RuleHitsMinimalSchema = z.object({
    ruleName: z.string(),
    ruleStatus: z.string(),
    messageForUser: z.string(),
    messageForSender: z.string(),
})

const GradertMinimalSchema = z.object({
    grad: z.number(),
})

const MinimalPeriodSchema = z.object({
    fom: z.string(),
    tom: z.string(),
    type: z.nativeEnum(Periodetype),
    gradert: GradertMinimalSchema.nullable(),
    behandlingsdager: z.number().nullable(),
})

const SykmeldingMinimalSchema = z.object({
    papirsykmelding: z.boolean(),
    egenmeldt: z
        .boolean()
        .nullable()
        .optional()
        .transform((it) => it ?? false),
    utenlandskSykmelding: UtenlandskSykmeldingSchema.nullable(),
    sykmeldingsperioder: z.array(MinimalPeriodSchema),
})

export type MinimalSykmelding = z.infer<typeof MinimalSykmeldingSchema>
export const MinimalSykmeldingSchema = z.object({
    sykmelding_id: z.string(),
    event: z.nativeEnum(StatusEvent),
    arbeidsgiver: ArbeidsgiverMinimalSchema.nullable(),
    rule_hits: z.array(RuleHitsMinimalSchema),
    timestamp: LocalDateSchema,
    behandlingsutfall: z.nativeEnum(RegelStatus),
    sykmelding: SykmeldingMinimalSchema,
})
