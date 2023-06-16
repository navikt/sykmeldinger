/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazyNextleton } from 'nextleton'
import { Client } from 'pg'
import { headers } from 'next/headers'
import { z } from 'zod'
import { parseISO } from 'date-fns'

import { Sykmelding as SykmeldingApi } from '../server/api-models/sykmelding/Sykmelding'
import { getUserContext } from '../auth/rsc-user-context'
import { toDate } from '../utils/dateUtils'
import { isLocalOrDemo } from '../utils/env'
import mockDb from '../server/graphql/mock-db'

export const db = lazyNextleton('db-4', async () => {
    const client = new Client({
        connectionString: 'postgresql://127.0.0.1:6969/sykmeldinger?user=karl.jorgen.overa@nav.no',
    })
    await client.connect()

    return client
})

export async function getProcessingSykmeldnger(): Promise<Sykmelding[]> {
    const user = getUserContext(headers())
    if (!user) {
        throw new Error('User is missing authorization bearer token')
    }

    if (isLocalOrDemo) {
        return mockDb().get(user.sessionId).sykmeldinger().map(bigToSmol)
    }

    const client = await db()

    console.time('getProcessingSykmeldnger')
    const queryResult = await client.query(
        `
            select b.sykmelding_id,
                   sykmelding,
                   ss.event,
                   ss.arbeidsgiver,
                   ss.timestamp,
                   b.behandlingsutfall,
                   b.rule_hits
            from sykmelding sykmelding
                     inner join sykmeldingstatus ss
                                on ss.sykmelding_id = sykmelding.sykmelding_id and ss.timestamp =
                                                                                   (select max(timestamp)
                                                                                    from sykmeldingstatus
                                                                                    where sykmelding_id = sykmelding.sykmelding_id)
                     inner join behandlingsutfall b on sykmelding.sykmelding_id = b.sykmelding_id
                     inner join sykmeldt s on sykmelding.fnr = s.fnr
            where sykmelding.fnr = $1
              AND (ss.event = 'SENDT')
              AND sykmelding @> '{"merknader": [{"type": "UNDER_BEHANDLING"}]}'

        `,
        [user?.payload.pid],
    )
    console.timeEnd('getProcessingSykmeldnger')

    return z.array(SykmeldingSchema).parse(queryResult.rows)
}

export async function getOlderSykmeldinger(): Promise<Sykmelding[]> {
    const user = getUserContext(headers())
    if (!user) {
        throw new Error('User is missing authorization bearer token')
    }

    if (isLocalOrDemo) {
        return mockDb().get(user.sessionId).sykmeldinger().map(bigToSmol)
    }

    const client = await db()

    console.time('OlderSykmeldinger')
    const queryResult = await client.query(
        `
            select b.sykmelding_id,
                   sykmelding,
                   ss.event,
                   ss.arbeidsgiver,
                   ss.timestamp,
                   b.behandlingsutfall,
                   b.rule_hits
            from sykmelding sykmelding
                     inner join sykmeldingstatus ss
                                on ss.sykmelding_id = sykmelding.sykmelding_id and ss.timestamp =
                                                                                   (select max(timestamp)
                                                                                    from sykmeldingstatus
                                                                                    where sykmelding_id = sykmelding.sykmelding_id)
                     inner join behandlingsutfall b on sykmelding.sykmelding_id = b.sykmelding_id
                     inner join sykmeldt s on sykmelding.fnr = s.fnr
            where sykmelding.fnr = $1
              AND NOT (ss.event = 'APEN')
              AND NOT sykmelding @> '{"merknader": [{"type": "UNDER_BEHANDLING"}]}'

        `,
        [user?.payload.pid],
    )
    console.timeEnd('OlderSykmeldinger')

    return z.array(SykmeldingSchema).parse(queryResult.rows)
}

export async function getUnsentSykmeldinger(): Promise<Sykmelding[]> {
    const user = getUserContext(headers())
    if (!user) {
        throw new Error('User is missing authorization bearer token')
    }

    if (isLocalOrDemo) {
        return mockDb().get(user.sessionId).sykmeldinger().map(bigToSmol)
    }
    const client = await db()

    console.time('UnsentSykmeldinger')
    const queryResult = await client.query(
        `
            select b.sykmelding_id,
                   sykmelding,
                   ss.event,
                   ss.arbeidsgiver,
                   ss.timestamp,
                   b.behandlingsutfall,
                   b.rule_hits
            from sykmelding sykmelding
                     inner join sykmeldingstatus ss
                                on ss.sykmelding_id = sykmelding.sykmelding_id and ss.timestamp =
                                                                                   (select max(timestamp)
                                                                                    from sykmeldingstatus
                                                                                    where sykmelding_id = sykmelding.sykmelding_id)
                     inner join behandlingsutfall b on sykmelding.sykmelding_id = b.sykmelding_id
                     inner join sykmeldt s on sykmelding.fnr = s.fnr
            where sykmelding.fnr = $1
              AND ss.event = 'APEN';
        `,
        [user?.payload.pid],
    )
    console.timeEnd('UnsentSykmeldinger')

    return z.array(SykmeldingSchema).parse(queryResult.rows)
}

export type Sykmelding = z.infer<typeof SykmeldingSchema>
export const SykmeldingSchema = z.object({
    sykmelding_id: z.string(),
    event: z.string(),
    arbeidsgiver: z
        .object({
            orgNavn: z.string(),
            orgnummer: z.string(),
            juridiskOrgnummer: z.string(),
        })
        .nullable(),
    rule_hits: z.array(
        z.object({
            ruleName: z.string(),
            ruleStatus: z.string(),
            messageForUser: z.string(),
            messageForSender: z.string(),
        }),
    ),
    timestamp: z.union([z.string(), z.date()]).transform(toDate),
    behandlingsutfall: z.string(),
    sykmelding: z.object({
        papirsykmelding: z.boolean(),
        sykmeldingsperioder: z.array(
            z.object({
                fom: z.string(),
                tom: z.string(),
                type: z.string(),
                gradert: z.object({ grad: z.number() }).nullish(),
                behandlingsdager: z.number().nullish(),
            }),
        ),
    }),
})

function bigToSmol(sykmelding: SykmeldingApi): Sykmelding {
    return {
        sykmelding_id: sykmelding.id,
        event: sykmelding.sykmeldingStatus.statusEvent,
        arbeidsgiver: sykmelding.arbeidsgiver
            ? ({
                  orgNavn: sykmelding.arbeidsgiver.navn ?? 'Missing',
                  juridiskOrgnummer: sykmelding.sykmeldingStatus.arbeidsgiver?.orgnummer ?? 'Missing',
                  orgnummer: sykmelding.sykmeldingStatus.arbeidsgiver?.orgnummer ?? 'Missing',
              } satisfies Sykmelding['arbeidsgiver'])
            : null,
        rule_hits: sykmelding.behandlingsutfall.ruleHits.map((it) => ({
            ruleName: it.ruleName,
            ruleStatus: it.ruleStatus,
            messageForUser: it.messageForUser,
            messageForSender: it.messageForSender,
        })),
        timestamp: parseISO(sykmelding.sykmeldingStatus.timestamp),
        behandlingsutfall: sykmelding.behandlingsutfall.status,
        sykmelding: {
            papirsykmelding: sykmelding.papirsykmelding ?? false,
            sykmeldingsperioder: sykmelding.sykmeldingsperioder.map((it) => ({
                fom: it.fom,
                tom: it.tom,
                type: it.type,
                gradert: it.gradert ?? null,
                behandlingsdager: it.behandlingsdager ?? null,
            })),
        },
    }
}
