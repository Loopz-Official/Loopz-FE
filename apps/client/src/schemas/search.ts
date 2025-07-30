import { z } from 'zod/v4';

export const relativeObjectResponse = z.array(
    z.object({
        objectId: z.uuid(),
        objectName: z.string(),
    })
);
export type RelativeObjectResponse = z.infer<typeof relativeObjectResponse>;
