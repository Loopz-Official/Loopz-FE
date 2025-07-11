import * as z from 'zod/v4';

export const filterTypeEnum = z.enum([
    'objectTypes',
    'objectSizes',
    'priceMin',
    'priceMax',
    'keywords',
    'excludeSoldOut',
    'sort',
]);

export const filterRecord = z.record(
    filterTypeEnum,
    z.union([z.string(), z.array(z.string()), z.boolean()])
);

export const objectTypeEnum = z.enum([
    'FURNITURE',
    'LIGHT',
    'TECH',
    'PROPS',
    'FLOWERPOT',
    'ART',
]);

export const objectSizeEnum = z.enum(['SMALL', 'MEDIUM', 'LARGE']);

export const objectKeywordEnum = z.enum([
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
]);

export const objectSortEnum = z.enum(['latest', 'popular']);

export type FilterType = z.infer<typeof filterTypeEnum>;
export type FilterRecord = z.infer<typeof filterRecord>;
export type ObjectType = z.infer<typeof objectTypeEnum>;
export type ObjectSize = z.infer<typeof objectSizeEnum>;
export type ObjectKeyword = z.infer<typeof objectKeywordEnum>;
export type ObjectSort = z.infer<typeof objectSortEnum>;
