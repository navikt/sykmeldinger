import { z } from 'zod';

export type Merknad = z.infer<typeof MerknadSchema>;
export const MerknadSchema = z.object({
    type: z.string(),
    beskrivelse: z.string().nullable(),
});
