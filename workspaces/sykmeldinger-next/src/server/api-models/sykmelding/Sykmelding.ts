import { z } from 'zod'

import { LocalDateSchema } from '../date'

import { ArbeidsgiverSykmeldingSchema } from './ArbeidsgiverSykmelding'
import { BehandlerSchema } from './Behandler'
import { BehandlingsutfallSchema } from './Behandlingsutfall'
import { KontaktMedPasientSchema } from './KontaktMedPasient'
import { MedisinskVurderingSchema } from './MedisinskVurdering'
import { MeldingTilNAVSchema } from './MeldingTilNav'
import { MerknadSchema } from './Merknad'
import { PeriodeSchema } from './Periode'
import { PrognoseSchema } from './Prognose'
import { SykmeldingStatusSchema } from './SykmeldingStatus'
import { UtdypendeOpplysningSchema } from './UtdypendeOpplysninger'
import { PasientSchema } from './Pasient'
import { UtenlandskSykmeldingSchema } from './UtenlandskSykmelding'

export const RulesetVersion = z.preprocess((value: unknown) => {
    if (!value) return 2
    return +String(value)
}, z.number())

export type Sykmelding = z.infer<typeof SykmeldingSchema>
export const SykmeldingSchema = z.object({
    id: z.string(),
    mottattTidspunkt: LocalDateSchema,
    behandlingsutfall: BehandlingsutfallSchema,
    arbeidsgiver: ArbeidsgiverSykmeldingSchema.nullable(),
    sykmeldingsperioder: z.array(PeriodeSchema),
    sykmeldingStatus: SykmeldingStatusSchema,
    medisinskVurdering: MedisinskVurderingSchema.nullable(),
    prognose: PrognoseSchema.nullable(),
    utdypendeOpplysninger: z.record(z.string(), z.record(z.string(), UtdypendeOpplysningSchema)),
    tiltakArbeidsplassen: z.string().nullable(),
    tiltakNAV: z.string().nullable(),
    andreTiltak: z.string().nullable(),
    meldingTilNAV: MeldingTilNAVSchema.nullable(),
    meldingTilArbeidsgiver: z.string().nullable(),
    kontaktMedPasient: KontaktMedPasientSchema,
    behandletTidspunkt: LocalDateSchema,
    behandler: BehandlerSchema,
    egenmeldt: z.boolean().nullable(),
    papirsykmelding: z.boolean().nullable(),
    merknader: z.array(MerknadSchema).nullable(),
    pasient: PasientSchema.nullable(),
    rulesetVersion: RulesetVersion,
    utenlandskSykmelding: UtenlandskSykmeldingSchema.nullable(),
})
