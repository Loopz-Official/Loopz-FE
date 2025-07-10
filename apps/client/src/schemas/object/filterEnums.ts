import * as z from 'zod/v4';

export const objectTypeEnum = z.enum([
    'FURNITURE',
    'LIGHT',
    'DISPLAY',
    'PROPS',
    'FLOWERPOT',
    'LIFESTYLE',
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

export type ObjectType = z.infer<typeof objectTypeEnum>;
export type ObjectSize = z.infer<typeof objectSizeEnum>;
export type ObjectKeyword = z.infer<typeof objectKeywordEnum>;
export type ObjectSort = z.infer<typeof objectSortEnum>;
