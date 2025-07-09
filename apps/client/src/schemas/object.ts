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
// Basic Info
export const objectBasicInfo = z.object({
    objectId: z.uuid(),
    objectName: z.string(),
    imageUrl: z.url(),
    objectPrice: z.int32().nonnegative(),
});

// Object Board & Detail common
export const objectCommonInfo = z.object({
    ...objectBasicInfo.shape,
    intro: z.string(),
    liked: z.boolean(),
    stock: z.int32().nonnegative(),
});
export type ObjectCommonInfo = z.infer<typeof objectCommonInfo>;

// Cart
export const cartObjectInfo = z.object({
    ...objectBasicInfo.shape,
    quantity: z.int32().nonnegative(),
    totalPrice: z.int32().nonnegative(),
});
export type CartObjectInfo = z.infer<typeof cartObjectInfo>;

// Object Board
export const objectBoardResponse = z.object({
    objectCount: z.int32().nonnegative(),
    objects: z.array(objectCommonInfo),
    hasNext: z.boolean(),
});
export type ObjectBoardResponse = z.infer<typeof objectBoardResponse>;

// Object Detail
export const objectDetailInfo = z.object({
    ...objectCommonInfo.shape,
    size: z.string(),
    descriptionUrl: z.nullable(z.url()),
});
export type ObjectDetailInfo = z.infer<typeof objectDetailInfo>;
