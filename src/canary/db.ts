/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazyNextleton } from 'nextleton'
import pg from 'pg'
import { z } from 'zod'

import { toDate } from '../utils/dateUtils'
import type { RequestContext } from '../server/graphql/resolvers'

export const db = lazyNextleton('db_', async () => {
    const client = new pg.Client({
        connectionString: 'postgresql://127.0.0.1:6969/sykmeldinger?user=karl.jorgen.overa@nav.no',
    })
    await client.connect()

    return client
})

export async function getProcessingSykmeldnger(context: RequestContext): Promise<Sykmelding[]> {
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
        [context?.payload.pid],
    )
    console.timeEnd('getProcessingSykmeldnger')

    return z.array(SykmeldingSchema).parse(queryResult.rows)
}

export async function getOlderSykmeldinger(context: RequestContext): Promise<Sykmelding[]> {
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
        [context?.payload.pid],
    )
    console.timeEnd('OlderSykmeldinger')

    return z.array(SykmeldingSchema).parse(queryResult.rows)
}

export async function getUnsentSykmeldinger(context: RequestContext): Promise<Sykmelding[]> {
    const client = await db()

    await new Promise((resolve) => setTimeout(resolve, 5000))

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
        [context?.payload.pid],
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
