import * as z from 'zod/v4';

import * as e from './filterEnums';

// Filter Request DTO
export const objectBoardFilterRequest = z.object({
    objectTypes: z.optional(e.objectTypeEnum),
    objectSizes: z.optional(e.objectSizeEnum),
    priceMin: z.optional(z.int32().nonnegative()),
    priceMax: z.optional(z.int32().nonnegative()),
    keywords: z.optional(e.objectKeywordEnum),
    excludeSoldOut: z.optional(z.boolean()),
    sort: z.optional(e.objectSortEnum),
    page: z.optional(z.int32().nonnegative()),
    size: z.optional(z.int32().nonnegative()),
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
