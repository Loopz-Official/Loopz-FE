import * as z from 'zod/v4';

// Filter Request DTO
export const objectBoardFilterRequest = z.object({
    objectTypes: z
        .enum([
            'FURNITURE',
            'LIGHT',
            'DISPLAY',
            'PROPS',
            'FLOWERPOT',
            'LIFESTYLE',
            'ART',
        ])
        .optional(),
    objectSizes: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    priceMin: z.int32().optional(),
    priceMax: z.int32().optional(),
    keywords: z
        .enum([
            'EMOTIONAL',
            'TRENDY',
            'RETRO',
            'MINIMAL',
            'UNIQUE',
            'SIMPLE',
            'LARGE',
            'PRACTICAL',
            'PROFOUND',
            'CHARMING',
        ])
        .optional(),
    excludeSoldOut: z.boolean().optional(),
    sort: z.enum(['latest', 'popular']).optional(),
    page: z.int32().nonnegative().optional(),
    size: z.int32().positive().optional(),
});

export type ObjectBoardFilterRequest = z.infer<typeof objectBoardFilterRequest>;

// Response DTO

export const objectInfos = z.object({
    objectId: z.string(), // 추후에 uuid로 수정 (test data 때문에 임시 처리)
    objectName: z.string(),
    intro: z.string(),
    imageUrl: z.url(),
    objectPrice: z.int32(),
    soldOut: z.boolean(),
    liked: z.boolean(),
});

export type ObjectInfo = z.infer<typeof objectInfos>;

export const objectBoardResponse = z.object({
    objectCount: z.int32(),
    objects: z.array(objectInfos),
    hasNext: z.boolean(),
});

export type ObjectBoardResponse = z.infer<typeof objectBoardResponse>;
