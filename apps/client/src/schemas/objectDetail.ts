import * as z from 'zod/v4';

export const objectDetailInfo = z.object({
    objectResponse: z.object({
        objectId: z.string(),
        objectName: z.string(),
        intro: z.string(),
        imageUrl: z.nullable(z.url()),
        objectPrice: z.number(),
        soldOut: z.boolean(),
        liked: z.boolean(),
    }),
    size: z.string(),
    descriptionUrl: z.nullable(z.url()),
    stock: z.number(),
});

export type ObjectDetailInfo = z.infer<typeof objectDetailInfo>;
