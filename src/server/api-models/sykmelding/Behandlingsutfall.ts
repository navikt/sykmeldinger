import { z } from 'zod'

import { RegelStatus } from '../../graphql/resolver-types.generated'

const RegelInfoSchema = z.object({
    messageForSender: z.string(),
    messageForUser: z.string(),
    ruleName: z.string(),
    ruleStatus: z.nativeEnum(RegelStatus),
})

export type Behandlingsutfall = z.infer<typeof BehandlingsutfallSchema>
export const BehandlingsutfallSchema = z.object({
    status: z.nativeEnum(RegelStatus),
    ruleHits: z.array(RegelInfoSchema),
})
