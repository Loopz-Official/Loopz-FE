import * as z from 'zod/v4';

// Filter Request DTO
export const objectBoardFilterRequest = z.object({
    objectTypes: z.enum([
        'FURNITURE',
        'LIGHT',
        'DISPLAY',
        'PROPS',
        'FLOWERPOT',
        'LIFESTYLE',
        'ART',
    ]),
    objectSizes: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    priceMin: z.int32(),
    priceMax: z.int32(),
    keywords: z.enum([
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
    ]),
    excludeSoldOut: z.boolean(),
    sort: z.enum(['latest', 'popular']),
    page: z.int32().nonnegative(),
    size: z.int32().positive(),
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
