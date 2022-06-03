import { z } from 'zod';

export enum RegelStatus {
    OK = 'OK',
    MANUAL_PROCESSING = 'MANUAL_PROCESSING',
    INVALID = 'INVALID',
}

const RegelInfoSchema = z.object({
    messageForSender: z.string(),
    messageForUser: z.string(),
    ruleName: z.string(),
    ruleStatus: z.nativeEnum(RegelStatus),
});

export type Behandlingsutfall = z.infer<typeof BehandlingsutfallSchema>;
export const BehandlingsutfallSchema = z.object({
    status: z.nativeEnum(RegelStatus),
    ruleHits: z.array(RegelInfoSchema),
});
