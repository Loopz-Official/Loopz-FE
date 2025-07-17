import * as z from 'zod/v4';

import * as e from './filterEnums';
// ObjectSort 타입과 enum import
export { objectSortEnum } from './filterEnums';
export type { ObjectSort } from './filterEnums';

// Filter Request DTO
const filterOptions = z
    .object({
        objectTypes: z.union([e.objectTypeEnum, z.array(e.objectTypeEnum)]),
        objectSizes: z.union([e.objectSizeEnum, z.array(e.objectSizeEnum)]),
        priceMin: z.int32().nonnegative(),
        priceMax: z.int32().nonnegative(),
        keywords: z.union([e.objectKeywordEnum, z.array(e.objectKeywordEnum)]),
        excludeSoldOut: z.boolean(),
        sort: e.objectSortEnum, // 최신순/인기순 등 정렬 옵션
    })
    .partial();

export const paginationOptions = z.object({
    page: z.int32().positive(),
    size: z.int32().positive(),
});

export const objectBoardFilterRequest = z.object({
    ...filterOptions.shape,
    ...paginationOptions.shape,
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

// Object Liked
const sortAndSoldOutOptions = z.object({
    excludeSoldOut: z.boolean(),
    sort: z.optional(e.objectSortEnum),
});
export type SortAndSoldOutOptions = z.infer<typeof sortAndSoldOutOptions>;

export const filteredObjectRequest = z.object({
    ...paginationOptions.shape,
    ...sortAndSoldOutOptions.shape,
});
export type FilteredObjectRequest = z.infer<typeof filteredObjectRequest>;

// Selected Object Info Request & Response
export const objectSelectionRequest = z.object({
    objectId: z.uuid(),
    quantity: z.int32().positive(), // 1개부터 주문 가능 (request)
});
export type ObjectSelectionRequest = z.infer<typeof objectSelectionRequest>;

export const objectInfo = z.object({
    ...objectBasicInfo.shape,
    quantity: z.int32().positive(),
    stock: z.int32().positive(),
});
export type ObjectInfo = z.infer<typeof objectInfo>;

export const selectedObjectInfos = z.array(objectInfo);
export type SelectedObjectInfos = z.infer<typeof selectedObjectInfos>;
